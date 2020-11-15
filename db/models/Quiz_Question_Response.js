module.exports= (sequelize, DataTypes)=> {
    const Quiz_Question_Response = sequelize.define('Quiz_Question_Response', {
        //model for quiz question response db attributes
        Quiz_Response_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        User_ID:{
            type: DataTypes.INTEGER,
            allowNUll: false,
            unique: false,
            references: {
                model: 'Users',
                key: 'User_ID'
            }
        },
        Quiz_Question_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references:{
                model: 'Quiz_Questions',
                key: 'Quiz_Question_ID'
            }
        },
        FITB_Option_ID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
            references:{
                model: 'Fill_In_The_Blank_Options',
                key: 'FITB_Option_ID'
            }
        },

        MC_Option_ID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
            references:{
                model: 'Multiple_Choice_Options',
                key: 'MC_Option_ID'
            }

        },
        Session_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'Sessions',
                key: 'Session_ID'
            }

        },
        Student_Response: {
            type: DataTypes.STRING(758),
            allowNull: true,
            unique: false,
        }
    });
    return Quiz_Question_Response;
};