'use strict';
var HttpError = require('http-errors');
var Validator = require('./validator/validator.js');
var db = require('../models');
var Mockgen = require('./mockgen.js');
/**
 * Operations on /namecard
 */
module.exports = {
    /**
     * summary: Get all Namecards by current User
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     * operationId: namecard_getByCurrentUserId
     */
    get: {
        200: function (req, res, callback) {
            db.Namecard.findAll({
                where: {
                    userId: req.session.userId,
                }
            }).then(namecards => {
                if (namecards) {
                    return callback(null, {
                        responses: namecards
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
     * summary: Create a Namecard
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: namecard_create
     */
    post: {
        200: function (req, res, callback) {
            var namecard = req.body;
            delete namecard.id;
            namecard.userId = req.session.userId
            return db.Namecard.create(namecard)
                .then(created => {
                    if (created) {
                        return callback(null, {
                            responses: created
                        })
                    } else {
                        throw new HttpError.InternalServerError('Database error');                        
                    }
                })
                .catch(db.sequelize.Error, err => {
                    return callback(new HttpError.InternalServerError(err));
                }).catch(err => {
                    return callback(err);
                });
        }
    },
    /**
     * summary: Update the Namecard
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: namecard_update
     */
    put: {
        200: function (req, res, callback) {
            var namecard = req.body;
            return db.Namecard.findOne({
                where: {
                    id: namecard.id,
                    userId: req.session.userId,
                }
            }).then(original => {
                if (original) {
                    // Update attributes
                    for (var attr in namecard) {
                        if (original.rawAttributes.hasOwnProperty(attr)) {
                            original[attr] = namecard[attr];
                        }
                    }
                    original.userId = req.session.userId;
                    return original.save();
                }
                else {
                    throw new HttpError.NotFound();
                }
            }).then(updated => {
                if (updated) {
                    callback(null, {
                        responses: updated
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