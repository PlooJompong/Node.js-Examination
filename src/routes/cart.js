import { Router } from "express";
import {
  addToCart,
  deleteOrder,
  deleteItemInOrder,
  placeOrder,
  showCart,
} from "../controller/cart.js";
import checkProductExists from "../middleware/checkProductExists.js";

const router = Router();

// Show cart
router.get("/:id", showCart);

// Add item to cart
router.post("/", checkProductExists, addToCart)

// Place order
router.post("/order", placeOrder);

//Delete order
router.delete("/", deleteOrder)

//Delete item in order
router.delete("/item", deleteItemInOrder)

export default router;