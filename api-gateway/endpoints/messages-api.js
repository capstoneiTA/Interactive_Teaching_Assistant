/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = "http://session:7000";

module.exports = function (app, axios, io) {
  //keeps track of created sessions to prevent creating multiple sessions
  let Chat = [];

  app.post("/messages/create", function (req, res) {
    // console.log('chat created post')
    // Get session creation data from post request
    let Session_ID = req.body.Session_ID;
    let Message_Content = req.body.Message_Content;
    let user = req.body.user;
    let replyTo = req.body.replyTo;

    axios
      .post(sessionUrl + "/messages/create", {
        Session_ID: Session_ID,
        Message_Content: Message_Content,
        user: user,
        replyTo: replyTo,
      })
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
  });

  app.get("/messages/get", function (req, res) {
    //Get session creation data from post request
    let sessionId = req.query.sessionId;

    axios
      .get(sessionUrl + "/messages/get", {
        params: {
          sessionId: sessionId,
        },
      })
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
  });
};
