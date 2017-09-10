'use strict';
var HttpError = require('http-errors');
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
            }).then(cardcases => {
                if (cardcases) {
                    return callback(null, {
                        responses: cardcases
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
    }
};