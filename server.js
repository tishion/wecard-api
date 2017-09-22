'use strict';

var Http = require('http');
var Express = require('express');
var Logger = require('morgan');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var SwaggerizeUi = require('swaggerize-ui');
var Path = require('path');
var FileSystem = require('fs');
var Cache = require('./x-cache')
var Config = require('./config/config.js');
var ErrorHandler = require('./error/handler.js');
var WxApi = require('./wx-api/wxApis.js');
var db = require('./models');

// Initialize the memory cache
Cache.syncInit();

// Create Express instance
var App = Express()
    .use(Logger('dev'))
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({
        extended: true
    }))
    .use(Swaggerize({
        api: Path.resolve('./config/swagger.yml'),
        handlers: Path.resolve('./handlers'),
        security: Path.resolve('./security'),
        docspath: 'docs'
    }))
    .use('/viewer', SwaggerizeUi({
        docs: '/api/docs'
    }))
    .use(ErrorHandler.globalErrorHadler);

// Start the server
Http.createServer(App)
    .listen(Config.port, function () {
        App.swagger.api.host = Config.host;
        if (this.address().port != undefined) {
            App.swagger.api.host += (':' + this.address().port);
        }
        /* eslint-disable no-console */
        console.log('App running on %s', App.swagger.api.host);
        /* eslint-disable no-console */
    });
