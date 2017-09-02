'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /cardcaseItem/{id}
 */
module.exports = {
    /**
     * summary: Delete the CardcaseItem by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     * operationId: cardcaseItem_deleteById
     */
    delete: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/cardcaseItem/{id}',
                operation: 'delete',
                response: '200'
            }, callback);
        }
    }
};
