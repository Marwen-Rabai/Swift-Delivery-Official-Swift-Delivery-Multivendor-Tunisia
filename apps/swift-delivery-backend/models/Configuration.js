const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: mongoose.Schema.Types.Mixed,
  type: {
    type: String,
    enum: ['STRING', 'NUMBER', 'BOOLEAN', 'OBJECT', 'ARRAY'],
    default: 'STRING'
  },
  description: String,
  category: {
    type: String,
    enum: ['GENERAL', 'PAYMENT', 'DELIVERY', 'NOTIFICATION', 'SECURITY'],
    default: 'GENERAL'
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Configuration', configurationSchema);
