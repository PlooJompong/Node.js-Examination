import db from "../database/database.js";
import hashPassword from "../utils/hashPassword.js";

// Register a new user
const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUsername = await db.customers.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Add the new user to the database
    const newUser = await db.customers.insert({
      username,
      password: hashPassword(password),
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log in a user
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await db.customers.findOne({ username: username, password: hashedPassword });

    if (user) {
      global.isAdmin = false
      global.currentUser = user,
        res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
}

export { userRegister, userLogin };