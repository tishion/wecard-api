'use strict';
var HttpError = require('http-errors');
var Validator = require('./validator/validator.js');
var ErrorCode = require('../error/code.json');
var db = require('../models');
var Mockgen = require('./mockgen.js');
/**
 * Operations on /accessrequest/{id}/sign
 */
module.exports = {
    /**
     * summary: Accept or refuse the AccessRequest by id
     * description: 
     * parameters: id, operation
     * produces: 
     * responses: 200
     * operationId: accessRequest_signeById
     */
    put: {
        200: function (req, res, callback) {
            var operation = req.query.operation.toLowerCase();
            if ('accept' === operation) {
                operation = 'ACCEPTED';
            } else if ('reject' !== operation) {
                operation = 'REJECTED';                
            } else {
                return callback(new HttpError.BadRequest(ErrorCode.err_invalideOperation));                
            }

            return db.AccessRequest.findOne({
                where: {
                    toUserId: req.session.userId,
                    id: req.params.id
                }
            }).then(accessRequest => {
                if (accessRequest) {
                    if ('PENDING' === accessRequest.status) {
                        accessRequest.update({
                            status: operation
                        });
                    } else {
                        throw new HttpError.BadRequest(ErrorCode.err_requestSignedAlready);
                    }
                } else {
                    throw new HttpError.NotFound();
                }
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
