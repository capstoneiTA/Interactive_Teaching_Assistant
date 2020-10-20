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

    app.post('/login', passport.authenticate('local', {failureRedirect: '/failure'}),function(req,res){
        let response = {};
        response.success = true;
        response.user = req.user;
        res.send(response);
    });

    app.get('/failure', function(req, res){
        let response = {};
        response.success = false;
        res.send('failure');
    });

    app.get('/userInfo', function(req, res){
        let userId = req.query.userId;
        axios.get(dbUrl + '/userInfo', {params: {userId: userId}}).then(function(response){
            res.send(response.data);
        }).catch(function(error){
            res.send(error);
        });
    })

 };