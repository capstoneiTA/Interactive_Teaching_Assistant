/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';

module.exports = function(app, db) {

    app.post("/uMeter/update", function(req, res) {
        let uValue = req.body.uValue;
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;
        let timeStamp = req.body.timeStamp;

        let response = {};
        // Get session creation data from post request
        db.UnderstandingMeter.create({
            Session_ID: sessionId,
            User_ID: userId,
            Understanding_Value: uValue,
            Timestamp: timeStamp,
        }).then(function(){
                response.uChangeAdd = true;
                res.send(response);
            }
        ).catch(function(error){
            response.uChangeAdd = error.message;
            res.send(response);
        });
    });
};