'use strict';
var dataProvider = require('../../data/develop/generatemockdata.js');
/**
 * Operations on /develop/generatemockdata
 */
module.exports = {
    /**
     * summary: Generate mock data
     * description: 
     * parameters: 
     * produces: 
     * responses: 200
     */
    get: function develop_generateMockData(req, res, next) {
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
