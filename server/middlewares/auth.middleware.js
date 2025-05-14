const jwt = require("jsonwebtoken");

const authMiddleware = {
  protect: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Lưu thông tin người dùng vào request
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  },
};

module.exports = authMiddleware;
