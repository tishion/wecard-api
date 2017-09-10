'use strict';
var HttpError = require('http-errors');
var db = require('../../models');
/**
 * Operations on /cardcaseItem/{id}
 */
module.exports = {
    /**
     * summary: Delete the CardcaseItem by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_deleteById
     */
    delete: {
        200: function (req, res, callback) {
            db.CardcaseItem.findOne({
                where: {
                    userId: req.session.userId,
                    id: req.params.id,
                }
            }).then(cardcaseItem => {
                if (cardcaseItem) {
                    return cardcaseItem.destroy();
                } else {
                    throw new HttpError.NotFound();
                }
            }).then(deleted => {
                if (deleted) {
                    return callback(null, {
                        responses: deleted
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
