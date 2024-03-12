const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, bookmarkController.getAllBookmarks);
router.post("/", bookmarkController.createBookmark);
router.get("/:id", bookmarkController.getBookmark);
router.put("/:id", bookmarkController.updateBookmark);
router.delete("/:id", bookmarkController.deleteBookmark);

module.exports = router;
