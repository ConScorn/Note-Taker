// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require("util");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


let notes = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));




// start the server
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));