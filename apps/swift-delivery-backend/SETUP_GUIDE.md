# 🚀 Swift Delivery Backend - Complete Setup Guide

## Step-by-Step Setup Instructions

### 1. Prerequisites Installation

#### Install Node.js (18+)
```bash
# Using NodeSource repository (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using NVM (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Install MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or MongoDB Atlas (cloud)
# Sign up at https://cloud.mongodb.com
```

#### Install Redis (Optional)
```bash
# Ubuntu/Debian
sudo apt-get install -y redis-server

# Or using Docker
docker run -d -p 6379:6379 --name redis redis:latest
```

### 2. Project Setup

#### Clone and Install
```bash
# Clone the repository
git clone https://github.com/Marwen-Rabai/Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia.git

# Navigate to backend
cd Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia/apps/swift-delivery-backend

# Install dependencies
npm install
```

#### Environment Configuration
```bash
# Copy environment template
cp env.example .env

# Edit environment file
nano .env
```

#### Required Environment Variables
```bash
# Database
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia

# JWT Secret (IMPORTANT: Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server
NODE_ENV=development
PORT=8000
```

### 3. Database Setup

#### Start MongoDB
```bash
# If installed locally
sudo service mongod start

# Check status
sudo service mongod status

# If using Docker
docker start mongodb
```

#### Create Database
```bash
# Connect to MongoDB
mongo

# Create database and user
use swift-delivery-tunisia
db.createUser({
  user: "swiftdelivery",
  pwd: "your-password",
  roles: ["readWrite"]
})
```

### 4. External Services Setup (Optional)

#### Email Service (Gmail)
1. Enable 2-factor authentication
2. Generate app password
3. Update `.env`:
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Twilio SMS (Optional)
1. Sign up at https://twilio.com
2. Get Account SID and Auth Token
3. Update `.env`:
```bash
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

#### Stripe Payment (Optional)
1. Sign up at https://stripe.com
2. Get API keys from dashboard
3. Update `.env`:
```bash
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
```

#### Cloudinary Storage (Optional)
1. Sign up at https://cloudinary.com
2. Get cloud name and API keys
3. Update `.env`:
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Running the Application

#### Development Mode
```bash
# Start development server with auto-reload
npm run dev
```

#### Production Mode
```bash
# Start production server
npm start
```

#### Verify Installation
```bash
# Check health endpoint
curl http://localhost:8000/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Swift Delivery Backend",
  "version": "1.0.0",
  "environment": "development"
}
```

### 6. Testing the API

#### GraphQL Playground
1. Open browser: `http://localhost:8000/graphql`
2. Try a sample query:
```graphql
query {
  configurations {
    key
    value
  }
}
```

#### Test Authentication
```bash
# Register a new user
curl -X POST http://localhost:8000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { register(input: { name: \"Test User\", email: \"test@example.com\", password: \"password123\" }) { success user { id name email } } }"
  }'
```

### 7. Common Issues & Solutions

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo service mongod status

# Check connection string
echo $MONGO_URL

# Test connection
mongo $MONGO_URL
```

#### Port Already in Use
```bash
# Find process using port 8000
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>

# Or use different port
PORT=8001 npm run dev
```

#### Permission Errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm (recommended)
```

### 8. Development Tools

#### Install Development Extensions
```bash
# VS Code extensions (recommended)
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
```

#### Database GUI Tools
- **MongoDB Compass** - Official MongoDB GUI
- **Studio 3T** - Advanced MongoDB IDE
- **Robo 3T** - Lightweight MongoDB GUI

#### API Testing Tools
- **Postman** - API testing and documentation
- **Insomnia** - REST and GraphQL client
- **GraphQL Playground** - Built-in GraphQL IDE

### 9. Deployment Preparation

#### Environment Variables for Production
```bash
# Security
NODE_ENV=production
JWT_SECRET=super-secure-secret-key-for-production

# Database
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/swift-delivery

# CORS Origins
CLIENT_URL=https://your-domain.com
ADMIN_URL=https://admin.your-domain.com
```

#### Build for Production
```bash
# Install only production dependencies
npm ci --only=production

# Run linting
npm run lint

# Run tests
npm test
```

### 10. Monitoring & Logs

#### View Logs
```bash
# Real-time logs
tail -f logs/swift-delivery.log

# Error logs only
tail -f logs/error.log

# Filter logs
grep "ERROR" logs/swift-delivery.log
```

#### Health Monitoring
```bash
# Check server status
curl http://localhost:8000/health

# Monitor database connection
# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### 11. Backup & Maintenance

#### Database Backup
```bash
# Create backup
mongodump --db swift-delivery-tunisia --out backup/

# Restore backup
mongorestore --db swift-delivery-tunisia backup/swift-delivery-tunisia/
```

#### Log Rotation
```bash
# Install logrotate
sudo apt-get install logrotate

# Configure log rotation
sudo nano /etc/logrotate.d/swift-delivery
```

## 🔧 Advanced Configuration

### Custom JWT Configuration
```javascript
// config.js
JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
```

### Database Optimization
```javascript
// Mongoose connection options
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

### Rate Limiting Configuration
```javascript
// server.js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
```

## 📋 Checklist

### Initial Setup ✅
- [ ] Node.js 18+ installed
- [ ] MongoDB running
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Server starts successfully

### Testing ✅
- [ ] Health endpoint responds
- [ ] GraphQL playground accessible
- [ ] Database connection works
- [ ] Authentication flow tested
- [ ] Socket.IO connection works

### Production Ready ✅
- [ ] Environment variables secured
- [ ] Database optimized
- [ ] Logging configured
- [ ] Error handling implemented
- [ ] Rate limiting enabled
- [ ] CORS configured properly

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** - Most issues are logged with details
2. **Verify environment** - Ensure all required variables are set
3. **Test connections** - Database, Redis, external services
4. **Check permissions** - File system and network permissions
5. **Review configuration** - Compare with working examples

### Contact Support
- **Developer:** Marwen Rabai
- **Email:** marwenrabai6@gmail.com
- **Website:** [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)

---

**Swift Delivery Backend** - Complete setup guide for Tunisia's premium food delivery platform.
