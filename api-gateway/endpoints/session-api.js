/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;


module.exports = function(app, axios) {


    /**
     * Creates a new session if the name is not already taken
     * @param sessionName {String} name of the session the user wishes to create
     * @param CreatedBy {int} id of the user attempting to create the session
     * @returns {dbAdd: {Boolean}, verified: {Boolean}}
     */
    app.post("/session/create", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.body.sessionName;
        let CreatedBy = req.body.CreatedBy;

        axios.post(sessionUrl + '/session/create', {sessionName: sessionName, CreatedBy: CreatedBy}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    /**
     * Enrolls user in a session and starts it if it hasn't started yet
     * @param sessionName {String} name of the session the user wishes to join
     * @param userId {int} id of the user requesting to join the session
     * @returns {dbAdd: {Boolean}, sessionExists: {Boolean}, sessionName: {String}, sessionId: {int}}
     */
    app.post("/session/join", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.body.sessionName;
        let userId = req.body.userId;

        axios.post(sessionUrl + '/session/join', {sessionName: sessionName, userId: userId}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    /**
     * Gets the enrollments for a specified user (***if they are authenticated***)
     * @param userId {int} id of the user requesting the enrollment list
     * @returns {dbSuccess: {Boolean}, enrollments: {Session[]}}
     */
    app.get("/session/enrollments", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;

        axios.get(sessionUrl + '/session/enrollments', {
            params: {
                userId: userId
            }
        }).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });
};