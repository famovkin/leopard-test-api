const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const DuplicateError = require('../errors/duplicateError');
const ServerError = require('../errors/serverError');
const AuthError = require('../errors/authError');
const {
  SALT_ROUND,
  CREATED_CODE,
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../utils/constants');

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, SALT_ROUND)
    .then((hash) => {
      User.create({ email, password: hash })
        .then(() => {
          res.status(CREATED_CODE).send({
            message: `Пользователь с почтой ${email} успешно создан`,
          });
        })
        .catch((err) => {
          if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
            throw new DuplicateError('Такой пользователь уже существует');
          } else if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          } else {
            throw new ServerError('Произошла ошибка');
          }
        })
        .catch(next);
    })
    .catch(() => next(new BadRequestError('Произошла ошибка')));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неверные почта или пароль');
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неверные почта или пароль');
          }
          const token = jwt.sign({ _id: user._doc._id }, 'dev-secret', {
            expiresIn: '1d',
          });
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
