const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', authenticateAdmin, getMe);

module.exports = router;
