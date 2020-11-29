/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = "http://db:5000";

module.exports = function (app, axios, io) {
  //keeps track of created sessions to prevent creating multiple sessions

  app.post("/messages/create", function (req, res) {
    // Get session creation data from post request
    let userId = req.body.userId;
    let sessionId = req.body.sessionId;
    let messageContents = req.body.messageContents;

    axios
      .post(dbUrl + "/messages/create", {
        userId: userId,
        sessionId: sessionId,
        messageContents: messageContents,
        replyTo: null,
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
      .get(dbUrl + "/messages/get", {
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
