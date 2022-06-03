const mongoose = require('mongoose');

/**
 * Create schema for users and determine what attributes are required
 */

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      // creating link to postSchema
      ref: 'Post',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
