'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../../error/code.json');
var Config = require('../../config/config.js');
var Cache = require('../../x-cache');
var WxApi = require('../../wx-api');
var Moment = require('moment');
/**
 * Operations on /security/wxaccesstoken
 */
module.exports = {
    /**
     * summary: Get WX access token
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     * operationId: security_getWxAccessToken
     */
    get: {
        200: function (req, res, callback) {
            Cache.get('WX_ACCESS_TOKEN')
                .then(value => {
                    if (!value || 'undefined' === typeof value) {
                        return Promise.all([
                            // Communicate with WX server to get the WX access token
                            WxApi.getWxAccessToken(Config.appId, Config.appSecret),
                            true
                        ]);
                    }
                    return [
                        value,
                        false
                    ]
                }).spread((value, pulled) => {
                    if (pulled) {
                        if (!value.access_token || !value.expires_in) {
                            console.log(`Failed to authenticate with WX server: ${value.errmsg} [${value.errcode}]`);
                            throw new HttpError.BadRequest(ErrorCode.err_wxAuthenticateFail);
                        }
                        var expiration = (value.expires_in - 200) * 1000;
                        var accessToken = {
                            access_token: value.access_token,
                            expires_at: Moment().add(value.expires_in, 's').format()
                        };
                        return Cache.put('WX_ACCESS_TOKEN', accessToken, expiration).then(() => value);
                    }
                    return value;
                }).then(value => {
                    return callback(null, {
                        responses: value
                    });
                }).catch(err => {
                    callback(err);
                });
        }
    }
};
