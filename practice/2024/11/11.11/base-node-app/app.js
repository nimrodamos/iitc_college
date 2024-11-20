const express = require("express");
const mongoose = require("mongoose");
const userSchema = require(`./models/userModel.js`);
const userRoutes = require("./routes/userRoutes.js");
require("dotenv").config();

const PORT = 3000;
const dbUri = process.env.DB_URI;

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

mongoose.connect(dbUri).then(() => {
  console.log("DB connected");
});
//catch

app.get("./", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});
