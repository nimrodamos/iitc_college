import express from "express";
import morgan from "morgan";
import logRequest from "./middleware/logger.js";
import jokesRoutes from "./routes/jokesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import authUser from "./middleware/auth.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000
const uri = process.env.DB_URI; // Ensure this is set in the .env file

app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan("tiny")); // Logging middleware for requests
app.use(logRequest); // Custom middleware for logging requests

// Connect to MongoDB with error handling
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.use("/api/jokes", jokesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
