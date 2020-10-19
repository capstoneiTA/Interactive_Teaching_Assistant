// Creating our User model
//Set it as export because we will need it required on the server

// Requiring bcrypt for password hashing. Using the bcryptjs version as
//the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes)=> {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        User_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING(100),
            unique: true,
            validate: {
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //This will check if an unhashed password entered by the
    //user can be compared to the hashed password stored in database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    //Before creating the user, the password is encrypted.
    User.beforeCreate(user => {
        user.Password = bcrypt.hashSync(user.Password, bcrypt.genSaltSync(10), null);
    });

    return User;
};