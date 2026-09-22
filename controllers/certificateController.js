const { loadLocalData, saveLocalData } = require('../utils/store');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getAllCertificates = (req, res, next) => {
  try {
    const data = loadLocalData();
    res.status(200).json({
      success: true,
      data: data.certificates || []
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new certificate
// @route   POST /api/certificates
// @access  Private (Admin)
const createCertificate = (req, res, next) => {
  try {
    const data = loadLocalData();
    const newCert = {
      id: Date.now(),
      title: req.body.title || 'New Certificate',
      issuer: req.body.issuer || '',
      date: req.body.date || new Date().getFullYear().toString(),
      credentialUrl: req.body.credentialUrl || '',
      image: req.body.image || '',
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    };

    data.certificates = [newCert, ...(data.certificates || [])];
    saveLocalData(data);

    res.status(201).json({
      success: true,
      message: 'Certificate added successfully',
      data: newCert
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update certificate by ID
// @route   PUT /api/certificates/:id
// @access  Private (Admin)
const updateCertificate = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    const index = (data.certificates || []).findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    data.certificates[index] = { ...data.certificates[index], ...req.body, id };
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Certificate updated successfully',
      data: data.certificates[index]
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete certificate by ID
// @route   DELETE /api/certificates/:id
// @access  Private (Admin)
const deleteCertificate = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    data.certificates = (data.certificates || []).filter(c => c.id !== id);
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
};
