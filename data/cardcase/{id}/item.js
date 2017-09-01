'use strict';
var Mockgen = require('../../mockgen.js');
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
     * operationId: cardcaseitem_get
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcase/{id}/item',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Create a CardcaseItem in Cardcase with the Id
     * description: 
     * parameters: id, body
     * produces: 
     * responses: 200
     * operationId: cardcaseitem_create
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcase/{id}/item',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
