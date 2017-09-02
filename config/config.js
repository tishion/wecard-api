'use strict';

var ConfigJson  = require('./config.json');

var env = process.env.NODE_ENV || 'development';
var envConfig = ConfigJson[env];
envConfig.port = envConfig.port || process.env.PORT;
module.exports = envConfig;
