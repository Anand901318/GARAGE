const userModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

// -------------------- LOGIN --------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found.",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.fullName,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
};

// -------------------- SIGNUP --------------------
const signup = async (req, res) => {
  try {
    const { role = "Customer", confirmPassword, password } = req.body;

    if (!["Customer", "ServiceProvider", "Admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Must be Customer, ServiceProvider, or Admin",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Validate confirmPassword
    const isMatch = bcrypt.compareSync(confirmPassword, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);

    const token = jwt.sign(
      { userId: createdUser._id, role: createdUser.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "User created successfully.",
      data: createdUser,
      token,
      user: {
        id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
        name: createdUser.fullName,
      },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({
      message: "Internal server error",
      data: err.message,
    });
  }
};

// -------------------- ADD USER --------------------
const addUser = async (req, res) => {
  try {
    const savedUser = await userModel.create(req.body);
    res.json({
      message: "User saved successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error });
  }
};

// -------------------- GET ALL USERS --------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("roleId");
    res.json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// -------------------- GET ALL USERS (NO POPULATE) --------------------
const getUserAll = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// -------------------- GET USER BY ID --------------------
const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User fetched successfully",
      data: foundUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// -------------------- DELETE USER BY ID --------------------
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// -------------------- EXPORTS --------------------
module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
  getUserAll,
};
