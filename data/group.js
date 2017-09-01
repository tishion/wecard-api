'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: group_create
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/group',
                operation: 'post',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Update a Group
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: group_update
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/group',
                operation: 'put',
                response: '200'
            }, callback);
        }
    }
};
