
const dbUrl = 'http://db:5000';
module.exports = function(app,axios)

{

    app.post("/ExitTicket/create", function(req,res){

        let quizName = req.body.quizName;
        let prompt = req.body.prompt;
        let userId = req.body.userId;
        let quizType = req.body.quizType;

        axios.post(dbUrl + '/ExitTicket/create', {quizName: quizName, prompt: prompt, userId:userId, quizType: quizType}).then(function(response){
          res.send(response.data);
        }).catch(function(error){
           res.send(error);
        });
      }

    );


 };