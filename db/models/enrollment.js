module.exports = (sequelize, DataTypes)=> {
    const Enrollment = sequelize.define('Enrollment', {

        Enrollment_ID: {
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
                model: 'Session',
                key: 'Session_ID'
            }
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
    });
    return Enrollment;
};