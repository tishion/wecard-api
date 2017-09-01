'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /cardcase/{id}
 */
module.exports = {
    /**
     * summary: Get the Cardcase with the id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: cardcase_getById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcase/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};
