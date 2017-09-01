'use strict';
var Config = require('../config/congif');
var Mockgen = require('./mockgen.js');
var AuthJwt = require('../security/auth-jwt');
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
            var wx_login_code = req.get('WX-LOGIN-CODE');
            if (typeof wx_login_code === 'undefined' || !wx_login_code) {
                return callback(400);
            }
            
            // Communicate with WX server to get the session_key
            var wx_open_id = 'hZxqCXRI';
            var wx_session_key = '4b-6kQQrOFC1UyBiZqHnMZd/6C4oMg';
            var user_id = '10001'
            var cardcase_id = '10001'
            var user_info = {
                id: user_id,
                wx_open_id: wx_open_id,
                cardcase_id: cardcase_id,
            };
            user_info['token'] = AuthJwt.issueToken(user_info, Config.token_secret);
            callback(null, { responses: user_info });
            return;

            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/auth',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};
