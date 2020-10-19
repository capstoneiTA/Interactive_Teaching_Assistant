const bcrypt = require("bcryptjs");

module.exports = function(app, db) {

    app.post("/login", function(req, res) {
        //Get session creation data from post request
        let email = req.body.email;
        let password = req.body.password;

        let response = {};

        db.User.findOne({
                    where: {
                        'Email': email
                    }
                }).then(function (User) {
                    if (User == null) {
                       response.user = false;
                       response.message = 'user does not exist';
                       res.send(response);

                    }
                    else if(bcrypt.compareSync(password, User.Password)) {
                        response.user = User;
                        response.message = 'user exists with right password';
                        res.send(response);
                    }else{
                        response.user = false;
                        response.message = 'Wrong username password combination';
                        res.send(response);
                    }
                })
    });

    app.post("/signup", function(req, res) {
        //Get session creation data from post request
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let type = req.body.type;

        let response = {};

        db.User.create({
            Password: password,
            Email: email,
            firstName: firstName,
            lastName: lastName,
            type: type
        }).then(function() {
            response.dbAdd = true;
            res.send(response);
        }).catch(function(error){
            res.send(error);
        })
    });

    app.get("/userInfo", function(req, res) {
        //Get session creation data from post request
        let userId = req.query.userId;

        let response = {};

        db.User.findOne({
            where:{
                User_ID: userId
            }
        }).then(function(User) {
            response.user = User;
            res.send(response);
        }).catch(function(error){
            res.send(error);
        })
    });

};