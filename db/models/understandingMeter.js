
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('UnderstandingMeter', {

        Meter_Change_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
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
        User_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Users',
                key: 'User_ID'
            }
        },
        Understanding_Value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
    });
};