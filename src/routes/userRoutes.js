const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

// Define routes
router.get("/", isAuthenticated, userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
