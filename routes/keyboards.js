const express = require('express');

const keyboardsRoutes = express.Router();

const {
  getKeyboards,
  addKeyboard,
  deleteKeyboard,
  editKeyboard,
} = require('../controllers/keyboards');

keyboardsRoutes.get('/', getKeyboards);
keyboardsRoutes.post('/', addKeyboard);
keyboardsRoutes.patch('/:id', editKeyboard);
keyboardsRoutes.delete('/:id', deleteKeyboard);


module.exports = keyboardsRoutes;
