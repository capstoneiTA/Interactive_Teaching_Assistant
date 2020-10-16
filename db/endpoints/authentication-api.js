const bcrypt = require("bcryptjs");

module.exports = function(app, db) {

    /**
     * Creates a new session if the name is not already taken
     * @param sessionName {String} name of the session the user wishes to create
     * @param CreatedBy {int} id of the user attempting to create the session
     * @returns {dbAdd: {Boolean}, verified: {Boolean}}
     */
    app.post("/signup", function(req, res) {
        //Get session creation data from post request
        let email = req.body.email;
        let password = req.body.password;

        let response = {};

        db.User.findOne({
                    where: {
                        'Email': Email
                    }
                }).then(function (User) {
                    if (User == null) {
                       response.user = false;
                       response.message = 'user does not exist';
                       res.send(response);

                    }
                    if (bcrypt.compareSync(password, User.Password)) {

                        response.user = User;
                        response.message = 'user exists with right password';
                        res.send(response);
                    }
                    response.user = false;
                    response.message = 'Wrong username password combination';
                    res.send(response);
                })
    });
}