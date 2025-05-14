// upload.middleware.js
const multer = require("multer");
const storage = multer.memoryStorage(); // hoặc dùng diskStorage
const upload = multer({ storage });

module.exports = upload;
