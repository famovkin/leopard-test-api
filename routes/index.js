const express = require('express');

const { register, login } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');
const routes = express.Router();

routes.post('/signup', express.json(), register);
routes.post('/signin', express.json(), login);
routes.use('*', () => {
  throw new NotFoundError('Страница не найдена. Проверьте URL');
});

module.exports = routes;
