'use strict';

var Http = require('http');
var Express = require('express');
var Logger = require('morgan');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var SwaggerUi = require('swaggerize-ui');
var Path = require('path');
var Config = require('./config/config.js');
var ErrorHandler = require('./error/handler.js');
var db = require('./models');

// Create Express instance
var App = Express()
    .use(Logger('dev'))         // Add logger
    .use(BodyParser.json())     // Add json body parser
    .use(BodyParser.urlencoded({
        extended: true
    })).use(Swaggerize({
        api: Path.resolve('./config/swagger.yml'),
        handlers: Path.resolve('./handlers'),
        security: Path.resolve('./security'),
        docspath: '/docs'
    })).use('/viewer', SwaggerUi({
        docs: '/api/docs'
    })).use(ErrorHandler.globalErrorHadler)
    .use('/cleandb', (req, res) => {
        db.sequelize.sync({
            force: true
        }).then(() => {
            res.send('DB was cleaned successfully.');
        })
    });

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
