import { error } from "console";
import db from "../../database/database.js";
import hashPassword from "../../utils/hashPassword.js";

// Admin registration
const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUsername = await db.admin.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Add the new admin to the database
    const newAdmin = await db.admin.insert({
      username,
      password: hashPassword(password),
    });

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Log in
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const admin = await db.admin.findOne({ username: username, password: hashedPassword });

    if (admin) {
      global.isAdmin = true
      res.status(200).json({ message: "Login successful", admin });
    }
    else {
      global.isAdmin = false
      res.status(400).json({ error: "Invalid username or password" });
    }

  } catch {
    res.status(500).json({ error: error.message });
  }
}

const getAllCustomers = async (req, res) => {
  try {
    const customers = await db.customers.find({});
    if (customers.length > 0) {
      res.json(customers);
    } else {
      res.status(404).json({ error: "No customers found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { adminRegister, adminLogin, getAllCustomers }