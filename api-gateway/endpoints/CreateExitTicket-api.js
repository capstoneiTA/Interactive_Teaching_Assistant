const dbUrl = 'http://db:5000';
module.exports = function(app,axios)

{
    app.post("/ticket/create", function(req,res){

        let quizName = req.body.quizName;
        let prompt = req.body.prompt;
        axios.post(dbUrl + '/create/ticket', {quizName: quizName, prompt: prompt}).then(function(response){
          res.send(response.data);
        }).catch(function(error){
           res.send(error);
        });
      }

    );
    app.get('/failure', function(req, res){
        let response = {};
        response.success = false;
        res.send('failure');
    });

    app.get('/quizInfo', function(req, res){
        let quizId = req.query.quizId;
        axios.get(dbUrl + '/quizInfo', {params: {quizId: quizId}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    })

 };