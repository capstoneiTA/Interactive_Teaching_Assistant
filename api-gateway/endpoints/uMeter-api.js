/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;

module.exports = function(app, axios) {

    app.post("/uMeter/update", function(req, res) {
        // Get session creation data from post request
        let uValue = req.body.uValue;
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;
        let timeStamp = req.body.timeStamp;

        axios.post(sessionUrl + '/uMeter/update', {uValue: uValue, sessionId: sessionId, userId: userId, timeStamp: timeStamp}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.post("/uMeter/create", function(req, res) {
        // Get session creation data from post request
        let sessionId = req.body.sessionId;
        let userId = req.body.userId;

        axios.post(sessionUrl + '/uMeter/create', {sessionId: sessionId, userId: userId}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });
};