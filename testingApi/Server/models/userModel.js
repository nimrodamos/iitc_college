import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // מבטיח שלא יהיו כפילויות באימיילים
  },
  age: {
    type: Number,
    required: false, // שדה אופציונלי
  },
  role: {
    type: String,
    enum: ["Admin", "User"], // ערכים אפשריים בלבד
    default: "User", // ברירת מחדל ל-User
  },
});

export default mongoose.model("Name", nameSchema);
