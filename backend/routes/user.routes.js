const express = require("express");
const { registerUser, loginUser, getUsers, getUserById, deleteUser } = require("../controllers/user.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", protect, deleteUser);

module.exports = router;
