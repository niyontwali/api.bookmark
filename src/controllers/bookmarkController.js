const Bookmark = require("../models/bookmark");

// create bookmarks functions
async function createBookmark(req, res) {
  const { title, url } = req.body;
  if (!title) {
    return res.status(400).json({ 
      error: 'Title is required' 
    });
  }
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  try {
    const newBookmark = new Bookmark({ title, url });
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

// get bookmarks functions
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

module.exports = {
  getAllBookmarks,
  createBookmark,
};
