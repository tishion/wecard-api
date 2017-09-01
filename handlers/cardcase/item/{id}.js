'use strict';
var dataProvider = require('../../../data/cardcase/item/{id}.js');
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
     */
    delete: function cardcase_item_deleteById(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['delete']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
