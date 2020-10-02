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
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false,
            references: {
                model: 'User',
                key: 'User_ID'
            }
        },
        Session_ID: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false,
            references: {
                model: 'Session',
                key: 'Session_ID'
            }
        },
        Reply_To: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            references: {
                model: 'Message',
                key: 'Message_ID'
            }
        },
        Message_Content:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        Date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: false
        },
        Time:{
            type: DataTypes.TIME,
            allowNull: false,
            unique: false
        }
    });

    return Message;
};