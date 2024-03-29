'use strict';
var dataProvider = require('../data/accessrequest.js');
/**
 * Operations on /accessrequest
 */
module.exports = {
    /**
     * summary: Get all AccessRequest sent to current user
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     */
    get: function accessreqeust_get(req, res, next) {
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
    },
    /**
     * summary: Create an AccessRequest
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    post: function accessreqeust_create(req, res, next) {
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
