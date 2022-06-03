const mongoose = require('mongoose');
/**
 * Create schema for post and determine what attributes are required
 */
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
