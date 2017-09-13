'use strict';
var HttpError = require('http-errors');
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
            db.GroupMember.findAll({
                where: {
                    groupId: req.query.groupId,
                }
            }).then(groupMembers => {
                if (groupMembers) {
                    var result = groupMembers.map((item, index, input) => {
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
    }
};
