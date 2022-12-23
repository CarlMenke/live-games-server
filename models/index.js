'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
console.log("CONFIG VARIABLE RIGTH AFTER IMPORT!!!!!!",config)
const db = {};

let sequelize = new Sequelize("postgresql://sendquickdb.cgyomgrwl384.us-west-2.rds.amazonaws.com:5432/postgres", config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log("EACH MODEL IN THE FOR EACH LOOP!!!!!!", model)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log("db varaible right before export!!!!!!!!", db)
module.exports = db;