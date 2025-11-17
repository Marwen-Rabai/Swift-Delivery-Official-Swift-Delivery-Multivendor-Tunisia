# 📋 Quick Reference Card - Swift Delivery Tunisia

**Quick lookup for developers**

---

## 🔐 Required Accounts Checklist

| Service | Status | Credentials Needed |
|---------|--------|-------------------|
| 🔥 Firebase | ☐ | Project ID, API Key, Service Account |
| 🗺️ Google Cloud | ☐ | Maps API Key, OAuth Client IDs |
| 🗄️ MongoDB | ☐ | Connection String |
| 🖼️ Cloudinary | ☐ | Cloud Name, API Key, Secret |
| 💳 Stripe | ☐ | Publishable Key, Secret Key |
| 💰 PayPal | ☐ | Client ID, Client Secret |
| 📧 Email (Gmail) | ☐ | Email, App Password |
| 📱 Twilio (Optional) | ☐ | Account SID, Auth Token |
| 🐛 Sentry (Optional) | ☐ | DSN URL |
| 📊 Amplitude (Optional) | ☐ | API Key |

---

## 📁 Environment Files Locations

```
apps/swift-delivery-backend/.env
apps/swift-delivery-web/.env.local
apps/swift-delivery-admin/.env.local
```

---

## 🔑 Key Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia
JWT_SECRET=your-secret-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
GOOGLE_MAPS_API_KEY=your-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Web App (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-client-id
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start MongoDB (local)
mongod

# Start Backend
cd apps/swift-delivery-backend
npm run dev

# Start Web App
cd apps/swift-delivery-web
npm run dev

# Start Admin
cd apps/swift-delivery-admin
npm run dev

# Start Mobile App
cd apps/swift-delivery-customer
npm start
```

---

## 🌐 Service URLs

| Service | Development URL | Production URL |
|---------|----------------|----------------|
| Backend API | http://localhost:8000 | https://api.yourdomain.com |
| GraphQL | http://localhost:8000/graphql | https://api.yourdomain.com/graphql |
| Customer Web | http://localhost:3000 | https://yourdomain.com |
| Admin Dashboard | http://localhost:3001 | https://admin.yourdomain.com |

---

## 🔗 Important Links

- **Firebase Console:** https://console.firebase.google.com/
- **Google Cloud Console:** https://console.cloud.google.com/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Stripe Dashboard:** https://dashboard.stripe.com/
- **PayPal Developer:** https://developer.paypal.com/
- **Cloudinary Dashboard:** https://cloudinary.com/console

---

## 🧪 Test Credentials

### Stripe Test Card
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

### PayPal Sandbox
- Use sandbox accounts from PayPal Developer Dashboard

---

## 📞 Support

**Email:** marwenrabai6@gmail.com  
**Website:** https://marwen-rabai.netlify.app

---

## 📚 Full Documentation

For complete setup instructions, see:  
**[DEVELOPER_SETUP_GUIDE.md](./DEVELOPER_SETUP_GUIDE.md)**

