import { Router } from "express";
import { getOrdersByCustomerId, getOrderByOrderId } from "../controller/order.js";
import authenticate from "../middleware/auth.js";

const router = Router();

// Show order by customer ID
router.get("/:id", authenticate, getOrdersByCustomerId)

// Show confirmation by order ID
router.get("/confirmation/:id", authenticate, getOrderByOrderId)

export default router;