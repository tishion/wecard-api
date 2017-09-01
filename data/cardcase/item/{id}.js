'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /cardcase/item/{id}
 */
module.exports = {
    /**
     * summary: Delete the CardcaseItem with id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: cardcase_item_deleteById
     */
    delete: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcase/item/{id}',
                operation: 'delete',
                response: '200'
            }, callback);
        }
    }
};
