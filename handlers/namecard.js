'use strict';
var dataProvider = require('../data/namecard.js');
/**
 * Operations on /namecard
 */
module.exports = {
    /**
     * summary: Get all Namecards by User id
     * description: 
     * parameters: userId
     * produces: 
     * responses: 200
     */
    get: function namecard_getByUserId(req, res, next) {
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
     * summary: Create a Namecard
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    post: function namecard_create(req, res, next) {
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
     * summary: Update the Namecard
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    put: function namecard_update(req, res, next) {
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
