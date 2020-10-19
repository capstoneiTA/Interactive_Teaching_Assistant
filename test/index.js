const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());

const PORT = 9000;


app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
});