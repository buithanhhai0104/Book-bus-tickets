const multer = require("multer");

const storage = multer.memoryStorage(); // Lưu file trong bộ nhớ trước khi xử lý
const upload = multer({ storage });

module.exports = upload;
