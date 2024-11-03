import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/usersController.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

//get user by id:
router.get("/:id", getUserById);

// POST a new user
router.post("/", createUser);

// PATCH (update) a user by ID
router.patch("/:id", updateUser);

// DELETE a user by ID
router.delete("/:id", deleteUser);

export default router;
