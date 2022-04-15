const multer = require('multer');
const path = require('path');

const badRequestError = require('../errors/badRequestError');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'
      ? cb(new badRequestError('Данный тип не поддерживается'), false)
      : cb(null, file);
  },
});
