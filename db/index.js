//Import express for db requests
const express = require('express');
const app = express();
const cors = require('cors');


//Prevent cors issues from inter-container communication
app.use(cors());

//Set up port
const port = 5000;

// Import models folder
const db = require("./models");

//Sync database tables
db.sequelize.sync({force:true});

app.get('/word', (req,res)=>{
    res.send('Response from the database!');
});

//Start listening for connections
app.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});