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

//Set Relationships
db.User.hasMany(db.Message); //Set one to many relationship
db.Message.belongsTo(db.User);

db.Session.hasMany(db.Message); //Set one to many relationship
db.Message.belongsTo(db.Session);

db.Poll.hasMany(db.Poll_Question);
db.Poll_Question.belongsTo(db.Poll);

db.Poll_Question.hasMany(db.Poll_Option);
db.Poll_Option.belongsTo(db.Poll_Question);

db.Poll.hasMany(db.Poll_Response);
db.Poll_Response.belongsTo(db.Poll);

//is this right relationship?
db.Poll_Response.hasOne(db.Poll_Option);



//Sync database tables
db.sequelize.sync({force:true});

app.get('/word', (req,res)=>{
    res.send('Response from the database!');
});

//Start listening for connections
app.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});