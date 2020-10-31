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
        }).then(function (Quiz) {
            response.quizCreation = true;
            quiz.quizQuestions.forEach(function (question) {
                db.QuizQuestion.create({
                    Quiz_ID: Quiz.Quiz_ID,
                    Prompt: question.prompt
                }).then(function (Question) {
                    if (quizType === 'Multiple Choice') {
                        question.options.forEach(function (option, index) {
                            db.Multiple_Choice_Option.create({
                                Quiz_Question_ID: Question.Quiz_Question_ID,
                                Option_Text: option,
                                isCorrect: question.corrects[index]
                            }).then(function () {
                                //Option add success!
                            }).catch(function (error) {
                                console.log('Error adding option ' + (index + 1));
                            })
                        })
                    }
                }).catch(function (error) {
                    response.questionsCreate = false;
                    res.send(response);
                });
                questionsAdded++;
                if (questionsAdded === quiz.quizQuestions.length) {
                    response.questionsCreate = true;
                    res.send(response);
                }
            });

        }).catch(function (error) {
            response.quizCreation = false;
            res.send(response);
        })

    });

    app.get("/quiz/retrieve", function (req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;
        let response = {};

        response.quizObject = getQuizzes(userId, res, response);
        res.send(response);
    });

    async function getQuizzes(userId, response) {
        let quiz = {};
        let question = {};
        let option_object = {};

        let quizForUser = await db.Quiz.findAll({
            where: {
                User_ID: userId
            }
        });

        if (quizForUser.length > 0) {
            response.anyQuizzes = true;

            let quizQuestions = await quizForUser.map((Quiz) => {
                //Get info for quiz object
                quiz.quizName = Quiz.Quiz_Name;
                quiz.quizQuestionsList = [];
                //main code
                db.QuizQuestion.findAll({
                    where: {
                        Quiz_ID: Quiz.Quiz_ID
                    }
                })
            });

            let quizOptions = await quizQuestions.map((Question) => {
                question.prompt = Question.Prompt;
                question.options =[];

                db.Multiple_Choice_Option.findAll({
                    where: {
                        Quiz_Question_ID: Question.Quiz_Question_ID
                    }
                })
            });

            let optionDetails = await quizOptions.map((Option) => {
                option_object.option = option.Option_Text;
                option_object.isCorrect = option.isCorrect;
                question.options.push(option_object);
                quiz.quizQuestionsList.push(question);
            });

            return quiz;
        }
    }
};