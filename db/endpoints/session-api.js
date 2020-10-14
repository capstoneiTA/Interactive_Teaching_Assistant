/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';

module.exports = function(app, db) {

    app.post("/session/create", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.body.sessionName;
        let CreatedBy = req.body.CreatedBy;
        let response = {};

        db.User.findOne({
            where:{
                'User_ID': CreatedBy,
            }
        }).then(function(User) {
            if(User.type === 'Teacher'){
                response.verified = true;
                db.Session.create({
                    CreatedBy: CreatedBy,
                    Session_Name: sessionName,

                }).then(function(){
                        response.dbAdd = true;
                        res.send(response);
                    }
                ).catch(function(error){
                    response.dbAdd = error.message;
                    res.send(response);
                });
            }else{
                response.verified = false;
                res.send(response);
            }
        }).catch(function(error){
            res.send(error);
        });
    });

    app.post("/session/join", function(req, res) {
        //Get session creation data from post request
        let sessionName = req.body.sessionName;
        let userId = req.body.userId;
        let response = {};

        db.Session.findOne({
            where:{
                'Session_Name': sessionName,
            }
        }).then(function(Session) {
            response.sessionExists = (Session !== null);
            if(response.sessionExists){
                db.Enrollment.findOne({
                    where:{
                        'Session_ID': Session.Session_ID,
                        'User_ID': userId
                    }
                }).then(function(Enrollment){
                    response.enrollmentExists = (Enrollment !== null);
                    if(!response.enrollmentExists){
                        db.Enrollment.create({
                            'Session_ID': Session.Session_ID,
                            'User_ID': userId,

                        }).then(function(){
                                response.dbAdd = true;
                                res.send(response);
                            }
                        ).catch(function(error){
                            response.dbAdd = error.message;
                            res.send(response);
                        });
                    }else{
                        response.dbAdd = false;
                        res.send(response);
                    }
                })
            }else{
                res.send(response);
            }
        }).catch(function(error){
            res.send(error);
        });
    });

};

