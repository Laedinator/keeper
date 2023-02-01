const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

const Note = require("./Note");
//connecting to DB and throw an error if not.
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/keeperApp");
}

//creating routing for:

app
  .route("/")
  //getting all of my notes and return a json to render all notes
  .get(function (req, res) {
    console.log("trying to get the notes from DB");
    Note.find(function (err, foundNotes) {
      if (!err) {
        console.log("Found notes and sending them back");
        res.send(foundNotes);
      } else {
        console.log("Something happened");
        res.send(err);
      }
    });
  })
  //posting a note, look if the same title exists, if not save it in the DB, if yes throw error
  .post(function (req, res) {
    const newNote = new Note({
      title: req.body.note.title,
      content: req.body.note.content,
    });
    newNote.save(function (err) {
      if (!err) {
        res.send("saved " + newNote.title);
      } else {
        res.send(err);
      }
    });
  })

  //delete a note in the DB
  .delete(function (req, res) {
    const deleteNote = req.body.id;
    Note.deleteOne({ _id: deleteNote }, (err) => {
      if (!err) {
        console.log("Deleted Note " + deleteNote);
        res.send("all good");
      } else {
        console.log(err);
        res.send(err);
      }
    });
  });
/*
  //sending back the note content and title with the id, then delete the note.
  .get("/edit", async function (req, res) {
    console.log(req.body);
    const editNote = {
      title: req.body.title,
      noteContent: req.body.content,
    };
    res.send("editing note");
  });
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
