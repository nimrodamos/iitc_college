import Joke from "../models/jokeModel.js";

// Get all jokes
export const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.find({});
    res.status(200).json(jokes);
  } catch (error) {
    console.error("Error fetching jokes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a joke by ID
export const getJokeById = async (req, res) => {
  try {
    const { id } = req.params;
    const joke = await Joke.findById(id);
    if (!joke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res.status(200).json(joke);
  } catch (error) {
    console.error("Error fetching joke by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new joke
export const createJoke = async (req, res) => {
  try {
    const { content, category } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const newJoke = new Joke({ content, category });
    await newJoke.save();
    res
      .status(201)
      .json({ message: "Joke created successfully", joke: newJoke });
  } catch (error) {
    console.error("Error creating joke:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a joke by ID
export const updateJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJoke = await Joke.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedJoke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res
      .status(200)
      .json({ message: "Joke updated successfully", joke: updatedJoke });
  } catch (error) {
    console.error("Error updating joke:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a joke by ID
export const deleteJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJoke = await Joke.findByIdAndDelete(id);
    if (!deletedJoke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res
      .status(200)
      .json({ message: "Joke deleted successfully", joke: deletedJoke });
  } catch (error) {
    console.error("Error deleting joke:", error);
    res.status(500).json({ error: "Server error" });
  }
};
