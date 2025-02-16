// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the JWT_SECRET from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      // If user is found, proceed to the next middleware or route handler
      if (req.user) {
        next();
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    } catch (error) {
      // If token verification fails, respond with a 401 Unauthorized status
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token is provided, respond with a 401 Unauthorized status
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
