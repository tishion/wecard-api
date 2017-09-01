'use strict';

var Config = require('./config/congif')
var host = process.env.WECARD_SEVER_HOST_NAME || Config.host
var port = process.env.PORT || Config.port;

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var ExpressJwt = require("express-jwt");
var JsonWebToken = require("jsonwebtoken");
var Swaggerize = require('swaggerize-express');
var SwaggerUi = require('swaggerize-ui');
var Path = require('path');

var App = Express();

var Server = Http.createServer(App);

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));
// App.use(ExpressJwt({
//     secret: "secret"
// }).unless({
//     path: ["/token"]
// }));

App.use(Swaggerize({
    api: Path.resolve('./config/swagger.yml'),
    handlers: Path.resolve('./handlers'),
    security: Path.resolve('./security'),
    docspath: '/docs'
}));

// http://host/viewer
App.use('/viewer', SwaggerUi({
    docs: '/api/docs'
}));

Server.listen(port, function () {
    App.swagger.api.host = host;
    if (this.address().port != undefined) {
        App.swagger.api.host += (':' + this.address().port);
    }
    /* eslint-disable no-console */
    console.log('App running on %s', App.swagger.api.host);
    /* eslint-disable no-console */
});
