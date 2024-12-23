const mongoose = require("mongoose");

// הגדרת הסכימה
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
); // timestamps מוסיף createdAt ו-updatedAt

module.exports = mongoose.model("Post", postSchema);
