module.exports = (sequelize, DataTypes)=> {
    const Fill_In_The_Blank_Option = sequelize.define('Fill_In_The_Blank_Option', {
        // Model attributes are defined here
        FITB_Option_ID: {
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
                model: 'Quiz_Questions',
                key: 'Quiz_Question_ID'
            }
        },
        Answer_Text: {
            type: DataTypes.STRING(768),
            allowNull: true,
            unique: false
        }
    });

    return Fill_In_The_Blank_Option;
};