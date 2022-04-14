const express = require('express');

const auth = require('../middlewares/auth');
const { register, login } = require('../controllers/users');
const keyboardsRoutes = require('./keyboards');
const NotFoundError = require('../errors/notFoundError');
const routes = express.Router();

routes.post('/signup', express.json(), register);
routes.post('/signin', express.json(), login);
routes.use(auth);
routes.use('/keyboards', keyboardsRoutes);
routes.use('*', () => {
  throw new NotFoundError('Страница не найдена. Проверьте URL');
});

module.exports = routes;
