'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../error/code.json');
var db = require('../models');
/**
 * Operations on /accessrequest
 */
module.exports = {
    /**
     * summary: Get all AccessRequest sent to current user
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     * operationId: accessreqeust_get
     */
    get: {
        200: function (req, res, callback) {
            db.AccessRequest.findAll({
                where: {
                    $or: [{
                            fromUserId: req.session.userId
                        },
                        {
                            toUserId: req.session.userId
                        }]
                }
            }).then(accessRequests => {
                if (accessRequests) {
                    return callback(null, {
                        responses: accessRequests
                    });
                } else {
                    throw new HttpError.InternalServerError('Database error');
                }
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    },
    /**
     * summary: Create an AccessRequest
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: accessreqeust_create
     */
    post: {
        200: function (req, res, callback) {
            var accessRequest = req.body;

            return db.Namecard.findById(accessRequest.namecardId).then(namecard => {
                if (namecard) {
                    return db.AccessRequest.findOrCreate({
                        where: {
                            namecardId: accessRequest.namecardId,
                            fromUserId: accessRequest.fromUserId,
                            toUserId: namecard.userId
                        }
                    });
                } else {
                    throw new HttpError.BadRequest(ErrorCode.err_namecardNotFound);
                }
            }).spread((request, created) => {
                if (created) {
                    return callback({
                        responses: request
                    });
                } else 
                {
                    throw new HttpError.Conflict('Already exist');
                }
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
