const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User (POST /users)
exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully!", user: newUser });
    } catch (error) {
        res.status(400).json({ message: "Registration Failed", error });
    }
};

// Login User (POST /users/login)
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect Password!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login Successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Login Error", error });
    }
};

// Get All Users (GET /users)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Users", error });
    }
};

// Get User by ID (GET /users/:id)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ idUser: Number(req.params.idUser) });
        if (!user) return res.status(404).json({ message: "User Not Found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching User", error });
    }
};

// Update User (PUT /users/:id)
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { idUser: Number(req.params.idUser) },
            req.body,
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Updated Successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error Updating User", error });
    }
};

// Delete User (DELETE /users/:id)
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ idUser: Number(req.params.idUser) });
        if (!deletedUser) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error Deleting User", error });
    }
};


// module.exports = { registerUser,
//     loginUser,
//     getUsers,
//     getUserById,
//     deleteUser,
//     updateUser };