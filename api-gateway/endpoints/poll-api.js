/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;

module.exports = function(app, axios) {

    app.post("/poll/create", function(req, res) {
        // Get session creation data from post request
        let pollName = req.body.pollName;
        let userId = req.body.userId;

        axios.post(sessionUrl + '/poll/create', {pollName: pollName, userId: userId}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });
};