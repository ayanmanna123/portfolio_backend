const path = require('path');
const fs = require('fs');
const supabase = require('../config/supabase');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// @desc    Upload file to Supabase storage or local disk fallback
// @route   POST /api/upload
// @access  Private (Admin)
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const file = req.file;
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${fileExt}`;
    const bucketName = process.env.SUPABASE_BUCKET || 'portfolio-assets';

    // 1. Try uploading to Supabase Storage if configured
    if (supabase) {
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: true
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
          return res.status(200).json({
            success: true,
            message: 'File uploaded successfully to Supabase Storage',
            url: publicUrlData.publicUrl,
            fileName
          });
        }
      } catch (sbErr) {
        console.warn('Supabase storage upload error:', sbErr.message);
      }
    }

    // 2. Fallback local file save
    const localFilePath = path.join(uploadDir, fileName);
    fs.writeFileSync(localFilePath, file.buffer);

    const publicUrl = `http://localhost:5000/uploads/${fileName}`;
    return res.status(200).json({
      success: true,
      message: 'File uploaded to local backend server',
      url: publicUrl,
      fileName
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile
};
