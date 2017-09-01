'use strict';
var dataProvider = require('../../data/accesslevel/{card_id}.js');
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
     */
    get: function access_getByCardId(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
