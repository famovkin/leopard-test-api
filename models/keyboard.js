const mongoose = require('mongoose');

const keyboardSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  switchType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('keyboard', keyboardSchema);
