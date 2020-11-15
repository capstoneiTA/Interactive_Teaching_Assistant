module.exports = function(app, db) {

    app.post("/poll/create", function(req, res) {
        let poll = req.body.poll;
        let userId = req.body.userId;

        let response = {};

        let pollAdded = 0;

        db.Poll.create({
            User_ID: userId,
            Poll_Name: poll.pollName
        }).then(function(Poll){
            response.pollCreation = true;
            poll.pollQuestions.forEach(function(question) {
                db.PollQuestion.create({
                    Poll_ID: Poll.Poll_ID,
                    Prompt: question.prompt
                }).then(function(Question) {
                    question.options.forEach(function(option, index){
                        db.Poll_Option.create({
                            Poll_Question_ID: Question.Poll_Question_ID,
                            Option_Text: option.optionText,
                        }).then(function () {
                            console.log('Options added successfully');
                        }).catch(function(error){
                            console.log('Error adding option' + error.message);
                        })
                    })
                }).catch(function (error) {
                    response.questionCreate = false;
                    res.send(response);
                });
                pollAdded++;
                if(pollAdded === poll.pollQuestions.length){
                    response.questionCreate = true;
                    res.send(response);
                }
            });
        }).catch(function(error){
            response.pollCreation = error.message;
            res.send(response);
        })
    });







};