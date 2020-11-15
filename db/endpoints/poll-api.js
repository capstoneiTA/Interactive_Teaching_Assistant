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
                            //response.optionAdded = true;
                            // console.log('Options added successfully');
                            //res.send(response)
                        }).catch(function(error){
                            //response.optionAdded = false;
                            console.log('Error adding option' + (index + 1));
                            // res.send(response)
                        })
                    })

                }).catch(function (error) {
                    response.questionAdded = false;
                    console.log('Error in questions addition: ' + error.message);
                    res.send(response);
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

    app.get("/poll/retrieve", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;
        let response = {};
        let polls = [];

        let foundPolls = getPolls(userId, res, response);

        foundPolls.then((Polls)=>{
            let pollsAdded = 0;
            if(Polls.length > 0){
                response.anyPolls = true;
                for(let Poll of Polls){
                    let poll = {};
                    poll.pollName = Poll.Poll_Name;
                    poll.pollId = Poll.Poll_ID;
                    poll.pollQuestions = [];
                    let foundQuestions = getPollQuestions(Poll, res);
                    foundQuestions.then((Questions)=>{
                        let questionsAdded = 0;
                        for(let Question of Questions){
                            let question_object = {};
                            question_object.prompt = Question.Prompt;
                            question_object.questionId = Question.Poll_Question_ID;
                            question_object.options = [];

                            let foundQuestionOptions = getQuestionOptions(Question, res);
                            foundQuestionOptions.then((Options)=>{
                                for(let Option of Options){
                                    let option_object = {};
                                    option_object.option = Option.Option_Text;
                                    option_object.optionId = Option.Poll_Option_ID;
                                    question_object.options.push(option_object);
                                }
                                poll.pollQuestions.push(question_object);
                                questionsAdded ++;
                                if(questionsAdded === Questions.length){
                                    polls.push(poll);
                                    pollsAdded ++;
                                    if(pollsAdded === Polls.length){
                                        response.polls = polls;
                                        res.send(response);
                                    }
                                }
                            });
                        }
                    })
                }
            }else{
                response.anyPolls = false;
            }

        });
    });

    app.post("/poll/responseStore", function (req, res) {
        //Get session creation data from post request
        let userId = req.body.userId;
        let response = req.body.response;
        let sessionId = req.body.sessionId;
        let resp = {};
        let count = 0;

        for(let answer of response.answers){
            db.Poll_Response.create({
                User_ID: userId,
                Poll_Question_ID: answer.questionId,
                Poll_Option_ID: answer.answerId,
                Session_ID: sessionId
            }).then(function(){
                resp.responseStored = true;
                count++;
                if(count === response.answers.length) {
                    res.send(resp);
                }
            }).catch(function(error){
                resp.responseStored = false;
                resp.error = error.message;
                res.send(resp);
            })
        }
    });



    /********HELPER FUNCTIONS********/

    async function getPolls(userId, res, response){
        let foundPolls = await db.Poll.findAll({
            where: {
                User_ID: userId,
            }
        }).then(function(Polls){
            let foundPolls = [];
            if(Polls.length > 0){
                response.anyPolls = true;
                for(let Poll of Polls){
                    foundPolls.push(Poll);
                }
            }else{
                response.anyPolls = false;
                //res.send(response);
            }
            return foundPolls;
        }).catch(function(error){
            res.send(error);
        });

        return foundPolls;
    }

    async function getPollQuestions(Poll, res){
        let foundPollQuestions = await db.Poll_Question.findAll({
            where: {
                Poll_ID: Poll.Poll_ID
            }
        }).then((Questions)=>{
            let questions = [];
            for(let Question of Questions){
                questions.push(Question);
            }
            return questions;
        }).catch((error)=>{
            res.send(error);
        });

        return foundPollQuestions;

    }

    async function getQuestionOptions(Question, res){
        let foundQuestionOptions = await db.Poll_Option.findAll({
            where: {
                Poll_Question_ID: Question.Poll_Question_ID
            }
        }).then((Options)=>{
            let options = [];
            for(let Option of Options){
                options.push(Option);
            }
            return options;
        }).catch((error)=>{
            res.send(error);
        });

        return foundQuestionOptions;
    }



};