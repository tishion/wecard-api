'use strict'

var ErrorHandlers = module.exports;

ErrorHandlers.globalErrorHadler = function _globalErrorHadler(err, req, res, next) {
    console.error(err);
    return next(err);
}