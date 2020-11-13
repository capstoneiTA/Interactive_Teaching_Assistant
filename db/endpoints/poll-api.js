module.exports = function(app, db) {

    app.post("/poll/create", function(req, res) {
        let pollName = req.body.pollName;
        let userId = req.body.userId;

        let response = {};

        db.Poll.create({
            User_ID: userId,
            Poll_Name: pollName
        }).then(function(){
            response.pollCreation = true;
            res.send(response);
        }).catch(function(error){
            response.pollCreation = error.message;
            res.send(response);
        })
    });
};