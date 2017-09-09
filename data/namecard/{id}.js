'use strict';
var HttpError = require('http-errors');
var Validator = require('../validator/validator.js');
var db = require('../../models');
var Mockgen = require('../mockgen.js');
/**
 * Operations on /namecard/{id}
 */
module.exports = {
    /**
     * summary: Get the Namecard by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: namecard_getById
     */
    get: {
        200: function (req, res, callback) {
            db.Namecard.findOne({
                where: {
                    id: req.params.id,
                }
            }).then(namecard => {
                if (namecard) {
                    return callback(null, {
                        responses: namecard.abridge
                    });
                } else {
                    throw new HttpError.NotFound();
                }
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    },
    /**
     * summary: Delete the Namecard by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: namecard_deleteById
     */
    delete: {
        200: function (req, res, callback) {
            db.Namecard.findOne({
                where: {
                    userId: req.session.userId,
                    id: req.params.id,
                }
            }).then(namecard => {
                if (namecard) {
                    return namecard.destroy();
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
