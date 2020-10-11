const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route POST api/posts
// @desc create new post
// @access private
router.post(
  '/',
  [auth, check('text', 'Text is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      const post = await Post.create({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      res.json(post);
    } catch (err) {
      res
        .status(500)
        .json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
  }
);

// @route GET api/posts
// @desc get all posts
// @access private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route GET api/posts/:post_id
// @desc get a post
// @access private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ errors: [{ msg: 'That post does not exist.' }] });
    }
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route DELETE api/posts/:post_id
// @desc delete a post
// @access private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (post.user.toString() !== req.user.id) {
      // post.user returns a buffer object
      return res
        .status(401)
        .json({ errors: [{ msg: 'User not authorized.' }] });
    }

    await post.remove();

    res.json({ msg: 'Post deleted.' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ errors: [{ msg: 'That post does not exist.' }] });
    }
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route PUT api/posts/like:post_id
// @desc like a post
// @access private

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if post already liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    // post hasn't been liked so add like
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ errors: [{ msg: 'That post does not exist.' }] });
    }
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route PUT api/posts/unlike:post_id
// @desc unlike a post
// @access private

router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // get index of liked post
    let index = -1;
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].user.toString() === req.user.id) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return res
        .status(400)
        .json({ msg: 'Cannot unlike a post which you have not yet liked.' });
    }

    // post has been liked so remove like
    post.likes.splice(index, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ errors: [{ msg: 'That post does not exist.' }] });
    }
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route POST api/posts/:post_id/comment
// @desc create new comment
// @access private
router.post(
  '/:post_id/comment',
  [auth, check('text', 'Text is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.post_id);

      const comment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };

      post.comments.unshift(comment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'That post does not exist.' }] });
      }
      res
        .status(500)
        .json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
  }
);

// @route DELETE api/posts/:post_id/comment/:comment_id
// @desc delete a comment
// @access private

router.delete('/:post_id/comment/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // get comment index
    let index = -1;
    for (let i = 0; i < post.comments.length; i++) {
      if (post.comments[i].id.toString() === req.params.comment_id) {
        if (post.comments[i].user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ errors: [{ msg: 'User not authorized.' }] });
        } else {
          index = i;
          break;
        }
      }
    }

    if (index === -1) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'That comment does not exist.' }] });
    }

    // remove comment
    post.comments.splice(index, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ errors: [{ msg: 'That post does not exist.' }] });
    }
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

module.exports = router;
