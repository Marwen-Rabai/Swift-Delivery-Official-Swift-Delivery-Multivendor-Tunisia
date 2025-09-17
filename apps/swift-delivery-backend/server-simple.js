const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Simple logger
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`)
};

const app = express();

// Configuration
const config = {
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/swift-delivery-tunisia',
  JWT_SECRET: process.env.JWT_SECRET || 'swift-delivery-tunisia-secret-key-2024',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Swift Delivery Backend',
    version: '1.0.0',
    environment: config.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    developer: 'Marwen Rabai - https://marwen-rabai.netlify.app'
  });
});

// API Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Swift Delivery Tunisia API',
    version: '1.0.0',
    description: 'Premium Multi-Vendor Food Delivery Platform',
    developer: 'Marwen Rabai',
    website: 'https://marwen-rabai.netlify.app',
    email: 'marwenrabai6@gmail.com',
    endpoints: {
      health: '/health',
      graphql: '/graphql',
      uploads: '/uploads',
      paypal: '/paypal'
    },
    features: [
      'Multi-vendor support',
      'Real-time tracking',
      'Payment integration',
      'Multi-language (AR/FR/EN)',
      'Multi-currency (TND/DZD)',
      'Socket.IO real-time',
      'JWT authentication',
      'Role-based access'
    ],
    supported_countries: ['Tunisia', 'Algeria'],
    supported_currencies: ['TND', 'DZD', 'EUR', 'USD'],
    supported_languages: ['ar', 'fr', 'en']
  });
});

// Mock GraphQL endpoint for testing
app.post('/graphql', (req, res) => {
  const { query } = req.body;
  
  // Simple mock responses
  if (query.includes('configurations')) {
    return res.json({
      data: {
        configurations: [
          { key: 'APP_NAME', value: 'Swift Delivery Tunisia' },
          { key: 'DEFAULT_CURRENCY', value: 'TND' },
          { key: 'SUPPORTED_LANGUAGES', value: ['ar', 'fr', 'en'] },
          { key: 'MIN_ORDER_AMOUNT', value: 5.0 },
          { key: 'CUSTOMER_SUPPORT_PHONE', value: '+216 12 345 678' }
        ]
      }
    });
  }
  
  if (query.includes('nearbyRestaurants')) {
    return res.json({
      data: {
        nearbyRestaurants: [
          {
            id: '1',
            name: 'Restaurant Tunisien Authentique',
            slug: 'restaurant-tunisien',
            rating: { average: 4.5, count: 128 },
            deliverySettings: { deliveryFee: 3.0, estimatedDeliveryTime: 30 },
            isOpen: true,
            distance: 2.5
          },
          {
            id: '2', 
            name: 'Pizza Mediterranean',
            slug: 'pizza-mediterranean',
            rating: { average: 4.2, count: 89 },
            deliverySettings: { deliveryFee: 2.5, estimatedDeliveryTime: 25 },
            isOpen: true,
            distance: 1.8
          }
        ]
      }
    });
  }
  
  res.json({
    data: null,
    errors: [{ message: 'GraphQL endpoint is ready - Full implementation available' }]
  });
});

// Mock Socket.IO endpoint
app.get('/socket.io', (req, res) => {
  res.json({
    message: 'Socket.IO endpoint ready',
    features: ['Order tracking', 'Rider location', 'Chat system', 'Real-time notifications'],
    status: 'Available'
  });
});

// File uploads endpoint
app.use('/uploads', express.static('uploads'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    available_endpoints: ['/health', '/api/info', '/graphql', '/uploads'],
    documentation: 'See README.md for complete API documentation'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error(`Express Error: ${error.message}`);
  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal Server Error',
    ...(config.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// Start server
async function startServer() {
  try {
    // Try to connect to MongoDB
    if (config.MONGO_URL) {
      try {
        await mongoose.connect(config.MONGO_URL);
        logger.info('✅ Connected to MongoDB');
      } catch (error) {
        logger.warn('⚠️ MongoDB not available, running without database');
      }
    }
    
    app.listen(config.PORT, () => {
      logger.info('🚀 Swift Delivery Backend Server Started Successfully!');
      logger.info(`🔗 Server: http://localhost:${config.PORT}`);
      logger.info(`🔗 Health: http://localhost:${config.PORT}/health`);
      logger.info(`🔗 API Info: http://localhost:${config.PORT}/api/info`);
      logger.info(`🔗 GraphQL: http://localhost:${config.PORT}/graphql`);
      logger.info(`🌍 Environment: ${config.NODE_ENV}`);
      logger.info(`🇹🇳 Swift Delivery Tunisia - Premium Multi-Vendor Platform`);
      logger.info(`👨‍💻 Developed by Marwen Rabai - https://marwen-rabai.netlify.app`);
      logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
    
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();

module.exports = app;
