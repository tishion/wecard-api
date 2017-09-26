'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../error/code.json');
var db = require('../models');
/**
 * Operations on /group
 */
module.exports = {
    /**
     * summary: Get group by WX open group id
     * description: 
     * parameters: wxGroupId
     * produces: 
     * responses: 200
     * operationId: group_getByWXOpenGid
     */
    get: {
        200: function (req, res, callback) {
            return db.Group.findOrCreate({
                where: {
                    wxGroupId: req.query.wxGroupId,
                }
            }).spread((group, created) => {
                if (!group) {
                    throw new HttpError.InternalServerError(ErrorCode.err_databaseError);
                }
                return callback(null, {
                    responses: group.prune
                });
            }).catch(db.sequelize.Error, err => {
                return callback(new HttpError.InternalServerError(err));
            }).catch(err => {
                return callback(err);
            });
        }
    }
};
