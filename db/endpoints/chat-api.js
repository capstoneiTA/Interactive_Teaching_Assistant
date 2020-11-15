module.exports = function (app, db) {
  // app.post("/chat/join", function(req, res) {
  //     let uValue = req.body.uValue;
  //     let sessionId = req.body.sessionId;
  //     let userId = req.body.userId;
  //     let timeStamp = req.body.timeStamp;
  //     let response = {};
  //     // Get session creation data from post request
  //     db.UnderstandingMeter.create({
  //         Session_ID: sessionId,
  //         User_ID: userId,
  //         Understanding_Value: uValue,
  //         Timestamp: timeStamp,
  //     }).then(function(){
  //             response.uChangeAdd = true;
  //             res.send(response);
  //         }
  //     ).catch(function(error){
  //         response.uChangeAdd = error.message;
  //         res.send(response);
  //     });
  // });
  // app.post("/uMeter/create", function(req, res) {
  //     let sessionId = req.body.sessionId;
  //     let userId = req.body.userId;
  //     let response = {};
  //     // Get session creation data from post request
  //     db.Enrollment.findOne({
  //         where: {
  //             Session_ID: sessionId,
  //             User_ID: userId
  //         }
  //     }).then(function(Enrollment) {
  //         if (Enrollment !== null) {
  //             response.isEnrolled = true;
  //             db.Session.findOne({
  //                 where: {
  //                     Session_ID: sessionId,
  //                 }
  //             }).then(function(Session){
  //                 response.sessionName = Session.Session_Name;
  //                 res.send(response);
  //             }).catch(function(error){
  //                 response.sessionName = false;
  //                 res.send(response);
  //             });
  //         } else {
  //             response.isEnrolled = false;
  //             response.sessionName = false;
  //             res.send(response);
  //         }
  //     }).catch(function(error){
  //         response.isEnrolled = error;
  //         res.send(response);
  //     });
  // });
};
