
const sessionUrl = 'http://session:7000';
module.exports = function(app,axios)

{

app.get("/ExitTicket/question", function(req,res){

        //let quizName = req.query.quizName;
       // let prompt = req.query.prompt;
        //let userId = req.query.userId;
        let quizId = req.query.quizId;
        axios.get(sessionUrl + '/ExitTicket/question', {quizId:quizId}).then(function(response){
          res.send(response.data);
        }).catch(function(error){
           res.send(error);
        });
      }

    );

};