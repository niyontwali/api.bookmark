const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

module.exports = Bookmark;
