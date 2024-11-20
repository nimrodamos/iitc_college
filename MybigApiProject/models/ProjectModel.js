import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // שדה אופציונלי
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"], // ערכים אפשריים בלבד
    default: "Not Started", // ברירת מחדל
  },
  createdAt: {
    type: Date,
    default: Date.now, // ברירת מחדל לזמן הנוכחי
  },
});

export default mongoose.model("Project", projectSchema);
