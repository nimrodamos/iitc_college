import express from "express";
import {
  getAllJokes,
  createJoke,
  updateJoke,
  deleteJoke,
  getJokeById,
} from "../controllers/jokesController.js";

const router = express.Router();

// GET all jokes
router.get("/", getAllJokes);

//GET JOKE by id
router.get("/:id", getJokeById);

// POST a new joke
router.post("/", createJoke);

// PATCH (update) a joke by ID
router.patch("/:id", updateJoke);

// DELETE a joke by ID
router.delete("/:id", deleteJoke);

export default router;
