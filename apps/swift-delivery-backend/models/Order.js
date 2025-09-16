const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // Parties involved
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Order items
  items: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true
    },
    name: String, // Store name at time of order
    price: Number, // Store price at time of order
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    selectedAddons: [{
      addon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addon'
      },
      name: String,
      price: Number
    }],
    selectedOptions: [{
      option: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
      },
      name: String,
      price: Number
    }],
    specialInstructions: String,
    itemTotal: Number
  }],
  
  // Delivery information
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    },
    deliveryInstructions: String,
    contactPhone: String
  },
  
  // Order type
  orderType: {
    type: String,
    enum: ['DELIVERY', 'PICKUP'],
    default: 'DELIVERY'
  },
  
  // Status tracking
  status: {
    type: String,
    enum: [
      'PENDING',
      'CONFIRMED',
      'PREPARING',
      'READY_FOR_PICKUP',
      'PICKED_UP',
      'ON_THE_WAY',
      'DELIVERED',
      'CANCELLED',
      'REJECTED'
    ],
    default: 'PENDING'
  },
  
  // Status history
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Pricing
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    serviceFee: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    tip: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  
  // Payment
  payment: {
    method: {
      type: String,
      enum: ['CASH', 'CARD', 'MOBILE_PAYMENT', 'WALLET'],
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED'],
      default: 'PENDING'
    },
    transactionId: String,
    paymentIntentId: String, // For Stripe
    refundId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  
  // Coupon/Discount
  coupon: {
    code: String,
    discount: Number,
    discountType: {
      type: String,
      enum: ['PERCENTAGE', 'FIXED']
    }
  },
  
  // Timing
  timing: {
    estimatedPreparationTime: Number, // minutes
    estimatedDeliveryTime: Number, // minutes
    actualPreparationTime: Number,
    actualDeliveryTime: Number,
    scheduledFor: Date, // For scheduled orders
    confirmedAt: Date,
    preparingAt: Date,
    readyAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date,
    cancelledAt: Date
  },
  
  // Special instructions
  instructions: {
    customer: String,
    restaurant: String,
    rider: String
  },
  
  // Ratings and reviews
  review: {
    customer: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      reviewedAt: Date
    },
    restaurant: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      reviewedAt: Date
    }
  },
  
  // Cancellation
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['CUSTOMER', 'RESTAURANT', 'RIDER', 'ADMIN']
    },
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['PENDING', 'PROCESSED', 'FAILED']
    }
  },
  
  // Tracking
  tracking: {
    riderLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number], // [longitude, latitude]
      updatedAt: Date
    },
    estimatedArrival: Date,
    distance: Number, // km
    duration: Number // minutes
  },
  
  // Communication
  chat: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    messageType: {
      type: String,
      enum: ['TEXT', 'IMAGE', 'LOCATION'],
      default: 'TEXT'
    }
  }],
  
  // Admin notes
  adminNotes: String,
  
  // Currency
  currency: {
    type: String,
    enum: ['TND', 'DZD', 'EUR', 'USD'],
    default: 'TND'
  },
  
  // Platform commission
  commission: {
    rate: Number,
    amount: Number,
    type: {
      type: String,
      enum: ['PERCENTAGE', 'FIXED'],
      default: 'PERCENTAGE'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, createdAt: -1 });
orderSchema.index({ rider: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'timing.scheduledFor': 1 });

// Virtual for total items count
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for order duration
orderSchema.virtual('duration').get(function() {
  if (this.timing.deliveredAt && this.createdAt) {
    return Math.round((this.timing.deliveredAt - this.createdAt) / (1000 * 60)); // minutes
  }
  return null;
});

// Pre-save middleware to generate order number
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `SD${timestamp.slice(-6)}${random}`;
  }
  next();
});

// Pre-save middleware to update status history
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date()
    });
  }
  next();
});

// Method to calculate total
orderSchema.methods.calculateTotal = function() {
  const subtotal = this.items.reduce((total, item) => {
    let itemTotal = item.price * item.quantity;
    
    // Add addon prices
    if (item.selectedAddons && item.selectedAddons.length > 0) {
      const addonTotal = item.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
      itemTotal += addonTotal * item.quantity;
    }
    
    // Add option prices
    if (item.selectedOptions && item.selectedOptions.length > 0) {
      const optionTotal = item.selectedOptions.reduce((sum, option) => sum + option.price, 0);
      itemTotal += optionTotal * item.quantity;
    }
    
    item.itemTotal = itemTotal;
    return total + itemTotal;
  }, 0);
  
  this.pricing.subtotal = subtotal;
  
  // Calculate tax (assuming 18% VAT for Tunisia)
  this.pricing.tax = subtotal * 0.18;
  
  // Calculate total
  this.pricing.total = subtotal + 
                       this.pricing.deliveryFee + 
                       this.pricing.serviceFee + 
                       this.pricing.tax + 
                       this.pricing.tip - 
                       this.pricing.discount;
  
  return this.pricing.total;
};

// Method to update status with history
orderSchema.methods.updateStatus = function(newStatus, note = '', updatedBy = null) {
  const oldStatus = this.status;
  this.status = newStatus;
  
  // Update timing based on status
  const now = new Date();
  switch (newStatus) {
    case 'CONFIRMED':
      this.timing.confirmedAt = now;
      break;
    case 'PREPARING':
      this.timing.preparingAt = now;
      break;
    case 'READY_FOR_PICKUP':
      this.timing.readyAt = now;
      break;
    case 'PICKED_UP':
      this.timing.pickedUpAt = now;
      break;
    case 'DELIVERED':
      this.timing.deliveredAt = now;
      break;
    case 'CANCELLED':
      this.timing.cancelledAt = now;
      break;
  }
  
  // Add to history
  this.statusHistory.push({
    status: newStatus,
    timestamp: now,
    note,
    updatedBy
  });
  
  return this;
};

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const cancellableStatuses = ['PENDING', 'CONFIRMED', 'PREPARING'];
  return cancellableStatuses.includes(this.status);
};

// Method to calculate estimated delivery time
orderSchema.methods.calculateEstimatedDelivery = function() {
  const now = new Date();
  const prepTime = this.timing.estimatedPreparationTime || 20;
  const deliveryTime = this.timing.estimatedDeliveryTime || 30;
  
  return new Date(now.getTime() + (prepTime + deliveryTime) * 60000);
};

// Static method to get order statistics
orderSchema.statics.getStatistics = function(filter = {}) {
  return this.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.total' },
        averageOrderValue: { $avg: '$pricing.total' },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'DELIVERED'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'CANCELLED'] }, 1, 0] }
        }
      }
    },
    {
      $addFields: {
        completionRate: {
          $multiply: [
            { $divide: ['$completedOrders', '$totalOrders'] },
            100
          ]
        },
        cancellationRate: {
          $multiply: [
            { $divide: ['$cancelledOrders', '$totalOrders'] },
            100
          ]
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema);
