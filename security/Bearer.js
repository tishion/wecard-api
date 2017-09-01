'use strict';
var AuthJwt = require('./auth-jwt');
var Config = require('../config/congif');
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
    console.log('Authorization: %s', this.Authorization);
    if (typeof this.Authorization !== 'undefined' && this.Authorization) {

        var sa = authorization.split(' ');
        if (2 == sa.length && sa[0] == 'Bearer') {

            var payload = AuthJwt.verifyToken(sa[1], Config.token_secret);
            if (payload && payload.id) {
                console.log('User Id: %s', user_infor.id);
                req['session'] = { id: user_infor.id };
                return next();
            }
        }
    }

    var err = new Error('Authentication Failed');
    err.status = 401;
    next(err);
};
