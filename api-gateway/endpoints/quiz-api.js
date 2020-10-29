/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;


module.exports = function(app, axios) {


    /**
     * Creates a new quiz with the json quiz object
     * @param quiz {Object} quiz object containing all quiz information
     * @param userId {int} id of the user attempting to create the quiz
     * @returns {questionsCreate {boolean}} if true, then the quiz was successfully added
     */
    app.post("/quiz/create", function(req, res) {
        //Get session creation data from post request
        let userId = req.body.userId;
        let quiz = req.body.quiz;
        let quizType = req.body.quizType;

        axios.post(sessionUrl + '/quiz/create', {userId: userId, quiz: quiz, quizType: quizType}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });

    /**
     * Creates a new quiz with the json quiz object
     * @param quiz {Object} quiz object containing all quiz information
     * @param userId {int} id of the user attempting to create the quiz
     * @returns {questionsCreate {boolean}} if true, then the quiz was successfully added
     */
    app.get("/quiz/retrieve", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;

        axios.get(sessionUrl + '/quiz/retrieve', {params: {userId: userId}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    });
};