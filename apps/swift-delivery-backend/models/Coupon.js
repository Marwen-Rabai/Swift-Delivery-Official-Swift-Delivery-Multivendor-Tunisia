const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  discountType: {
    type: String,
    enum: ['PERCENTAGE', 'FIXED'],
    required: true
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderAmount: {
    type: Number,
    default: 0
  },
  maxDiscountAmount: Number,
  usageLimit: {
    type: Number,
    default: 0 // 0 means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  applicableFor: {
    type: String,
    enum: ['ALL', 'FIRST_ORDER', 'RESTAURANTS'],
    default: 'ALL'
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

couponSchema.index({ code: 1 });
couponSchema.index({ validFrom: 1, validUntil: 1 });

module.exports = mongoose.model('Coupon', couponSchema);
