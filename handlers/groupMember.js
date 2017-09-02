'use strict';
var dataProvider = require('../data/groupMember.js');
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
     */
    get: function groupMemeber_getbyGroupId(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
