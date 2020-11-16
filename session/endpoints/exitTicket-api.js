
    const dbUrl = 'http://db:5000';
    const OpenEndedQuestion = require("../services/OpenEndedQuestion.js");

module.exports = function(app,axios,io){
    let currentQuizzes = [];
    app.post("/ExitTicket/create", function(req,res){

        let userId = req.body.userId;
        let quiz = req.body.quiz;
        let quizType = req.body.quizType;
          axios.post(dbUrl + '/ExitTicket/create', {userId: userId, quiz: quiz, quizType:quizType}).then(function(response){
          res.send(response.data);
        }).catch(function(error){
           res.send(error);
        });
      }
    );

    app.get("/ExitTicket/question", function(req,res){
            let userId = req.query.userId;
            let quizId = req.query.quizId;
                axios.get(dbUrl + '/ExitTicket/question', {params:{userId :userId }}).then(function(response){
                res.send(response.data);
                 }).catch(function(error){
                    res.send(error);
                 });
          }
        );

    app.get("/ExitTicket/initiate", function(req, res) {
            //Get session creation data from post request
            let sessionName = req.query.sessionName;
            let response = {};
            if(!currentQuizzes.includes(sessionName)){
                const quiz = new OpenEndedQuestion(sessionName, io);
                currentQuizzes.push(sessionName);
            }
            response.quizListenerStarted = true;
            res.send(response);
        });


    app.post("/ExitTicket/response", function(req,res){

            let sessionId = req.body.sessionId;
            let questionId = req.body.questionId;
            let userId = req.body.userId;
            let answerText = req.body.answerText;

                axios.post(dbUrl + '/ExitTicket/response', {sessionId : sessionId, questionId: questionId, answerText: answerText, userId: userId}).then(function(response){
                  res.send(response.data);
                }).catch(function(error){
                  res.send(error);
            });
          }

        );


 };