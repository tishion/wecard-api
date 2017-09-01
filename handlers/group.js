'use strict';
var dataProvider = require('../data/group.js');
/**
 * Operations on /group
 */
module.exports = {
    /**
     * summary: Create a Group
     * description: 
     * parameters: body
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
    },
    /**
     * summary: Update a Group
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    put: function group_update(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['put']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
