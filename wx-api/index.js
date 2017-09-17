'use strict'
var HttpRequest = require('request-promise');

var wxApi = module.exports;

wxApi.version = '0.0.1';

wxApi.getWxTicket = function _getWxTicket(code, appid, secret) {
    // `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&js_code=${code}&appid=${appid}&secret=${secret}`;
    return HttpRequest({
        uri: 'https://api.weixin.qq.com/sns/jscode2session',
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
            uri: 'https://api.weixin.qq.com/cgi-bin/token',
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