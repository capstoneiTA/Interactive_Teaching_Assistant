module.exports = (sequelize, DataTypes)=> {
    const Poll_Question = sequelize.define('Poll_Question', {
        // Model attributes are defined here
        Poll_Question_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        Poll_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Polls',
                key: 'Poll_ID'
            }
        },
        Prompt: {
            type: DataTypes.STRING(768),
            allowNull: false,
            unique: true
        }
    });

    return Poll_Question;
};