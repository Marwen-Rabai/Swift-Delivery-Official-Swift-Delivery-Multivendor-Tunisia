// Import all models to ensure they are registered with Mongoose
const User = require('./User');
const Restaurant = require('./Restaurant');
const Order = require('./Order');

// Additional models (create these files as needed)
const Food = require('./Food');
const Category = require('./Category');
const Cuisine = require('./Cuisine');
const Addon = require('./Addon');
const Option = require('./Option');
const Address = require('./Address');
const Review = require('./Review');
const Coupon = require('./Coupon');
const Banner = require('./Banner');
const Notification = require('./Notification');
const Configuration = require('./Configuration');

module.exports = {
  User,
  Restaurant,
  Order,
  Food,
  Category,
  Cuisine,
  Addon,
  Option,
  Address,
  Review,
  Coupon,
  Banner,
  Notification,
  Configuration
};
