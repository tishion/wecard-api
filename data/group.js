'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /group
 */
module.exports = {
    /**
     * summary: Create a Group (if not exist)
     * description: 
     * parameters: groupId
     * produces: 
     * responses: 200
     * operationId: group_create
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
