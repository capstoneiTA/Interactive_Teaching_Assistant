/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = "http://db:5000";
const ClassChat = require("../services/ClassChat.js");

module.exports = function (app, axios, io) {
  //keeps track of created sessions to prevent creating multiple sessions
  let chatList = [];

  app.post("/chat/join", function (req, res) {
    // console.log('chat created post')
    // Get session creation data from post request
    let sessionName = req.body.sessionName;

    let response = {};
    if (!chatList.includes(sessionName)) {
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
};
