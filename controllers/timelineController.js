const { loadLocalData, saveLocalData } = require('../utils/store');

// @desc    Get experience and education timeline
// @route   GET /api/timeline
// @access  Public
const getTimeline = (req, res, next) => {
  try {
    const data = loadLocalData();
    res.status(200).json({
      success: true,
      data: {
        experience: data.experience || [],
        education: data.education || []
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add experience item
// @route   POST /api/timeline/experience
// @access  Private (Admin)
const createExperience = (req, res, next) => {
  try {
    const data = loadLocalData();
    const newItem = {
      id: Date.now(),
      title: req.body.title || 'Role Title',
      company: req.body.company || 'Company / Organization',
      period: req.body.period || '2024 - Present',
      description: req.body.description || '',
      highlights: Array.isArray(req.body.highlights) ? req.body.highlights : [],
      type: req.body.type || 'work'
    };

    data.experience = [newItem, ...(data.experience || [])];
    saveLocalData(data);

    res.status(201).json({
      success: true,
      message: 'Experience added successfully',
      data: newItem
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add education item
// @route   POST /api/timeline/education
// @access  Private (Admin)
const createEducation = (req, res, next) => {
  try {
    const data = loadLocalData();
    const newItem = {
      id: Date.now(),
      degree: req.body.degree || 'Degree / Specialization',
      institution: req.body.institution || 'University / College',
      period: req.body.period || '2020 - 2024',
      grade: req.body.grade || '',
      highlights: Array.isArray(req.body.highlights) ? req.body.highlights : []
    };

    data.education = [newItem, ...(data.education || [])];
    saveLocalData(data);

    res.status(201).json({
      success: true,
      message: 'Education added successfully',
      data: newItem
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete experience item by ID
// @route   DELETE /api/timeline/experience/:id
// @access  Private (Admin)
const deleteExperience = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    data.experience = (data.experience || []).filter(e => e.id !== id);
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Experience item deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete education item by ID
// @route   DELETE /api/timeline/education/:id
// @access  Private (Admin)
const deleteEducation = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    data.education = (data.education || []).filter(e => e.id !== id);
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Education item deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTimeline,
  createExperience,
  createEducation,
  deleteExperience,
  deleteEducation
};
