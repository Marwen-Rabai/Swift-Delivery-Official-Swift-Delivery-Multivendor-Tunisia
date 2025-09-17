# 🚀 Swift Delivery Tunisia - Quick Start Guide

**Developed by Marwen Rabai** - [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)

## ⚡ Ultra-Fast Setup (5 minutes)

### 1. Prerequisites
```bash
# Install Node.js 18+
node --version  # Should be 18.0.0+
npm --version   # Should be 9.0.0+

# Install MongoDB
# Option A: Local installation
sudo apt-get install mongodb

# Option B: Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Clone & Install
```bash
git clone https://github.com/Marwen-Rabai/Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia.git
cd Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia

# Install all dependencies (monorepo)
npm run install:all
```

### 3. Backend Setup
```bash
cd apps/swift-delivery-backend

# Copy environment template
cp env.example .env

# Edit .env with your settings (minimum required):
# MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia
# JWT_SECRET=your-secret-key

# Start backend
npm run dev
```

### 4. Start Applications
```bash
# From project root
npm run dev  # Starts backend, web, and admin simultaneously

# Or start individual apps:
npm run dev:backend    # Backend API
npm run dev:web        # Customer web app
npm run dev:admin      # Admin dashboard
npm run dev:customer   # Customer mobile app (Expo)
npm run dev:restaurant # Restaurant mobile app (Expo)
npm run dev:rider      # Rider mobile app (Expo)
```

### 5. Verify Installation
```bash
# Check backend health
curl http://localhost:8000/health

# Visit GraphQL playground
open http://localhost:8000/graphql

# Visit web app
open http://localhost:3000

# Visit admin dashboard
open http://localhost:3001
```

## 🎯 Application URLs

| Application | URL | Technology |
|-------------|-----|------------|
| **Backend API** | http://localhost:8000 | Node.js/GraphQL |
| **Customer Web** | http://localhost:3000 | Next.js |
| **Admin Dashboard** | http://localhost:3001 | Next.js |
| **Customer Mobile** | Expo Dev Tools | React Native |
| **Restaurant Mobile** | Expo Dev Tools | React Native |
| **Rider Mobile** | Expo Dev Tools | React Native |

## 📱 Mobile Apps Setup

### For Customer App
```bash
cd apps/swift-delivery-customer
npm install
npx expo start
```

### For Restaurant App
```bash
cd apps/swift-delivery-restaurant
npm install
npx expo start
```

### For Rider App
```bash
cd apps/swift-delivery-rider
npm install
npx expo start
```

## 🔧 Configuration

### Backend Environment (.env)
```bash
# Required
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia
JWT_SECRET=change-this-secret-key
NODE_ENV=development
PORT=8000

# Optional (for full functionality)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_your-stripe-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
```

### Database Setup
```bash
# Start MongoDB
sudo service mongod start

# Or with Docker
docker start mongodb

# Create database (automatic on first connection)
# Database: swift-delivery-tunisia
# Collections: users, restaurants, orders, foods, etc.
```

## 🧪 Testing

### Backend Tests
```bash
cd apps/swift-delivery-backend
npm test
```

### Frontend Tests
```bash
# Web app tests
cd apps/swift-delivery-web
npm test

# Admin tests
cd apps/swift-delivery-admin
npm test
```

### Mobile App Tests
```bash
# Customer app tests
cd apps/swift-delivery-customer
npm test

# Restaurant app tests
cd apps/swift-delivery-restaurant
npm test

# Rider app tests
cd apps/swift-delivery-rider
npm test
```

## 🚀 Production Deployment

### Backend (Railway/Heroku)
```bash
cd apps/swift-delivery-backend

# Build for production
npm run build

# Deploy to Railway
railway login
railway link
railway up

# Or deploy to Heroku
heroku create swift-delivery-backend
git push heroku main
```

### Web Apps (Vercel/Netlify)
```bash
# Deploy web app
cd apps/swift-delivery-web
vercel --prod

# Deploy admin dashboard
cd apps/swift-delivery-admin
vercel --prod
```

### Mobile Apps (EAS Build)
```bash
# Build customer app
cd apps/swift-delivery-customer
eas build --platform all

# Build restaurant app
cd apps/swift-delivery-restaurant
eas build --platform all

# Build rider app
cd apps/swift-delivery-rider
eas build --platform all
```

## 🔍 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo service mongod status

# Start MongoDB
sudo service mongod start

# Check connection string
echo $MONGO_URL
```

#### Port Already in Use
```bash
# Find process using port
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>

# Or use different port
PORT=8001 npm run dev
```

#### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Permission Errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

## 📊 Features Overview

### ✅ Complete Feature Set
- **Multi-vendor Platform** - Restaurants, customers, riders
- **Real-time Tracking** - Live order and rider tracking
- **Payment Integration** - Stripe, PayPal, cash payments
- **Multi-language** - Arabic (RTL), French, English
- **Multi-currency** - TND, DZD, EUR, USD
- **Admin Dashboard** - Complete business management
- **Mobile Apps** - iOS and Android support
- **Web Platform** - Responsive web application

### ✅ Tunisia/Algeria Specific
- **Currency:** TND (Tunisia), DZD (Algeria)
- **Language:** Arabic with RTL support
- **Regulations:** Local business compliance
- **Payment Methods:** Local payment solutions
- **Localization:** Country-specific content

## 📞 Support

### Developer Contact
- **Marwen Rabai**
- **Email:** marwenrabai6@gmail.com
- **Website:** [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)
- **LinkedIn:** [linkedin.com/in/marwen-rabai](https://linkedin.com/in/marwen-rabai)
- **GitHub:** [github.com/Marwen-Rabai](https://github.com/Marwen-Rabai)

### Documentation
- **Backend API:** `apps/swift-delivery-backend/README.md`
- **Setup Guide:** `apps/swift-delivery-backend/SETUP_GUIDE.md`
- **API Reference:** `apps/swift-delivery-backend/API_GUIDE.md`
- **Validation Report:** `VALIDATION_REPORT.md`

## 🎉 Success!

Your Swift Delivery Tunisia platform is now ready! 

🇹🇳 **Premium Multi-Vendor Food Delivery Platform**  
💻 **6 Applications:** Backend, Web, Admin, Customer, Restaurant, Rider  
🛠️ **Ultra-Advanced Tooling:** Monorepo, CI/CD, Testing, Documentation  
🌍 **Tunisia/Algeria Ready:** Localization, Currency, Compliance  

*Developed with excellence by Marwen Rabai*
