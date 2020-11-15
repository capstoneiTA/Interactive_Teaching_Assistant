module.exports = function(app,db)
{

    app.post("/ExitTicket/create", function(req,res){

    let quizName = req.body.quizName;
    let userId = req.body.userId;
    let quiz = req.body.quiz;
    let quizType = req.body.quizType;
    let response= {};

       // get exit ticket info on post
        db.Quiz.create({
            //db name field : let value
            Quiz_Name: quiz.quizName,
            User_ID: userId,
            Quiz_Type: quizType,
       }).then(function(Quiz){

            db.QuizQuestion.create({
                Quiz_ID: Quiz.Quiz_ID,
                Prompt: quiz.prompt,

            }).then(function(){
                 response.ExitAdd = true;
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
