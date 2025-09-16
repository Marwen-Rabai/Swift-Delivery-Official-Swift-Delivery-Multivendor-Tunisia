const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  
  // Owner information
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Contact information
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Location
  address: {
    street: String,
    city: String,
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
        required: true,
        index: '2dsphere'
      }
    }
  },
  
  // Media
  logo: String,
  image: String,
  images: [String],
  
  // Business details
  cuisines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisine'
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  
  // Operating hours
  openingHours: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    openTime: String, // Format: "09:00"
    closeTime: String, // Format: "22:00"
    breaks: [{
      startTime: String,
      endTime: String
    }]
  }],
  
  // Delivery settings
  deliverySettings: {
    isDeliveryEnabled: {
      type: Boolean,
      default: true
    },
    isPickupEnabled: {
      type: Boolean,
      default: true
    },
    deliveryRadius: {
      type: Number,
      default: 10 // km
    },
    minOrderAmount: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    freeDeliveryThreshold: {
      type: Number,
      default: 0
    },
    estimatedDeliveryTime: {
      type: Number,
      default: 30 // minutes
    },
    estimatedPickupTime: {
      type: Number,
      default: 15 // minutes
    }
  },
  
  // Payment settings
  paymentMethods: [{
    type: String,
    enum: ['CASH', 'CARD', 'MOBILE_PAYMENT', 'BANK_TRANSFER']
  }],
  
  // Status
  isActive: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  isPaused: {
    type: Boolean,
    default: false
  },
  
  // Ratings and reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    breakdown: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  
  // Statistics
  stats: {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    responseTime: {
      type: Number,
      default: 0 // minutes
    }
  },
  
  // Financial
  commission: {
    rate: {
      type: Number,
      default: 0.10 // 10%
    },
    type: {
      type: String,
      enum: ['PERCENTAGE', 'FIXED'],
      default: 'PERCENTAGE'
    }
  },
  
  // Documents
  documents: {
    businessLicense: String,
    taxCertificate: String,
    healthPermit: String,
    insuranceCertificate: String
  },
  
  // Bank details
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    iban: String,
    swiftCode: String
  },
  
  // Preferences
  preferences: {
    autoAcceptOrders: {
      type: Boolean,
      default: false
    },
    orderPreparationTime: {
      type: Number,
      default: 20 // minutes
    },
    maxOrdersPerHour: {
      type: Number,
      default: 0 // 0 means unlimited
    },
    language: {
      type: String,
      enum: ['ar', 'fr', 'en'],
      default: 'ar'
    },
    currency: {
      type: String,
      enum: ['TND', 'DZD'],
      default: 'TND'
    }
  },
  
  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  
  // Social media
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    website: String
  },
  
  // Notifications
  notifications: {
    newOrders: {
      type: Boolean,
      default: true
    },
    orderUpdates: {
      type: Boolean,
      default: true
    },
    reviews: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: true
    }
  },
  
  // Featured status
  isFeatured: {
    type: Boolean,
    default: false
  },
  featuredUntil: Date,
  
  // Temporary closure
  temporaryClosure: {
    isTemporarilyClosed: {
      type: Boolean,
      default: false
    },
    reason: String,
    closedUntil: Date
  },
  
  // Admin notes
  adminNotes: String,
  
  // Verification
  verification: {
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectionReason: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
restaurantSchema.index({ 'address.coordinates': '2dsphere' });
restaurantSchema.index({ slug: 1 });
restaurantSchema.index({ owner: 1 });
restaurantSchema.index({ isActive: 1, isVerified: 1 });
restaurantSchema.index({ 'rating.average': -1 });
restaurantSchema.index({ createdAt: -1 });
restaurantSchema.index({ cuisines: 1 });
restaurantSchema.index({ categories: 1 });

// Virtual for menu items
restaurantSchema.virtual('menuItems', {
  ref: 'Food',
  localField: '_id',
  foreignField: 'restaurant'
});

// Virtual for orders
restaurantSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'restaurant'
});

// Virtual for reviews
restaurantSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'restaurant'
});

// Pre-save middleware to generate slug
restaurantSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim('-'); // Remove leading/trailing hyphens
  }
  next();
});

// Method to check if restaurant is currently open
restaurantSchema.methods.isCurrentlyOpen = function() {
  if (!this.isActive || !this.isVerified || this.isPaused || this.temporaryClosure.isTemporarilyClosed) {
    return false;
  }
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5); // Format: "HH:MM"
  
  const todayHours = this.openingHours.find(hours => hours.day === currentDay);
  
  if (!todayHours || !todayHours.isOpen) {
    return false;
  }
  
  // Check if current time is within opening hours
  if (currentTime >= todayHours.openTime && currentTime <= todayHours.closeTime) {
    // Check if not in break time
    const isInBreak = todayHours.breaks.some(breakTime => 
      currentTime >= breakTime.startTime && currentTime <= breakTime.endTime
    );
    return !isInBreak;
  }
  
  return false;
};

// Method to calculate distance from coordinates
restaurantSchema.methods.calculateDistance = function(longitude, latitude) {
  const restaurantCoords = this.address.coordinates.coordinates;
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = (latitude - restaurantCoords[1]) * Math.PI / 180;
  const dLon = (longitude - restaurantCoords[0]) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(restaurantCoords[1] * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

// Method to update rating
restaurantSchema.methods.updateRating = async function() {
  const Review = mongoose.model('Review');
  const reviews = await Review.find({ restaurant: this._id });
  
  if (reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    this.rating.breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    return;
  }
  
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const totalRating = reviews.reduce((sum, review) => {
    breakdown[review.rating]++;
    return sum + review.rating;
  }, 0);
  
  this.rating.average = Math.round((totalRating / reviews.length) * 10) / 10;
  this.rating.count = reviews.length;
  this.rating.breakdown = breakdown;
  
  await this.save();
};

// Static method to find restaurants near location
restaurantSchema.statics.findNearby = function(longitude, latitude, maxDistance = 10000) {
  return this.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        distanceField: 'distance',
        maxDistance: maxDistance, // meters
        spherical: true,
        query: {
          isActive: true,
          isVerified: true,
          isPaused: false,
          'temporaryClosure.isTemporarilyClosed': false
        }
      }
    },
    {
      $addFields: {
        distanceInKm: { $divide: ['$distance', 1000] }
      }
    }
  ]);
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
