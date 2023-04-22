const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const noteHandler = {
  // Read the contents of the database file
  async read() {
    const data = await fs.promises.readFile("db/db.json", "utf8")
    return JSON.parse(data);
  },

  // Write data to the database file
  async write(data) {
    await fs.promises.writeFile("db/db.json", JSON.stringify(data))
  },

  // Get all notes from the database file
  async getNotes() {
    return await this.read()
  },

  // Add a new note to the database
  async addNote({ title, text }) {
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank")
    }

    // Create a new note with a unique ID
    const newNote = { title, text, id: uuidv4() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    const notes = await this.getNotes();
    notes.push(newNote);
    await this.write(notes);
    return newNote;
  },

  // Remove a note from the database
  async removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    const notes = await this.getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    await this.write(updatedNotes);
  },
};

module.exports = noteHandler;
