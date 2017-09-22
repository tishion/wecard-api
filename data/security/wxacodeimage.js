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
                        return WxApi.getWxQRCodeImage(token, req.query.scene, req.query.page, req.width);
                    } else {
                        return new HttpError.InternalServerError(ErrorCode.err_accessTokenUnavailable);
                    }
                }).then(response => {
                    if (response.statusCode === 200) {
                        if (response.headers['content-type'] === 'image/jpeg') {
                            return callback(null, {
                                responses: response.body
                            });
                        } else {
                            throw new HttpError.BadRequest(response.body);
                        }
                    } else {
                        throw new HttpError(response.statusCode, response.body);
                    }
                }).catch(err => {
                    return callback(err);
                });
        }
    }
};