const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/usermodel");

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: 'Access denied, invalid token format' });
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_Secret);
        console.log("Decoded Token:", decoded);

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};

exports.adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied: No Token Provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ success: false, message: "Invalid Token" });

    req.user = decoded;
    next();
  });
};
exports.protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// // Middleware to verify role
// const verifyRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: "Access Denied: Insufficient Permissions" });
//     }
//     next();
//   };
// };

// console.log("verifyToken loaded:", typeof verifyToken);
// console.log("verifyRole loaded:", typeof verifyRole);


// module.exports = { verifyToken, verifyRole };
  