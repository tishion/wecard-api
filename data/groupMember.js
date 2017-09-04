'use strict';
var HttpError = require('http-errors');
var db = require('../models');
var Mockgen = require('./mockgen.js');
var Mockgen = require('./mockgen.js');
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
            }).then(groupMemberList => {
                return callback(null, {
                    responses: groupMemberList
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
