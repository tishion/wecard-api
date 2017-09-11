'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../error/code.json');
var Config = require('../config/config.js');
var AuthJwt = require('../security/jwtAuth.js');
var WxAuth = require('../security/wxAuth.js');
var db = require('../models');
/**
 * Operations on /auth
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: WX-USER-ID
     * produces: 
     * responses: 200
     * operationId: 
     */
    get: {
        200: function (req, res, callback) {
            var wxLoginCode = req.get('WX-LOGIN-CODE');
            if (typeof wxLoginCode === 'undefined' || !wxLoginCode) {
                return callback(new HttpError.BadRequest(err_missingWxCodeInHeader));
            }

            // Communicate with WX server to get the open id and session key
            var wxAuthResponse = WxAuth.getWxTicket(
                wxLoginCode,
                Config.appId,
                Config.appSecret,
                (err, response, ticket) => {
                    if (err || !response || response.statusCode != 200 || !body) {
                        console.log(`Failed to authenticate with WX server: ${err}`);
                        return callback(new HttpError.BadRequest(ErrorCode.err_wxAuthenticateFail));
                    }
                    // Success
                    // {
                    //     "openid": "OPENID",
                    //     "session_key": "SESSIONKEY"
                    //     "unionid":  "UNIONID"
                    // }
                    // Fail
                    // {
                    //   "errcode": 40029,
                    //   "errmsg": "invalid code"
                    // }
                    try {
                        var ticket = JSON.parse(body);                        
                    } catch (e) {
                        console.log(`Failed to parse WX server response: ${body} to JSON`);                        
                        return callback(new HttpError.BadRequest(ErrorCode.err_wxAuthenticateFail));                        
                    }
                    if (!ticket.openid || !ticket.session_key) {
                        console.log(`Failed to authenticate with WX server: ${ticket.errmsg} [${ticket.errcode}]`);
                        return callback(new HttpError.BadRequest(ErrorCode.err_wxAuthenticateFail));
                    }

                    // Find the user with this open id if not found then create one
                    db.User.findOrCreate({
                        where: {
                            wxOpenId: ticket.openid,
                        }
                    }).spread((user, created) => {
                        return Promise.all([
                            // Update the wxSessionKey
                            user.update({
                                wxSessionKey: ticket.session_key
                            }),
                            // Find the Cardcase
                            db.Cardcase.findOrCreate({
                                where: {
                                    userId: user.id
                                }
                            }).spread(cardcase => cardcase)
                        ]);
                    }).spread((user, cardcase) => {
                        var userInfo = {
                            id: user.id,
                            wxOpenId: user.wxOpenId,
                            cardcaseId: cardcase.id
                        };
                        userInfo.token = AuthJwt.issueToken(userInfo, Config.tokenSecret);
                        return callback(null, {
                            responses: userInfo
                        });
                    }).catch(db.sequelize.Error, err => {
                        return callback(new HttpError.InternalServerError(err));
                    }).catch(err => {
                        return callback(err);
                    });
                }
            );
        }
    }
};
