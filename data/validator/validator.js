'use strict'
var Validator = module.exports;

Validator.validate = function _validate(req, predict, onSuccess, onError) {
    if (predict) {
        return onSuccess();        
    } else {
        return onError();
    }
};

Validator.sessionUserIdEqualsQueryUserId = function _sessionUserIdEqualsQueryUserId(req, onSuccess, onError) {
    if (req.session.userId == req.query.userId) {
        return onSuccess();
    } else {
        return onError();
    }
};

Validator.sessionUserIdEqualsBodyUserId = function _sessionUserIdEqualsBodyUserId(req, onSuccess, onError) {
    if (req.session.userId == req.body.userId) {
        return onSuccess();
    } else {
        return onError();
    }
};