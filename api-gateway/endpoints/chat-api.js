/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = 'http://session:7000';

module.exports = function(app, axios, io) {
    //keeps track of created sessions to prevent creating multiple sessions
    let Chat = [];

    app.post("/chat/update", function(req, res) {
        // Get session creation data from post request
        let messageContent = req.body.messageContent;
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;
        let timeStamp = req.body.timeStamp;

        axios.post(sessionUrl + '/chat/update', {messageContent: messageContent, sessionId: sessionId, userId: userId, timeStamp:timeStamp }).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.post("/chat/join", function(req, res) {
        // console.log('chat created post')
        // Get session creation data from post request
        let sessionName = req.body.sessionName;
        axios.post(sessionUrl + '/chat/join', {sessionName: sessionName}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });

    
    });

    app.post("/chat/send/:room"), function(req, res) {
        let room = req.params.room
        let message = req.body.message
        let userId = req.body.userId

        axios.post(sessionUrl + '/chat/send/:room', {room: room, message: message, userId: userId}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    }



    app.get("/chat", function(req, res) {
        //Get session creation data from post request
        let sessionId = req.query.sessionId;

        axios.get(sessionUrl + '/chat', {
            params: {
                sessionId: sessionId
            }
        }).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    // app.post("/messsage/create", function(req, res) {
    //     // console.log('chat created post')
    //     // Get session creation data from post request
    //     let sessionName = req.body.sessionName;
    //     let messageContent = req.body.messageContent
    //     axios.post(sessionUrl + '/message/create', {userId: userId, sessionName: sessionName, replyTo: null, messsageContent: messageContent}).then(function (response) {
    //         res.send(response.data);
    //     }).catch(function (error) {
    //         res.send(error);
    //     });
    // });
}