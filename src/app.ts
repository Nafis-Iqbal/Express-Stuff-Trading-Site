import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import routes from "./routes";

import sequelize from "./Config/database";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

// // Routes
//app.use("/api", routes);

// // Middleware
// app.use(cors()); // Allow requests from frontend
// app.use(express.json()); // Parse JSON data

// // Sample route
// app.get("/", (req: any, res: any) => {
//   res.send("Express server is running...");
// });

// Connect to database
sequelize.sync()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB error:", err));

export default app;
