module.exports = (sequelize, DataTypes)=> {
    const UnderstandingMeter = sequelize.define('UnderstandingMeter', {

        Meter_Change_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
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
        User_ID: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false,
            references: {
                model: 'User',
                key: 'User_ID'
            }
        },
        Understanding_Value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        Timestamp: {
            type: DataTypes.TIME,
            allowNull: false,
            unique: true,
        }
    });
    return UnderstandingMeter;
};