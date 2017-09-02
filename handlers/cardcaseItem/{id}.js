'use strict';
var dataProvider = require('../../data/cardcaseItem/{id}.js');
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
     */
    delete: function cardcaseItem_deleteById(req, res, next) {
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
