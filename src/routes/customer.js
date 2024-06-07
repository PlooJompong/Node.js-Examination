import express from "express";
import { register, login } from "../controller/customer.js";
import customersDB from "../database/database.js";

const router = express.Router();

// Endpoint for user registration
router.post("/register", register);

// Endpoint for user login
router.post("/login", login);

// GET endpoint to fetch all customers
router.get("/", async (req, res) => {
  try {
    // Fetch all customers from the database
    const customers = await customersDB.customers.find({});
    if (customers) {
      // Send back all customers as a response
      res.json(customers);
    } else {
      // No customers found
      res.status(404).json({ error: "No customers found" });
    }
  } catch (error) {
    // Handle errors if customers cannot be fetched
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

export default router;