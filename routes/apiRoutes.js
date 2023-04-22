// Import the modules to be used inside this file
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//exporting a function that sets up a GET request to retrieve notes data from a JSON file and send it as a response in JSON format.
module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) throw err
      res.json(JSON.parse(data))
    });
  });

  //creates a new note object and assigns a unique ID to it before saving it to the database.
  app.post("/api/notes", (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()

    //reading the content of the "db.json" file, parses it into a JavaScript object, adds a new note to it, and stores it back to the file.
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) throw err
      const notes = JSON.parse(data);
      notes.push(newNote);

      //writing the newNote object to the db.json file in stringified JSON format and sends the newNote as a response.
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) throw err;
          res.json(newNote);
        }
      )
    });
  });
  // handles an HTTP DELETE request to remove a note from the database by extracting the note ID from the request parameters.
  app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id

    //reading the content of the db.json file, parses the data into a JavaScript object, filters out the note with the given ID, and stores the remaining notes in the updatedNotes variable.
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) throw err
      const notes = JSON.parse(data);
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      //writing the updated notes to the db.json file and sends a JSON response containing a message confirming that the note has been deleted.
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(updatedNotes),
        (err) => {
          if (err) throw err
          res.json({ message: "Note deleted" });
        }
      )
    });
  });
};
