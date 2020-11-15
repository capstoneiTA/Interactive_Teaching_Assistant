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
                db.Poll_Question.create({
                    Poll_ID: Poll.Poll_ID,
                    Prompt: question.prompt
                }).then(function(Question) {

                    question.options.forEach(function(option, index){
                        db.Poll_Option.create({
                            Poll_Question_ID: Question.Poll_Question_ID,
                            Option_Text: option.optionText
                        }).then(function () {
                            response.optionAdded = true;
                            // console.log('Options added successfully');
                            //res.send(response)
                        }).catch(function(error){
                            response.optionAdded = false;
                            console.log('Error adding option' + (index + 1));
                            //res.send(response)
                        })
                    })

                }).catch(function (error) {
                    response.questionAdded = false;
                    console.log('Error in questions addition: ' + error.message);
                    //res.send(response);
                });
                pollAdded++;
                if(pollAdded === poll.pollQuestions.length){
                    response.questionAdded = true;
                    res.send(response);
                }
            });

        }).catch(function(error){
            response.pollCreation = false;
            console.log('Error in poll creation: ' + error.message);
            res.send(response);
        })
    });







};