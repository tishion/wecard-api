'use strict';

var Http = require('http');
var Express = require('express');
var Logger = require('morgan');
var Multer = require('multer')
var BodyParser = require('body-parser');
var Swaggerize = require('./rebind_modules/swaggerize-express');
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
    // Add logger
    .use(Logger('dev'))
    // Add JSON parser
    .use(BodyParser.json())
    // Add encoded URL parser
    .use(BodyParser.urlencoded({
        extended: false
    }))
    // Add multipart/form parser
    .use(Multer({
        storage: Multer.memoryStorage(),
        limits: 3 * 1024 * 1024
    }).single('avatar'))
    // Add Swaggerize
    .use(Swaggerize({
        api: Path.resolve('./config/swagger.yml'),
        handlers: Path.resolve('./handlers'),
        security: Path.resolve('./security'),
        docspath: 'docs'
    }))
    // Add Swagger UI
    .use('/viewer', SwaggerizeUi({
        docs: '/api/docs'
    }))
    // Set global erro hanlder
    .use(ErrorHandler.globalErrorHadler);

// Sync the database
db.sequelize.sync().then(() => {
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
}).catch(err => {
    console.log("Failed to sync the database!");
});
