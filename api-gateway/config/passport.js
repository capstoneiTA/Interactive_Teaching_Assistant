//we import passport packages required for authentication
const axios = require("axios");
const dbUrl = "http://db:5000"
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");


passport.use(new LocalStrategy(
        { usernameField : "email",
          passwordField : "password"
        },
          async function(email, password, done) {
        //modify to: post request to database
        //return done(null,true);
       let response = await axios.post(dbUrl+'/signup', {email: email, password:password});
       return done(null,response.user,{message: response.message});
    }
))



passport.serializeUser(function(user, done) {
    done(null, user.User_ID);
})

passport.deserializeUser(function(id, done) {
    db.User.findOne({
        where: {
            'User_ID': id
        }
    }).then(function (user) {
        if (user == null) {
            done(new Error('Wrong user id.'))
        }

        done(null, user)
    })
});

// Exporting our configured passport
module.exports = passport;
