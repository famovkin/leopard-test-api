const multer = require('multer');

const { availableTypesForUpload } = require('../utils/constants');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const fileFilter = (req, file, cb) => {
  availableTypesForUpload.includes(file.mimetype)
    ? cb(null, file)
    : cb(null, false);
};

module.exports = multer({ storage, fileFilter });
