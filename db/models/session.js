module.exports = (sequelize, DataTypes)=> {
    const Session = sequelize.define('Session', {

        Session_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        CreatedBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        Session_URL: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        Date_Created: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: true,
        },
    });

    return Session;
};