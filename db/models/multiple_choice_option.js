module.exports = (sequelize, DataTypes)=> {
    const Multiple_Choice_Option = sequelize.define('Multiple_Choice_Option', {
        // Model attributes are defined here
        Multiple_Choice_Option_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        Quiz_Question_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Quiz_Question',
                key: 'Quiz_Question_ID'
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

    return Multiple_Choice_Option;
};