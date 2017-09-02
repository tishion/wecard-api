'use strict';

var Path    = require('path'); 
var Config  = require(Path.join(__dirname, 'config.json'));

var env = process.env.NODE_ENV || 'development';
var env_config = Config[env];
env_config.port = env_config.port || process.env.PORT;
console.log(env_config);
module.exports = env_config;
