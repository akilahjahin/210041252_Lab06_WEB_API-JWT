const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    // Ensure token follows the 'Bearer token' format
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data to request
        next(); // Proceed to the next middleware
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = protect;