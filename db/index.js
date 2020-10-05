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

db.Session.hasMany(db.Message);
db.Session.hasMany(db.Enrollment);
db.Session.hasMany(db.UnderstandingMeter);

db.UnderstandingMeter.belongsTo(db.Session);

db.Enrollment.hasMany(db.Users);

db.Multiple_Choice_Option.belongsTo(db.Quiz_Question);
db.FillInTheBlankOption.belongsTo(db.Quiz_Question);




//Sync database tables
db.sequelize.sync({force:true});

app.get('/word', (req,res)=>{
    res.send('Response from the database!');
});

//Start listening for connections
app.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});