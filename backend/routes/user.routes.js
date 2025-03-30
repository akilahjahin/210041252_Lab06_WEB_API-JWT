
const express = require("express");
const {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} = require("../controllers/user.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// POST /users/register : Register a new user
router.post("/register", registerUser);

// POST /users/login : Login a user
router.post("/login", loginUser);

// GET /users : Get all users
router.get("/", getUsers);

// GET /users/:id : Get a single user by ID
router.get("/:idUser", getUserById);

// PUT /users/:id : Update a user by ID
router.put("/:idUser", protect, updateUser);  // Added PUT route

// DELETE /users/:id : Delete a user by ID (protected)
router.delete("/:idUser", protect, deleteUser);

module.exports = router;