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
            }).then(cardcaseItemList => {
                return callback(null, {
                    responses: cardcaseItemList
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    },
    /**
     * summary: Create a CardcaseItem in by Cardcase id
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
            return db.CardcaseItem.create(cardcaseItem)
                .then(created => {
                    return callback(null, {
                        responses: created
                    })
                })
                .catch(db.sequelize.Error, err => {
                    return callback(new HttpError.InternalServerError(err));
                }).catch(err => {
                    return callback(err);
                });
        }
    }
};
