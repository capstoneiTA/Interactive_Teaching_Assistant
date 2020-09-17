'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const env = 'aws' || process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//Require all models here
const User = require('./user.js')(sequelize, DataTypes);

//Add all models to database object here
db.User = User;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;