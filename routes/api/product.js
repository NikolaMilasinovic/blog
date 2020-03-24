const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Product = require('../../models/Product');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    POST api/product
// @desc     Create a product
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Product description is required')
        .isLength({min:50}),
      check('productName', 'Product name is required')
        .not()
        .isEmpty(),
      check('affiliateLink', 'Product affiliateLink is required')
        .not()
        .isEmpty(),
      check('mainPhoto', 'Product mainPhoto is required')
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
      const newProduct = new Product({
        description: req.body.description,
        author: user.name,
        user: user.id,
        productName: req.body.productName,
        affiliateLink: req.body.affiliateLink,
        mainPhoto: req.body.mainPhoto,
        restPhotos: Array.isArray(req.body.restPhotos)
        ? req.body.restPhotos
        : req.body.restPhotos.split(',').map(photo => ' ' + photo.trim()),
      });

      const product = await newProduct.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// // @route    GET api/product
// // @desc     Get all products
// // @access   Public
router.get('/', async (req, res) => {
  try {
    const product = await Product.find().sort({ date: -1 });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/product/:id
// @desc     Get product by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !product) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/product/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id',auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check user
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await product.remove();

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});



// @route    POST api/product/comment/:id
// @desc     Comment on a product
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
      const product = await Product.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      product.comments.unshift(newComment);

      await product.save();

      res.json(product.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/product/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Pull out comment
    const comment = product.comments.find(
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

    product.comments = product.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await product.save();

    return res.json(product.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;