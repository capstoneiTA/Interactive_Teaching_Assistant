/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;

module.exports = function(app, axios) {

    app.post("/poll/create", function(req, res) {
        // Get session creation data from post request
        let poll = req.body.poll;
        let userId = req.body.userId;

        axios.post(sessionUrl + '/poll/create', {poll: poll, userId: userId}).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.get("/poll/retrieve", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;

        axios.get(sessionUrl + '/poll/retrieve', {params: {userId: userId}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    app.get("/poll/start", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.query.sessionName;

        axios.get(sessionUrl + '/poll/start', {params: {sessionName: sessionName}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });


};