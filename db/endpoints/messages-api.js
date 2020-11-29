module.exports = function (app, db) {
  app.post("/messages/create", function (req, res) {
    //Get session creation data from post request
    let userId = req.body.userId;
    let sessionId = req.body.sessionId;
    let messageContents = req.body.messageContents;
    let response = {};

    db.Message.create({
      User_ID: userId,
      Session_ID: sessionId,
      Message_Content: messageContents,
      ReplyTo: null,
    })
      .then(function () {
        response.messageCreation = true;
        response.messageContents = messageContents;
        res.send(response);
      })
      .catch(function (error) {
        response.messageCreation = error.message;
        res.send(response);
      });
  });

  app.get("/messages/get", function (req, res) {
    //Get session creation data from post request
    let sessionId = req.query.sessionId;
    let response = {};

    db.Message.findAll({
      where: {
        Session_ID: sessionId,
      },
    })
      .then(function (Messages) {
        response.messages = Messages;
        res.send(response);
      })
      .catch(function (error) {
        res.send(error);
      });
  });
};
