//Import express for requests
const express = require('express');
const app = express();
const cors = require('cors');

//Socket.io setup
const http = require('http').createServer(app);
const Server = require('socket.io');
const io = new Server(http);


//Prevent cors issues from inter-container communication
app.use(cors());

//Set up port
const port = 7000;

io.on('connection', (socket)=>{
    console.log('hurray!');
});

//Start listening for connections
http.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});


