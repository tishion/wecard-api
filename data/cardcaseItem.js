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
    }
};
