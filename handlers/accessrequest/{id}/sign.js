'use strict';
var dataProvider = require('../../../data/accessrequest/{id}/sign.js');
/**
 * Operations on /accessrequest/{id}/sign
 */
module.exports = {
    /**
     * summary: Accept or refuse the AccessRequest by id
     * description: 
     * parameters: id, operation
     * produces: 
     * responses: 200
     */
    put: function accessRequest_signeById(req, res, next) {
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
