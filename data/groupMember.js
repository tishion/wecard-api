'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /groupMember
 */
module.exports = {
    /**
     * summary: Get all GroupMembers by Group id
     * description: 
     * parameters: groupId
     * produces: 
     * responses: 200
     * operationId: groupMemeber_getbyGroupId
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/groupMember',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};
