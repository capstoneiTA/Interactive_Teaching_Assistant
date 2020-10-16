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
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Users',
                key: 'User_ID'
            }
        },
        Session_Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    });

    return Session;
};