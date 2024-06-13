import { Router } from "express";
import {
  addToCart,
  deleteOrder,
  deleteItemInOrder,
  placeOrder,
  showCart,
} from "../controller/cart.js";
import checkProductExistsMiddleware from "../middleware/checkProductExists.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Show cart
router.get("/:id", showCart);

// Add item to cart
router.post("/", checkProductExistsMiddleware, addToCart)

// Place order
router.post("/order", placeOrder);

// Delete order
router.delete("/", authMiddleware, deleteOrder)

// Delete item in order
router.delete("/item", authMiddleware, deleteItemInOrder)

export default router;