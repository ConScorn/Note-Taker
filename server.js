// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require("util");
const uniqid = require("uniqid");

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

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uniqid();
  fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data);
        parseData.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(parseData), err => {
            if (err) throw err;
            res.json(parseData)
        })
    })
})

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const noteArr = JSON.parse(data).filter((note) => note.id !== req.params.id);
        fs.writeFile("./db/db.json", JSON.stringify(noteArr), err => {
            if (err) throw err;
            res.json(data)
        })
    })
  
});


// start the server
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));