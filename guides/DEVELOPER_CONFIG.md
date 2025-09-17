# 👨‍💻 Swift Delivery - Configuration Développeur

## 🔧 Configuration IDE et Outils

### VS Code Settings (Recommandé)

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### Extensions Obligatoires

```bash
# 📦 Extensions VS Code pour Swift Delivery
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension GraphQL.vscode-graphql
code --install-extension ms-vscode.vscode-json
code --install-extension expo.vscode-expo-tools
```

## 🗄️ Configuration Base de Données

### MongoDB Setup Local

```bash
# 🗄️ Installation MongoDB (Windows)
# Télécharger: https://www.mongodb.com/try/download/community

# Démarrage service
net start MongoDB

# Création base Swift Delivery
mongo
use swift-delivery-tunisia

# Création utilisateur admin
db.createUser({
  user: "admin",
  pwd: "swift-delivery-admin-2024",
  roles: ["readWrite", "dbAdmin"]
})
```

### Collections Initiales

```javascript
// 📊 Initialisation collections avec données de test
db.configurations.insertMany([
  { key: "APP_NAME", value: "Swift Delivery Tunisia", type: "STRING", isPublic: true },
  { key: "DEFAULT_CURRENCY", value: "TND", type: "STRING", isPublic: true },
  { key: "COMMISSION_RATE", value: 0.10, type: "NUMBER", isPublic: false },
  { key: "MIN_ORDER_AMOUNT", value: 5.0, type: "NUMBER", isPublic: true }
]);

// 🏪 Restaurant de test
db.restaurants.insertOne({
  name: "Restaurant Test",
  slug: "restaurant-test",
  email: "test@restaurant.com",
  phone: "+21612345678",
  address: {
    street: "Avenue Habib Bourguiba",
    city: "Tunis",
    country: "Tunisia",
    coordinates: { type: "Point", coordinates: [10.1815, 36.8065] }
  },
  isActive: true,
  isVerified: true,
  rating: { average: 4.5, count: 10 }
});
```

## 🔐 Configuration Authentification

### JWT Configuration

```javascript
// 🔑 Configuration JWT sécurisée
const jwtConfig = {
  secret: process.env.JWT_SECRET || "swift-delivery-tunisia-secret-2024",
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
  algorithm: "HS256",
  issuer: "swift-delivery-tunisia",
  audience: ["customer", "restaurant", "rider", "admin"]
};

// 🔒 Middleware authentification
const authMiddleware = {
  required: ["/api/orders", "/api/profile", "/admin/*"],
  optional: ["/api/restaurants", "/api/search"],
  public: ["/health", "/api/info", "/auth/*"]
};
```

## 📱 Configuration Mobile

### Expo Configuration

```json
// app.json - Configuration Expo
{
  "expo": {
    "name": "Swift Delivery Tunisia",
    "slug": "swift-delivery-tunisia",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.swiftdelivery.tunisia"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.swiftdelivery.tunisia"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-location",
      "expo-notifications",
      "expo-camera",
      "expo-image-picker"
    ]
  }
}
```

## 🌐 Configuration Web

### Next.js Configuration

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'swift-delivery-tunisia.com']
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

module.exports = nextConfig;
```

## 🚀 Scripts de Développement

### Package.json Scripts Optimisés

```json
{
  "scripts": {
    "dev:all": "concurrently \"npm run dev:backend\" \"npm run dev:web\" \"npm run dev:admin\"",
    "dev:backend": "cd apps/swift-delivery-backend && node server-minimal.js",
    "dev:web": "cd apps/swift-delivery-web && npm run dev",
    "dev:admin": "cd apps/swift-delivery-admin && npm run dev",
    "dev:mobile": "concurrently \"npm run dev:customer\" \"npm run dev:restaurant\" \"npm run dev:rider\"",
    "dev:customer": "cd apps/swift-delivery-customer && npm start",
    "dev:restaurant": "cd apps/swift-delivery-restaurant && npm start", 
    "dev:rider": "cd apps/swift-delivery-rider && npm start",
    "test:backend": "cd apps/swift-delivery-backend && npm test",
    "test:web": "cd apps/swift-delivery-web && npm test",
    "build:all": "npm run build:backend && npm run build:web && npm run build:admin",
    "lint:all": "npm run lint:backend && npm run lint:web && npm run lint:admin",
    "clean": "rimraf node_modules apps/*/node_modules",
    "fresh-install": "npm run clean && npm install"
  }
}
```

## 🔧 Environnement de Développement

### Variables d'Environnement Dev

```bash
# 🔧 .env.development (Backend)
NODE_ENV=development
PORT=8000
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia-dev
JWT_SECRET=swift-delivery-dev-secret-2024
REDIS_URL=redis://localhost:6379

# 🧪 Services de test
STRIPE_SECRET_KEY=sk_test_your-test-key
PAYPAL_MODE=sandbox
EMAIL_HOST=smtp.mailtrap.io
EMAIL_USER=your-mailtrap-user
EMAIL_PASS=your-mailtrap-pass

# 📱 URLs développement
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
RESTAURANT_URL=http://localhost:3002
```

### Hot Reload Configuration

```javascript
// 🔄 Configuration hot reload optimisée
const devConfig = {
  backend: {
    tool: "nodemon",
    watch: ["*.js", "models/*.js", "resolvers/*.js"],
    ignore: ["node_modules", "logs", "uploads"],
    delay: "1000ms"
  },
  
  web: {
    tool: "Next.js Fast Refresh",
    features: ["React components", "CSS modules", "API routes"],
    speed: "< 1 second"
  },
  
  mobile: {
    tool: "Expo Fast Refresh", 
    features: ["React Native components", "Metro bundler"],
    speed: "< 2 seconds"
  }
};
```

## 🧪 Tests et Debugging

### Configuration Tests

```javascript
// 🧪 Jest configuration pour tous les projets
const testConfig = {
  backend: {
    testEnvironment: "node",
    setupFiles: ["<rootDir>/tests/setup.js"],
    collectCoverage: true,
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  },
  
  frontend: {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    moduleNameMapping: {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
};
```

### Debugging Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/swift-delivery-backend/server.js",
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "swift-delivery:*"
      },
      "console": "integratedTerminal"
    },
    {
      "name": "Debug Next.js Web",
      "type": "node", 
      "request": "attach",
      "port": 9229,
      "localRoot": "${workspaceFolder}/apps/swift-delivery-web",
      "remoteRoot": "${workspaceFolder}/apps/swift-delivery-web"
    }
  ]
}
```

## 📊 Monitoring et Logging

### Configuration Logs

```javascript
// 📝 Configuration Winston pour production
const logConfig = {
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: "swift-delivery",
    version: "1.0.0",
    environment: process.env.NODE_ENV
  },
  transports: [
    new winston.transports.File({ 
      filename: "logs/error.log", 
      level: "error",
      maxsize: 5242880,
      maxFiles: 5
    }),
    new winston.transports.File({ 
      filename: "logs/combined.log",
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
};
```

## 🚀 Déploiement et CI/CD

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Swift Delivery Tunisia

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          cd apps/swift-delivery-backend
          npm install --legacy-peer-deps
          
      - name: Run tests
        run: |
          cd apps/swift-delivery-backend
          npm test
          
      - name: Run linting
        run: |
          cd apps/swift-delivery-backend
          npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway
        run: |
          # Deploy backend to Railway
          railway login --token ${{ secrets.RAILWAY_TOKEN }}
          railway link ${{ secrets.RAILWAY_PROJECT_ID }}
          railway up

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          working-directory: ./apps/swift-delivery-web
```

---

## 🎯 **SYSTÈME COMPLET ET PRÊT**

### ✅ **Validation Finale Développeur**

```
👨‍💻 SWIFT DELIVERY TUNISIA - CONFIGURATION DÉVELOPPEUR
═══════════════════════════════════════════════════════════

✅ ENVIRONNEMENT DE DÉVELOPPEMENT
├── 🔧 VS Code configuré avec extensions
├── 🗄️ MongoDB local + données test
├── 🔐 JWT authentification configurée
├── 📱 Expo CLI installé et configuré
├── 🌐 Next.js avec hot reload
└── 🧪 Jest tests configurés

✅ WORKFLOW DE DÉVELOPPEMENT
├── 🌿 Git flow avec branches feature
├── 📝 Commits conventionnels
├── 🧪 Tests automatisés
├── 🔍 Linting et formatting
├── 📊 Coverage reports
└── 🚀 CI/CD pipeline ready

✅ OUTILS DE DEBUG
├── 🔍 VS Code debugger configuré
├── 📊 Network monitoring
├── 📝 Structured logging
├── 🔧 Error tracking
└── 📈 Performance monitoring

✅ DOCUMENTATION DÉVELOPPEUR
├── 📖 API documentation complète
├── 🔧 Setup guides détaillés
├── 💡 Best practices
├── 🧪 Test examples
└── 🚀 Deployment guides
```

### 🎉 **Prêt pour Développement Avancé**

Le système Swift Delivery Tunisia est maintenant configuré pour un développement professionnel de niveau entreprise avec tous les outils, configurations et guides nécessaires !

---

**👨‍💻 Développé par Marwen Rabai - [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)**
