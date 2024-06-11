import { Router } from "express";
import {
  adminRegister,
  adminLogin,
  getAllCustomers
} from "../controller/admin/admin.js";
import { addProduct, updateProduct, deleteProduct } from "../controller/admin/menuManagement.js";
import { addProductSchema, updateProductSchema, deleteProductSchema, discountSchema, validateRequest } from "../middleware/admin/productSchema.js";
import adminAuthMiddleware from "../middleware/admin/adminAuth.js";

const router = Router();

// Register as Admin
router.post("/register", adminAuthMiddleware, adminRegister);

// Login as Admin
router.post("/login", adminLogin);

// Create new discount
router.post("/products/discount", adminAuthMiddleware, validateRequest(discountSchema), addDiscount);

// Create new product
router.post("/products", adminAuthMiddleware, validateRequest(addProductSchema), addProduct);

// Update product
router.put("/products", adminAuthMiddleware, validateRequest(updateProductSchema), updateProduct);

// Delete product
router.delete("/products", adminAuthMiddleware, validateRequest(deleteProductSchema), deleteProduct);

// Get all customers
router.get("/customers", adminAuthMiddleware, getAllCustomers);

export default router;