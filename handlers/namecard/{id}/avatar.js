'use strict';
var dataProvider = require('../../../data/namecard/{id}/avatar.js');
/**
 * Operations on /namecard/{id}/avatar
 */
module.exports = {
    /**
     * summary: Create/Update the Namecard avatar
     * description: 
     * parameters: id, file
     * produces: 
     * responses: 200
     */
    post: function namecard_setAvatar(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
