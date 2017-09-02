'use strict';

var Fs        = require('fs');
var Path      = require('path');
var Sequelize = require('sequelize');
var Config    = require(Path.join(__dirname, '../config/config'));

var db        = {};
var db_config = Config.db_config;
var sequelize = new Sequelize(db_config.connection_string, db_config.options);
var basename  = Path.basename(module.filename);
Fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](Path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
