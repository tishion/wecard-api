'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /accessrequest/{id}/sign
 */
module.exports = {
    /**
     * summary: Accept or refuse the AccessRequest by id
     * description: 
     * parameters: id, operation
     * produces: 
     * responses: 200
     * operationId: accessRequest_signeById
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/accessrequest/{id}/sign',
                operation: 'put',
                response: '200'
            }, callback);
        }
    }
};
