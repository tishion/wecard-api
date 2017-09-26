'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../../error/code.json');
var db = require('../../models');
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
            return db.Namecard.findById(req.params.id).then(namecard => {
                if (!namecard) {
                    throw new HttpError.NotFound();
                }
                // If current user is not the owner of the card and the card is nonpublic
                if (req.session.userId != namecard.userId && namecard.nonpublic) {
                    // If the we can find one accepted access reqeust for current user and the card owner
                    return Promise.all([
                        namecard,
                        true,
                        db.AccessRequest.findOne({
                            where: {
                                namecardId: namecard.id,
                                fromUserId: req.session.userId
                            }
                        })
                    ]);
                } else {
                    return Promise.all([
                        namecard,       // namecard
                        false,          // no need to check access request
                        null
                    ]);
                }
            }).spread((namecard, needCheck, accessRequest) => {
                if (needCheck && !accessRequest) {
                    delete namecard.dataValues.phone;
                }

                return callback(null, {
                    responses: namecard.prune
                });
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
            return db.Namecard.findOne({
                where: {
                    userId: req.session.userId,
                    id: req.params.id,
                }
            }).then(namecard => {
                if (!namecard) {
                    throw new HttpError.NotFound();
                }
                return namecard.destroy();
            }).then(deleted => {
                if (!deleted) {
                    throw new HttpError.InternalServerError(ErrorCode.err_databaseError);
                }
                return callback(null, {
                    responses: deleted.prune
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
