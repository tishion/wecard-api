'use strict'
var Url = require('url');
var HttpRequest = require('request-promise');
var Config = require('../config/config.js');
var Cache = require('../x-cache');
var Moment = require('moment');

var wxApi = module.exports;

wxApi.version = '0.0.1';

wxApi.WXAUrl = 'https://api.weixin.qq.com/wxa/';
wxApi.SnsUrl = 'https://api.weixin.qq.com/sns/';
wxApi.CgiUrl = 'https://api.weixin.qq.com/cgi-bin/';

wxApi.getWxTicket = function _getWxTicket(code, appid, secret) {
    // `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&js_code=${code}&appid=${appid}&secret=${secret}`;
    return HttpRequest({
        uri: Url.resolve(wxApi.SnsUrl, 'jscode2session'),
        qs: {
            grant_type: 'authorization_code',
            js_code: code,
            appid: appid,
            secret: secret
        },
        json: true
    });
}

var lock = {
    promise_pending: false,
    request_promise: null
};

wxApi.getWxAccessToken = function _getWxAccessToken(appid, secret) {
    // `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    if (!lock.promise_pending) {
        lock.promise_pending = true;
        lock.request_promise = Promise.resolve(HttpRequest({
            uri: Url.resolve(wxApi.CgiUrl, 'token'),
            qs: {
                grant_type: 'client_credential',
                appid: appid,
                secret: secret
            },
            json: true
        })).then(value => {
            lock.promise_pending = false;
            return value;
        });
    }
    return lock.request_promise;
}

wxApi.redirect = function _redirect(req, res) {
    Cache.get('WX_ACCESS_TOKEN')
    .then(value => {
        if (!value || 'undefined' === typeof value) {
            return Promise.all([
                // Communicate with WX server to get the WX access token
                wxApi.getWxAccessToken(Config.appId, Config.appSecret),
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
        var target = Url.resolve(wxApi.WXAUrl, req.originalUrl);
        if (Object.keys(req.query).length === 0) {
            target += '?'
        } else {
            target += '&'
        }
        target += `access_token=${value.access_token}`;
        res.redirect(307, target);
    }).catch(err => {
        res.status(500).send(err);
    });
}