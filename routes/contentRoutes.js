const express = require('express');
const router = express.Router();
const { getAllContent, updateHero, updateContact } = require('../controllers/contentController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/all', getAllContent);
router.put('/hero', authenticateAdmin, updateHero);
router.put('/contact', authenticateAdmin, updateContact);

module.exports = router;
