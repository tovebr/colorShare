const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

//route for getting all posts
router.get('/', async (req, res) => {
  try {
    // calls on database and retrieves all posts
    const posts = await Post.find();

    //returns all posts
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * getting one post
 * @param  {Sring} id post-id from url
 * @param  {function} getPost function that gets a singel document
 * @return {object} post
 */
router.get('/:id', getPost, async (req, res) => {
  res.send(res.post);
});

// Route for creating a post
router.post('/', async (req, res) => {
  // new post is created with mongoose schema
  const post = new Post({
    description: req.body.description,
    color: req.body.color,
    creator: req.body.userId,
  });

  let user;

  try {
    // finding user that created post in user-database
    user = await User.findById(post.creator);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // return if creator wasnt found
  if (!user) {
    return res
      .status(404)
      .json({ message: 'Could not find user for provided id' });
  }

  try {
    // save new post to database
    const newPost = await post.save();
    // add post-id to user that created the post
    user.posts.push(post);
    // save updated user to database
    await user.save();
    // return post to client
    res.json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Function for updating a post
 * @param  {string} id posts id
 * @param  {function} getPost function that retrieves post based on id
 */
router.patch('/:id', getPost, async (req, res) => {
  // if any of the two required attributes exists in req body the post returned from getPost will be updated
  if (req.body.color) res.post.color = req.body.color;
  if (req.body.description) res.post.description = req.body.description;

  try {
    // save updated post to database
    const updatedPost = await res.post.save();

    // return post to client
    res.json(updatedPost.toObject({ getters: true }));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Function for deleting a post
 * @param  {string} id posts id
 * @param  {function} getPost function that retrieves post based on id
 */
router.delete('/:id', async (req, res) => {
  let post;
  try {
    // find post based on id in database
    post = await Post.findById(req.params.id).populate('creator');
    if (post) {
      // delete found post from database
      await post.remove();
      // remove post-id from user that created the post
      post.creator.posts.pull(post);
      // save updated user
      await post.creator.save();
      // return deleted posts id
      res.status(200).json({ message: 'Post deleted', id: req.params.id });
    } else {
      res.status(404).json({ message: 'Could not find post' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//search for posts
router.post('/search', async (req, res) => {
  try {
    // search database for posts whos text-description includes request query
    const posts = await Post.find({ $text: { $search: req.query.query } });
    // return retrived posts
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Function that finds a single post based on id
 * @param {object} req request
 * @param {object} res response
 * @param {function} next tells code to execute next part
 * @returns post
 */
async function getPost(req, res, next) {
  let post;
  try {
    // search database for post with id
    post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // add post to response object
  res.post = post;
  // move on to next function
  next();
}

module.exports = router;
