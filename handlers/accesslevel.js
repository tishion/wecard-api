'use strict';
var dataProvider = require('../data/accesslevel.js');
/**
 * Operations on /accesslevel
 */
module.exports = {
    /**
     * summary: Create an AccessLevle
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    post: function accesslevel_create(req, res, next) {
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
     * summary: Update an Access
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    put: function accesslevel_update(req, res, next) {
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
