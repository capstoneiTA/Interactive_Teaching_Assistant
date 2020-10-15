/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;


module.exports = function(app, axios) {
    //Authenticates user for session creation
    //User must be a teacher
    app.post("/session/create",function(req, res) {
        //Get session creation data from post request
        let sessionName = req.body.sessionName;
        let CreatedBy = req.body.CreatedBy;

        axios.post(sessionUrl + '/session/create', {sessionName: sessionName, CreatedBy: CreatedBy}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

};