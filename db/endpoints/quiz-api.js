module.exports = function(app, db) {

    app.post("/quiz/create", function (req, res) {
        //Get session creation data from post request
        let userId = req.body.userId;
        let quiz = req.body.quiz;
        let quizType = req.body.quizType;
        let response = {};

        let questionsAdded = 0;

        db.Quiz.create({
            User_ID: userId,
            Quiz_Name: quiz.quizName,
            Quiz_Type: quizType
        }).then(function(Quiz){
            response.quizCreation = true;
            quiz.quizQuestions.forEach(function(question){
                db.QuizQuestion.create({
                    Quiz_ID: Quiz.Quiz_ID,
                    Prompt: question.prompt
                }).then(function(Question){
                    if(quizType === 'Multiple Choice'){
                        question.options.forEach(function(option, index){
                            db.Multiple_Choice_Option.create({
                                Quiz_Question_ID: Question.Quiz_Question_ID,
                                Option_Text: option.optionText,
                                isCorrect: option.isCorrect
                            }).then(function(){
                                //Option add success!
                            }).catch(function(error){
                                console.log('Error adding option ' + (index+1));
                            })
                        })
                    }
                }).catch(function(error){
                    response.questionsCreate = false;
                    res.send(response);
                });
                questionsAdded ++;
                if(questionsAdded === quiz.quizQuestions.length){
                    response.questionsCreate = true;
                    res.send(response);
                }
            });

        }).catch(function(error){
            response.quizCreation = false;
            response.error = error.message;
            res.send(response);
        })

    });

    app.get("/quiz/retrieve", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;
        let response = {};
        let quizzes = [];

        let foundQuizzes = getQuizzes(userId, res, response);
        foundQuizzes.then((Quizzes)=>{
            let quizzesAdded = 0;
            if(Quizzes.length > 0){
                response.anyQuizzes = true;
                for(let Quiz of Quizzes){
                    let quiz = {};
                    quiz.quizName = Quiz.Quiz_Name;
                    quiz.quizId = Quiz.Quiz_ID;
                    quiz.quizQuestions = [];
                    let foundQuestions = getQuizQuestions(Quiz, res);
                    foundQuestions.then((Questions)=>{
                        let questionsAdded = 0;
                        for(let Question of Questions){
                            let question_object = {};
                            question_object.prompt = Question.Prompt;
                            question_object.questionId = Question.Quiz_Question_ID;
                            question_object.options = [];

                            let foundQuestionOptions = getQuestionOptions(Question, res);
                            foundQuestionOptions.then((Options)=>{
                                for(let Option of Options){
                                    let option_object = {};
                                    option_object.option = Option.Option_Text;
                                    option_object.isCorrect = Option.isCorrect;
                                    option_object.optionId = Option.MC_Option_ID;
                                    question_object.options.push(option_object);
                                }
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
                            });
                        }
                    })
                }
            }else{
                response.anyQuizzes = false;
            }

        });
    });

    app.post("/quiz/responseStore", function (req, res) {
        //Get session creation data from post request
        let userId = req.body.userId;
        let response = req.body.response;
        let sessionId = req.body.sessionId;
        let resp = {};
        let count = 0;

        for(let answer of response.answers){
            db.QuizQuestionResponse.create({
                User_ID: userId,
                Quiz_Question_ID: answer.questionId,
                MC_Option_ID: answer.answerId,
                Session_ID: sessionId
            }).then(function(){
                resp.responseStored = true;
                count ++;
                if(count === response.answers.length){
                    res.send(resp);
                }
            }).catch(function(error){
                res.send(error);
            })

        }


    });

    /********HELPER FUNCTIONS********/

    async function getQuizzes(userId, res, response){
        let foundQuizzes = await db.Quiz.findAll({
            where: {
                User_ID: userId,
                Quiz_Type: 'Multiple Choice'
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

    async function getQuestionOptions(Question, res){
        let foundQuestionOptions = await db.Multiple_Choice_Option.findAll({
            where: {
                Quiz_Question_ID: Question.Quiz_Question_ID
            }
        }).then((Options)=>{
            let options = [];
            for(let Option of Options){
                options.push(Option);
            }
            return options;
        }).catch((error)=>{
            res.send(error);
        });

        return foundQuestionOptions;
    }

};
