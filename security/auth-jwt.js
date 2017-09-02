'use strict';
/**
 * 
 */

var Jwt = require('jwt-simple');
var Moment = require('moment');

/**
 * 
 */
var auth_jwt = module.exports;

/**
 * 
 */
auth_jwt.version = '0.0.1';

/**
 * 
 * 
 * @param {any} payload 
 * @param {any} secret 
 * @returns 
 */
auth_jwt.issueToken = function auth_jwt_issueToken(payload, secret) {
    return Jwt.encode({
        iss: 'wecard-api-service',
        sub: 'wecard-api-consumer',
        aud: "wecard.com",
        iat: Moment().format(),
        nbf: Moment().subtract(1, 's').format(),
        exp: Moment().add(1, 'd').format(),
        pub: payload,
    }, secret);
};

/**
 * 
 * 
 * @param {any} token 
 * @param {any} secret 
 * @returns 
 */
auth_jwt.verifyToken = function auth_jwt_verifyToken(token, secret) {
    try {
        return Jwt.decode(token, secret).pub;
    } catch (err) { 
        Console.log(err);
    }
    return null;
};