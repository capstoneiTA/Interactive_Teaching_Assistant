module.exports = (sequelize, DataTypes)=> {
    const Poll_Option = sequelize.define('Fill_In_The_Blank_Option', {
        // Model attributes are defined here
        Fill_In_The_Blank_Option_ID: {
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
        Answer_Text: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false
        }
    });

    return Fill_In_The_Blank_Option;
};