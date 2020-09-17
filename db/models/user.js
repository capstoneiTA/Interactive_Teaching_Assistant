// Creating our User model
//Set it as export because we will need it required on the server

module.exports = (sequelize, DataTypes)=> {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    }, {
        // Other model options go here
    });

    return User;
};