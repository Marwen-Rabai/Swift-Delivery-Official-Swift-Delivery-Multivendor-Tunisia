const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  
  // Restaurant
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  
  // Category
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  
  // Pricing
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Media
  image: String,
  images: [String],
  
  // Addons and options
  addons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Addon'
  }],
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }],
  
  // Nutritional information
  nutrition: {
    calories: Number,
    protein: Number, // grams
    carbs: Number, // grams
    fat: Number, // grams
    fiber: Number, // grams
    sugar: Number, // grams
    sodium: Number // mg
  },
  
  // Dietary information
  dietary: {
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    },
    isHalal: {
      type: Boolean,
      default: true // Default for Tunisia
    },
    isKosher: {
      type: Boolean,
      default: false
    },
    isSpicy: {
      type: Boolean,
      default: false
    },
    spiceLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  
  // Allergens
  allergens: [{
    type: String,
    enum: [
      'GLUTEN',
      'DAIRY',
      'EGGS',
      'NUTS',
      'PEANUTS',
      'SOY',
      'FISH',
      'SHELLFISH',
      'SESAME'
    ]
  }],
  
  // Ingredients
  ingredients: [String],
  
  // Availability
  isAvailable: {
    type: Boolean,
    default: true
  },
  availabilityHours: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    startTime: String, // Format: "09:00"
    endTime: String // Format: "22:00"
  }],
  
  // Preparation
  preparationTime: {
    type: Number,
    default: 15 // minutes
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Tags
  tags: [String],
  
  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
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
    viewCount: {
      type: Number,
      default: 0
    }
  },
  
  // Ratings
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
    }
  },
  
  // Variants (sizes, etc.)
  variants: [{
    name: String, // e.g., "Small", "Medium", "Large"
    price: Number,
    description: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  
  // Stock management
  stock: {
    isUnlimited: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    }
  },
  
  // Recommendations
  recommendedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
  
  // Order restrictions
  restrictions: {
    minQuantity: {
      type: Number,
      default: 1
    },
    maxQuantity: {
      type: Number,
      default: 10
    },
    maxPerOrder: {
      type: Number,
      default: 0 // 0 means unlimited
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
foodSchema.index({ restaurant: 1, isActive: 1 });
foodSchema.index({ category: 1, isActive: 1 });
foodSchema.index({ slug: 1, restaurant: 1 });
foodSchema.index({ name: 'text', description: 'text', tags: 'text' });
foodSchema.index({ 'rating.average': -1 });
foodSchema.index({ price: 1 });
foodSchema.index({ isFeatured: -1, createdAt: -1 });

// Virtual for discounted price
foodSchema.virtual('discountedPrice').get(function() {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

// Virtual for reviews
foodSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'food'
});

// Pre-save middleware to generate slug
foodSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Method to check availability
foodSchema.methods.isCurrentlyAvailable = function() {
  if (!this.isActive || !this.isAvailable) {
    return false;
  }
  
  // Check stock
  if (!this.stock.isUnlimited && this.stock.quantity <= 0) {
    return false;
  }
  
  // Check availability hours
  if (this.availabilityHours && this.availabilityHours.length > 0) {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todayHours = this.availabilityHours.find(hours => hours.day === currentDay);
    if (todayHours) {
      return currentTime >= todayHours.startTime && currentTime <= todayHours.endTime;
    }
  }
  
  return true;
};

// Method to update rating
foodSchema.methods.updateRating = async function() {
  const Review = mongoose.model('Review');
  const reviews = await Review.find({ food: this._id });
  
  if (reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    return;
  }
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating.average = Math.round((totalRating / reviews.length) * 10) / 10;
  this.rating.count = reviews.length;
  
  await this.save();
};

// Method to decrease stock
foodSchema.methods.decreaseStock = function(quantity) {
  if (!this.stock.isUnlimited) {
    this.stock.quantity = Math.max(0, this.stock.quantity - quantity);
  }
};

// Method to increase stock
foodSchema.methods.increaseStock = function(quantity) {
  if (!this.stock.isUnlimited) {
    this.stock.quantity += quantity;
  }
};

// Static method to search foods
foodSchema.statics.searchFoods = function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    isAvailable: true,
    ...filters
  };
  
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  return this.find(searchQuery)
    .populate('restaurant', 'name slug rating isOpen')
    .populate('category', 'name slug')
    .sort(query ? { score: { $meta: 'textScore' } } : { createdAt: -1 });
};

// Static method to get popular foods
foodSchema.statics.getPopular = function(limit = 10, restaurantId = null) {
  const match = {
    isActive: true,
    isAvailable: true
  };
  
  if (restaurantId) {
    match.restaurant = restaurantId;
  }
  
  return this.find(match)
    .sort({ 'stats.totalOrders': -1, 'rating.average': -1 })
    .limit(limit)
    .populate('restaurant', 'name slug rating')
    .populate('category', 'name slug');
};

module.exports = mongoose.model('Food', foodSchema);
