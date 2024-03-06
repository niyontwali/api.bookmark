const User = require("../models/user");

// create user function
async function createUser(req, res) {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({
      ok: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// get users function
async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.json({
      ok: true,
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createUser,
  getUsers,
};
