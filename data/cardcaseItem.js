'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../error/code.json');
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
                    var result = cardcaseItems.map((item, index, input) => {
                        return item.prune;
                    });
                    return callback(null, {
                        responses: result
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
                var itemStorage = db.Namecard;
            } else if ('GROUP' == cardcaseItem.itemType) {
                var itemStorage = db.Group;
            }
            else {
                return callback(new HttpError.BadRequest(ErrorCode.err_invalidItemType));
            }

            itemStorage.findById(cardcaseItem.itemId)
                .then(itemEntity => {
                    if (itemEntity) {
                        return db.Cardcase.findOne({
                            where: {
                                id: cardcaseItem.cardcaseId,
                                userId: req.session.userId,
                            }
                        });
                    } else {
                        // The target item doesn't exist
                        throw new HttpError.BadRequest(ErrorCode.err_itemObjectNotFound);
                    }
                }).then(cardcase => {
                    if (cardcase) {
                        return db.CardcaseItem.findOrCreate({
                            where: {
                                userId: cardcaseItem.userId,
                                cardcaseId: cardcaseItem.cardcaseId,
                                itemType: cardcaseItem.itemType,
                                itemId: cardcaseItem.itemId
                            },
                            defaults: {
                                name: cardcaseItem.name,
                                thumbnail: cardcaseItem.thumbnail
                            }
                        });
                    } else {
                        // The card case not found
                        throw new HttpError.BadRequest(ErrorCode.err_cardcaseNotFound);
                    }
                }).spread((item, created) => {
                    if (item) {
                        return callback(null, {
                            responses: item.prune
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
                        responses: updated.prune
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
