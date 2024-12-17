const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", userController.getUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/search", authController.verifyToken, userController.searchUsers);
router.get("/:id", userController.getUserById);

module.exports = router;
