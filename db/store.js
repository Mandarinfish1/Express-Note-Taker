const util = require("util");
const fs = require("fs");

const uuidv1 = require("uuid/v1");

// Promisify the readFile and writeFile functions of the fs module
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Define a Store class to handle read, write, getNotes and addNote operations
class Store {
  // read the contents of the database file
  async read() {
    return await readFileAsync("db/db.json", "utf8");
  }

  // write data to the database file
  async write(data) {
    return await writeFileAsync("db/db.json", JSON.stringify(data));
  }

  // get all notes from the database file
  async getNotes() {
    const notes = await this.read();

    // Parse the contents of the file and return the notes as an array
    try {
      return JSON.parse(notes);
    } catch (err) {
      return [];
    }
  }

  // add a new note to the database
  async addNote({ title, text }) {
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // create a new note with a unique ID
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    const notes = await this.getNotes();
    const updatedNotes = [...notes, newNote];
    await this.write(updatedNotes);
    return newNote;
  }

  // remove a note from the database
  async removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    const notes = await this.getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await this.write(filteredNotes);
  }
}

module.exports = new Store();
