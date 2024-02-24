const express = require('express');
const mongodb = require("./db");
const cors = require('cors');

const app = express(); // Initialize the express app here

mongodb();
app.use(cors());

const port = 6050;

app.get('/', (req, res) => {
    res.send("The app is ready");
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/Login"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));




app.use(express.json());

app.listen(port, () => {
    console.log("The app is error-free");
});
