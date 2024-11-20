import express from "express";
import morgan from "morgan"; // Middleware for logging
import logRequest from "./middleware/logger.js"; // Custom logging middleware
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import authUser from "./middleware/auth.js"; // להשאיר בהערה לצורך בדיקות

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000
const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in the .env file

// Middleware to parse JSON bodies
app.use(express.json());
// Logging middleware for HTTP requests
app.use(morgan("tiny"));
// Custom middleware for logging requests
app.use(logRequest);

// Connect to MongoDB with error handling
mongoose
  .connect(MONGO_URI)

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Uncomment this if you need authentication middleware for protected routes
// app.use(authUser);

// Uncomment this if you need to serve static files from the 'public' directory
// app.use(express.static("public"));

// Endpoint to check server status
app.get("/api/status", (req, res) => {
  res.send({ status: "server is running" });
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
