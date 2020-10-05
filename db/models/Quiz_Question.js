module.exports = (sequelize, DataTypes)=> {
    const Quiz_Question = sequelize.define('Quiz_Question', {
        //model for Quiz_question db
        Quiz_Question_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        Quiz_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
            model: 'quiz',
            key: 'Quiz_ID'
            }
        },
       Prompt: {
            type: DataTypes.STRING(1000);
            allowNull: false,
            unique: true
       }


    });
    return Quiz_Question;
};