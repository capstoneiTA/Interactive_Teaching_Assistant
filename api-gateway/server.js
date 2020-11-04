const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios');
const passport = require('./config/passport.js');
const session = require("express-session");


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
 // Parse JSON bodies (as sent by API clients)
app.use(express.json());
//Prevent cors errors

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//Prevent cors errors
app.use(cors());

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

const PORT = 8080;

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = `http://db:5000`;

app.get('/word',  (req,res)=>{
  axios.get(dbUrl + '/word').then(function (response) {
    console.log(response.data);
    res.send(response.data);
  })
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});

/**************GET ENDPOINTS**********************/
require("./endpoints/session-api.js")(app, axios);
require("./endpoints/uMeter-api")(app, axios);
require("./endpoints/sign_login-api.js")(app, axios);
require("./endpoints/chat-api")(app, axios);
require("./endpoints/CreateExitTicket-api.js")(app, axios);
require("./endpoints/StudentExitTicket-api.js")(app,axios);