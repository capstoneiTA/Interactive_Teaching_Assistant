const dbUrl = 'http://db:5000';
const passport = require ("../config/passport");
module.exports = function(app,axios)
{
    app.post("/signup", function(req,res){

        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let type = req.body.type;

        axios.post(dbUrl + '/signup', {email: email, password: password, firstName: firstName, lastName: lastName, type: type}).then(function(response){
          res.send(response.data);
        }).catch(function(error){
           res.send(error);
        });
      }

    );

    app.post('/login', passport.authenticate('local', {successRedirect: '/success', failureRedirect: '/failure', failureFlash: false}),function(req,res){
            res.json('/');
    });

    app.get('/success', function(req, res){
        res.send('success');
    });

    app.get('/failure', function(req, res){
        res.send('failure');
    });

 };