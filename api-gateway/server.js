const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios');

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
