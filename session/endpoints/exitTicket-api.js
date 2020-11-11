
const dbUrl = 'http://db:5000';
module.exports = function(app,axios)

{

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

app.post("/ExitTicket/response", function(req,res){

            let sessionId = req.body.sessionId;
            let questionId = req.body.questionId;
            let FITB_Id = req.body.FITB_Id;
            let answerText = req.body.answerText;
            let userId = req.body.userId;
            axios.post(dbUrl + '/ExitTicket/response', {sessionId : sessionId, questionId: questionId, FITB_Id: FITB_Id, answerText: answerText, userId: userId}).then(function(response){
              res.send(response.data);
            }).catch(function(error){
               res.send(error);
            });
          }

        );





 };