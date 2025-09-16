const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

// Import configurations and middleware
const config = require('./config');
const { isAuth } = require('./middleware/is-auth');
const logger = require('./utils/logger');

// Import GraphQL schema and resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./resolvers');

// Import routes
const paypalRoutes = require('./routes/paypal');

// Import Socket.IO handlers
const socketHandler = require('./socket/socketHandler');

// Import database models
require('./models');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://swift-delivery-tunisia.com', 'https://admin.swift-delivery-tunisia.com']
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit each IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/graphql', limiter);

// Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Swift Delivery Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/paypal', paypalRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));

// EJS view engine for email templates
app.set('view engine', 'ejs');
app.set('views', './views');

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL || config.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('✅ Connected to MongoDB');

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        req,
        isAuth: isAuth(req),
        user: req.user
      }),
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      uploads: false, // Disable built-in upload handling
      formatError: (err) => {
        logger.error('GraphQL Error:', err);
        return {
          message: err.message,
          code: err.extensions?.code,
          path: err.path
        };
      }
    });

    await server.start();
    server.applyMiddleware({ 
      app, 
      path: '/graphql',
      cors: false // We handle CORS above
    });

    // Create HTTP server
    const httpServer = createServer(app);

    // Setup Socket.IO
    const io = new Server(httpServer, {
      cors: {
        origin: process.env.NODE_ENV === 'production'
          ? ['https://swift-delivery-tunisia.com', 'https://admin.swift-delivery-tunisia.com']
          : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
        methods: ['GET', 'POST'],
        credentials: true
      },
      transports: ['websocket', 'polling']
    });

    // Initialize Socket.IO handlers
    socketHandler(io);

    // Error handling middleware
    app.use((error, req, res, next) => {
      logger.error('Express Error:', error);
      res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl
      });
    });

    const PORT = process.env.PORT || 8000;
    
    httpServer.listen(PORT, () => {
      logger.info(`🚀 Swift Delivery Backend Server ready at:`);
      logger.info(`🔗 GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
      logger.info(`🌐 Health Check: http://localhost:${PORT}/health`);
      logger.info(`⚡ Socket.IO: http://localhost:${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🇹🇳 Swift Delivery Tunisia - Premium Multi-Vendor Platform`);
      logger.info(`👨‍💻 Developed by Marwen Rabai - https://marwen-rabai.netlify.app`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully');
      await server.stop();
      await mongoose.connection.close();
      httpServer.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer();

module.exports = app;
