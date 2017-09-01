'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /namecard/{id}
 */
module.exports = {
    /**
     * summary: Get the Namecard with the id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: namecard_getById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/namecard/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Delete the Namecard with the id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: namecard_deleteById
     */
    delete: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/namecard/{id}',
                operation: 'delete',
                response: '200'
            }, callback);
        }
    }
};
