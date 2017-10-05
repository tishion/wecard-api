'use strict';
var dataProvider = require('../../data/security/wxacodeimage.js');
/**
 * Operations on /security/wxacodeimage
 */
module.exports = {
    /**
     * summary: Get WX application QR code image
     * description: 
     * parameters: scene, page, width
     * produces: image/jpeg, application/json, text/json, image/jpeg, application/json, text/json
     * responses: 200
     */
    get: function security_getWxQRCodeImage(req, res, next) {
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
