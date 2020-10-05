module.exports = (sequelize, DataTypes)=> {
    const Poll_Option = sequelize.define('Poll_Option', {
        // Model attributes are defined here
        Poll_Option_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        Poll_Question_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Poll_Question',
                key: 'Poll_Question_ID'
            }
        },
        Option_Text: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false
        }
    });

    return Poll_Option;
};