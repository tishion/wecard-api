'use strict';

var Http        = require('http');
var Express     = require('express');
var BodyParser  = require('body-parser');
var Swaggerize  = require('swaggerize-express');
var SwaggerUi   = require('swaggerize-ui');
var Path        = require('path');
var Config      = require('./config/config.js');
var db          = require('./models');

db.sequelize.sync();

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
Server.listen(Config.port, function () {
    App.swagger.api.host = Config.host;
    if (this.address().port != undefined) {
        App.swagger.api.host += (':' + this.address().port);
    }
    /* eslint-disable no-console */
    console.log('App running on %s', App.swagger.api.host);
    /* eslint-disable no-console */
});
