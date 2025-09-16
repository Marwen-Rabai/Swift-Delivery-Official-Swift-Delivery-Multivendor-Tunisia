const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');
const { User, Order } = require('../models');

// Store connected users and their socket IDs
const connectedUsers = new Map();
const connectedRiders = new Map();

// Socket.IO middleware for authentication
const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }
    
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return next(new Error('Authentication error: User not found'));
    }
    
    socket.userId = user._id.toString();
    socket.userRole = user.role;
    socket.user = user;
    
    logger.socket(`User ${user.email} connected`, { userId: user._id, role: user.role });
    next();
  } catch (error) {
    logger.error('Socket authentication error:', error);
    next(new Error('Authentication error: Invalid token'));
  }
};

// Initialize Socket.IO handlers
const initializeSocketHandlers = (io) => {
  // Apply authentication middleware
  io.use(authenticateSocket);
  
  io.on('connection', (socket) => {
    const { userId, userRole, user } = socket;
    
    // Store connected user
    connectedUsers.set(userId, {
      socketId: socket.id,
      user: user,
      connectedAt: new Date()
    });
    
    // If user is a rider, store in riders map
    if (userRole === 'RIDER') {
      connectedRiders.set(userId, {
        socketId: socket.id,
        user: user,
        connectedAt: new Date(),
        isOnline: true
      });
      
      // Update rider online status
      User.findByIdAndUpdate(userId, { 'riderInfo.isOnline': true }).exec();
    }
    
    logger.socket(`User connected: ${user.email}`, { 
      userId, 
      role: userRole, 
      socketId: socket.id,
      totalConnected: connectedUsers.size 
    });
    
    // Join user to their personal room
    socket.join(`user:${userId}`);
    
    // Join role-based rooms
    socket.join(`role:${userRole.toLowerCase()}`);
    
    // Handle order tracking subscription
    socket.on('subscribe:order', (orderId) => {
      socket.join(`order:${orderId}`);
      logger.socket(`User subscribed to order ${orderId}`, { userId, orderId });
    });
    
    // Handle order tracking unsubscription
    socket.on('unsubscribe:order', (orderId) => {
      socket.leave(`order:${orderId}`);
      logger.socket(`User unsubscribed from order ${orderId}`, { userId, orderId });
    });
    
    // Handle rider location updates
    socket.on('rider:location', async (data) => {
      if (userRole !== 'RIDER') {
        return socket.emit('error', { message: 'Unauthorized: Only riders can update location' });
      }
      
      try {
        const { latitude, longitude, orderId } = data;
        
        if (!latitude || !longitude) {
          return socket.emit('error', { message: 'Invalid location data' });
        }
        
        // Update rider location in database
        await User.findByIdAndUpdate(userId, {
          'riderInfo.currentLocation': {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        });
        
        // If rider is on an order, update order tracking
        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            'tracking.riderLocation': {
              type: 'Point',
              coordinates: [longitude, latitude],
              updatedAt: new Date()
            }
          });
          
          // Emit location update to order subscribers
          io.to(`order:${orderId}`).emit('order:location_update', {
            orderId,
            location: { latitude, longitude },
            timestamp: new Date()
          });
        }
        
        logger.socket(`Rider location updated`, { userId, latitude, longitude, orderId });
        
      } catch (error) {
        logger.error('Error updating rider location:', error);
        socket.emit('error', { message: 'Failed to update location' });
      }
    });
    
    // Handle rider availability toggle
    socket.on('rider:toggle_availability', async (isOnline) => {
      if (userRole !== 'RIDER') {
        return socket.emit('error', { message: 'Unauthorized: Only riders can toggle availability' });
      }
      
      try {
        await User.findByIdAndUpdate(userId, { 'riderInfo.isOnline': isOnline });
        
        if (connectedRiders.has(userId)) {
          connectedRiders.get(userId).isOnline = isOnline;
        }
        
        socket.emit('rider:availability_updated', { isOnline });
        logger.socket(`Rider availability toggled`, { userId, isOnline });
        
      } catch (error) {
        logger.error('Error toggling rider availability:', error);
        socket.emit('error', { message: 'Failed to update availability' });
      }
    });
    
    // Handle chat messages
    socket.on('chat:message', async (data) => {
      try {
        const { orderId, message, messageType = 'TEXT' } = data;
        
        if (!orderId || !message) {
          return socket.emit('error', { message: 'Invalid message data' });
        }
        
        // Find the order and verify user is part of it
        const order = await Order.findById(orderId);
        if (!order) {
          return socket.emit('error', { message: 'Order not found' });
        }
        
        const isAuthorized = [
          order.customer.toString(),
          order.restaurant.owner?.toString(),
          order.rider?.toString()
        ].includes(userId);
        
        if (!isAuthorized) {
          return socket.emit('error', { message: 'Unauthorized to send message' });
        }
        
        // Add message to order chat
        const chatMessage = {
          sender: userId,
          message,
          messageType,
          timestamp: new Date()
        };
        
        order.chat.push(chatMessage);
        await order.save();
        
        // Emit message to all order participants
        io.to(`order:${orderId}`).emit('chat:new_message', {
          orderId,
          message: {
            ...chatMessage,
            sender: {
              _id: userId,
              name: user.name,
              role: userRole
            }
          }
        });
        
        logger.socket(`Chat message sent`, { userId, orderId, messageType });
        
      } catch (error) {
        logger.error('Error sending chat message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });
    
    // Handle typing indicators
    socket.on('chat:typing', (data) => {
      const { orderId, isTyping } = data;
      socket.to(`order:${orderId}`).emit('chat:user_typing', {
        orderId,
        userId,
        userName: user.name,
        isTyping
      });
    });
    
    // Handle disconnect
    socket.on('disconnect', async (reason) => {
      logger.socket(`User disconnected: ${user.email}`, { 
        userId, 
        reason, 
        duration: Date.now() - connectedUsers.get(userId)?.connectedAt 
      });
      
      // Remove from connected users
      connectedUsers.delete(userId);
      
      // If rider, update offline status
      if (userRole === 'RIDER') {
        connectedRiders.delete(userId);
        try {
          await User.findByIdAndUpdate(userId, { 'riderInfo.isOnline': false });
        } catch (error) {
          logger.error('Error updating rider offline status:', error);
        }
      }
    });
    
    // Handle errors
    socket.on('error', (error) => {
      logger.error('Socket error:', error);
    });
  });
  
  // Utility functions for emitting events
  io.emitToUser = (userId, event, data) => {
    const user = connectedUsers.get(userId);
    if (user) {
      io.to(user.socketId).emit(event, data);
      return true;
    }
    return false;
  };
  
  io.emitToRole = (role, event, data) => {
    io.to(`role:${role.toLowerCase()}`).emit(event, data);
  };
  
  io.emitToOrder = (orderId, event, data) => {
    io.to(`order:${orderId}`).emit(event, data);
  };
  
  // Broadcast order updates
  io.broadcastOrderUpdate = async (orderId, status, data = {}) => {
    try {
      const order = await Order.findById(orderId).populate('customer restaurant rider');
      if (!order) return;
      
      const updateData = {
        orderId,
        status,
        timestamp: new Date(),
        ...data
      };
      
      // Emit to order room
      io.to(`order:${orderId}`).emit('order:status_update', updateData);
      
      // Emit to specific users
      if (order.customer) {
        io.emitToUser(order.customer._id.toString(), 'order:status_update', updateData);
      }
      
      if (order.restaurant?.owner) {
        io.emitToUser(order.restaurant.owner.toString(), 'order:status_update', updateData);
      }
      
      if (order.rider) {
        io.emitToUser(order.rider._id.toString(), 'order:status_update', updateData);
      }
      
      logger.socket(`Order update broadcasted`, { orderId, status });
      
    } catch (error) {
      logger.error('Error broadcasting order update:', error);
    }
  };
  
  // Get connected users count
  io.getConnectedUsersCount = () => connectedUsers.size;
  
  // Get online riders count
  io.getOnlineRidersCount = () => {
    return Array.from(connectedRiders.values()).filter(rider => rider.isOnline).length;
  };
  
  // Get connected user info
  io.getConnectedUser = (userId) => connectedUsers.get(userId);
  
  // Check if user is online
  io.isUserOnline = (userId) => connectedUsers.has(userId);
  
  logger.socket('Socket.IO initialized successfully');
};

module.exports = initializeSocketHandlers;
