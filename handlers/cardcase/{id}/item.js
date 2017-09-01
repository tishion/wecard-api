'use strict';
var dataProvider = require('../../../data/cardcase/{id}/item.js');
/**
 * Operations on /cardcase/{id}/item
 */
module.exports = {
    /**
     * summary: Get all CardcaseItem belonging to the Cardcase with the id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     */
    get: function cardcaseitem_get(req, res, next) {
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
     * summary: Create a CardcaseItem in Cardcase with the Id
     * description: 
     * parameters: id, body
     * produces: 
     * responses: 200
     */
    post: function cardcaseitem_create(req, res, next) {
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
