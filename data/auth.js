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
                return callback(new HttpError.BadRequest('Missing header WX-LOGIN-CODE'));
            }

            // Communicate with WX server to get the open id and session key

            var wxOpenId = wxLoginCode;
            var wxSessionKey = '4b-6kQQrOFC1UyBiZqHnMZd/6C4oMg';

            // Find the user with this open id if not found then create one
            db.User.findOrCreate({
                where: {
                    wxOpenId: wxOpenId,
                }
            }).spread((user, created) => {
                return Promise.all([
                    user,
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
    }
};
