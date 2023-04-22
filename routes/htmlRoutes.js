// Import the modules to be used inside this file
const express = require("express")
const app = express()
const path = require("path")

// Creating a function that defines the routes for serving HTML pages
module.exports = function (app) {
  app.get("/", (req, res) => {
    // Sending the index.html file in response to the GET request
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })

  // Route for the /notes directory
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
  })

  //
  // Catch-all route that redirects to the index.html pag
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })
}
