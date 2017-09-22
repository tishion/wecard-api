'use strict';
var HttpError = require('http-errors');
var ErrorCode = require('../../error/code.json');
var WxApi = require('../../wx-api/wxApis.js');
var WxAccessToken = require('../../wx-api/accessToken.js');
/**
 * Operations on /security/wxacodeimage
 */
module.exports = {
    /**
     * summary: Get WX application QR code image
     * description: 
     * parameters: scene, page, width
     * produces: application/jpeg
     * responses: 200
     * operationId: security_getWxQRCodeImage
     */
    get: {
        200: function (req, res, callback) {
            WxAccessToken.getToken()
                .then(token => {
                    if (token) {
                        return WxApi.getWxQRCodeImage(token, {
                            scene: req.query.scene,
                            page: req.query.page,
                            width: req.width
                        }).pipe(res);
                    } else {
                        throw new HttpError.InternalServerError(ErrorCode.err_accessTokenUnavailable);
                    }
                }).catch(err => {
                    return callback(err);
                });
        }
    }
};
