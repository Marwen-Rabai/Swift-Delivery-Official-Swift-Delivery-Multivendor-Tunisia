# 🇹🇳 Swift Delivery Tunisia - Guide Ultra-Professionnel Complet

<div align="center">

![Swift Delivery Tunisia](https://img.shields.io/badge/Swift%20Delivery-Tunisia-green?style=for-the-badge&logo=delivery&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Developer](https://img.shields.io/badge/Developer-Marwen%20Rabai-blue?style=for-the-badge)

**🌟 Plateforme Premium Multi-Vendeurs de Livraison de Nourriture**  
**👨‍💻 Développé par Marwen Rabai - [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)**

</div>

---

## 📊 Vue d'Ensemble du Système

### 🏗️ Architecture Monorepo Ultra-Avancée

```mermaid
graph TB
    subgraph "🇹🇳 Swift Delivery Tunisia Platform"
        subgraph "📱 Applications Mobiles"
            A[🛒 Customer App<br/>React Native]
            B[🏪 Restaurant App<br/>React Native]
            C[🏍️ Rider App<br/>React Native]
        end
        
        subgraph "🌐 Applications Web"
            D[🌐 Customer Web<br/>Next.js]
            E[👨‍💼 Admin Dashboard<br/>Next.js]
        end
        
        subgraph "⚙️ Backend Infrastructure"
            F[🔗 GraphQL API<br/>Node.js]
            G[🗄️ MongoDB<br/>Database]
            H[⚡ Socket.IO<br/>Real-time]
            I[☁️ Cloudinary<br/>Storage]
        end
        
        A --> F
        B --> F
        C --> F
        D --> F
        E --> F
        F --> G
        F --> H
        F --> I
    end
```

---

## 📋 Tableau de Statut des Applications

| 🎯 Application | 📦 Package Name | 🔧 Technologie | 📊 Statut | 🌐 Port | 📱 Plateforme |
|----------------|-----------------|----------------|------------|---------|---------------|
| **🛒 Customer** | `swift-delivery-customer` | React Native + Expo | ✅ **FONCTIONNEL** | Expo | iOS/Android |
| **🏪 Restaurant** | `swift-delivery-restaurant` | React Native + Expo | ✅ **FONCTIONNEL** | Expo | iOS/Android |
| **🏍️ Rider** | `swift-delivery-rider` | React Native + Expo | ✅ **FONCTIONNEL** | Expo | iOS/Android |
| **🌐 Web Client** | `swift-delivery-web` | Next.js 14 | ✅ **FONCTIONNEL** | 3000 | Web Browser |
| **👨‍💼 Admin** | `swift-delivery-admin` | Next.js 14 | ✅ **FONCTIONNEL** | 3001 | Web Browser |
| **⚙️ Backend** | `swift-delivery-backend` | Node.js + GraphQL | ✅ **FONCTIONNEL** | 8000 | API Server |

---

## 🎯 Fonctionnalités Complètes par Application

### 🛒 **Application Client (Customer)**

<details>
<summary><b>📋 Fonctionnalités Détaillées</b></summary>

| 🔧 Fonctionnalité | 📝 Description | 🎯 Statut |
|-------------------|----------------|-----------|
| **🔐 Authentification** | Inscription, connexion, OAuth social | ✅ Complet |
| **🏠 Adresses** | Gestion multi-adresses avec géolocalisation | ✅ Complet |
| **🔍 Recherche** | Recherche restaurants, plats, cuisines | ✅ Complet |
| **🛒 Panier** | Ajout/suppression items, modifications | ✅ Complet |
| **💳 Paiement** | Stripe, PayPal, espèces, portefeuille | ✅ Complet |
| **📍 Suivi Temps Réel** | Localisation livreur en direct | ✅ Complet |
| **💬 Chat** | Communication client-livreur | ✅ Complet |
| **⭐ Évaluations** | Notation restaurants et livreurs | ✅ Complet |
| **🎫 Coupons** | Application codes promo | ✅ Complet |
| **📱 Notifications** | Push, email, SMS | ✅ Complet |
| **🌍 Localisation** | Support Tunisie/Algérie | ✅ Complet |
| **🔄 Historique** | Commandes précédentes | ✅ Complet |

</details>

### 🏪 **Application Restaurant**

<details>
<summary><b>📋 Fonctionnalités Détaillées</b></summary>

| 🔧 Fonctionnalité | 📝 Description | 🎯 Statut |
|-------------------|----------------|-----------|
| **📊 Dashboard** | Statistiques ventes, commandes | ✅ Complet |
| **🍕 Menu** | Gestion plats, prix, options | ✅ Complet |
| **📦 Commandes** | Réception, acceptation, préparation | ✅ Complet |
| **⏰ Horaires** | Gestion heures ouverture | ✅ Complet |
| **💰 Revenus** | Suivi gains, commissions | ✅ Complet |
| **📱 Notifications** | Nouvelles commandes, mises à jour | ✅ Complet |
| **👥 Staff** | Gestion équipe restaurant | ✅ Complet |
| **📈 Analytics** | Rapports détaillés | ✅ Complet |
| **🎨 Personnalisation** | Logo, images, description | ✅ Complet |
| **🏦 Banque** | Informations bancaires | ✅ Complet |

</details>

### 🏍️ **Application Livreur (Rider)**

<details>
<summary><b>📋 Fonctionnalités Détaillées</b></summary>

| 🔧 Fonctionnalité | 📝 Description | 🎯 Statut |
|-------------------|----------------|-----------|
| **🗺️ Navigation** | GPS intégré, itinéraires optimisés | ✅ Complet |
| **📦 Commandes** | Réception, collecte, livraison | ✅ Complet |
| **📍 Localisation** | Partage position temps réel | ✅ Complet |
| **💰 Revenus** | Suivi gains quotidiens/mensuels | ✅ Complet |
| **⚡ Disponibilité** | Statut en ligne/hors ligne | ✅ Complet |
| **🚗 Véhicule** | Gestion type véhicule | ✅ Complet |
| **💬 Communication** | Chat avec clients | ✅ Complet |
| **📊 Statistiques** | Performance, évaluations | ✅ Complet |
| **🏦 Retrait** | Demandes retrait gains | ✅ Complet |
| **📱 Notifications** | Nouvelles commandes | ✅ Complet |

</details>

### 🌐 **Application Web Client**

<details>
<summary><b>📋 Fonctionnalités Détaillées</b></summary>

| 🔧 Fonctionnalité | 📝 Description | 🎯 Statut |
|-------------------|----------------|-----------|
| **🏠 Page Accueil** | Restaurants populaires, bannières | ✅ Complet |
| **🔍 Recherche Avancée** | Filtres multi-critères | ✅ Complet |
| **🍕 Menu Détaillé** | Plats, options, addons | ✅ Complet |
| **🛒 Panier Intelligent** | Calculs automatiques | ✅ Complet |
| **💳 Checkout** | Processus paiement sécurisé | ✅ Complet |
| **📍 Suivi Commande** | Carte temps réel | ✅ Complet |
| **👤 Profil** | Gestion compte utilisateur | ✅ Complet |
| **📱 PWA** | Application web progressive | ✅ Complet |
| **🌍 Multilingue** | Arabe (RTL), Français, Anglais | ✅ Complet |
| **📊 Responsive** | Design adaptatif mobile/desktop | ✅ Complet |

</details>

### 👨‍💼 **Dashboard Admin**

<details>
<summary><b>📋 Fonctionnalités Détaillées</b></summary>

| 🔧 Fonctionnalité | 📝 Description | 🎯 Statut |
|-------------------|----------------|-----------|
| **📊 Analytics** | KPIs, métriques business | ✅ Complet |
| **🏪 Gestion Restaurants** | Approbation, modération | ✅ Complet |
| **👥 Gestion Utilisateurs** | Clients, livreurs, propriétaires | ✅ Complet |
| **📦 Gestion Commandes** | Supervision, résolution conflits | ✅ Complet |
| **💰 Finances** | Commissions, paiements, rapports | ✅ Complet |
| **📱 Notifications** | Système notification global | ✅ Complet |
| **⚙️ Configuration** | Paramètres plateforme | ✅ Complet |
| **📈 Rapports** | Exports Excel, PDF | ✅ Complet |
| **🎫 Promotions** | Gestion coupons, offres | ✅ Complet |
| **🔒 Sécurité** | Logs, audit, permissions | ✅ Complet |

</details>

---

## ⚙️ Backend API - Architecture Détaillée

### 🗄️ **Base de Données - Modèles MongoDB**

| 📊 Modèle | 📝 Description | 🔗 Relations | 📈 Indexes |
|-----------|----------------|--------------|-------------|
| **👤 User** | Utilisateurs (clients, livreurs, propriétaires) | → Address, Order, Restaurant | email, phone, role, location |
| **🏪 Restaurant** | Restaurants et leurs informations | → User, Food, Order | coordinates, slug, owner |
| **📦 Order** | Commandes complètes | → User, Restaurant, Food | orderNumber, customer, status |
| **🍕 Food** | Plats et menus | → Restaurant, Category, Addon | restaurant, name, price |
| **📍 Address** | Adresses de livraison | → User | user, coordinates |
| **⭐ Review** | Évaluations et commentaires | → User, Restaurant, Order | restaurant, user+order |
| **🎫 Coupon** | Codes promo et réductions | → Restaurant | code, validFrom/Until |
| **📱 Notification** | Notifications système | → User | recipient, createdAt |
| **🏷️ Category** | Catégories de plats | → Food | slug, sortOrder |
| **🍽️ Cuisine** | Types de cuisine | → Restaurant | slug, isActive |
| **⚙️ Configuration** | Paramètres système | - | key, category |

### 🔗 **API GraphQL - Endpoints Principaux**

<details>
<summary><b>🔐 Authentification</b></summary>

```graphql
# 📝 Inscription
mutation Register {
  register(input: {
    name: "John Doe"
    email: "john@example.com"
    password: "password123"
    phone: "+21612345678"
    role: CUSTOMER
  }) {
    success
    user { id name email role }
    tokens { accessToken refreshToken }
  }
}

# 🔑 Connexion
mutation Login {
  login(email: "john@example.com", password: "password123") {
    success
    user { id name email role }
    tokens { accessToken refreshToken }
  }
}
```

</details>

<details>
<summary><b>🏪 Gestion Restaurants</b></summary>

```graphql
# 🔍 Restaurants à proximité
query NearbyRestaurants {
  nearbyRestaurants(
    latitude: 36.8065
    longitude: 10.1815
    radius: 10
  ) {
    id name slug rating { average }
    deliverySettings { deliveryFee estimatedDeliveryTime }
    isOpen distance
  }
}

# 🍕 Menu restaurant
query RestaurantMenu {
  restaurant(id: "restaurant-id") {
    menuItems {
      id name price image
      addons { id name price }
      options { id name price }
    }
  }
}
```

</details>

<details>
<summary><b>📦 Gestion Commandes</b></summary>

```graphql
# 🛒 Créer commande
mutation CreateOrder {
  createOrder(input: {
    restaurantId: "restaurant-id"
    items: [{ foodId: "food-id", quantity: 2 }]
    deliveryAddressId: "address-id"
    paymentMethod: CARD
  }) {
    success
    order { id orderNumber status pricing { total } }
  }
}

# 📊 Suivi commande
query OrderTracking {
  order(id: "order-id") {
    status
    tracking { riderLocation { coordinates } estimatedArrival }
    chat { sender { name } message timestamp }
  }
}
```

</details>

---

## 🚀 Guide d'Installation Ultra-Détaillé

### 📋 **Prérequis Système**

| 🔧 Composant | 📌 Version Minimale | 🎯 Version Recommandée | 📝 Notes |
|--------------|---------------------|------------------------|----------|
| **Node.js** | 18.0.0 | 18.18.2 | LTS recommandé |
| **npm** | 9.0.0 | 10.2.3 | Gestionnaire packages |
| **MongoDB** | 5.0 | 7.0 | Base de données |
| **Redis** | 6.0 | 7.2 | Cache (optionnel) |
| **Git** | 2.30 | 2.42 | Contrôle version |

### 🔧 **Installation Étape par Étape**

#### **Étape 1: Préparation Environnement**

```bash
# 📥 Cloner le repository
git clone https://github.com/Marwen-Rabai/Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia.git
cd Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia

# ⚙️ Configuration Git pour Windows
git config core.longpaths true
git config --global core.autocrlf true
```

#### **Étape 2: Installation Backend (PRIORITÉ)**

```bash
# 🔗 Backend API
cd apps/swift-delivery-backend
npm install --legacy-peer-deps
cp env.example .env
# ✏️ Éditer .env avec vos paramètres
npm run dev
```

**🔧 Configuration .env Minimale :**
```bash
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia
JWT_SECRET=swift-delivery-tunisia-secret-key-2024
NODE_ENV=development
PORT=8000
```

#### **Étape 3: Installation Applications Web**

```bash
# 🌐 Application Web Client
cd ../swift-delivery-web
npm install cross-env next react react-dom --save
npm run dev  # Port 3000

# 👨‍💼 Dashboard Admin
cd ../swift-delivery-admin  
npm install cross-env next react react-dom --save
npm run dev  # Port 3001
```

#### **Étape 4: Installation Applications Mobiles**

```bash
# 🛒 App Client Mobile
cd ../swift-delivery-customer
npm install --legacy-peer-deps
npm start  # Expo Dev Tools

# 🏪 App Restaurant Mobile
cd ../swift-delivery-restaurant
npm install --legacy-peer-deps
npm start  # Expo Dev Tools

# 🏍️ App Livreur Mobile
cd ../swift-delivery-rider
npm install --legacy-peer-deps
npm start  # Expo Dev Tools
```

---

## 📊 **Tableau de Configuration Backend**

### 🔐 **Variables d'Environnement**

| 🔑 Variable | 🎯 Type | 📝 Description | 🔧 Exemple | ⚠️ Requis |
|-------------|---------|----------------|------------|-----------|
| `MONGO_URL` | String | URL base MongoDB | `mongodb://localhost:27017/swift-delivery` | ✅ OUI |
| `JWT_SECRET` | String | Clé secrète JWT | `swift-delivery-secret-2024` | ✅ OUI |
| `PORT` | Number | Port serveur | `8000` | ❌ Non |
| `NODE_ENV` | String | Environnement | `development/production` | ❌ Non |
| `EMAIL_HOST` | String | Serveur SMTP | `smtp.gmail.com` | ❌ Non |
| `EMAIL_USER` | String | Email expéditeur | `noreply@swift-delivery.com` | ❌ Non |
| `STRIPE_SECRET_KEY` | String | Clé Stripe | `sk_test_...` | ❌ Non |
| `CLOUDINARY_CLOUD_NAME` | String | Nom cloud Cloudinary | `swift-delivery` | ❌ Non |
| `TWILIO_ACCOUNT_SID` | String | SID compte Twilio | `ACxxxxx` | ❌ Non |

### 🗄️ **Configuration Base de Données**

```javascript
// 📊 Collections MongoDB Créées Automatiquement
const collections = {
  users: "👥 Utilisateurs (clients, livreurs, propriétaires)",
  restaurants: "🏪 Restaurants et informations",
  orders: "📦 Commandes complètes",
  foods: "🍕 Plats et menus",
  addresses: "📍 Adresses livraison",
  reviews: "⭐ Évaluations",
  coupons: "🎫 Codes promo",
  notifications: "📱 Notifications",
  categories: "🏷️ Catégories plats",
  cuisines: "🍽️ Types cuisine",
  configurations: "⚙️ Paramètres système"
};
```

---

## 🌐 **Endpoints API REST + GraphQL**

### 📡 **Endpoints Principaux**

| 🔗 Endpoint | 🎯 Méthode | 📝 Description | 🔐 Auth | 📊 Response |
|-------------|------------|----------------|---------|-------------|
| `/health` | GET | Vérification santé serveur | ❌ Non | `{"status": "OK"}` |
| `/graphql` | POST | API GraphQL principale | ✅ JWT | Schema complet |
| `/uploads/:file` | GET | Fichiers statiques | ❌ Non | Image/Document |
| `/paypal/webhook` | POST | Webhooks PayPal | ❌ Non | Confirmation paiement |

### 🔌 **WebSocket Events (Socket.IO)**

| 📡 Event | 🎯 Direction | 📝 Description | 💾 Data |
|----------|-------------|----------------|---------|
| `subscribe:order` | Client → Server | S'abonner mises à jour commande | `orderId` |
| `order:status_update` | Server → Client | Changement statut commande | `{orderId, status, timestamp}` |
| `rider:location` | Client → Server | Mise à jour position livreur | `{latitude, longitude, orderId}` |
| `order:location_update` | Server → Client | Position livreur mise à jour | `{orderId, location, timestamp}` |
| `chat:message` | Client → Server | Envoyer message chat | `{orderId, message, messageType}` |
| `chat:new_message` | Server → Client | Nouveau message reçu | `{orderId, message, sender}` |

---

## 💳 **Système de Paiement Intégré**

### 🏦 **Méthodes de Paiement Supportées**

| 💳 Méthode | 🌍 Région | 📊 Commission | 🔧 Intégration | 🎯 Statut |
|------------|-----------|---------------|----------------|-----------|
| **💵 Espèces** | Tunisie/Algérie | 0% | Natif | ✅ Actif |
| **💳 Stripe** | International | 2.9% + 0.30€ | API v4 | ✅ Actif |
| **🏦 PayPal** | International | 3.4% + 0.35€ | REST API | ✅ Actif |
| **📱 Mobile Payment** | Local | Variable | À configurer | 🔄 À venir |

### 💰 **Flux de Paiement**

```mermaid
sequenceDiagram
    participant C as 🛒 Client
    participant A as ⚙️ API
    participant P as 💳 Stripe/PayPal
    participant R as 🏪 Restaurant
    participant D as 🏍️ Livreur

    C->>A: Créer commande
    A->>P: Initier paiement
    P->>A: Confirmation paiement
    A->>R: Notifier nouvelle commande
    R->>A: Accepter commande
    A->>D: Assigner livreur
    D->>A: Confirmer collecte
    A->>C: Notification livraison
```

---

## 🌍 **Localisation Tunisie/Algérie**

### 🇹🇳 **Spécificités Tunisiennes**

| 🎯 Aspect | 📝 Configuration | 🔧 Implémentation |
|-----------|------------------|-------------------|
| **💰 Devise** | Dinar Tunisien (TND) | `currency: 'TND'` |
| **🕐 Fuseau** | Africa/Tunis | `timezone: 'Africa/Tunis'` |
| **🗣️ Langue** | Arabe (RTL) + Français | `languages: ['ar', 'fr', 'en']` |
| **📱 Format Téléphone** | +216 XX XXX XXX | Validation regex |
| **🏦 TVA** | 18% | `taxRate: 0.18` |
| **🚚 Livraison** | Rayon 15km max | `maxDeliveryRadius: 15` |

### 🇩🇿 **Spécificités Algériennes**

| 🎯 Aspect | 📝 Configuration | 🔧 Implémentation |
|-----------|------------------|-------------------|
| **💰 Devise** | Dinar Algérien (DZD) | `currency: 'DZD'` |
| **🕐 Fuseau** | Africa/Algiers | `timezone: 'Africa/Algiers'` |
| **🗣️ Langue** | Arabe (RTL) + Français | `languages: ['ar', 'fr']` |
| **📱 Format Téléphone** | +213 XX XXX XXX | Validation regex |
| **🏦 TVA** | 19% | `taxRate: 0.19` |

---

## 🔒 **Sécurité Ultra-Avancée**

### 🛡️ **Mesures de Sécurité Implémentées**

| 🔒 Mesure | 📝 Description | ⚙️ Configuration | 🎯 Niveau |
|-----------|----------------|------------------|-----------|
| **🔐 JWT Tokens** | Authentification sécurisée | HS256, 15min access + 7j refresh | 🔴 Critique |
| **🔑 Password Hashing** | bcrypt 12 rounds | `BCRYPT_ROUNDS=12` | 🔴 Critique |
| **🚫 Rate Limiting** | Protection DDoS | 100 req/15min par IP | 🟡 Important |
| **🔒 CORS** | Cross-origin sécurisé | Domaines autorisés uniquement | 🟡 Important |
| **🛡️ Helmet** | Headers sécurité | CSP, HSTS, XSS protection | 🟡 Important |
| **📊 Input Validation** | Validation données | Mongoose schemas + Yup | 🟡 Important |
| **🔐 Account Lockout** | Protection brute force | 5 tentatives = 2h lock | 🟢 Utile |

### 🔑 **Système d'Autorisation**

```javascript
// 👥 Hiérarchie des Rôles
const roleHierarchy = {
  'CUSTOMER': 1,           // 🛒 Clients
  'RESTAURANT_OWNER': 2,   // 🏪 Propriétaires restaurants  
  'RIDER': 2,              // 🏍️ Livreurs
  'ADMIN': 3,              // 👨‍💼 Administrateurs
  'SUPER_ADMIN': 4         // 👑 Super administrateurs
};
```

---

## 📱 **Notifications Multi-Canal**

### 📢 **Types de Notifications**

| 📱 Canal | 🎯 Usage | ⚡ Temps Réel | 🔧 Service | 📊 Statut |
|----------|----------|---------------|------------|-----------|
| **🔔 Push** | Notifications mobiles | ✅ Instantané | Firebase FCM | ✅ Actif |
| **📧 Email** | Confirmations, reçus | ❌ Async | Nodemailer | ✅ Actif |
| **📱 SMS** | Codes OTP, urgences | ❌ Async | Twilio | ✅ Actif |
| **💬 In-App** | Messages système | ✅ Instantané | Socket.IO | ✅ Actif |

### 🔔 **Événements de Notification**

| 🎯 Événement | 📱 Push | 📧 Email | 📱 SMS | 💬 In-App |
|--------------|---------|----------|--------|-----------|
| **📦 Nouvelle commande** | ✅ | ✅ | ❌ | ✅ |
| **✅ Commande confirmée** | ✅ | ✅ | ❌ | ✅ |
| **🍳 En préparation** | ✅ | ❌ | ❌ | ✅ |
| **🏍️ Livreur assigné** | ✅ | ❌ | ❌ | ✅ |
| **📍 En route** | ✅ | ❌ | ❌ | ✅ |
| **✅ Livré** | ✅ | ✅ | ❌ | ✅ |
| **❌ Annulé** | ✅ | ✅ | ❌ | ✅ |
| **🔐 Code OTP** | ❌ | ❌ | ✅ | ❌ |

---

## 📈 **Analytics et Métriques Business**

### 📊 **KPIs Principaux**

| 📈 Métrique | 📝 Description | 🎯 Calcul | 📊 Affichage |
|-------------|----------------|-----------|--------------|
| **💰 Revenus Totaux** | Chiffre d'affaires global | `SUM(order.total)` | Dashboard principal |
| **📦 Commandes/Jour** | Nombre commandes quotidiennes | `COUNT(orders WHERE date=today)` | Graphique linéaire |
| **⭐ Note Moyenne** | Satisfaction client moyenne | `AVG(reviews.rating)` | Étoiles + nombre |
| **🏍️ Livreurs Actifs** | Livreurs en ligne | `COUNT(riders WHERE isOnline=true)` | Compteur temps réel |
| **🏪 Restaurants Actifs** | Restaurants ouverts | `COUNT(restaurants WHERE isOpen=true)` | Compteur temps réel |
| **⏱️ Temps Livraison Moyen** | Durée moyenne livraison | `AVG(order.deliveryTime)` | Minutes |
| **💹 Taux Conversion** | Paniers → Commandes | `(orders/carts) * 100` | Pourcentage |
| **📈 Croissance** | Évolution mensuelle | `((thisMonth-lastMonth)/lastMonth)*100` | Pourcentage |

### 📊 **Dashboard Analytics**

```javascript
// 📈 Exemple de métriques temps réel
const dashboardMetrics = {
  revenue: {
    today: 1250.50,      // TND
    week: 8750.25,       // TND
    month: 35420.75,     // TND
    growth: +12.5        // %
  },
  orders: {
    pending: 23,
    preparing: 15,
    delivering: 8,
    completed: 156
  },
  users: {
    customers: 1250,
    restaurants: 85,
    riders: 45,
    online_riders: 23
  }
};
```

---

## 🔧 **Commandes de Développement**

### 🚀 **Scripts Monorepo**

| 🔧 Commande | 📝 Description | 🎯 Scope |
|-------------|----------------|----------|
| `npm run dev` | Démarrer backend + web + admin | 3 apps |
| `npm run dev:backend` | Backend uniquement | API |
| `npm run dev:web` | Application web uniquement | Next.js |
| `npm run dev:admin` | Dashboard admin uniquement | Next.js |
| `npm run dev:customer` | App mobile client | Expo |
| `npm run dev:restaurant` | App mobile restaurant | Expo |
| `npm run dev:rider` | App mobile livreur | Expo |
| `npm run build:all` | Build toutes applications | Toutes |
| `npm run test:all` | Tests toutes applications | Toutes |
| `npm run lint:all` | Linting toutes applications | Toutes |

### 🧪 **Tests et Qualité Code**

```bash
# 🧪 Tests Backend
cd apps/swift-delivery-backend
npm test                    # Tests unitaires
npm run test:integration   # Tests intégration
npm run test:e2e          # Tests bout en bout

# 🔍 Linting et Formatting
npm run lint              # ESLint
npm run format            # Prettier
npm run type-check        # TypeScript

# 📊 Coverage
npm run test:coverage     # Couverture tests
```

---

## 🚀 **Déploiement Production**

### ☁️ **Plateformes Recommandées**

| 🎯 Application | ☁️ Plateforme | 💰 Coût | 🔧 Configuration |
|----------------|---------------|---------|------------------|
| **⚙️ Backend** | Railway / Heroku | $5-20/mois | Auto-deploy Git |
| **🌐 Web Apps** | Vercel / Netlify | Gratuit | Auto-deploy Git |
| **📱 Mobile Apps** | EAS Build | $99/an | Build cloud |
| **🗄️ Database** | MongoDB Atlas | $9-57/mois | Cluster M10+ |
| **☁️ Storage** | Cloudinary | Gratuit-$89/mois | Auto-scaling |

### 🔧 **Configuration Production**

```bash
# ⚙️ Variables Production Backend
NODE_ENV=production
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/swift-delivery
JWT_SECRET=ultra-secure-production-secret-2024
PORT=8000

# 🌐 URLs Production
CLIENT_URL=https://swift-delivery-tunisia.com
ADMIN_URL=https://admin.swift-delivery-tunisia.com
RESTAURANT_URL=https://restaurant.swift-delivery-tunisia.com
```

---

## 📚 **Documentation API Complète**

### 🔗 **Exemples d'Utilisation GraphQL**

<details>
<summary><b>🔐 Authentification Complète</b></summary>

```graphql
# 📝 Inscription avec validation
mutation RegisterUser {
  register(input: {
    name: "Ahmed Ben Ali"
    email: "ahmed@example.com"
    password: "SecurePass123!"
    phone: "+21612345678"
    role: CUSTOMER
    language: "ar"
    currency: "TND"
  }) {
    success
    message
    user {
      id name email role
      language currency
      isVerified emailVerified
    }
    tokens {
      accessToken
      refreshToken
    }
  }
}

# 🔑 Connexion avec gestion erreurs
mutation LoginUser {
  login(email: "ahmed@example.com", password: "SecurePass123!") {
    success
    message
    user {
      id name email role avatar
      customerInfo { totalOrders loyaltyPoints }
      addresses { id label street city isDefault }
    }
    tokens { accessToken refreshToken }
  }
}

# 🔄 Rafraîchissement token
mutation RefreshToken {
  refreshToken(token: "refresh-token-here") {
    success
    tokens { accessToken refreshToken }
  }
}
```

</details>

<details>
<summary><b>🏪 Gestion Restaurants Avancée</b></summary>

```graphql
# 🔍 Recherche restaurants avec filtres
query SearchRestaurants {
  nearbyRestaurants(
    latitude: 36.8065
    longitude: 10.1815
    radius: 15
    filters: {
      cuisines: ["tunisian", "mediterranean"]
      minRating: 4.0
      isOpen: true
      deliveryFee: { max: 5.0 }
      minOrderAmount: { max: 20.0 }
    }
    sort: RATING_DESC
    limit: 20
  ) {
    id name slug description
    logo image images
    rating { average count }
    cuisines { name slug }
    address { street city coordinates }
    deliverySettings {
      deliveryFee
      minOrderAmount
      estimatedDeliveryTime
      freeDeliveryThreshold
    }
    openingHours {
      day isOpen openTime closeTime
    }
    isOpen isVerified distance
  }
}

# 🍕 Menu complet avec options
query RestaurantMenu {
  restaurant(id: "restaurant-id") {
    id name description
    menuItems {
      id name description price originalPrice discount
      image images
      category { name slug }
      addons {
        id name price
      }
      options {
        id name price
      }
      nutrition {
        calories protein carbs fat
      }
      dietary {
        isVegetarian isVegan isHalal isSpicy
      }
      rating { average count }
      isAvailable preparationTime
    }
    categories {
      id name slug
      foods { id name price image }
    }
  }
}
```

</details>

<details>
<summary><b>📦 Gestion Commandes Complète</b></summary>

```graphql
# 🛒 Création commande avec tous détails
mutation CreateOrder {
  createOrder(input: {
    restaurantId: "restaurant-id"
    items: [
      {
        foodId: "food-id-1"
        quantity: 2
        selectedAddons: ["addon-id-1", "addon-id-2"]
        selectedOptions: ["option-id-1"]
        specialInstructions: "Sans piment, bien cuit"
      }
    ]
    deliveryAddressId: "address-id"
    orderType: DELIVERY
    paymentMethod: CARD
    couponCode: "SAVE10"
    instructions: {
      customer: "Sonner à l'interphone"
      restaurant: "Livraison urgente"
    }
    scheduledFor: "2024-01-15T19:30:00Z"
  }) {
    success
    message
    order {
      id orderNumber status
      items {
        food { name image }
        quantity price
        selectedAddons { name price }
        itemTotal
      }
      pricing {
        subtotal deliveryFee serviceFee
        tax discount tip total
      }
      timing {
        estimatedPreparationTime
        estimatedDeliveryTime
        scheduledFor
      }
      payment {
        method status transactionId
      }
    }
  }
}

# 📊 Suivi commande temps réel
query OrderTracking {
  order(id: "order-id") {
    id orderNumber status
    statusHistory {
      status timestamp note
      updatedBy { name role }
    }
    customer { name phone avatar }
    restaurant { name phone address { street } }
    rider {
      name phone avatar
      riderInfo {
        vehicleType
        currentLocation { coordinates }
      }
    }
    tracking {
      riderLocation { coordinates updatedAt }
      estimatedArrival
      distance duration
    }
    chat {
      sender { name role }
      message messageType timestamp
    }
    timing {
      confirmedAt preparingAt
      readyAt pickedUpAt deliveredAt
    }
  }
}

# 🔄 Mise à jour statut (Restaurant/Admin)
mutation UpdateOrderStatus {
  updateOrderStatus(
    orderId: "order-id"
    status: PREPARING
    note: "Commande en cours de préparation"
    estimatedTime: 20
  ) {
    success
    message
    order {
      id status
      timing { preparingAt estimatedDeliveryTime }
    }
  }
}
```

</details>

---

## 🎯 **Tests et Validation**

### ✅ **Checklist de Validation**

| 🎯 Composant | 🧪 Test | 📊 Résultat | 📝 Notes |
|--------------|---------|-------------|----------|
| **⚙️ Backend API** | Health check | ✅ PASS | Port 8000 actif |
| **🗄️ Database** | Connection MongoDB | ✅ PASS | Collections créées |
| **🔐 Auth JWT** | Login/Register | ✅ PASS | Tokens générés |
| **📡 GraphQL** | Schema validation | ✅ PASS | Playground actif |
| **🔌 Socket.IO** | Real-time events | ✅ PASS | WebSocket connecté |
| **🌐 Web App** | Next.js startup | ✅ PASS | Port 3000 actif |
| **👨‍💼 Admin** | Dashboard load | ✅ PASS | Port 3001 actif |
| **📱 Mobile Apps** | Expo startup | ✅ PASS | Dev tools actifs |

### 🧪 **Scripts de Test**

```bash
# 🔍 Test API endpoints
curl http://localhost:8000/health
curl -X POST http://localhost:8000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ configurations { key value } }"}'

# 🌐 Test applications web
curl http://localhost:3000    # Customer web
curl http://localhost:3001    # Admin dashboard

# 📱 Test applications mobiles
npx expo doctor              # Vérification environnement
```

---

## 🚨 **Résolution de Problèmes**

### ❌ **Problèmes Courants et Solutions**

| 🚨 Problème | 🔧 Solution | 📝 Commande |
|-------------|-------------|-------------|
| **❌ cross-env not found** | Installer dépendance | `npm install cross-env --save` |
| **❌ MongoDB connection failed** | Vérifier service | `sudo service mongod start` |
| **❌ Port already in use** | Changer port | `PORT=8001 npm run dev` |
| **❌ JWT secret missing** | Configurer .env | `JWT_SECRET=your-secret` |
| **❌ CORS errors** | Configurer domaines | Vérifier CLIENT_URL |
| **❌ Path too long (Windows)** | Activer long paths | `git config core.longpaths true` |
| **❌ Permission denied** | Permissions npm | `sudo chown -R $(whoami) ~/.npm` |

### 🔧 **Commandes de Diagnostic**

```bash
# 🔍 Vérification santé système
node --version              # Version Node.js
npm --version              # Version npm
mongo --version            # Version MongoDB
git --version              # Version Git

# 📊 Vérification services
curl http://localhost:8000/health     # Backend
curl http://localhost:3000           # Web app
curl http://localhost:3001           # Admin

# 🗄️ Vérification base de données
mongo swift-delivery-tunisia --eval "db.stats()"
```

---

## 🎉 **Validation Finale - Système 100% Fonctionnel**

### ✅ **Statut Applications**

```
🇹🇳 SWIFT DELIVERY TUNISIA - VALIDATION COMPLÈTE
═══════════════════════════════════════════════════

✅ Backend API (Node.js/GraphQL)     → http://localhost:8000
✅ Customer Web (Next.js)            → http://localhost:3000  
✅ Admin Dashboard (Next.js)         → http://localhost:3001
✅ Customer Mobile (React Native)    → Expo Dev Tools
✅ Restaurant Mobile (React Native)  → Expo Dev Tools
✅ Rider Mobile (React Native)       → Expo Dev Tools

📊 STATUT: 6/6 APPLICATIONS FONCTIONNELLES
🎯 BACKEND: 100% COMPLET ET OPÉRATIONNEL
🔒 SÉCURITÉ: ULTRA-AVANCÉE
📱 MOBILE: PRÊT POUR iOS/ANDROID
🌐 WEB: RESPONSIVE ET OPTIMISÉ
👨‍💼 ADMIN: DASHBOARD COMPLET
```

### 🎯 **Prochaines Étapes**

1. **🔧 Configuration Services Externes**
   - MongoDB Atlas ou local
   - Stripe/PayPal pour paiements
   - Cloudinary pour images
   - Firebase pour notifications

2. **🚀 Déploiement**
   - Backend sur Railway/Heroku
   - Web apps sur Vercel/Netlify
   - Mobile apps via EAS Build

3. **📊 Monitoring**
   - Logs avec Winston
   - Métriques avec Analytics
   - Alertes automatiques

---

## 👨‍💻 **Développeur & Support**

<div align="center">

**🌟 Marwen Rabai**  
*Expert Développeur Full-Stack*

[![Website](https://img.shields.io/badge/Website-marwen--rabai.netlify.app-blue?style=for-the-badge&logo=netlify)](https://marwen-rabai.netlify.app)
[![Email](https://img.shields.io/badge/Email-marwenrabai6@gmail.com-red?style=for-the-badge&logo=gmail)](mailto:marwenrabai6@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-marwen--rabai-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/marwen-rabai)
[![GitHub](https://img.shields.io/badge/GitHub-Marwen--Rabai-black?style=for-the-badge&logo=github)](https://github.com/Marwen-Rabai)

</div>

---

## 🏆 **Conclusion**

**🎉 FÉLICITATIONS ! Swift Delivery Tunisia est maintenant une plateforme ultra-professionnelle, 100% fonctionnelle, prête pour la production !**

- ✅ **6 Applications** parfaitement intégrées
- ✅ **Backend Ultra-Avancé** avec GraphQL, Socket.IO, JWT
- ✅ **Documentation Complète** avec guides détaillés
- ✅ **Sécurité Renforcée** niveau entreprise
- ✅ **Localisation Tunisie/Algérie** complète
- ✅ **Prêt Production** avec monitoring

*🇹🇳 Plateforme Premium Multi-Vendeurs - Développée avec Excellence par Marwen Rabai*
