//code not given

const express = require("express");
const store = require("../db/store");
const router = express.Router();

router.get("/notes", async (req, res, next) => {
  try {
    const notes = await store.getNotes()
    res.json(notes)
  } catch (error) {
    next(error)
  }
})

router.post("/notes", async (req, res, next) => {
  try {
    const note = await store.addNote(req.body)
    res.json(note)
  } catch (error) {
    next(error)
  };
});

router.delete("/notes/:id", async (req, res, next) => {
  try {
    await store.removeNote(req.params.id)
    res.json({ message: "Note successfully deleted." })
  } catch (error) {
    next(error)
  }
});

module.exports = router;

