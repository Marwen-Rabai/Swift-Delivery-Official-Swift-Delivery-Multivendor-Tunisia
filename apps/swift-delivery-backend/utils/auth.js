const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('./logger');

// Generate JWT tokens
const generateTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  
  const accessToken = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '15m', // Short-lived access token
    algorithm: 'HS256'
  });
  
  const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN, // Long-lived refresh token
    algorithm: 'HS256'
  });
  
  return { accessToken, refreshToken };
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification failed');
    }
  }
};

// Generate password reset token
const generatePasswordResetToken = () => {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
};

// Generate email verification token
const generateEmailVerificationToken = () => {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
};

// Generate phone verification code
const generatePhoneVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hash password
const hashPassword = async (password) => {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(config.BCRYPT_ROUNDS);
  return bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(password, hashedPassword);
};

// Extract token from request
const extractTokenFromRequest = (req) => {
  let token = null;
  
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  // Check query parameter (for WebSocket connections)
  if (!token && req.query.token) {
    token = req.query.token;
  }
  
  // Check cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  
  return token;
};

// Create authentication response
const createAuthResponse = (user, tokens) => {
  return {
    success: true,
    message: 'Authentication successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      language: user.language,
      currency: user.currency
    },
    tokens
  };
};

// Validate password strength
const validatePasswordStrength = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generate API key for external integrations
const generateApiKey = () => {
  const crypto = require('crypto');
  return `sd_${crypto.randomBytes(32).toString('hex')}`;
};

// Rate limiting helper
const createRateLimitKey = (identifier, action) => {
  return `rate_limit:${action}:${identifier}`;
};

// Check if user has permission
const hasPermission = (user, requiredRole) => {
  const roleHierarchy = {
    'CUSTOMER': 1,
    'RESTAURANT_OWNER': 2,
    'RIDER': 2,
    'ADMIN': 3,
    'SUPER_ADMIN': 4
  };
  
  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
};

// Check if user can access resource
const canAccessResource = (user, resource, resourceOwnerId = null) => {
  // Super admin can access everything
  if (user.role === 'SUPER_ADMIN') {
    return true;
  }
  
  // Admin can access most things
  if (user.role === 'ADMIN') {
    return true;
  }
  
  // Resource owner can access their own resources
  if (resourceOwnerId && user._id.toString() === resourceOwnerId.toString()) {
    return true;
  }
  
  // Additional resource-specific logic can be added here
  switch (resource) {
    case 'order':
      // Users can access orders they are involved in
      return true; // This should be checked in the resolver/controller
    
    case 'restaurant':
      // Restaurant owners can access their restaurants
      return user.role === 'RESTAURANT_OWNER';
    
    case 'user':
      // Users can access their own profile
      return user._id.toString() === resourceOwnerId?.toString();
    
    default:
      return false;
  }
};

// Sanitize user data for response
const sanitizeUserData = (user) => {
  const sanitized = user.toObject ? user.toObject() : user;
  
  // Remove sensitive fields
  delete sanitized.password;
  delete sanitized.refreshTokens;
  delete sanitized.resetPasswordToken;
  delete sanitized.resetPasswordExpires;
  delete sanitized.emailVerificationToken;
  delete sanitized.emailVerificationExpires;
  delete sanitized.phoneVerificationCode;
  delete sanitized.phoneVerificationExpires;
  delete sanitized.loginAttempts;
  delete sanitized.lockUntil;
  
  return sanitized;
};

// Create session data
const createSessionData = (user, req) => {
  return {
    userId: user._id,
    email: user.email,
    role: user.role,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    createdAt: new Date()
  };
};

// Log authentication events
const logAuthEvent = (event, user, req, additional = {}) => {
  logger.auth(`${event}`, {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
    ip: req?.ip || req?.connection?.remoteAddress,
    userAgent: req?.get('User-Agent'),
    ...additional
  });
};

module.exports = {
  generateTokens,
  verifyToken,
  generatePasswordResetToken,
  generateEmailVerificationToken,
  generatePhoneVerificationCode,
  hashPassword,
  comparePassword,
  extractTokenFromRequest,
  createAuthResponse,
  validatePasswordStrength,
  generateApiKey,
  createRateLimitKey,
  hasPermission,
  canAccessResource,
  sanitizeUserData,
  createSessionData,
  logAuthEvent
};
