'use strict';
var dataProvider = require('../data/auth.js');
/**
 * Operations on /auth
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: WX-LOGIN-CODE
     * produces: 
     * responses: 200
     */
    get: function (req, res, next) {
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
