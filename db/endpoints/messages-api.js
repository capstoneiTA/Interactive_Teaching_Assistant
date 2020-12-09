module.exports = function (app, db) {
  app.post("/messages/create", function (req, res) {
    //Get session creation data from post request
    let Session_ID = req.body.Session_ID;
    let Message_Content = req.body.Message_Content;
    let user = req.body.user;
    let replyTo = req.body.replyTo;
    // console.log("req.body in db", req.body);
    let response = {};

    db.Message.create({
      User_ID: user.id,
      Session_ID: Session_ID,
      Message_Content: Message_Content,
      ReplyTo: replyTo,
    })
      .then((result) => {
        // console.log("DBRES", result);
        response.messageCreation = true;
        response.Message_Content = result.dataValues.Message_Content;
        response.Session_ID = Session_ID;
        response.user = user;
        response.replyTo = replyTo;
        response.createdAt = result.dataValues.createdAt;
        response.Message_ID = result.dataValues.Message_ID;

        // console.log("messageResponse", response);
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
      include: {
        model: db.User,
      },
      where: {
        Session_ID: sessionId,
      },
    })
      .then((Messages) => {
        messages = [];
        for (let msg of Messages) {
          response = {};
          response.Message_Content = msg.dataValues.Message_Content;
          response.user = {
            id: msg.dataValues.User_ID,
            firstName: msg.User.firstName,
            lastName: msg.User.lastName,
          };
          response.createdAt = msg.dataValues.createdAt;
          response.Message_ID = msg.dataValues.Message_ID;
          response.ReplyTo = msg.dataValues.ReplyTo;
          response.Session_ID = msg.dataValues.Session_ID;
          messages.push(response);
          // console.log(msg.User.firstName);
          // console.log(msg.User.lastName);
          // console.log(msg.dataValues.User_ID);
          // console.log(msg.dataValues.Session_ID);
          // console.log(msg.dataValues.createdAt);
          // console.log(msg.dataValues.Message_Content);
          // console.log(msg.dataValues.Message_ID);
          // console.log(msg.dataValues.ReplyTo);
          // console.log();
          // console.log();
        }
        // console.log("db messages", Messages);
        // response.messages = Messages;
        res.send(messages);
      })
      .catch(function (error) {
        res.send(error);
      });
  });
};
