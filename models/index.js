'use strict';

var Fs        = require('fs');
var Path      = require('path');
var Sequelize = require('sequelize');
var Config    = require('../config/config.js');

var db        = {};
var sequelize = new Sequelize(Config.database.connection, Config.database.options);
var entityFolderName = Path.join(__dirname, 'entity');

Fs
  .readdirSync(entityFolderName)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](Path.join(entityFolderName, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
