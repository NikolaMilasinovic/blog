const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const ProductReview = require('../../models/ProductReview');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    POST api/productReview
// @desc     Create a productRreview
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('content', 'Blog content is required')
        .isLength({min:50}),
      check('previewText', 'Blog preview text is required')
        .not()
        .isEmpty(),
      check('title', 'Blog title is required')
        .not()
        .isEmpty(),
      check('mainPhoto', 'Main photo is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newProductReview = new ProductReview({
        content: req.body.content,
        author: user.name,
        user: user.id,
        previewText: req.body.previewText,
        title: req.body.title,
        mainPhoto: req.body.mainPhoto
      });

      const productReview = await newProductReview.save();

      res.json(productReview);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// // @route    GET api/productReview
// // @desc     Get all productReviews
// // @access   Public
router.get('/', async (req, res) => {
  try {
    const productReview = await ProductReview.find().sort({ date: -1 });
    res.json(productReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/productReview/:id
// @desc     Get productReview by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !productReview) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(productReview);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/productReview/:id
// @desc     Delete a productReview
// @access   Private
router.delete('/:id',auth, async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !productReview) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (productReview.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await productReview.remove();

    res.json({ msg: 'Product review is removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/productReview/like/:id
// @desc     Like a productReview
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.id);

    // Check if the blog has already been liked
    if (
      productReview.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Product Review is already liked' });
    }

    productReview.likes.unshift({ user: req.user.id });

    await productReview.save();

    res.json(productReview.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/blog/unlike/:id
// @desc     Unlike a productReview
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.id);

    // Check if the post has already been liked
    if (
      productReview.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Product Review has not yet been liked' });
    }

    // Get remove index
    const removeIndex = productReview.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    productReview.likes.splice(removeIndex, 1);

    await productReview.save();

    res.json(productReview.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/productReview/comment/:id
// @desc     Comment on a productReview
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const productReview = await ProductReview.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      productReview.comments.unshift(newComment);

      await productReview.save();

      res.json(productReview.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/blog/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const productReview = await ProductReview.findById(req.params.id);

    // Pull out comment
    const comment = productReview.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    productReview.comments = productReview.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await productReview.save();

    return res.json(productReview.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;