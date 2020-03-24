const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  content: {
    type: String,
    required: true
  },
  previewText: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  mainPhoto:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProductReview = mongoose.model('productReview', ProductReviewSchema);