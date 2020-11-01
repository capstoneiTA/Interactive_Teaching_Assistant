/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';
const ClassChat = require("../services/ClassChat.js");

module.exports = function(app, axios, io) {
    //keeps track of created sessions to prevent creating multiple sessions
    let chatList = [];

    app.post("/chat/update", function(req, res) {
        // Get session creation data from post request
        let messageContent = req.body.messageContent;
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;
        let timeStamp = req.body.timeStamp;
        let replyTo = req.body.replyTo;
        let response = {}
        response.messageContent = messageContent //= {messageContent: messageContent, sessionId: sessionId, userId: userId, timeStamp: timeStamp, replyTo: replyTo}
        response.sessionId = sessionId
        response.userId = userId
        console.log('response session', response)
        res.send(response);

    });

    app.post("/chat/join", function(req, res) {
        // console.log('chat created post')
        // Get session creation data from post request
        let sessionName = req.body.sessionName;
        let response = {};
        if(!chatList.includes(sessionName)) {
            const classChat = new ClassChat(sessionName, io);
            chatList.push(sessionName);
            response.chat_already_created = false;
            response.chat_created = true;
            res.send(response);
        } else {
            response.chat_already_created = true;
            response.chat_created = true;
            res.send(response);
        }
    });

    app.post("/chat/send/:room", function(req, res) {
        // Get session creation data from post request
        let room = req.params.room
        let message = req.body.message
        let userId = req.body.userId
        let response = {}
        response.room = room //= {messageContent: messageContent, sessionId: sessionId, userId: userId, timeStamp: timeStamp, replyTo: replyTo}
        response.message= message
        response.userId = userId
        console.log('response session', response)
        io.sockets.in(room).emit('message', {room:room, message: message, userId: userId})
        res.send(response);

    });

    app.get("/chat", function(req, res) {
        //Get session creation data from post request
        let sessionId = req.query.sessionId;

        axios.get(dbUrl + '/chat', {
            params: {
                sessionId: sessionId
            }
        }).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    // app.post("/message/create", function(req, res) {
    //     console.log('message created post')
    //     // Get session creation data from post request
    //     let sessionName = req.body.sessionName;
    //     let messageContent = req.body.messageContent
    //     let response = {};
    //     response.sessionName = sessionName
    //     response.messageContent = messageContent
    //     res.send(response);
    // });
}