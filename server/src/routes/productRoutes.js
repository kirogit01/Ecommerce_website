import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;