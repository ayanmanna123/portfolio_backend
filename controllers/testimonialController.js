const { loadLocalData, saveLocalData } = require('../utils/store');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getAllTestimonials = (req, res, next) => {
  try {
    const data = loadLocalData();
    res.status(200).json({
      success: true,
      data: data.testimonials || []
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
const createTestimonial = (req, res, next) => {
  try {
    const data = loadLocalData();
    const newTestimonial = {
      id: Date.now(),
      name: req.body.name || 'Anonymous User',
      role: req.body.role || 'Client / Peer',
      company: req.body.company || 'Company',
      quote: req.body.quote || '',
      avatar: req.body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };

    data.testimonials = [newTestimonial, ...(data.testimonials || [])];
    saveLocalData(data);

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: newTestimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete testimonial by ID
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
const deleteTestimonial = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    data.testimonials = (data.testimonials || []).filter(t => t.id !== id);
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  deleteTestimonial
};
