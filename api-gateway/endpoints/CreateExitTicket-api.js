
const sessionUrl = 'http://session:7000';
module.exports = function(app,axios)

{

    app.post("/ExitTicket/create", function(req,res){

        let quiz = req.body.quiz;
        let userId = req.body.userId;
        let quizType = req.body.quizType
        axios.post(sessionUrl + '/ExitTicket/create', {userId: userId, quiz: quiz, quizType:quizType}).then(function(response){
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

    app.get("/ExitTicket/initiate", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.query.sessionName;

        axios.get(sessionUrl + '/ExitTicket/initiate', {params: {sessionName: sessionName}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    app.get('/ExitTicket/quizInfo', function(req, res){
        let quizId = req.query.quizId;
        axios.get(sessionUrl + '/quizInfo', {params: {quizId: quizId}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    })

 };