'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /cardcaseItem
 */
module.exports = {
    /**
     * summary: Get all CardcaseItems by Cardcase id
     * description: 
     * parameters: cardcaseId
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_getByCardcaseId
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcaseItem',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Create a CardcaseItem in by Cardcase id
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_Create
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcaseItem',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
