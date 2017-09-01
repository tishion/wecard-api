'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /group/{id}/member
 */
module.exports = {
    /**
     * summary: Get all GroupMember belonging to the Group with the Id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: groupmemeber_get
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/group/{id}/member',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};
