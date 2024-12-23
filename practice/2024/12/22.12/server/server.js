require("dotenv").config(); // טוען את משתני הסביבה מה-`.env`

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// חיבור ל-MongoDB Atlas
const dbURI = process.env.dbURI;
const PORT = process.env.PORT || 5000;

console.log("MongoDB URI:", dbURI);

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/posts", require("./routes/posts"));

// הפעלת השרת
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
