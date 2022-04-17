const Keyboard = require('../models/keyboard');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ServerError = require('../errors/serverError');
const { CREATED_CODE } = require('../utils/constants');
const cloudinary = require('../utils/cloudinary');

const checkExistKeyboard = async (req) => {
  const keyboard = await Keyboard.findById(req.params.id);
  if (!keyboard) {
    throw new NotFoundError('Запрашиваемая клавиатура не найдена');
  }
  return keyboard;
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
    const uploadResult = await cloudinary.uploader.upload(req.body.image);
    const newKeyboard = await Keyboard.create({
      ...req.body,
      image: uploadResult.secure_url,
      cloudinary_id: uploadResult.public_id,
      owner: req.user._id,
    });
    res.status(CREATED_CODE).send(newKeyboard);
  } catch (err) {
    err.name === 'ValidationError'
      ? next(new BadRequestError(err.message))
      : next(new ServerError('Произошла ошибка'));
    console.log(err);
  }
};

module.exports.deleteKeyboard = async (req, res, next) => {
  try {
    const keyboard = await checkExistKeyboard(req);
    await cloudinary.uploader.destroy(keyboard.cloudinary_id);
    await Keyboard.findByIdAndDelete(req.params.id);
    res.send({ message: `Клавиатура была успешно удалена` });
  } catch (err) {
    err.name === 'CastError'
      ? next(new BadRequestError(err.message))
      : next(err);
  }
};

module.exports.editKeyboard = async (req, res, next) => {
  try {
    const keyboard = await checkExistKeyboard(req);
    let dateImage = null;
    if (req.body.image) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(req.body.image);
      dataImage = { secure_url, public_id };
    }
    const updatedKeyboardInfo = await Keyboard.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...dateImage,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedKeyboardInfo);
    cloudinary.uploader.destroy(keyboard.cloudinary_id);
  } catch (err) {
    err.name === 'ValidationError'
      ? next(new BadRequestError(err.message))
      : next(err);
  }
};

module.exports.getKeyboard = async (req, res, next) => {
  try {
    const keyboard = await checkExistKeyboard(req);
    res.send(keyboard);
  } catch (err) {
    next(new BadRequestError('Произошла ошибка'));
  }
};
