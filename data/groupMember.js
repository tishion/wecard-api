'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../error/code.json');
var db = require('../models');
/**
 * Operations on /groupMember
 */
module.exports = {
    /**
     * summary: Get all GroupMembers by Group id
     * description: 
     * parameters: groupId
     * produces: 
     * responses: 200
     * operationId: groupMemeber_getbyGroupId
     */
    get: {
        200: function (req, res, callback) {
            return db.GroupMember.findOne({
                where: {
                    groupId: req.query.groupId,
                    userId: req.session.userId
                }
            }).then(self => {
                // If the current user doesn't exist in the group then reject the request
                if (!self) {
                    throw new HttpError.Forbidden(err_alienUserForbidden);
                }
                return db.GroupMember.findAll({
                    where: {
                        groupId: req.query.groupId,
                    }
                });
            }).then(groupMembers => {
                if (!groupMembers) {
                    throw new HttpError.InternalServerError(ErrorCode.err_databaseError);
                }
                var result = groupMembers.map((item, index, input) => {
                    return item.prune;
                });
                return callback(null, {
                    responses: result
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    },
    /**
     * summary: Update self group member info
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: groupMemeber_getbyGroupId
     */
    put: {
        200: function (req, res, callback) {
            return db.GroupMember.findById(req.body.id)
            .then(groupMember => {
                if (!groupMember) {
                    throw new HttpError.NotFound();
                }
                if (req.body.hidden) {
                    return groupMember.update({
                        hidden: req.body.hidden
                    });
                }
                return groupMember;
            }).then(groupMember => {
                if (req.body.cardId && req.body.cardId != groupMember.cardId) {
                    return db.namecard.findById(req.body.cardId)
                    .then(namecard => {
                        if (!namecard) {
                            throw new HttpError.BadRequet(ErrorCode.err_namecardNotFound);                    
                        }
                        return groupMember.update({
                            cardId: namecard.id
                        });
                    });
                }
                return groupMember;
            }).then(groupMember => {
                return callback(null, {
                    responses: groupMember
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
