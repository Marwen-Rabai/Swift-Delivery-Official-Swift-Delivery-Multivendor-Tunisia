// MongoDB initialization script for Swift Delivery Tunisia
// This script runs when MongoDB container starts for the first time

// Switch to the application database
db = db.getSiblingDB('swift-delivery-tunisia');

// Create application user
db.createUser({
  user: 'swiftdelivery',
  pwd: 'swiftdelivery123',
  roles: [
    {
      role: 'readWrite',
      db: 'swift-delivery-tunisia'
    }
  ]
});

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'role'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 2,
          maxLength: 100
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        role: {
          enum: ['CUSTOMER', 'RESTAURANT_OWNER', 'RIDER', 'ADMIN', 'SUPER_ADMIN']
        }
      }
    }
  }
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ phone: 1 });
db.users.createIndex({ role: 1 });
db.users.createIndex({ 'riderInfo.currentLocation': '2dsphere' });

db.restaurants.createIndex({ 'address.coordinates': '2dsphere' });
db.restaurants.createIndex({ slug: 1 }, { unique: true });
db.restaurants.createIndex({ owner: 1 });
db.restaurants.createIndex({ isActive: 1, isVerified: 1 });

db.orders.createIndex({ orderNumber: 1 }, { unique: true });
db.orders.createIndex({ customer: 1, createdAt: -1 });
db.orders.createIndex({ restaurant: 1, createdAt: -1 });
db.orders.createIndex({ rider: 1, createdAt: -1 });
db.orders.createIndex({ status: 1 });

db.foods.createIndex({ restaurant: 1, isActive: 1 });
db.foods.createIndex({ name: 'text', description: 'text', tags: 'text' });
db.foods.createIndex({ 'rating.average': -1 });

// Insert default configurations
db.configurations.insertMany([
  {
    key: 'APP_NAME',
    value: 'Swift Delivery Tunisia',
    type: 'STRING',
    description: 'Application name',
    category: 'GENERAL',
    isPublic: true
  },
  {
    key: 'DEFAULT_CURRENCY',
    value: 'TND',
    type: 'STRING',
    description: 'Default currency for Tunisia',
    category: 'GENERAL',
    isPublic: true
  },
  {
    key: 'SUPPORTED_CURRENCIES',
    value: ['TND', 'DZD', 'EUR', 'USD'],
    type: 'ARRAY',
    description: 'Supported currencies',
    category: 'GENERAL',
    isPublic: true
  },
  {
    key: 'SUPPORTED_LANGUAGES',
    value: ['ar', 'fr', 'en'],
    type: 'ARRAY',
    description: 'Supported languages',
    category: 'GENERAL',
    isPublic: true
  },
  {
    key: 'DEFAULT_COMMISSION_RATE',
    value: 0.10,
    type: 'NUMBER',
    description: 'Default commission rate (10%)',
    category: 'GENERAL',
    isPublic: false
  },
  {
    key: 'MIN_ORDER_AMOUNT',
    value: 5.0,
    type: 'NUMBER',
    description: 'Minimum order amount in TND',
    category: 'GENERAL',
    isPublic: true
  },
  {
    key: 'MAX_DELIVERY_RADIUS',
    value: 15,
    type: 'NUMBER',
    description: 'Maximum delivery radius in km',
    category: 'DELIVERY',
    isPublic: true
  },
  {
    key: 'CUSTOMER_SUPPORT_PHONE',
    value: '+216 12 345 678',
    type: 'STRING',
    description: 'Customer support phone number',
    category: 'GENERAL',
    isPublic: true
  },
  {
    key: 'CUSTOMER_SUPPORT_EMAIL',
    value: 'support@swift-delivery-tunisia.com',
    type: 'STRING',
    description: 'Customer support email',
    category: 'GENERAL',
    isPublic: true
  }
]);

// Insert default cuisines for Tunisia
db.cuisines.insertMany([
  { name: 'Tunisian', slug: 'tunisian', description: 'Traditional Tunisian cuisine', isActive: true },
  { name: 'Mediterranean', slug: 'mediterranean', description: 'Mediterranean dishes', isActive: true },
  { name: 'Italian', slug: 'italian', description: 'Italian cuisine', isActive: true },
  { name: 'French', slug: 'french', description: 'French cuisine', isActive: true },
  { name: 'Middle Eastern', slug: 'middle-eastern', description: 'Middle Eastern dishes', isActive: true },
  { name: 'Seafood', slug: 'seafood', description: 'Fresh seafood dishes', isActive: true },
  { name: 'Vegetarian', slug: 'vegetarian', description: 'Vegetarian options', isActive: true },
  { name: 'Fast Food', slug: 'fast-food', description: 'Quick service food', isActive: true },
  { name: 'Desserts', slug: 'desserts', description: 'Sweet treats and desserts', isActive: true },
  { name: 'Beverages', slug: 'beverages', description: 'Drinks and beverages', isActive: true }
]);

// Insert default categories
db.categories.insertMany([
  { name: 'Appetizers', slug: 'appetizers', description: 'Starters and appetizers', isActive: true },
  { name: 'Main Courses', slug: 'main-courses', description: 'Main dishes', isActive: true },
  { name: 'Desserts', slug: 'desserts', description: 'Sweet desserts', isActive: true },
  { name: 'Beverages', slug: 'beverages', description: 'Drinks', isActive: true },
  { name: 'Salads', slug: 'salads', description: 'Fresh salads', isActive: true },
  { name: 'Soups', slug: 'soups', description: 'Hot soups', isActive: true },
  { name: 'Pizza', slug: 'pizza', description: 'Pizza varieties', isActive: true },
  { name: 'Burgers', slug: 'burgers', description: 'Burger options', isActive: true },
  { name: 'Sandwiches', slug: 'sandwiches', description: 'Sandwich varieties', isActive: true },
  { name: 'Grilled', slug: 'grilled', description: 'Grilled items', isActive: true }
]);

print('✅ Swift Delivery Tunisia database initialized successfully!');
print('📊 Default configurations, cuisines, and categories created');
print('🔐 Application user "swiftdelivery" created with readWrite permissions');
print('📈 Performance indexes created for optimal query performance');
print('🇹🇳 Ready for Swift Delivery Tunisia launch!');
