import { Router } from "express";
import {
  adminRegister, adminLogin, getAllCustomers
} from "../controller/admin/admin.js";
import adminAuthMiddleware from "../middleware/admin/adminAuth.js";

const router = Router()

// Register as Admin
router.post("/register", adminAuthMiddleware, adminRegister)

// Login as Admin
router.post("/login", adminLogin)

// Create new discount
router.post("/discount", adminAuthMiddleware,)

// Create new product
router.post("/products", adminAuthMiddleware,)

// Delete product
router.delete("/products", adminAuthMiddleware,)

// Update product
router.put("/products", adminAuthMiddleware,)

// Get all customers
router.get("/customers", adminAuthMiddleware, getAllCustomers)

export default router