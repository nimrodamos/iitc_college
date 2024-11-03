import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false, // שדה אופציונלי
  },
  category: {
    type: String,
    required: false, // שדה אופציונלי
  },
  inStock: {
    type: Boolean,
    default: true, // ברירת מחדל - true
  },
});

export default mongoose.model("Product", productSchema);
