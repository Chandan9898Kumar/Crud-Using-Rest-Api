import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Authorization header missing or invalid");
    return res.status(401).json({ error: "User is not authorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.error("Token is missing");
    return res.status(401).json({ error: "User is not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      username: decoded.username,
      email: decoded.email,
      id: decoded._id,
    };
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ error: "User is not authorized" });
  }
});

export default validateToken;
