const express = require('express');

const upload = require('../middlewares/multer');
const keyboardsRoutes = express.Router();

const {
  getKeyboards,
  addKeyboard,
  deleteKeyboard,
  editKeyboard,
} = require('../controllers/keyboards');

keyboardsRoutes.get('/', getKeyboards);
keyboardsRoutes.post('/', express.json(), upload.single("keyboardImage"), addKeyboard);
keyboardsRoutes.patch('/:id', express.json(), upload.single("keyboardImage"), editKeyboard);
keyboardsRoutes.delete('/:id', deleteKeyboard);


module.exports = keyboardsRoutes;
