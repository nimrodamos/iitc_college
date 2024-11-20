const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

// add new user
router.post("/", createUser);

// get all users
router.get("/", getUsers);

// get user by id
router.get("/:id", getUserById);

// update user by id
router.put("/:id", updateUser);

// delete user by id
router.delete("/:id", deleteUser);

module.exports = router;
