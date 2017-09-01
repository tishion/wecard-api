'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /group/{id}
 */
module.exports = {
    /**
     * summary: Get all Groups of current user
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: group_getById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/group/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};
