/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';

module.exports = function(app, db) {

    //Authenticates user for session creation
    //User must be a teacher
    app.post("/session/create", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.body.sessionName;
        let CreatedBy = req.body.CreatedBy;


        db.User.findOne({
            where:{
                'User_ID': CreatedBy,
            }
        }).then(function(User) {
            if(User.type === 'Teacher'){
                res.send(true);
            }else{
                res.send(false);
            }
        }).catch(function(error){
            res.send(error);
        });


    });

};