const Bookmark = require("../models/bookmark");

// Create bookmarks functions
async function createBookmark(req, res) {
  const { name, url } = req.body;
  if (!name) {
    return res.status(400).json({ 
      error: 'Title is required' 
    });
  }
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  try {
    const newBookmark = new Bookmark({ name, url });
    await newBookmark.save();
    return res.status(201).json({
      ok: true,
      message: "New bookmark created successfully"
    });
  } catch (err) {
    console.error("Error creating bookmark:", err.message);  
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get bookmarks functions
async function getAllBookmarks(req, res) {
  try {
    const bookmarks = await Bookmark.find();
    return res.json({
      ok: true,
      data: bookmarks
    });
  } catch (err) {
    console.error("Error fetching bookmarks:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete bookmark function
async function deleteBookmark(req, res) {
  const { id } = req.params;
  try {
    await Bookmark.findByIdAndDelete(id);
    return res.json({
      ok: true,
      message: "Bookmark deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting bookmark:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get single bookmark function
async function getBookmark(req, res) {
  const { id } = req.params;
  try {
    const bookmark = await Bookmark.findById(id);
    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }
    return res.json({
      ok: true,
      data: bookmark
    });
  } catch (err) {
    console.error("Error fetching bookmark:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update bookmark function
async function updateBookmark(req, res) {
  const { id } = req.params;
  const { name, url } = req.body;
  if (!name && !url) {
    return res.status(400).json({ error: "Name or URL is required" });
  }
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(id, { name, url }, { new: true });
    if (!updatedBookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }
    return res.json({
      ok: true,
      message: "Bookmark updated successfully",
      data: updatedBookmark
    });
  } catch (err) {
    console.error("Error updating bookmark:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllBookmarks,
  createBookmark,
  deleteBookmark,
  getBookmark,
  updateBookmark
};
