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
            model: 'User',
            key: 'User_ID'
        }
    },
    Quiz_Question_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references:{
        model: 'Quiz_Question',
        key: 'Quiz_Question_ID'
        }
    },
    FITB_Option_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references:{
            model: 'Fill_In_The_Blank_Option'
            key: 'FITB_Option_ID'
        }
    },

    MC_Option_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references:{
            model: 'Multiple_Choice_Option'
            key: 'MC_Option_ID'
        }

    },
    Session_ID: {
        type: DataTypes.String(100),
        allowNull: false,
        unique: false,
        references: {
            model: 'Session',
            key: 'Session_ID'
        }


    }


    });
    return Quiz_Question_Response;
};