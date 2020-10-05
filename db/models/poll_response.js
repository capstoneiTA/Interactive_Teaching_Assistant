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
                model: 'User',
                key: 'User_ID'
            }
        },
        Poll_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Poll',
                key: 'Poll_ID'
            }
        },
        Poll_Option_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Poll_Option',
                key: 'Poll_Option_ID'
            }
        },
        Session_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Session',
                key: 'Session_ID'
            }
        },
    });

    return Poll_Response;
};