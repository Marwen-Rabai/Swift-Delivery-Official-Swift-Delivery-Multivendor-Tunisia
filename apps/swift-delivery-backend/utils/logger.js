const winston = require('winston');
const path = require('path');
const config = require('../config');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

// Create logs directory if it doesn't exist
const fs = require('fs');
const logDir = path.dirname(config.LOG_FILE);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create logger instance
const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'swift-delivery-backend' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({
      filename: config.LOG_FILE,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

// Add console transport for non-production environments
if (config.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: logFormat,
    handleExceptions: true,
    handleRejections: true
  }));
}

// Custom logging methods for different contexts
logger.database = (message, meta = {}) => {
  logger.info(`[DATABASE] ${message}`, meta);
};

logger.auth = (message, meta = {}) => {
  logger.info(`[AUTH] ${message}`, meta);
};

logger.payment = (message, meta = {}) => {
  logger.info(`[PAYMENT] ${message}`, meta);
};

logger.order = (message, meta = {}) => {
  logger.info(`[ORDER] ${message}`, meta);
};

logger.socket = (message, meta = {}) => {
  logger.info(`[SOCKET] ${message}`, meta);
};

logger.email = (message, meta = {}) => {
  logger.info(`[EMAIL] ${message}`, meta);
};

logger.sms = (message, meta = {}) => {
  logger.info(`[SMS] ${message}`, meta);
};

logger.push = (message, meta = {}) => {
  logger.info(`[PUSH] ${message}`, meta);
};

// Performance logging
logger.performance = (operation, duration, meta = {}) => {
  logger.info(`[PERFORMANCE] ${operation} completed in ${duration}ms`, meta);
};

// Security logging
logger.security = (message, meta = {}) => {
  logger.warn(`[SECURITY] ${message}`, meta);
};

// Business logic logging
logger.business = (message, meta = {}) => {
  logger.info(`[BUSINESS] ${message}`, meta);
};

// API logging
logger.api = (method, url, statusCode, duration, meta = {}) => {
  const level = statusCode >= 400 ? 'error' : 'info';
  logger[level](`[API] ${method} ${url} ${statusCode} - ${duration}ms`, meta);
};

// GraphQL logging
logger.graphql = (operation, duration, meta = {}) => {
  logger.info(`[GRAPHQL] ${operation} - ${duration}ms`, meta);
};

module.exports = logger;
