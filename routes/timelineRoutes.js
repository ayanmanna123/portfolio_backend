const express = require('express');
const router = express.Router();
const {
  getTimeline,
  createExperience,
  createEducation,
  deleteExperience,
  deleteEducation
} = require('../controllers/timelineController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getTimeline);
router.post('/experience', authenticateAdmin, createExperience);
router.post('/education', authenticateAdmin, createEducation);
router.delete('/experience/:id', authenticateAdmin, deleteExperience);
router.delete('/education/:id', authenticateAdmin, deleteEducation);

module.exports = router;
