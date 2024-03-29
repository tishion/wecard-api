'use strict';
var dataProvider = require('../../data/group/{id}.js');
/**
 * Operations on /group/{id}
 */
module.exports = {
    /**
     * summary: Get the Group by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200
     */
    get: function group_getById(req, res, next) {
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
