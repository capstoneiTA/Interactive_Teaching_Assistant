
const dbUrl = 'http://db: 5000';
const passport = require ("../config/passport");
module.exports = function(app,axios)
{
    app.post("/signup", function(req,res){

    let email = req.body.Email;
    let password = req.body.Password;

      axios.post(dbUrl + '/signup', {email: email, password: password}).then(function(response){
        res.send(response.data);
      }).catch(function(error){
         res.send(error);
      });
      }

    )
    app.post('/login',passport.authenticate('local'),function(req,res){
            res.send(true);
    })

 }