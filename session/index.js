//Import express for requests
const express = require('express');
const app = express();
const cors = require('cors');

//Socket.io setup
const http = require('http').createServer(app);
const Server = require('socket.io');
const io = new Server(http);

//configure express utilities

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


//Prevent cors issues from inter-container communication
app.use(cors());

//Set up port
const port = 7000;

app.post('/connectionTest', (req,res)=>{
    if(req.body.key === 1234){
        res.send("session connected");
    }else{
        res.send(req.body);
    }
});

io.on('connection', (socket)=>{
    console.log('hurray!');
});

//Start listening for connections
http.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});


