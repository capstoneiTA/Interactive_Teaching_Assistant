module.exports = (sequelize, DataTypes)=> {
    const Poll = sequelize.define('Poll', {
        // Model attributes are defined here
        Poll_ID: {
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
        Poll_Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    });

    return Poll;
};
