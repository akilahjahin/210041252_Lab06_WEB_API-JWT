const Student = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔹 Register User
exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User Registered successfully!", student: newUser });
    } catch (error) {
        res.status(400).json({ message: "Registration Failed", error });
    }
};

// 🔹 Login User
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        const isMatch = await bcrypt.compare(req.body.password, student.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect Password!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login Successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Login Error", error });
    }
};

// 🔹 Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await Student.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Users", error });
    }
};

// 🔹 Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User Not Found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching User", error });
    }
};

// 🔹 Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error Deleting User", error });
    }
};
