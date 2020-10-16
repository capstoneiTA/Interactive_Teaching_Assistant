/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';

module.exports = function(app, axios) {

    app.post("/uMeter/update", function(req, res) {
        // Get session creation data from post request
        let scoreValue = req.body.uScore;

        axios.post(dbUrl + '/uMeter/update', {uScore: scoreValue}).then(function (response) {
            console.log(response);
            res.send(response.data);
        }).catch(function (error) {
            console.log(error);
            res.send(error);
        });
    });

};