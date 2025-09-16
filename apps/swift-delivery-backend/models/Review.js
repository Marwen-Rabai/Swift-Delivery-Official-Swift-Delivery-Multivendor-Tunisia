const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

reviewSchema.index({ restaurant: 1 });
reviewSchema.index({ food: 1 });
reviewSchema.index({ user: 1, order: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
