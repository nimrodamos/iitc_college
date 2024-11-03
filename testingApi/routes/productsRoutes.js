import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productsController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

//GET product by id
router.get("/:id", getProductById);

// POST a new product
router.post("/", createProduct);

// PATCH (update) a product by ID
router.patch("/:id", updateProduct);

// DELETE a product by ID
router.delete("/:id", deleteProduct);

export default router;
