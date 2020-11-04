module.exports = function(app, db) {

    app.get("/ExitTicket/question", function(req, res) {
        //let prompt = req.query.prompt;
        let userId = req.query.userId;
        let quizId = req.query.quizId;
        let prompt= [];
        let response = {};
        // Get session creation data from post request
        db.QuizQuestion.findAll({
            where: {
                'Quiz_ID': quizId,
            }
        }).then(function(QuizQuestion) {
                if(QuizQuestion.length > 0){
                 response.ExitTicket = true;
                 res.send(response);
                 console.log(response)
                }

        }).catch(function(error){
                response.ExitTicket = false;
                res.send(response);
        });

      });
    };


  /*  {

    app.post("/ExitTicket/response", function(req,res){
        let quizName = req.body.quizName;
        let quizId = req.body.quizId;
        let prompt = req.body.prompt;
        let userId = req.body.userId;
        let content = req.body.content;

        let response= {};

           // get exit ticket info on post

        db.fill_in_the_blank_option.create({
                //db name field : let value
                Answer_Text: content,
                Quiz_Question_ID: quizId;
                User_ID: userId,
           }).then(function(fill_in_the_blank_option){
                response.AnswerAdd = true;
                db.Quiz_Question.create({
                    Quiz_ID: Quiz.Quiz_ID,
                    Quiz_Question_ID:
                    Prompt: prompt,

                }).then(function(db.Quiz_Question){
                     response. = true;
                     res.send(response);

                }).catch(function(error){
                      response.ExitAdd = error.message;
                      res.send(response);
                });

             }
           ).catch(function(error){
             response.ExitAdd = error.message;
             res.send(response);

           });
        });
    };
    */

