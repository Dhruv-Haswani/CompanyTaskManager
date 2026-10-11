const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /dashboard - Protected
router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: 'Welcome to the protected dashboard',
    user: req.user
  });
});

// GET /admin - Protected & Authorized for admin
router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({
    message: 'Welcome Admin! You can access this page.'
  });
});

module.exports = router;
