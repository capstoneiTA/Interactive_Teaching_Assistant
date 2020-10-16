module.exports = (sequelize, DataTypes)=> {
    const Quiz = sequelize.define('quiz',{
    //model for db attributes

    Quiz_ID: {
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
    Quiz_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    Quiz_Type: {
        type: DataTypes.STRING,
        allowNull: false
    }


    });
    return Quiz;
};
