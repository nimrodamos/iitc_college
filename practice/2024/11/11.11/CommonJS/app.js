const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/user", (req, res) => {
  res.send({
    name: "john doe",
    age: 30,
    email: "johndoe@gmail.com",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
