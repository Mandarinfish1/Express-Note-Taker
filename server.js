
// Import required modules
import express from "express";
import apiRoutes from "./routes/apiRoutes.js";
import htmlRoutes from "./routes/htmlRoutes.js";


const PORT = process.env.PORT || 3001
const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  express.static("public")
);

// Initialize routes
app.use("/api", apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


