module.exports = function(app,db)
{

    app.post("/ticket/create", function(req,res){

    let quizName = req.body.quizName;
    let prompt = req.body.prompt;
    let quizId = req.query.quizId;
    let response= {};

        //get exit ticket info on post
        db.ExitTicket.create({
            //db name field : let value
            Quiz_Name: quizName,
            Prompt: prompt,
            Quiz_ID: quizId
       }).then(function(){
            response.ExitAdd = true;
            res.send(response);
         }
       ).catch(function(error){
         response.ExitAdd = error.message;
         res.send(response);

       });
    });
};
