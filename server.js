
// Import required modules
import express from "express";
import apiRoutes from "./routes/apiRoutes.js";
import htmlRoutes from "./routes/htmlRoutes.js";

// Setting the port number
const PORT = process.env.PORT || 3001

// Create an instance of the Express.js application
const app = express();

// Use middleware for parsing JSON and URL-encoded data, and for serving static files
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  express.static("public")
);

// Initialize routes
app.use("/api", apiRoutes); // Use the API routes
app.use(htmlRoutes); // Use the HTML routes

// Start the server and listen for requests on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


