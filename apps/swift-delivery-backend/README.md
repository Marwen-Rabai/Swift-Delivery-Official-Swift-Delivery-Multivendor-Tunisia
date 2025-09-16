# 🇹🇳 Swift Delivery Backend API

**Premium Multi-Vendor Food Delivery Platform for Tunisia & Algeria**

Developed by **Marwen Rabai** - [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)

## 🚀 Overview

Swift Delivery Backend is a robust, scalable Node.js API built with Express.js, GraphQL, and MongoDB. It powers the complete multi-vendor food delivery ecosystem including customer apps, restaurant management, rider tracking, and administrative dashboards.

## 🏗️ Architecture

### Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **API:** GraphQL with Apollo Server + REST endpoints
- **Authentication:** JWT with refresh tokens
- **Real-time:** Socket.IO for live tracking and notifications
- **File Storage:** Cloudinary integration
- **Payment:** Stripe & PayPal integration
- **Notifications:** Firebase Push, Email (Nodemailer), SMS (Twilio)
- **Caching:** Redis (optional)
- **Logging:** Winston with structured logging

### Key Features
- 🔐 **Advanced Authentication** - JWT with role-based access control
- 📱 **Real-time Updates** - Socket.IO for order tracking and chat
- 💳 **Payment Integration** - Stripe, PayPal, and cash payments
- 🌍 **Multi-language** - Arabic (RTL), French, English support
- 💰 **Multi-currency** - TND, DZD, EUR, USD support
- 📧 **Notifications** - Email, SMS, and push notifications
- 🚚 **Live Tracking** - Real-time rider and order tracking
- 📊 **Analytics** - Comprehensive business intelligence
- 🔒 **Security** - Rate limiting, input validation, and encryption

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- MongoDB 5.0 or higher
- Redis (optional, for caching)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Marwen-Rabai/Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia.git
cd Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia/apps/swift-delivery-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy environment template
cp env.example .env

# Edit .env file with your configuration
nano .env
```

4. **Start the application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8000`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start with nodemon (auto-restart)
npm run start        # Start production server

# Testing
npm run test         # Run test suite

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run build        # Build and validate

# Docker
npm run docker:build # Build Docker image
npm run docker:run   # Run Docker container
```

## 🌐 API Endpoints

### GraphQL Endpoint
- **URL:** `http://localhost:8000/graphql`
- **Playground:** Available in development mode
- **Introspection:** Enabled in development

### REST Endpoints
- **Health Check:** `GET /health`
- **PayPal Webhooks:** `POST /paypal/webhook`
- **File Uploads:** `GET /uploads/:filename`

### WebSocket Connection
- **URL:** `ws://localhost:8000`
- **Authentication:** Required via token
- **Events:** Order tracking, chat, rider location updates

## 📞 Support

### Technical Support
- **Developer:** Marwen Rabai
- **Email:** marwenrabai6@gmail.com
- **Website:** [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)
- **LinkedIn:** [linkedin.com/in/marwen-rabai](https://linkedin.com/in/marwen-rabai)
- **GitHub:** [github.com/Marwen-Rabai](https://github.com/Marwen-Rabai)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Swift Delivery Tunisia** - Premium Multi-Vendor Food Delivery Platform  
*Developed by Marwen Rabai - https://marwen-rabai.netlify.app*