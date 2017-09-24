'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /namecard/{id}/avatar
 */
module.exports = {
    /**
     * summary: Create/Update the Namecard avatar
     * description: 
     * parameters: id, file
     * produces: 
     * responses: 200
     * operationId: namecard_setAvatar
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/namecard/{id}/avatar',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
