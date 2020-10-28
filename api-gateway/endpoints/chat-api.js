/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = 'http://session:7000';

module.exports = function(app, axios, io) {
    //keeps track of created sessions to prevent creating multiple sessions
    let Chat = [];

    app.post("/chat/update", function(req, res) {
        // Get session creation data from post request
        let message = req.body.message;
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;
        let timeStamp = req.body.timeStamp;

        axios.post(sessionUrl + '/chat/update', {message: message, sessionId: sessionId, userId: userId, timeStamp:timeStamp}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.post("/chat/create", function(req, res) {
        // console.log('chat created post')
        // Get session creation data from post request
        let sessionName = req.body.sessionName;
        axios.post(sessionUrl + '/chat/create', {sessionName: sessionName}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });

    
    });
}