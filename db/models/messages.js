module.exports = (sequelize, DataTypes)=> {
    const Message = sequelize.define('Message', {
        // Model attributes are defined here
        Message_ID: {
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
        Session_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Sessions',
                key: 'Session_ID'
            }
        },
        Reply_To: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
            references: {
                model: 'Messages',
                key: 'Message_ID'
            }
        },
        Message_Content:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
    });

    return Message;
};