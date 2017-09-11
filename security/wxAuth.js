'use strict'
var HttpRequest = require('request');

var wxAuth = module.exports;

wxAuth.version = '0.0.1';

wxAuth.getWxTicket = function _getWxTicket(code, appid, secret, callback) {
    var url = `https://api.weixin.qq.com/sns/jscode2session?js_code=${code}&appid=${appid}&secret=${secret}&grant_type=authorization_code`;
    return HttpRequest(url, callback);
}