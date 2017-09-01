'use strict';

var Config = require('./config/congif')
var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var ExpressJwt = require("express-jwt");
var JsonWebToken = require("jsonwebtoken");
var Swaggerize = require('swaggerize-express');
var SwaggerUi = require('swaggerize-ui');
var Path = require('path');

// Get the host and port
var host = process.env.WECARD_SEVER_HOST_NAME || Config.host
var port = process.env.PORT || Config.port;

// Create Express instance
var App = Express();

// Create Server instance
var Server = Http.createServer(App);

// Add body parser middleware
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

// Add swagger UI middleware
App.use('/viewer', SwaggerUi({ docs: '/api/docs' }));

// Add swaggerize middleware
App.use(Swaggerize({
    api: Path.resolve('./config/swagger.yml'),
    handlers: Path.resolve('./handlers'),
    security: Path.resolve('./security'),
    docspath: '/docs'
}));

// Start the server
Server.listen(port, function () {
    App.swagger.api.host = host;
    if (this.address().port != undefined) {
        App.swagger.api.host += (':' + this.address().port);
    }
    /* eslint-disable no-console */
    console.log('App running on %s', App.swagger.api.host);
    /* eslint-disable no-console */
});
