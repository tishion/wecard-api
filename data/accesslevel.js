'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: accesslevel_create
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/accesslevel',
                operation: 'post',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Update an Access
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: accesslevel_update
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/accesslevel',
                operation: 'put',
                response: '200'
            }, callback);
        }
    }
};
