'use strict'
var Url = require('url');
var Moment = require('moment');
var HttpError = require('http-errors');
var HttpRequest = require('request-promise');
var Config = require('../config/config.js');
var WxApi = require('./wxApis.js');
var Cache = require('../x-cache');

var wxAccessToken = module.exports;

wxAccessToken.getToken = function (callback) {
    return Cache.get('WX_ACCESS_TOKEN')
        .then(value => {
            if (!value) {
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
        }).spread((value, updated) => {
            if (updated) {
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
        });
}