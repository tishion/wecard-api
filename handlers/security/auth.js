'use strict';
var dataProvider = require('../../data/security/auth.js');
/**
 * Operations on /security/auth
 */
module.exports = {
    /**
     * summary: Authenticate with WX login code
     * description: 
     * parameters: WX-LOGIN-CODE
     * produces: 
     * responses: 200
     */
    get: function security_auth(req, res, next) {
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
