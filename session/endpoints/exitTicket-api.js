
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

    app.get("/ExitTicket/question", function(req,res){
           // let quizName = req.query.quizName;
            //let prompt = req.query.prompt;
          //  let userId = req.query.userId;
            let quizId = req.query.quizId;
            axios.get(dbUrl + '/ExitTicket/question', {params:{quizId:quizId}}).then(function(response){
              res.send(response.data);
            }).catch(function(error){
               res.send(error);
            });
          }

        );






 };