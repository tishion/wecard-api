'use strict';

var Http = require('http');
var Express = require('express');
var Logger = require('morgan');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var SwaggerUi = require('swaggerize-ui');
var Path = require('path');
var Config = require('./config/config.js');
var db = require('./models');

db.sequelize.sync();

// Create Express instance
var App = Express()
    .use(Logger('dev'))         // Add logger
    .use(BodyParser.json())     // Add json body parser
    .use(BodyParser.urlencoded({
        extended: true
    }))                         // Add URL encode parser
    .use(Swaggerize({
        api: Path.resolve('./config/swagger.yml'),
        handlers: Path.resolve('./handlers'),
        security: Path.resolve('./security'),
        docspath: '/docs'
    }))                         // Add swagger API
    .use('/viewer', SwaggerUi({
        docs: '/api/docs'
    }));                        // Add swagger ui

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
