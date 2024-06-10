import express from "express";
import { userRegister, userLogin } from "../controller/customer.js";

const router = express.Router();

// Register a new user
router.post("/register", userRegister);

// User login 
router.post("/login", userLogin);

export default router;