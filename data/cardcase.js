'use strict';
var HttpError = require('http-errors');
var Validator = require('./validator/validator.js');
var db = require('../models');

/**
 * Operations on /cardcase
 */
module.exports = {
    /**
     * summary: Get Cardcase by current User
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     * operationId: cardcase_getByCurrentUserId
     */
    get: {
        200: function (req, res, callback) {
            db.Cardcase.findAll({
                where: {
                    userId: req.session.userId
                }
            }).then(cardcase => {
                return callback(null, {
                    responses: cardcase
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};