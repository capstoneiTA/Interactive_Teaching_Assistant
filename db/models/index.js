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
const Message = require('./messages.js')(sequelize, DataTypes);
const Quiz = require('./quiz.js')(sequelize,DataTypes);
const QuizQuestion = require('./Quiz_Question.js')(sequelize,DataTypes);
const QuizQuestionResponse = require('./Quiz_Question_Response.js')(sequelize,DataTypes);
//Add all models to database object here
db.User = User;
db.Message = Message;
ds.Quiz = Quiz;
db.QuizQuestion= QuizQuestion;
db.QuizQuestionResponse = QuizQuestionResponse;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;