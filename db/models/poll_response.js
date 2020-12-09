module.exports = (sequelize, DataTypes)=> {
    const Poll_Response = sequelize.define('Poll_Response', {
        // Model attributes are defined here
        Poll_Response_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        User_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Users',
                key: 'User_ID'
            }
        },
        Poll_Question_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references:{
                model: 'Poll_Questions',
                key: 'Poll_Question_ID'
            }
        },
        Poll_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Polls',
                key: 'Poll_ID'
            }
        },
        Poll_Option_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Poll_Options',
                key: 'Poll_Option_ID'
            }
        },
        Session_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Sessions',
                key: 'Session_ID'
            }
        },
    });

    return Poll_Response;
};