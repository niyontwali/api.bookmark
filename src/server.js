const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
require("dotenv").config();


const app = express();
const { PORT, MONGODB_URL } = process.env;

// Middleware
app.use(express.json());

// use cors
app.use(cors())

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/bookmarks", bookmarkRoutes);

// Start the server
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Check if the file is executed directly (not as a module)
if (require.main === module) {
  startServer(); 
}

module.exports = app;
