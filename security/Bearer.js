'use strict';
var HttpError   = require('http-errors');
var Config      = require('../config/config.js');
var AuthJwt     = require('./jwtAuth.js');
/**
 * Authorize function for securityDefinitions:Bearer
 * type : apiKey
 * description: 
 */
module.exports = function authorize(req, res, next) {
    //The context('this') for authorize will be bound to the 'securityDefinition'
    //this.name - The name of the header to query parameter to be used for securityDefinitions:Bearer apiKey security scheme.
    //this.in - The location of the API key ("query" or "header") for securityDefinitions:Bearer apiKey security scheme.
    // var authorization = this.in.get(this.name);
    var authorization = req.get('Authorization');
    console.log('Authorization: %s', authorization);
    if (typeof authorization !== 'undefined' && authorization) {
        var sa = authorization.split(' ');
        if (2 == sa.length && sa[0] == 'Bearer') {

            var user = AuthJwt.verifyToken(sa[1], Config.tokenSecret);
            if (user && user.id) {
                console.log('User Id: %s', user.id);
                req.session = { userId: user.id };
                return next();
            }
        }
    }

    next(new HttpError.Unauthorized());
};
