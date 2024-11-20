import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // שדה אופציונלי
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"], // ערכים אפשריים בלבד
    default: "To Do", // ברירת מחדל
  },
  dueDate: {
    type: Date,
    required: false, // שדה אופציונלי
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true, // חובה לקשר למשימה פרויקט
  },
});

export default mongoose.model("Task", taskSchema);
