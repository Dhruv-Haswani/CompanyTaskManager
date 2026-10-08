const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
  getProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/users/register
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/profile
router.get('/profile', protect, getProfile);

module.exports = router;
