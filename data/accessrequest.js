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
                if (!accessRequests) {
                    throw new HttpError.InternalServerError(ErrorCode.err_databaseError);
                }
                var result = accessRequests.map((item, index, input) => {
                    return item.prune;
                });
                return callback(null, {
                    responses: result
                });
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
                if (!namecard) {
                    throw new HttpError.BadRequest(ErrorCode.err_namecardNotFound);
                }
                if (req.session.userId == namecard.userId) {
                    throw new HttpError.BadRequest(ErrorCode.err_selfRequestNotAllowed);
                }
                return db.AccessRequest.findOrCreate({
                    where: {
                        namecardId: accessRequest.namecardId,
                        fromUserId: req.session.userId,
                        toUserId: namecard.userId
                    }
                });
            }).spread((request, created) => {
                if (!created) {
                    throw new HttpError.Conflict('Already exist');
                }
                return callback(null, {
                    responses: request.prune
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
