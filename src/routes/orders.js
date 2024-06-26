import { Router } from "express";
import { getOrdersByCustomerId, getOrderByOrderId } from "../controller/order.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Show order by customer ID
router.get("/:id", authMiddleware, getOrdersByCustomerId)

// Show confirmation by order ID
router.get("/confirmation/:id", authMiddleware, getOrderByOrderId)

export default router;