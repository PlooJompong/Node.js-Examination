import database from "../database/database.js";
import crypto from "crypto";

// Hash function for password
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Register a new user
const register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    // Check if the email already exists
    const existingEmail = await database.customers.findOne({ email });
    if (existingEmail) {
      console.log("Email already in use:", email);
      return res.status(400).json({ error: "Email already in use" });
    }

    // Check if the username already exists
    const existingUsername = await database.customers.findOne({ username });
    if (existingUsername) {
      console.log("Username already in use:", username);
      return res.status(400).json({ error: "Username already in use" });
    }

    // Add the new user to the database
    const newUser = await database.customers.insert({
      username,
      email,
      password: hashPassword(password),
      phone,
    });
    console.log("New user registered:", newUser); // Log the new user
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error); // Log any errors
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Log in a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Retrieve the user from the database based on email address
    const user = await database.customers.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }
    console.log("User logged in successfully:", user.email);
    global.currentUser = user.username;
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
};

export { register, login };