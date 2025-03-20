import express from "express";
import dotenv from "dotenv";

const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data

// Sample route
app.get("/", (req, res) => {
  res.send("Express server is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
