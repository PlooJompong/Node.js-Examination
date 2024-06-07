import db from "../database/database.js";
import crypto from "crypto";

// Hash password
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Register a new user
const register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    // Check if the email already exists
    const existingEmail = await db.customers.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Check if the username already exists
    const existingUsername = await db.customers.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Add the new user to the database
    const newUser = await db.customers.insert({
      username,
      email,
      password: hashPassword(password),
      phone,
    });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log in a user
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.customers.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    global.currentUser = user.username;
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await db.customers.find({});
    if (customers.length > 0) {
      res.json(customers);
    } else {
      res.status(404).json({ error: "No customers found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

export { register, login, getAllCustomers };