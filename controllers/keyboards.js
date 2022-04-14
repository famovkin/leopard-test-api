const Keyboard = require('../models/keyboard');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ServerError = require('../errors/serverError');
const { CREATED_CODE } = require('../utils/constants');

const checkExistKeyboard = async (req) => {
  const keyboard = await Keyboard.findById(req.params.id);
  if (!keyboard) {
    throw new NotFoundError('Запрашиваемая клавиатура не найдена');
  }
};

module.exports.getKeyboards = async (req, res, next) => {
  try {
    const keyboards = await Keyboard.find({ owner: req.user._id });
    res.send(keyboards);
  } catch (err) {
    next(new BadRequestError('Произошла ошибка'));
  }
};

module.exports.addKeyboard = async (req, res, next) => {
  try {
    const newKeyboard = await Keyboard.create({
      ...req.body,
      image: {
        data: req.file.filename,
        contentType: 'image/png' || 'image/jpeg' || 'image/jpg',
      },
      owner: req.user._id,
    });
    const KeyboardWithLinkInfo = await newKeyboard.populate(['owner']);
    res.status(CREATED_CODE).send(KeyboardWithLinkInfo);
  } catch (err) {
    err.name === 'ValidationError'
      ? next(new BadRequestError(err.message))
      : next(new ServerError('Произошла ошибка'));
  }
};

module.exports.deleteKeyboard = async (req, res, next) => {
  try {
    checkExistKeyboard(req);
    const deletedKeyboard = await Movie.findByIdAndDelete(req.params.id);
    res.send(deletedKeyboard);
  } catch (err) {
    err.name === 'CastError'
      ? next(new BadRequestError(err.message))
      : next(err);
  }
};

module.exports.editKeyboard = async (req, res, next) => {
  try {
    checkExistKeyboard(req);
    const updatedKeyboardInfo = await Keyboard.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: { data: req.file.filename },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedKeyboardInfo);
  } catch (err) {
    err.name === 'ValidationError'
      ? next(new BadRequestError(err.message))
      : next(err);
  }
};
