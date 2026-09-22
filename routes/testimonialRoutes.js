const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getAllTestimonials);
router.post('/', authenticateAdmin, createTestimonial);
router.delete('/:id', authenticateAdmin, deleteTestimonial);

module.exports = router;
