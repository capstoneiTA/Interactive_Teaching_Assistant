module.exports = function(app, db) {

    app.get("/ExitTicket/question", function(req, res) {

        let userId = req.query.userId;
        //array to store all the exit tickets that exist
        let quizzes= [];
        let response = {};

        // Get session creation data from post request

        let foundQuizzes = getQuizzes(userId, res, response);
        foundQuizzes.then((Quizzes)=>{
             let quizzesAdded = 0;
             if(Quizzes.length > 0){
             response.anyQuizzes = true;
               for(let Quiz of Quizzes){
                let quiz = {};
                quiz.quizName = Quiz.Quiz_Name;
                quiz.quizQuestions = [];

                let foundQuestions = getQuizQuestions(Quiz, res);
                  foundQuestions.then((Questions)=>{
                    let questionsAdded = 0;
                    for(let Question of Questions){
                        let question_object = {};
                        question_object.prompt = Question.Prompt;
                        quiz.quizQuestions.push(question_object);
                        questionsAdded ++;
                    if(questionsAdded === Questions.length){
                        quizzes.push(quiz);
                        quizzesAdded ++;
                        if(quizzesAdded === Quizzes.length){
                            response.quizzes = quizzes;
                            res.send(response);
                        }
                    }

                    }
                  });
                }
             }else{
             response.anyQuizzes = false;
             }

        });
});

    //function to get the quizzes that are exit ticket
    async function getQuizzes(userId, res, response){
        let foundQuizzes = await db.Quiz.findAll({
            where: {
                User_ID: userId,
                Quiz_Type: 'Exit Ticket'
            }
        }).then(function(Quizzes){
            let foundQuizzes = [];
            if(Quizzes.length > 0){
                response.anyQuizzes = true;
                for(let Quiz of Quizzes){
                    foundQuizzes.push(Quiz);
                }
            }else{
                response.anyQuizzes = false;
                res.send(response);
            }
            return foundQuizzes;
        }).catch(function(error){
            res.send(error);
        });

        return foundQuizzes;
    }

        //function to get context of the questions
    async function getQuizQuestions(Quiz, res){
        let foundQuizQuestions = await db.QuizQuestion.findAll({
            where: {
                Quiz_ID: Quiz.Quiz_ID
            }
        }).then((Questions)=>{
            let questions = [];
            for(let Question of Questions){
                questions.push(Question);
            }
            return questions;
        }).catch((error)=>{
            res.send(error);
        });

        return foundQuizQuestions;

    }

    app.post("/ExitTicket/response", function(req,res){

        let sessionId = req.body.sessionId;
        let questionId = req.body.questionId;
        let FITB_Id = req.body.FITB_Id;
        let userId = req.body.userId;
        let answerText = req.body.answerText;

        let response= {};
           // get exit ticket info on post
        db.Quiz_Question.findOne({
              where:{
              'Quiz_Question_ID': questionId,
              }
        }).then(function(){
                db.Quiz_Question_Response.create({
                //db name field : let value
                Quiz_Question_ID: Quiz_Question.questionId,
                FITB_Option_ID: FITB_Id,
                Session_ID: sessionId,
                User_ID: userId,

           }).then(function(Quiz_Question_Response){

                db.Fill_In_The_Blank_Option.create({
                    FITB_Option_ID : QuizQuestionResponse.FITB_Id,
                    Quiz_Question_ID: QuizQuestion.questionId,
                    Answer_Text: answerText,
                }).then(function(){
                    response.contentExist = true;
                    res.send(response);

           }).catch(function(){
                response.studentExist = true;
                res.send(response);
           });

           }).catch(function(error){
               response.contentExist = error.message;
               res.send(response);

           });

        });
    });
};

