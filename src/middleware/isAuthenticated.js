const jwt = require('jsonwebtoken')
const User = require("../models/user");


// Middleware to check user authentication using JWT
const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      // Handle token verification errors
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired.' });
        }
        return res.status(401).json({ message: 'Invalid token.' });
      }

      // Check if the user exists in the database
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Store the user document in the request for use in routes
      req.user = user;

      // Continue to the next middleware or route handler
      next();
    });
  } catch (error) {
    // Handle internal server errors
    return res.status(500).json({
      ok: false,
      message: `Error while checking authentication, ${error.message}`,
    });
  }
};

// Export the middleware function
module.exports = isAuthenticated;
