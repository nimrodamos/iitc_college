import express from "express";
import morgan from "morgan";

const app = express();

const PORT = 3000;

// Dummy DB Import
import jokes from "./db/jokes.json" assert { type: "json" };
import users from "./db/users.json" assert { type: "json" };
import products from "./db/products.json" assert { type: "json" };

// console.log(jokes);

// For parsing application/json
app.use(express.json());
app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/status", (req, res) => {
  res.send({
    message: "Server is UP",
  });
});

// Jokes Routes

// Get Random Jokes
app.get("/api/jokes/random", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(randomJoke);
});

// Get Joke by ID
app.get("/api/jokes/:id", (req, res) => {
  const id = +req.params["id"];

  const data = jokes.find((joke) => joke.id === id);

  console.log(data);

  if (data) {
    res.send(data);
  }

  res.send({
    error: "Error",
  });
});

// Add new Joke
app.post("/api/jokes/", (req, res) => {
  const newJoke = req.body;

  jokes.push(newJoke);
  res.send({
    message: "New Joke Added",
    joke: newJoke,
  });
});

// Users Routes
app.get("/api/users/random", (req, res) => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.send(randomUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
