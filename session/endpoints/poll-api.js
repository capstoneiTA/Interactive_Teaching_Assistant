/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';
const Poll = require("../services/Poll.js");

module.exports = function(app, axios, io) {

    let currentPolls = [];

    app.post("/poll/create", function(req, res) {
        // Get session creation data from post request
        let poll = req.body.poll;
        let userId = req.body.userId;

        axios.post(dbUrl + '/poll/create', {poll: poll, userId: userId}).then(function (response) {
            res.send(response.data.pollCreation);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.get("/poll/retrieve", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;

        axios.get(dbUrl + '/poll/retrieve', {params:{userId: userId}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    app.get("/poll/start", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.query.sessionName;
        let response = {};

        if(!currentPolls.includes(sessionName)){
            const poll = new Poll(sessionName, io);
            currentPolls.push(sessionName);
        }

        response.pollListenerStarted = true;
        res.send(response);

    });


};