// Import required modules
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index");

// Register a new user
router.post("/", controller.userController.createUser);

//User Login
router.post("/login", controller.userController.login);

// Get all users
router.get("/", controller.userController.getUser);

module.exports = router;
