//Import express for db requests
const express = require('express');
const app = express();

//Set up port
const port = 5000;

// Import models folder
const db = require("./models");

//Sync database tables
db.sequelize.sync({force:true});

//Start listening for connections
app.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});