'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /namecard
 */
module.exports = {
    /**
     * summary: Get all Namecards of current user
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     * operationId: namecard_get
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/namecard',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Create a Namecard
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: namecard_create
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/namecard',
                operation: 'post',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Update the Namecard
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     * operationId: namecard_update
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/namecard',
                operation: 'put',
                response: '200'
            }, callback);
        }
    }
};
