// controllers/userController.js
const User = require("../models/userModel.js");

// Add new user
const createUser = async (req, res) => {
  try {
    const { fName, lName, phoneNumber, email } = req.body;
    if (!fName || !lName || !phoneNumber || !email) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const user = new User({ fName, lName, phoneNumber, email });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).send({ message: "User not found" });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
