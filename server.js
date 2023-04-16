//code not given,

// Import required modules
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Initialize the express app and define the port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up API routes
app.use("/api", apiRoutes);

// Set up HTML routes
app.use("/", htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
