const express = require("express");
const router = express.Router();
const path = require("path");

// Serve the notes.html file at the /notes route
router.get("/notes", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "notes.html"));
});

// Serve the index.html file for all other routes
router.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

module.exports = router;
