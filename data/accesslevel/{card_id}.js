'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /accesslevel/{card_id}
 */
module.exports = {
    /**
     * summary: Get Access of the specified id
     * description: 
     * parameters: card_id
     * produces: 
     * responses: 200
     * operationId: access_getByCardId
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/accesslevel/{card_id}',
                operation: 'get',
                response: '200'
            }, callback);
        }
    }
};
