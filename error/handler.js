'use strict'

var ErrorHandlers = module.exports;

ErrorHandlers.globalErrorHadler = function _globalErrorHadler(err, req, res, next) {
    res.status(err.status).send(err.message);
    if (process.env.NODE_ENV !== 'production') {
        return next(err);
    }
}