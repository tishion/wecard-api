'use strict';
var HttpError = require('http-errors');
var Validator = require('./validator/validator.js');
var db = require('../models');
var Mockgen = require('./mockgen.js');
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
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/accessrequest',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
