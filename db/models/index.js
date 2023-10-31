'use strict';
// importing everything we need && initilizing variables we will ultimately pass out (db)
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};


// Develops the connection into the DB
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // we are using this line in bigfoot SQL
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// Going through the current directory and finding all the models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename && // basename === 'index.js'
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // importing and initializing each model in our "models" directory
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //storing the model into the empty db object
    db[model.name] = model;
  });

// taking each model, and creating the associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
