const mongoose = require('mongoose');

const keyboardSchema = new mongoose.Schema({
  date: {
    type: String,
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
    type: String,
    required: true,
  },
  switchType: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('keyboard', keyboardSchema);
