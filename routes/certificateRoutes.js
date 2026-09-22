const express = require('express');
const router = express.Router();
const {
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
} = require('../controllers/certificateController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/', getAllCertificates);
router.post('/', authenticateAdmin, createCertificate);
router.put('/:id', authenticateAdmin, updateCertificate);
router.delete('/:id', authenticateAdmin, deleteCertificate);

module.exports = router;
