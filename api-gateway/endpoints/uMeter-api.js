/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';

module.exports = function(app, axios) {

    app.post("/session/create", function(req, res) {
        // Get session creation data from post request
        let scoreValue = req.body.uScore;

        axios.post(apiGatewayUrl + '/uMeter/update', {uScore: scoreValue}).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    });

};