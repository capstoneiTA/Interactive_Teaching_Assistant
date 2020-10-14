/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';
const Session = require("../services/Session");

module.exports = function(app, axios, io) {
    //keeps track of created sessions to prevent creating multiple sessions
    let currentSessions = [];

    app.post("/session/create", function(req, res) {
        // Get session creation data from post request
        let sessionName = req.body.sessionName;
        let CreatedBy = req.body.CreatedBy;

        axios.post(dbUrl + '/session/create', {sessionName: sessionName, CreatedBy: CreatedBy}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        })

    });

    app.post("/session/join", function(req, res) {
        // Get session creation data from post request
        let sessionName = req.body.sessionName;
        let userId = req.body.userId;

        axios.post(dbUrl + '/session/join', {sessionName: sessionName, userId: userId}).then(function(response){
            if(response.data.sessionExists === true && !currentSessions.includes(sessionName)){
                const session = new Session(sessionName, req.User.firstName, req.User.lastName, CreatedBy, io);
                currentSessions.push(sessionName);
            }
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        })

    });

};