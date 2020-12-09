//Import express for requests
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

//Prevent cors issues from inter-container communication
app.use(cors());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Socket.io setup
const http = require("http").createServer(app);
const Server = require("socket.io");
const io = new Server(http);

//Set up port
const port = 7000;

//Start listening for connections
http.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

/**************GET ENDPOINTS**********************/
// Requiring our endpoints
require("./endpoints/session-api.js")(app, axios, io);
require("./endpoints/uMeter-api.js")(app, axios, io);
require("./endpoints/chat-api.js")(app, axios, io);
require("./endpoints/messages-api.js")(app, axios, io);
require("./endpoints/quiz-api.js")(app, axios, io);
require("./endpoints/poll-api")(app, axios, io);
require("./endpoints/exitTicket-api.js")(app, axios, io);
