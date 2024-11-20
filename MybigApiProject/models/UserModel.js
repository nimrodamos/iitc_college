import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // מבטיח שלא יהיו כפילויות באימיילים
  },
  role: {
    type: String,
    enum: ["Admin", "Member"], // ערכים אפשריים בלבד
    default: "Member", // ברירת מחדל
  },
});

export default mongoose.model("User", userSchema);
