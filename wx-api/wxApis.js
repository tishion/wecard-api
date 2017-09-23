'use strict'
var Url = require('url');
var RequestPromise = require('request-promise');
var Request = require('request');

var wxApi = module.exports;

wxApi.version = '0.0.1';

wxApi.WXAUrl = 'https://api.weixin.qq.com/wxa/';
wxApi.SnsUrl = 'https://api.weixin.qq.com/sns/';
wxApi.CgiUrl = 'https://api.weixin.qq.com/cgi-bin/';

wxApi.getWxTicket = function _getWxTicket(code, appid, secret) {
    // `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&js_code=${code}&appid=${appid}&secret=${secret}`;
    return RequestPromise({
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
        lock.request_promise = Promise.resolve(RequestPromise({
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

wxApi.getWxQRCodeImage = function _getWxQRCodeImage(accessToken, options) {
    // `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token={accessToken}`;
    return RequestPromise({
        method: 'POST',
        uri: Url.resolve(wxApi.WXAUrl, 'getwxacodeunlimit'),
        qs: {
            access_token: accessToken.access_token,
        },
        encoding: null,
        body: options,
        json: true,
        resolveWithFullResponse: true
    });
}