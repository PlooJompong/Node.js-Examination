import express from "express";
import { register, login, getAllCustomers } from "../controller/customer.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login 
router.post("/login", login);

// Show all customers
router.get("/", getAllCustomers)

export default router;