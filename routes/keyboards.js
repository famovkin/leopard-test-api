const express = require('express');

const uploadMiddleware = require('../middlewares/uploadImage');
const keyboardsRoutes = express.Router();

const {
  getKeyboards,
  addKeyboard,
  deleteKeyboard,
  editKeyboard,
} = require('../controllers/keyboards');

keyboardsRoutes.get('/', getKeyboards);
keyboardsRoutes.post('/', express.json(), uploadMiddleware.single("keyboardImage"), addKeyboard);
keyboardsRoutes.patch('/:id', express.json(), uploadMiddleware.single("keyboardImage"), editKeyboard);
keyboardsRoutes.delete('/:id', deleteKeyboard);


module.exports = keyboardsRoutes;
