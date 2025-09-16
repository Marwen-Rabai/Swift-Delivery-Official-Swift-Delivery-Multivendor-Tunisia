const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');
const { extractTokenFromRequest, logAuthEvent } = require('../utils/auth');
const logger = require('../utils/logger');

// Authentication middleware for Express routes
const isAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromRequest(req);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password -refreshTokens');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not found.'
      });
    }
    
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Account is deactivated.'
      });
    }
    
    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts.'
      });
    }
    
    // Add user info to request
    req.user = user;
    req.userId = user._id.toString();
    req.userRole = user.role;
    
    next();
  } catch (error) {
    logger.auth('Authentication failed', { error: error.message });
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token expired.'
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};

// Authentication middleware for GraphQL (returns user or null)
const isAuthGraphQL = async (req) => {
  try {
    const token = extractTokenFromRequest(req);
    
    if (!token) {
      return null;
    }
    
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -refreshTokens');
    
    if (!user || !user.isActive || user.isLocked) {
      return null;
    }
    
    return user;
  } catch (error) {
    logger.auth('GraphQL authentication failed', { error: error.message });
    return null;
  }
};

// Role-based authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }
    
    const userRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!userRoles.includes(req.user.role)) {
      logAuthEvent('AUTHORIZATION_FAILED', req.user, req, { requiredRoles: userRoles });
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    
    next();
  };
};

// Resource ownership authorization
const requireOwnership = (resourceField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }
    
    // Super admin can access everything
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }
    
    // Check if user owns the resource
    const resourceOwnerId = req.params.id || req.body[resourceField] || req.query[resourceField];
    
    if (req.user._id.toString() !== resourceOwnerId?.toString()) {
      logAuthEvent('OWNERSHIP_CHECK_FAILED', req.user, req, { resourceOwnerId });
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }
    
    next();
  };
};

// Optional authentication (for public endpoints that can benefit from user context)
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromRequest(req);
    
    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password -refreshTokens');
      
      if (user && user.isActive && !user.isLocked) {
        req.user = user;
        req.userId = user._id.toString();
        req.userRole = user.role;
      }
    }
    
    next();
  } catch (error) {
    // Ignore authentication errors for optional auth
    next();
  }
};

// API key authentication for external integrations
const requireApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key required.'
      });
    }
    
    // Validate API key (you might want to store these in database)
    // For now, we'll check against environment variable
    const validApiKeys = (process.env.API_KEYS || '').split(',');
    
    if (!validApiKeys.includes(apiKey)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key.'
      });
    }
    
    req.apiKey = apiKey;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error during API key validation.'
    });
  }
};

module.exports = {
  isAuth,
  isAuthGraphQL,
  requireRole,
  requireOwnership,
  optionalAuth,
  requireApiKey
};