
const sessionUrl = 'http://session:7000';
module.exports = function(app,axios)

{

app.get("/ExitTicket/question", function(req,res){


        let userId = req.query.userId;
        let quizId = req.query.quizId;
        axios.get(sessionUrl + '/ExitTicket/question', {params:{userId :userId }}).then(function(response){
          res.send(response.data);
        }).catch(function(error){
           res.send(error);
        });
      }

    );



app.post("/ExitTicket/response", function(req,res){

        let sessionId = req.body.sessionId;
        let questionId = req.body.questionId;
        let userId = req.body.userId;
        let answerText = req.body.answerText;

            axios.post(sessionUrl + '/ExitTicket/response', { sessionId : sessionId, questionId: questionId, answerText: answerText, userId: userId}).then(function(response){
              res.send(response.data);
            }).catch(function(error){
               res.send(error);
            });
          }

        );

};