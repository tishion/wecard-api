'use strict';
var HttpError = require('http-errors');
var db = require('../models');
var Mockgen = require('./mockgen.js');
/**
 * Operations on /group
 */
module.exports = {
    /**
     * summary: Create a Group (if not exist)
     * description: 
     * parameters: wxGroupId
     * produces: 
     * responses: 200
     * operationId: group_create
     */
    post: {
        200: function (req, res, callback) {
            db.Group.findOrCreate({
                where: {
                    wxGroupId: req.query.wxGroupId,
                }
            }).spread((group, created) => {
                if (created) {
                    return db.Group.findById(group.id);
                } else {
                    return group;
                }
            }).then(group => {
                if (group) {
                    return callback(null, {
                        responses: group
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
