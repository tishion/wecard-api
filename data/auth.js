'use strict';
var HttpError = require('http-errors');
var Config = require('../config/config.js');
var AuthJwt = require('../security/jwtAuth.js');
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
                return callback(new HttpError.BadRequest());
            }

            // Communicate with WX server to get the open id and session key

            var wxOpenId = wxLoginCode;
            var wxSessionKey = '4b-6kQQrOFC1UyBiZqHnMZd/6C4oMg';

            // Find the user with this open id if not found then create one
            db.User.findOrCreate({
                where: {
                    wxOpenId: wxOpenId,
                }
            })
                .then(result => {
                    const [user, created] = result;
                    // If this is a new crated user then create cardcase for it
                    if (created) {
                        db.Cardcase.create({
                            userId: user.id
                        });
                    }
                    return user;
                })
                .then(user => {
                    var userInfo = {
                        id: user.id,
                        wxOpenId: user.wxOpenId,
                    };
                    userInfo.token = AuthJwt.issueToken(userInfo, Config.tokenSecret);
                    callback(null, { responses: userInfo });
                })
                .catch(err => {
                    callback(new HttpError.InternalServerError(err));
                });
        }
    }
};
