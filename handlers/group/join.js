'use strict';
var dataProvider = require('../../data/group/join.js');
/**
 * Operations on /group/join
 */
module.exports = {
    /**
     * summary: Notify the server that the user has shared data to the group
     * description: 
     * parameters: wxGroupId, namecardId
     * produces: 
     * responses: 200
     */
    post: function group_create(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
