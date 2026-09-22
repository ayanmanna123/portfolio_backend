const { loadLocalData, saveLocalData } = require('../utils/store');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getAllSkills = (req, res, next) => {
  try {
    const data = loadLocalData();
    res.status(200).json({
      success: true,
      data: data.skillsData || []
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
const createSkill = (req, res, next) => {
  try {
    const data = loadLocalData();
    const newSkill = {
      id: Date.now(),
      name: req.body.name || 'New Skill',
      category: req.body.category || 'Frontend',
      level: req.body.level || 85,
      icon: req.body.icon || ''
    };

    data.skillsData = [...(data.skillsData || []), newSkill];
    saveLocalData(data);

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: newSkill
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update skill by ID
// @route   PUT /api/skills/:id
// @access  Private (Admin)
const updateSkill = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    const index = (data.skillsData || []).findIndex(s => s.id === id || s.name === req.body.name);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    data.skillsData[index] = { ...data.skillsData[index], ...req.body };
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: data.skillsData[index]
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete skill by ID or name
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
const deleteSkill = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = req.params.id;
    data.skillsData = (data.skillsData || []).filter(s => String(s.id) !== String(id) && s.name !== id);
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
};
