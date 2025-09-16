const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    required: true
  },
  actionType: {
    type: String,
    enum: ['RESTAURANT', 'CATEGORY', 'EXTERNAL_LINK', 'NONE'],
    default: 'NONE'
  },
  actionValue: String, // Restaurant ID, Category ID, or URL
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  validFrom: Date,
  validUntil: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);
