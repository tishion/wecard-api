'use strict';
var dataProvider = require('../data/group.js');
/**
 * Operations on /group
 */
module.exports = {
    /**
     * summary: Get group by WX open group id
     * description: 
     * parameters: wxGroupId
     * produces: 
     * responses: 200
     */
    get: function group_getByWXOpenGid(req, res, next) {
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
    },
    /**
     * summary: Update group
     * description: 
     * parameters: body
     * produces: 
     * responses: 200
     */
    put: function group_update(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['put']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
