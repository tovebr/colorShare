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
});

module.exports = mongoose.model('Post', postSchema);
