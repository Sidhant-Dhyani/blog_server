
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const postRoute = require("./routes/post");

const Port = 4000;

// Connecting to mongoDB. Using atlas uri string.
const connectToDB = () => {
    try {
        mongoose.connect('mongodb+srv://sidhantdhyani99:sidhantdhyani@cluster0.4qmty.mongodb.net/blog');
        console.log('Connected to Atlas.');
    } catch (error) {
        console.log(error.message);
    }
}

connectToDB();

app.use("/api/post", postRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

