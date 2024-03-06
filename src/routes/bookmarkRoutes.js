const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");

// Define routes
router.get("/", bookmarkController.getAllBookmarks);
router.post("/", bookmarkController.createBookmark);

module.exports = router;
