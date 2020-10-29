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
                                Option_Text: option,
                                isCorrect: question.corrects[index]
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

        });
        res.send(true);


    });

    async function getQuizzes(userId, res, response){
        let foundQuizzes = await db.Quiz.findAll({
            where: {
                User_ID: userId
            }
        }).then(async function(Quizzes){
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

    async function getQuizQuestions(Quizzes){
        let quizzes = []
        for(let Quiz of Quizzes){
            let quiz = {};
            quiz.quizName = Quiz.Quiz_Name;
            quiz.quizQuestions = [];
        }
    }



    // response.anyQuizzes = true;
    //
    // await Promise.all(Quizzes.map((Quiz)=>{
    //     let quiz = {};
    //     quiz.quizName = Quiz.Quiz_Name;
    //     quiz.quizQuestions = [];
    //     db.QuizQuestion.findAll({
    //         where: {
    //             Quiz_ID: Quiz.Quiz_ID
    //         }
    //     }).then( async function(Questions){
    //
    //         await Promise.all(Questions.map((question)=>{
    //             let question_object = {};
    //             question_object.prompt = question.Prompt;
    //             question_object.options = [];
    //             db.Multiple_Choice_Option.findAll({
    //                 where:{
    //                     Quiz_Question_ID: question.Quiz_Question_ID
    //                 }
    //             }).then(async function(Options){
    //
    //                 await Promise.all(Options.map((option)=>{
    //                     let option_object = {};
    //                     option_object.option = option.Option_Text;
    //                     option_object.isCorrect = option.isCorrect;
    //                     question_object.options.push(option_object);
    //                 }));
    //             }).catch(function(error){
    //                 console.log(error.message);
    //                 // res.send(error); //option retrieval error
    //             });
    //
    //             quiz.quizQuestions.push(question_object);
    //         }));
    //
    //     }).catch(function(error){
    //         res.send(error); //Question Retrieval Error
    //     });
    //     quizzes.push(quiz);
    // }));

};
