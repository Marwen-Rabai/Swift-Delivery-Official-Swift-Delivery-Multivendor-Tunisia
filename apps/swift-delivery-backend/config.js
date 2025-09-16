require('dotenv').config();

const config = {
  // Database
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/swift-delivery-tunisia',
  
  // Server
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'swift-delivery-tunisia-secret-key-2024',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Email Configuration
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@swift-delivery-tunisia.com',
  
  // SMS Configuration (Twilio)
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
  
  // Firebase
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || '',
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
  
  // Payment Gateways
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || '',
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || '',
  PAYPAL_MODE: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
  
  // Cloudinary (Image Storage)
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  
  // Redis (Caching & Sessions)
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // Google Maps
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
  
  // App URLs
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  ADMIN_URL: process.env.ADMIN_URL || 'http://localhost:3001',
  RESTAURANT_URL: process.env.RESTAURANT_URL || 'http://localhost:3002',
  
  // File Upload
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '10mb',
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
  
  // Pagination
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE) || 20,
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE) || 100,
  
  // Tunisia Specific
  TUNISIA_CURRENCY: 'TND',
  ALGERIA_CURRENCY: 'DZD',
  DEFAULT_TIMEZONE: 'Africa/Tunis',
  SUPPORTED_LANGUAGES: ['ar', 'fr', 'en'],
  
  // Business Configuration
  COMMISSION_RATE: parseFloat(process.env.COMMISSION_RATE) || 0.10, // 10%
  DELIVERY_RADIUS_KM: parseFloat(process.env.DELIVERY_RADIUS_KM) || 10,
  MIN_ORDER_AMOUNT: parseFloat(process.env.MIN_ORDER_AMOUNT) || 5.0,
  
  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FILE: process.env.LOG_FILE || './logs/swift-delivery.log',
  
  // Features Flags
  ENABLE_REAL_TIME_TRACKING: process.env.ENABLE_REAL_TIME_TRACKING !== 'false',
  ENABLE_PUSH_NOTIFICATIONS: process.env.ENABLE_PUSH_NOTIFICATIONS !== 'false',
  ENABLE_EMAIL_NOTIFICATIONS: process.env.ENABLE_EMAIL_NOTIFICATIONS !== 'false',
  ENABLE_SMS_NOTIFICATIONS: process.env.ENABLE_SMS_NOTIFICATIONS !== 'false',
  
  // Development
  ENABLE_GRAPHQL_PLAYGROUND: process.env.NODE_ENV !== 'production',
  ENABLE_GRAPHQL_INTROSPECTION: process.env.NODE_ENV !== 'production',
  
  // API Versions
  API_VERSION: '1.0.0',
  GRAPHQL_VERSION: '1.0.0',
  
  // Validation
  validate() {
    const required = [
      'MONGO_URL',
      'JWT_SECRET'
    ];
    
    const missing = required.filter(key => !this[key] || this[key] === '');
    
    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
    
    return true;
  },
  
  // Get database configuration
  getDatabaseConfig() {
    return {
      url: this.MONGO_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferMaxEntries: 0,
        bufferCommands: false
      }
    };
  },
  
  // Get JWT configuration
  getJWTConfig() {
    return {
      secret: this.JWT_SECRET,
      expiresIn: this.JWT_EXPIRES_IN,
      algorithm: 'HS256'
    };
  },
  
  // Get CORS configuration
  getCORSConfig() {
    const origins = this.NODE_ENV === 'production'
      ? [
          'https://swift-delivery-tunisia.com',
          'https://admin.swift-delivery-tunisia.com',
          'https://restaurant.swift-delivery-tunisia.com'
        ]
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:3002',
          'http://localhost:19006' // Expo
        ];
    
    return {
      origin: origins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    };
  }
};

// Validate configuration on load
if (process.env.NODE_ENV !== 'test') {
  try {
    config.validate();
  } catch (error) {
    console.error('Configuration validation failed:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

module.exports = config;
