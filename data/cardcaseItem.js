'use strict';
var HttpError = require('http-errors');
var Validator = require('./validator/validator.js');
var db = require('../models');
/**
 * Operations on /cardcaseItem
 */
module.exports = {
    /**
     * summary: Get all CardcaseItems by Cardcase id
     * description: 
     * parameters: cardcaseId
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_getByCardcaseId
     */
    get: {
        200: function (req, res, callback) {
            db.CardcaseItem.findAll({
                where: {
                    cardcaseId: req.query.cardcaseId,
                    userId: req.session.userId
                }
            }).then(cardcaseItems => {
                if (cardcaseItems) {
                    return callback(null, {
                        responses: cardcaseItems
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
     * summary: Update a CardcaseItem in Cardcase
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_update
     */
    put: {
        200: function (req, res, callback) {
            var cardcaseItem = req.body;
            return db.CardcaseItem.findOne({
                where: {
                    id: cardcaseItem.id,
                    userId: req.session.userId,
                }
            }).then(original => {
                if (original) {
                    // Update attributes
                    for (var attr in cardcaseItem) {
                        if (original.rawAttributes.hasOwnProperty(attr)) {
                            original[attr] = cardcaseItem[attr];
                        }
                    }
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
    },
    /**
     * summary: Create a CardcaseItem in Cardcase
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_Create
     */
    post: {
        200: function (req, res, callback) {
            var cardcaseItem = req.body;
            delete cardcaseItem.id;
            cardcaseItem.userId = req.session.userId

            if ('CARD' == cardcaseItem.itemType) {
                var targetItem = db.Namecard;
            } else if ('GROUP' == cardcaseItem.itemType) {
                var targetItem = db.Group;
            }
            else {
                return callback(new HttpError.BadRequest('Invalid itemType'));
            }

            targetItem.findById(cardcaseItem.itemId)
                .then(itemObj => {
                    if (itemObj) {
                        // The target item exists
                        return db.CardcaseItem.create(cardcaseItem);
                    } else {
                        // The target item doesn't exist
                        throw new HttpError.BadRequest('Item object not exist');
                    }
                }).then(created => {
                    if (created) {
                        return callback(null, {
                            responses: created
                        })
                    } else {
                        throw new HttpError.InternalServerError('Database erro');
                    }
                }).catch(db.sequelize.Error, err => {
                    return callback(new HttpError.InternalServerError(err));
                }).catch(err => {
                    return callback(err);
                });
        }
    },
};
