const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getAllSkills);
router.post('/', authenticateAdmin, createSkill);
router.put('/:id', authenticateAdmin, updateSkill);
router.delete('/:id', authenticateAdmin, deleteSkill);

module.exports = router;
