const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
require('dotenv').config();

// @desc    Admin login with password
// @route   POST /api/auth/login
// @access  Public
const login = (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const currentPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === currentPassword) {
      const token = jwt.sign(
        { role: 'admin', loggedInAt: new Date() },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: { role: 'admin', name: 'Admin' }
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid admin password' });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Verify current admin session token
// @route   GET /api/auth/me
// @access  Private (Admin)
const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: { role: 'admin', name: 'Admin' }
  });
};

module.exports = {
  login,
  getMe
};
