/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = "http://session:7000";

module.exports = function (app, axios, io) {
  //keeps track of created sessions to prevent creating multiple sessions
  let Chat = [];

  app.post("/chat/join", function (req, res) {
    // console.log('chat created post')
    // Get session creation data from post request
    let sessionName = req.body.sessionName;
    axios
      .post(sessionUrl + "/chat/join", { sessionName: sessionName })
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
  });
};
