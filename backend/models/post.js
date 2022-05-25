const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Post', postSchema);
