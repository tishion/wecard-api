'use strict';
var dataProvider = require('../../../data/group/{id}/member.js');
/**
 * Operations on /group/{id}/member
 */
module.exports = {
    /**
     * summary: Get all GroupMember belonging to the Group with the Id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     */
    get: function groupmemeber_get(req, res, next) {
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
