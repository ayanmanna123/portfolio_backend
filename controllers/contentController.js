const { DataStore } = require('../utils/store');

// @desc    Get all portfolio aggregated content
// @route   GET /api/content/all
// @access  Public
const getAllContent = async (req, res, next) => {
  try {
    const data = await DataStore.getAllContent();
    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Hero section
// @route   PUT /api/content/hero
// @access  Private (Admin)
const updateHero = async (req, res, next) => {
  try {
    const updatedHero = await DataStore.updateSection('heroData', req.body);
    res.status(200).json({
      success: true,
      message: 'Hero section updated successfully',
      data: updatedHero
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Contact & Socials
// @route   PUT /api/content/contact
// @access  Private (Admin)
const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await DataStore.updateSection('contactInfo', req.body);
    res.status(200).json({
      success: true,
      message: 'Contact details updated successfully',
      data: updatedContact
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllContent,
  updateHero,
  updateContact
};
