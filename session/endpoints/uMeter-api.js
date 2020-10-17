/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';
const UnderstandingMeter = require("../services/Session.js");

module.exports = function(app, axios, io) {
    //keeps track of created sessions to prevent creating multiple sessions
    let UnderstandingMeters = [];

    app.post("/uMeter/update", function(req, res) {
        // Get session creation data from post request
        let uValue = req.body.uValue;
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;
        let timeStamp = req.body.timeStamp;

        axios.post(dbUrl + '/uMeter/update', {uValue: uValue, sessionId: sessionId, userId: userId, timeStamp:timeStamp}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.post("/uMeter/create", function(req, res) {
        // Get session creation data from post request
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;

        axios.post(dbUrl + '/uMeter/create', {sessionId: sessionId, userId: userId}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    // app.post("/session/join", function(req, res) {
    //     // Get session creation data from post request
    //     let sessionName = req.body.sessionName;
    //     let userId = req.body.userId;
    //
    //     axios.post(dbUrl + '/session/join', {sessionName: sessionName, userId: userId}).then(function(response){
    //         if(response.data.sessionExists === true && !currentSessions.includes(sessionName)){
    //             const session = new Session(sessionName, io);
    //             currentSessions.push(sessionName);
    //         }
    //         res.send(response.data);
    //     }).catch(function(error){
    //         res.send(error);
    //     })
    //
    // });

};

