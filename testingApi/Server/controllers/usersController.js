import User from "../models/userModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // קבלת ה-ID מהבקשה
    const user = await User.findById(id); // חיפוש היוזר לפי ID
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // החזרת 404 אם היוזר לא נמצא
    }
    res.status(200).json(user); // החזרת היוזר שנמצא
  } catch (error) {
    console.error("Error fetching user by ID:", error); // הדפסת שגיאה לקונסול
    res.status(500).json({ error: "Server error" }); // החזרת שגיאת שרת אם משהו נכשל
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = new User({ name, email, age, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
