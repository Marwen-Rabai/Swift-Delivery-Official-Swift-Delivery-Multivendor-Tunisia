# 🚀 Developer Setup Guide - Swift Delivery Tunisia

**Complete Step-by-Step Guide for Developers**

*Created by: Marwen Rabai*  
*Last Updated: January 2025*

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Required Accounts & Services](#required-accounts--services)
3. [Step-by-Step Account Setup](#step-by-step-account-setup)
4. [Environment Variables Configuration](#environment-variables-configuration)
5. [Project Setup](#project-setup)
6. [Configuration Files](#configuration-files)
7. [Testing Your Setup](#testing-your-setup)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** package manager
- ✅ **Git** installed
- ✅ **MongoDB** (local or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Code Editor** (VS Code recommended)
- ✅ **GitHub Account** (for version control)

---

## 🔐 Required Accounts & Services

You need to create accounts for the following services:

### **Essential Services** (Required)

| # | Service | Purpose | Free Tier | Cost |
|---|---------|---------|-----------|------|
| 1 | **Firebase** | Push notifications, Authentication | ✅ Yes | Free tier available |
| 2 | **Google Cloud Platform** | Google Maps API, Places API | ✅ Yes | $200 free credit |
| 3 | **MongoDB Atlas** | Database (if not using local) | ✅ Yes | Free tier available |
| 4 | **Cloudinary** | Image storage & optimization | ✅ Yes | Free tier available |

### **Payment Services** (Choose at least one)

| # | Service | Purpose | Free Tier | Cost |
|---|---------|---------|-----------|------|
| 5 | **Stripe** | Payment processing | ✅ Yes | Test mode free |
| 6 | **PayPal** | Payment processing | ✅ Yes | Sandbox free |

### **Communication Services** (Optional but Recommended)

| # | Service | Purpose | Free Tier | Cost |
|---|---------|---------|-----------|------|
| 7 | **Twilio** | SMS notifications | ⚠️ Limited | Pay-as-you-go |
| 8 | **SendGrid** | Email service (alternative to Gmail SMTP) | ✅ Yes | 100 emails/day free |
| 9 | **Gmail** | Email SMTP (if not using SendGrid) | ✅ Yes | Free |

### **Monitoring & Analytics** (Optional)

| # | Service | Purpose | Free Tier | Cost |
|---|---------|---------|-----------|------|
| 10 | **Sentry** | Error tracking | ✅ Yes | Free tier available |
| 11 | **Amplitude** | Analytics | ✅ Yes | Free tier available |

---

## 📝 Step-by-Step Account Setup

### 🔥 **1. Firebase Setup** (Required)

**Purpose:** Push notifications, Firebase Authentication, Cloud Messaging

#### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `swift-delivery-tunisia` (or your preferred name)
4. Disable Google Analytics (optional) or enable it
5. Click **"Create project"**
6. Wait for project creation (30-60 seconds)

#### Step 2: Add Web App

1. In Firebase Console, click **Web icon** (`</>`)
2. Register app name: `Swift Delivery Web`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**
5. **Copy the Firebase configuration** (you'll need this later)

#### Step 3: Add Android App (for Mobile)

1. Click **Android icon** (`Android`)
2. Package name: `com.swiftdelivery.customer` (or your package)
3. App nickname: `Swift Delivery Customer`
4. Click **"Register app"**
5. Download `google-services.json` - **SAVE THIS FILE**

#### Step 4: Add iOS App (for Mobile)

1. Click **iOS icon** (`iOS`)
2. Bundle ID: `com.swiftdelivery.customer` (or your bundle ID)
3. App nickname: `Swift Delivery Customer`
4. Click **"Register app"**
5. Download `GoogleService-Info.plist` - **SAVE THIS FILE**

#### Step 5: Enable Cloud Messaging

1. Go to **Project Settings** → **Cloud Messaging**
2. Copy **Server key** and **Sender ID**
3. Enable **Cloud Messaging API**

#### Step 6: Generate Service Account Key

1. Go to **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"**
3. Download the JSON file - **SAVE THIS FILE SECURELY**
4. This file contains:
   - `project_id`
   - `private_key`
   - `client_email`

#### 📌 **What You'll Need:**

```
✅ Firebase Project ID
✅ Web API Key
✅ Auth Domain (project-id.firebaseapp.com)
✅ Storage Bucket (project-id.appspot.com)
✅ Messaging Sender ID
✅ App ID
✅ Measurement ID (if Analytics enabled)
✅ Service Account JSON (private_key, client_email, project_id)
```

---

### 🗺️ **2. Google Cloud Platform Setup** (Required)

**Purpose:** Google Maps API, Places API, Geocoding

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Project name: `swift-delivery-maps`
4. Click **"Create"**
5. Wait for project creation

#### Step 2: Enable Billing (Required for Maps API)

1. Go to **Billing** → **Link a billing account**
2. Add payment method (you get $200 free credit)
3. Maps API is free up to $200/month

#### Step 3: Enable Required APIs

1. Go to **APIs & Services** → **Library**
2. Search and enable these APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
   - ✅ **Geocoding API**
   - ✅ **Directions API**
   - ✅ **Distance Matrix API**
   - ✅ **Maps SDK for Android**
   - ✅ **Maps SDK for iOS**

#### Step 4: Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the API key
4. Click **"Restrict key"** (IMPORTANT for security)
5. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Choose the APIs you enabled above
6. Under **"Application restrictions"**:
   - Select **"HTTP referrers"** for web
   - Add your domains: `localhost:3000`, `yourdomain.com`
7. Click **"Save"**

#### Step 5: Create OAuth 2.0 Client IDs (for Google Sign-In)

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. If prompted, configure OAuth consent screen:
   - User Type: **External**
   - App name: `Swift Delivery`
   - Support email: your email
   - Click **"Save and Continue"**
4. Create OAuth Client:
   - Application type: **Web application**
   - Name: `Swift Delivery Web`
   - Authorized redirect URIs: `http://localhost:3000`, `https://yourdomain.com`
   - Click **"Create"**
   - **Copy Client ID and Client Secret**

5. Create Android OAuth Client:
   - Application type: **Android**
   - Package name: `com.swiftdelivery.customer`
   - SHA-1 certificate fingerprint (get from your keystore)
   - Click **"Create"**
   - **Copy Client ID**

6. Create iOS OAuth Client:
   - Application type: **iOS**
   - Bundle ID: `com.swiftdelivery.customer`
   - Click **"Create"**
   - **Copy Client ID**

#### 📌 **What You'll Need:**

```
✅ Google Maps API Key
✅ Google OAuth Web Client ID
✅ Google OAuth Android Client ID
✅ Google OAuth iOS Client ID
```

---

### 🗄️ **3. MongoDB Atlas Setup** (If not using local MongoDB)

**Purpose:** Cloud database hosting

#### Step 1: Create Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"**
3. Sign up with email or Google account

#### Step 2: Create Cluster

1. Choose **"Build a Database"**
2. Select **"M0 FREE"** tier
3. Choose cloud provider: **AWS** (or your preference)
4. Select region closest to you
5. Cluster name: `SwiftDeliveryCluster`
6. Click **"Create"**

#### Step 3: Create Database User

1. Username: `swiftdelivery` (or your choice)
2. Password: Generate strong password - **SAVE IT**
3. Click **"Create Database User"**

#### Step 4: Configure Network Access

1. Click **"Network Access"**
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add specific IPs
5. Click **"Confirm"**

#### Step 5: Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy the connection string
6. Replace `<password>` with your database user password

#### 📌 **What You'll Need:**

```
✅ MongoDB Connection String
✅ Database Username
✅ Database Password
```

**Example Connection String:**
```
mongodb+srv://swiftdelivery:yourpassword@swiftdeliverycluster.xxxxx.mongodb.net/swift-delivery-tunisia?retryWrites=true&w=majority
```

---

### 🖼️ **4. Cloudinary Setup** (Required)

**Purpose:** Image storage, optimization, and CDN

#### Step 1: Create Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Click **"Sign Up for Free"**
3. Sign up with email or social account

#### Step 2: Get Credentials

1. After signup, you'll see the **Dashboard**
2. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

#### Step 3: Configure Upload Presets (Optional)

1. Go to **Settings** → **Upload**
2. Create upload presets for different image types
3. Set default transformations

#### 📌 **What You'll Need:**

```
✅ Cloudinary Cloud Name
✅ Cloudinary API Key
✅ Cloudinary API Secret
```

---

### 💳 **5. Stripe Setup** (Payment Processing)

**Purpose:** Credit card payments

#### Step 1: Create Account

1. Go to [Stripe](https://stripe.com/)
2. Click **"Start now"** or **"Sign up"**
3. Enter business details
4. Verify email

#### Step 2: Get API Keys

1. Go to **Developers** → **API keys**
2. You'll see:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click **"Reveal"**

#### Step 3: Set Up Webhooks (For Production)

1. Go to **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
5. Copy **Webhook signing secret** (starts with `whsec_`)

#### Step 4: Test Mode vs Live Mode

- **Test Mode**: Use `pk_test_` and `sk_test_` keys
- **Live Mode**: Use `pk_live_` and `sk_live_` keys (after account activation)

#### 📌 **What You'll Need:**

```
✅ Stripe Publishable Key (pk_test_...)
✅ Stripe Secret Key (sk_test_...)
✅ Stripe Webhook Secret (whsec_...) - for production
```

---

### 💰 **6. PayPal Setup** (Payment Processing)

**Purpose:** PayPal payments

#### Step 1: Create Account

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Click **"Sign Up"** or **"Log In"**
3. Create a business account if you don't have one

#### Step 2: Create App

1. Go to **Dashboard** → **My Apps & Credentials**
2. Click **"Create App"**
3. App name: `Swift Delivery Tunisia`
4. Select **"Sandbox"** for testing
5. Click **"Create App"**

#### Step 3: Get Credentials

1. You'll see:
   - **Client ID**
   - **Client Secret**
2. Copy both values

#### Step 4: Switch to Live (Production)

1. After testing, create a **Live** app
2. Get Live **Client ID** and **Client Secret**

#### 📌 **What You'll Need:**

```
✅ PayPal Client ID
✅ PayPal Client Secret
✅ PayPal Mode (sandbox or live)
```

---

### 📧 **7. Email Service Setup**

#### Option A: Gmail SMTP (Free)

1. Go to your Gmail account
2. Go to **Google Account** → **Security**
3. Enable **2-Step Verification**
4. Go to **App passwords**
5. Create app password:
   - App: **Mail**
   - Device: **Other (Custom name)**
   - Name: `Swift Delivery`
6. Copy the 16-character password

#### Option B: SendGrid (Recommended for Production)

1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for free account (100 emails/day)
3. Verify your email
4. Go to **Settings** → **API Keys**
5. Create API key:
   - Name: `Swift Delivery API Key`
   - Permissions: **Full Access** or **Mail Send**
6. Copy the API key (shown only once!)

#### 📌 **What You'll Need (Gmail):**

```
✅ Email Host: smtp.gmail.com
✅ Email Port: 587
✅ Email User: your-email@gmail.com
✅ Email Password: App password (16 characters)
```

#### 📌 **What You'll Need (SendGrid):**

```
✅ SendGrid API Key
```

---

### 📱 **8. Twilio Setup** (SMS - Optional)

**Purpose:** SMS notifications

#### Step 1: Create Account

1. Go to [Twilio](https://www.twilio.com/)
2. Click **"Sign up"**
3. Verify phone number
4. Verify email

#### Step 2: Get Credentials

1. Go to **Console Dashboard**
2. You'll see:
   - **Account SID**
   - **Auth Token**
3. Copy both values

#### Step 3: Get Phone Number

1. Go to **Phone Numbers** → **Manage** → **Buy a number**
2. Choose a number (or use trial number for testing)
3. Copy the phone number

#### 📌 **What You'll Need:**

```
✅ Twilio Account SID
✅ Twilio Auth Token
✅ Twilio Phone Number
```

---

### 🐛 **9. Sentry Setup** (Error Tracking - Optional)

**Purpose:** Error monitoring and tracking

#### Step 1: Create Account

1. Go to [Sentry](https://sentry.io/)
2. Click **"Get Started"**
3. Sign up with email or GitHub

#### Step 2: Create Project

1. Select platform: **JavaScript** (for web) or **React Native** (for mobile)
2. Project name: `Swift Delivery Web` (or Mobile)
3. Click **"Create Project"**

#### Step 3: Get DSN

1. Copy the **DSN** (Data Source Name)
2. It looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

#### 📌 **What You'll Need:**

```
✅ Sentry DSN URL
```

---

### 📊 **10. Amplitude Setup** (Analytics - Optional)

**Purpose:** User analytics and behavior tracking

#### Step 1: Create Account

1. Go to [Amplitude](https://amplitude.com/)
2. Click **"Get Started"**
3. Sign up with email

#### Step 2: Create Project

1. Project name: `Swift Delivery Tunisia`
2. Click **"Create Project"**

#### Step 3: Get API Key

1. Go to **Settings** → **Projects**
2. Copy **API Key**

#### 📌 **What You'll Need:**

```
✅ Amplitude API Key
```

---

## ⚙️ Environment Variables Configuration

Now that you have all your account credentials, let's configure the project.

### 📁 **Backend Configuration**

#### Step 1: Create Backend .env File

1. Navigate to: `apps/swift-delivery-backend/`
2. Copy the example file:
   ```bash
   cp env.example .env
   ```

#### Step 2: Edit Backend .env File

Open `apps/swift-delivery-backend/.env` and update with your credentials:

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
NODE_ENV=development
PORT=8000

# ============================================
# DATABASE
# ============================================
# Local MongoDB:
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia

# OR MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/swift-delivery-tunisia?retryWrites=true&w=majority

# ============================================
# JWT CONFIGURATION
# ============================================
# Generate a strong secret key (use: openssl rand -base64 32)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-MUST-BE-STRONG
JWT_EXPIRES_IN=7d

# ============================================
# EMAIL CONFIGURATION
# ============================================
# Option 1: Gmail SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=noreply@swift-delivery-tunisia.com

# Option 2: SendGrid (if using SendGrid, comment out above and use this)
# SENDGRID_API_KEY=your-sendgrid-api-key

# ============================================
# SMS CONFIGURATION (Twilio - Optional)
# ============================================
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# ============================================
# FIREBASE CONFIGURATION
# ============================================
# From Firebase Service Account JSON file:
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# ============================================
# PAYMENT GATEWAYS
# ============================================
# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox  # Change to 'live' for production

# ============================================
# CLOUDINARY (Image Storage)
# ============================================
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ============================================
# REDIS (Optional - for caching)
# ============================================
REDIS_URL=redis://localhost:6379

# ============================================
# GOOGLE MAPS API
# ============================================
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# ============================================
# APP URLs
# ============================================
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
RESTAURANT_URL=http://localhost:3002
RIDER_URL=http://localhost:3003

# ============================================
# FILE UPLOAD CONFIGURATION
# ============================================
MAX_FILE_SIZE=10mb
UPLOAD_PATH=./uploads

# ============================================
# PAGINATION
# ============================================
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# ============================================
# BUSINESS CONFIGURATION
# ============================================
COMMISSION_RATE=0.10  # 10% commission
DELIVERY_RADIUS_KM=10
MIN_ORDER_AMOUNT=5.0

# ============================================
# SECURITY
# ============================================
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000  # 15 minutes in milliseconds

# ============================================
# LOGGING
# ============================================
LOG_LEVEL=info
LOG_FILE=./logs/swift-delivery.log

# ============================================
# FEATURE FLAGS
# ============================================
ENABLE_REAL_TIME_TRACKING=true
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_SMS_NOTIFICATIONS=false  # Set to true if using Twilio
```

#### ⚠️ **Important Notes:**

1. **FIREBASE_PRIVATE_KEY**: Must include `\n` for newlines. Copy the entire key from JSON file.
2. **JWT_SECRET**: Generate a strong secret: `openssl rand -base64 32`
3. **MONGO_URL**: Use local MongoDB for development, Atlas for production
4. **PAYPAL_MODE**: Use `sandbox` for testing, `live` for production

---

### 📁 **Web App Configuration**

#### Step 1: Create Web .env.local File

1. Navigate to: `apps/swift-delivery-web/`
2. Create file: `.env.local`

#### Step 2: Edit Web .env.local File

```env
# ============================================
# API CONFIGURATION
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# ============================================
# GOOGLE MAPS
# ============================================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# ============================================
# PAYMENT GATEWAYS
# ============================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id

# ============================================
# FIREBASE (Web)
# ============================================
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-web-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# ============================================
# ANALYTICS & MONITORING
# ============================================
NEXT_PUBLIC_AMPLITUDE_API_KEY=your-amplitude-api-key
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-url

# ============================================
# LOCALIZATION
# ============================================
NEXT_PUBLIC_DEFAULT_LANGUAGE=ar
NEXT_PUBLIC_CURRENCY=TND
NEXT_PUBLIC_CURRENCY_SYMBOL=د.ت
```

---

### 📁 **Admin Dashboard Configuration**

#### Step 1: Create Admin .env.local File

1. Navigate to: `apps/swift-delivery-admin/`
2. Create file: `.env.local`

#### Step 2: Edit Admin .env.local File

```env
# ============================================
# API CONFIGURATION
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql

# ============================================
# GOOGLE MAPS
# ============================================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

---

### 📱 **Mobile Apps Configuration**

#### Step 1: Add Firebase Files

1. **For Customer App:**
   - Copy `google-services.json` to: `apps/swift-delivery-customer/`
   - Copy `GoogleService-Info.plist` to: `apps/swift-delivery-customer/ios/` (if iOS)

2. **For Restaurant App:**
   - Copy `google-services.json` to: `apps/swift-delivery-restaurant/`
   - Copy `GoogleService-Info.plist` to: `apps/swift-delivery-restaurant/ios/` (if iOS)

3. **For Rider App:**
   - Copy `google-services.json` to: `apps/swift-delivery-rider/`
   - Copy `GoogleService-Info.plist` to: `apps/swift-delivery-rider/ios/` (if iOS)

#### Step 2: Update app.json Files

Edit `apps/swift-delivery-customer/app.json`:

```json
{
  "expo": {
    "name": "Swift Delivery",
    "slug": "swift-delivery-customer",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "package": "com.swiftdelivery.customer",
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "bundleIdentifier": "com.swiftdelivery.customer",
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

---

## 🚀 Project Setup

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd apps/swift-delivery-backend
npm install

# Install web app dependencies
cd ../swift-delivery-web
npm install

# Install admin dependencies
cd ../swift-delivery-admin
npm install

# Install mobile app dependencies
cd ../swift-delivery-customer
npm install --legacy-peer-deps
```

### Step 2: Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**MongoDB Atlas:**
- No local setup needed, just use the connection string

### Step 3: Start Backend

```bash
cd apps/swift-delivery-backend
npm run dev
# Backend will run on http://localhost:8000
```

### Step 4: Start Web Apps

**Terminal 1 - Customer Web:**
```bash
cd apps/swift-delivery-web
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Admin Dashboard:**
```bash
cd apps/swift-delivery-admin
npm run dev
# Runs on http://localhost:3001
```

### Step 5: Start Mobile Apps

```bash
cd apps/swift-delivery-customer
npm start
# Opens Expo Dev Tools
```

---

## 🔧 Configuration Files

### Backend Configuration

**File:** `apps/swift-delivery-backend/config.js`

This file reads from `.env` file. No changes needed if `.env` is configured correctly.

### Frontend Configuration

**File:** `apps/swift-delivery-web/config.ts`

Most configuration comes from environment variables. Check this file if you need to modify default values.

### Database Configuration

The backend automatically connects to MongoDB using `MONGO_URL` from `.env`.

---

## ✅ Testing Your Setup

### Test Backend

1. **Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```
   Should return: `{"status":"ok"}`

2. **GraphQL Playground:**
   - Open: `http://localhost:8000/graphql`
   - Test a query:
   ```graphql
   {
     configurations {
       key
       value
     }
   }
   ```

### Test Firebase

1. Check Firebase connection in backend logs
2. Test push notification from admin panel

### Test Google Maps

1. Open web app: `http://localhost:3000`
2. Check if map loads correctly
3. Test address autocomplete

### Test Payments

1. **Stripe Test:**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

2. **PayPal Test:**
   - Use PayPal sandbox account
   - Test payment flow

---

## 🔍 Troubleshooting

### Common Issues

#### 1. **MongoDB Connection Failed**

**Error:** `MongoServerError: connection refused`

**Solution:**
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod
```

#### 2. **Firebase Private Key Error**

**Error:** `Invalid key format`

**Solution:**
- Ensure `FIREBASE_PRIVATE_KEY` includes `\n` for newlines
- Copy the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

#### 3. **Google Maps Not Loading**

**Error:** `Google Maps API key not valid`

**Solution:**
- Check API key restrictions
- Ensure Maps JavaScript API is enabled
- Check browser console for specific error

#### 4. **Payment Gateway Errors**

**Error:** `Stripe/PayPal authentication failed`

**Solution:**
- Verify API keys are correct
- Check if using test/live keys correctly
- Ensure webhook URLs are configured

#### 5. **Port Already in Use**

**Error:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process using port
# Windows
netstat -ano | findstr :8000

# macOS/Linux
lsof -i :8000

# Kill process
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Maps API Documentation](https://developers.google.com/maps/documentation)
- [Stripe Documentation](https://stripe.com/docs)
- [PayPal Developer Documentation](https://developer.paypal.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 🎯 Quick Reference Checklist

Use this checklist to ensure everything is set up:

### Accounts Created
- [ ] Firebase account
- [ ] Google Cloud Platform account
- [ ] MongoDB Atlas account (or local MongoDB)
- [ ] Cloudinary account
- [ ] Stripe account
- [ ] PayPal account
- [ ] Email service (Gmail or SendGrid)
- [ ] Twilio account (optional)
- [ ] Sentry account (optional)
- [ ] Amplitude account (optional)

### Credentials Collected
- [ ] Firebase project ID, API key, service account
- [ ] Google Maps API key, OAuth client IDs
- [ ] MongoDB connection string
- [ ] Cloudinary credentials
- [ ] Stripe API keys
- [ ] PayPal client ID and secret
- [ ] Email SMTP credentials
- [ ] Twilio credentials (optional)
- [ ] Sentry DSN (optional)
- [ ] Amplitude API key (optional)

### Files Configured
- [ ] Backend `.env` file
- [ ] Web app `.env.local` file
- [ ] Admin `.env.local` file
- [ ] Firebase `google-services.json` files
- [ ] Firebase `GoogleService-Info.plist` files (iOS)

### Services Running
- [ ] MongoDB running
- [ ] Backend server running
- [ ] Web apps running
- [ ] Mobile apps running (Expo)

### Testing Completed
- [ ] Backend health check
- [ ] GraphQL queries working
- [ ] Firebase connection
- [ ] Google Maps loading
- [ ] Payment gateways tested
- [ ] Email sending tested

---

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review service-specific documentation
3. Check project logs for error messages
4. Contact: **marwenrabai6@gmail.com**

---

**🎉 Congratulations! Your development environment is now set up!**

*Last Updated: January 2025*  
*Version: 1.0.0*

