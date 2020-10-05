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
const UnderstandingMeter = require('./understandingMeter')(sequelize, DataTypes);
const Session = require('./session')(sequelize, DataTypes);
const Enrollment = require('./enrollment')(sequelize, DataTypes);

const Poll = require('./poll.js')(sequelize, DataTypes);
const Poll_Response = require('./poll_response.js')(sequelize, DataTypes);
const Poll_Question = require('./poll_question.js')(sequelize, DataTypes);
const Poll_Option = require('./poll_option.js')(sequelize, DataTypes);

const Multiple_Choice_Option = require('./multiple_choice_option.js')(sequelize, DataTypes);
const FillInTheBlankOption = require('./fill_in_the_blank_option.js')(sequelize, DataTypes);


//Add all models to database object here
db.User = User;
db.Message = Message;

db.Poll = Poll;
db.Poll_Response = Poll_Response;
db.Poll_Question = Poll_Question;
db.Poll_Option = Poll_Option;

db.Session = Session;
db.Enrollment = Enrollment;
db.UnderstangingMeter = UnderstandingMeter;
db.Multiple_Choice_Option = Multiple_Choice_Option;
db.FillInTheBlankOption = FillInTheBlankOption;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;