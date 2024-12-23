require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.dbURI;
const PORT = process.env.PORT || 5000;

console.log("MongoDB URI:", dbURI);

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/posts", require("./routes/posts"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
