//we import passport packages required for authentication
const axios = require("axios");
const dbUrl = "http://db:5000"
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy(
        { usernameField : "email",
          passwordField : "password"
        },
          async function(email, password, done) {
            let response = await axios.post(dbUrl+'/login', {email: email, password:password});
            return done(null,response.data.user,{message: response.data.message});
    }
));



passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Exporting our configured passport
module.exports = passport;
