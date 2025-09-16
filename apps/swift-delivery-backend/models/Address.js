const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  label: {
    type: String,
    enum: ['HOME', 'WORK', 'OTHER'],
    default: 'HOME'
  },
  street: {
    type: String,
    required: true
  },
  building: String,
  apartment: String,
  city: {
    type: String,
    required: true
  },
  state: String,
  country: {
    type: String,
    default: 'Tunisia'
  },
  zipCode: String,
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  deliveryInstructions: String,
  contactPhone: String,
  isDefault: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

addressSchema.index({ user: 1 });
addressSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Address', addressSchema);
