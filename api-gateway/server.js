const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
 // Parse JSON bodies (as sent by API clients)
app.use(express.json());
//Prevent cors errors

app.use(cors());

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

require("./endpoints/sign_login-api.js")(app, axios);