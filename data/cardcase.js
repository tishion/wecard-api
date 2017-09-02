'use strict';
var HttpError   = require('http-errors');
var db          = require('../models');

/**
 * Operations on /cardcase
 */
module.exports = {
    /**
     * summary: Get Cardcase by User id
     * description: 
     * parameters: userId
     * produces: 
     * responses: 200
     * operationId: cardcase_get
     */
    get: {
        200: function (req, res, callback) {
            if (req.query.userId != req.session.userId) {
                return callback(new HttpError.Unauthorized());
            }
            
            db.Cardcase.findAll({
                where: {
                    userId: req.session.userId
                }
            })
            .then(result => {
                callback(null, { responses: result });
            })
            .catch(err => {
                console.log(err);
                callback(err);
            });
        }
    }
};
