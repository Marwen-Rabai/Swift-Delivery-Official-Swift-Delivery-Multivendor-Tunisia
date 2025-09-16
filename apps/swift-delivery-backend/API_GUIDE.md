# 📚 Swift Delivery API Guide

## Authentication

### Register User
```graphql
mutation RegisterUser {
  register(input: {
    name: "John Doe"
    email: "john@example.com"
    password: "password123"
    phone: "+21612345678"
    role: CUSTOMER
  }) {
    success
    message
    user {
      id
      name
      email
      role
    }
    tokens {
      accessToken
      refreshToken
    }
  }
}
```

### Login
```graphql
mutation LoginUser {
  login(email: "john@example.com", password: "password123") {
    success
    message
    user {
      id
      name
      email
      role
      isVerified
    }
    tokens {
      accessToken
      refreshToken
    }
  }
}
```

### Refresh Token
```graphql
mutation RefreshToken {
  refreshToken(token: "your-refresh-token") {
    success
    tokens {
      accessToken
      refreshToken
    }
  }
}
```

## Restaurant Management

### Get Nearby Restaurants
```graphql
query GetNearbyRestaurants {
  nearbyRestaurants(
    latitude: 36.8065
    longitude: 10.1815
    radius: 10
    limit: 20
  ) {
    id
    name
    slug
    description
    logo
    image
    rating {
      average
      count
    }
    deliverySettings {
      deliveryFee
      minOrderAmount
      estimatedDeliveryTime
    }
    isOpen
    distance
  }
}
```

### Get Restaurant Details
```graphql
query GetRestaurant {
  restaurant(id: "restaurant-id") {
    id
    name
    description
    logo
    image
    address {
      street
      city
      coordinates {
        coordinates
      }
    }
    openingHours {
      day
      isOpen
      openTime
      closeTime
    }
    menuItems {
      id
      name
      price
      image
      category {
        name
      }
    }
  }
}
```

## Order Management

### Create Order
```graphql
mutation CreateOrder {
  createOrder(input: {
    restaurantId: "restaurant-id"
    items: [
      {
        foodId: "food-id"
        quantity: 2
        selectedAddons: ["addon-id-1"]
        selectedOptions: ["option-id-1"]
        specialInstructions: "No spicy"
      }
    ]
    deliveryAddressId: "address-id"
    paymentMethod: CARD
    couponCode: "SAVE10"
    instructions: "Ring the doorbell"
  }) {
    success
    message
    order {
      id
      orderNumber
      status
      pricing {
        subtotal
        deliveryFee
        tax
        total
      }
      estimatedDeliveryTime
    }
  }
}
```

### Get Order Status
```graphql
query GetOrder {
  order(id: "order-id") {
    id
    orderNumber
    status
    items {
      food {
        name
        image
      }
      quantity
      price
    }
    customer {
      name
      phone
    }
    restaurant {
      name
      phone
    }
    rider {
      name
      phone
    }
    tracking {
      riderLocation {
        coordinates
      }
      estimatedArrival
    }
  }
}
```

### Update Order Status (Restaurant/Admin)
```graphql
mutation UpdateOrderStatus {
  updateOrderStatus(
    orderId: "order-id"
    status: PREPARING
    note: "Started cooking"
  ) {
    success
    message
    order {
      id
      status
      statusHistory {
        status
        timestamp
        note
      }
    }
  }
}
```

## Food Management

### Get Menu Items
```graphql
query GetMenuItems {
  foods(restaurantId: "restaurant-id", categoryId: "category-id") {
    id
    name
    description
    price
    originalPrice
    discount
    image
    images
    category {
      name
    }
    addons {
      id
      name
      price
    }
    options {
      id
      name
      price
    }
    rating {
      average
      count
    }
    isAvailable
  }
}
```

### Search Foods
```graphql
query SearchFoods {
  searchFoods(
    query: "pizza"
    filters: {
      minPrice: 10
      maxPrice: 50
      isVegetarian: true
      cuisines: ["italian", "mediterranean"]
    }
  ) {
    id
    name
    price
    image
    restaurant {
      name
      rating { average }
    }
  }
}
```

## User Profile Management

### Get User Profile
```graphql
query GetProfile {
  me {
    id
    name
    email
    phone
    avatar
    addresses {
      id
      label
      street
      city
      isDefault
    }
    customerInfo {
      favoriteRestaurants {
        id
        name
        logo
      }
      totalOrders
      loyaltyPoints
    }
  }
}
```

### Update Profile
```graphql
mutation UpdateProfile {
  updateProfile(input: {
    name: "John Smith"
    phone: "+21612345678"
    language: "ar"
    currency: "TND"
  }) {
    success
    message
    user {
      id
      name
      phone
      language
      currency
    }
  }
}
```

### Add Address
```graphql
mutation AddAddress {
  addAddress(input: {
    label: HOME
    street: "123 Main Street"
    city: "Tunis"
    country: "Tunisia"
    coordinates: {
      latitude: 36.8065
      longitude: 10.1815
    }
    deliveryInstructions: "Second floor, apartment 5"
    isDefault: true
  }) {
    success
    message
    address {
      id
      label
      street
      city
      isDefault
    }
  }
}
```

## Real-time Features (Socket.IO)

### Connection Setup
```javascript
// Client-side connection
const socket = io('http://localhost:8000', {
  auth: {
    token: 'your-jwt-token'
  }
});

// Connection events
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

### Order Tracking
```javascript
// Subscribe to order updates
socket.emit('subscribe:order', 'order-id');

// Listen for status updates
socket.on('order:status_update', (data) => {
  console.log('Order status:', data.status);
  console.log('Timestamp:', data.timestamp);
});

// Listen for location updates
socket.on('order:location_update', (data) => {
  console.log('Rider location:', data.location);
  updateMapMarker(data.location);
});
```

### Chat System
```javascript
// Send message
socket.emit('chat:message', {
  orderId: 'order-id',
  message: 'Hello, where are you?',
  messageType: 'TEXT'
});

// Receive messages
socket.on('chat:new_message', (data) => {
  displayMessage(data.message);
});

// Typing indicators
socket.emit('chat:typing', {
  orderId: 'order-id',
  isTyping: true
});

socket.on('chat:user_typing', (data) => {
  showTypingIndicator(data.userName, data.isTyping);
});
```

### Rider Features
```javascript
// Update location (riders only)
socket.emit('rider:location', {
  latitude: 36.8065,
  longitude: 10.1815,
  orderId: 'current-order-id' // optional
});

// Toggle availability
socket.emit('rider:toggle_availability', true);

socket.on('rider:availability_updated', (data) => {
  console.log('Availability:', data.isOnline);
});
```

## Error Handling

### GraphQL Errors
```graphql
{
  "errors": [
    {
      "message": "User not found",
      "code": "USER_NOT_FOUND",
      "path": ["login"]
    }
  ],
  "data": null
}
```

### REST API Errors
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Socket.IO Errors
```javascript
socket.on('error', (error) => {
  console.error('Socket error:', error.message);
});
```

## Rate Limiting

### Default Limits
- **GraphQL:** 100 requests per 15 minutes per IP
- **REST API:** 1000 requests per 15 minutes per IP
- **File Upload:** 10 files per minute per user

### Custom Headers
```bash
# Check rate limit status
curl -I http://localhost:8000/graphql

# Response headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

## Testing Examples

### Unit Tests
```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Authentication', () => {
  test('should register new user', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `mutation { register(input: { name: "Test", email: "test@test.com", password: "password123" }) { success } }`
      });
    
    expect(response.body.data.register.success).toBe(true);
  });
});
```

### Integration Tests
```javascript
// tests/orders.test.js
describe('Order Management', () => {
  test('should create order', async () => {
    // Test order creation flow
  });
  
  test('should update order status', async () => {
    // Test status updates
  });
});
```

## Performance Optimization

### Database Indexing
```javascript
// Ensure proper indexes
db.users.createIndex({ email: 1 });
db.restaurants.createIndex({ "address.coordinates": "2dsphere" });
db.orders.createIndex({ customer: 1, createdAt: -1 });
```

### Caching Strategy
```javascript
// Redis caching example
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

// Cache restaurant data
await client.setex(`restaurant:${id}`, 300, JSON.stringify(restaurant));
```

### Query Optimization
```javascript
// Use populate sparingly
const orders = await Order.find({ customer: userId })
  .populate('restaurant', 'name logo')
  .select('orderNumber status total createdAt')
  .sort({ createdAt: -1 })
  .limit(20);
```

---

**Swift Delivery API Guide** - Complete documentation for developers  
*Created by Marwen Rabai - https://marwen-rabai.netlify.app*
