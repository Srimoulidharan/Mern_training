const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../models/admin/User");


// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, department, dateOfJoining } = req.body;

        if (!name || !email || !password || !role || !department || !dateOfJoining) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            dateOfJoining,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update User Role
const updateUserRole = async (req, res) => {
    try {
        console.log("Received Role Update Request:", req.body);

        const { userId, newRole } = req.body;
        if (!userId || !newRole) {
            return res.status(400).json({ message: "User ID and role are required" });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = newRole;
        await user.save();

        console.log("Updated User:", user);
        res.json({ message: "Role updated successfully", user });
    } catch (error) {
        console.error("Error in updateUserRole:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, getAllUsers, loginUser, updateUserRole };
