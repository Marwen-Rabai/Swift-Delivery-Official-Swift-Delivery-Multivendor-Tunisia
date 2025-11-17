# 🇹🇳 Swift Delivery Tunisia - Guide d'Installation Étape par Étape

<div align="center">

![Swift Delivery Tunisia](https://img.shields.io/badge/Swift%20Delivery-Tunisia-green?style=for-the-badge&logo=delivery&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Developer](https://img.shields.io/badge/Developer-Marwen%20Rabai-blue?style=for-the-badge)

**🌟 Guide Complet pour Rendre l'Application Parfaitement Fonctionnelle**  
**👨‍💻 Développé par Marwen Rabai - [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)**

</div>

---

## 📋 Table des Matières

1. [🎯 Vue d'Ensemble](#-vue-densemble)
2. [🔧 Prérequis Système](#-prérequis-système)
3. [📥 Installation Initiale](#-installation-initiale)
4. [⚙️ Configuration Backend](#️-configuration-backend)
5. [🌐 Configuration Applications Web](#-configuration-applications-web)
6. [📱 Configuration Applications Mobiles](#-configuration-applications-mobiles)
7. [🔍 Validation et Tests](#-validation-et-tests)
8. [🚨 Résolution de Problèmes](#-résolution-de-problèmes)
9. [🚀 Déploiement Production](#-déploiement-production)

---

## 🎯 Vue d'Ensemble

### 📊 Architecture du Système

```
🇹🇳 SWIFT DELIVERY TUNISIA - ARCHITECTURE COMPLÈTE
═══════════════════════════════════════════════════════════════════════════

📱 APPLICATIONS MOBILES (React Native + Expo)
├── 🛒 Customer App     → Port: Expo Dev Tools
├── 🏪 Restaurant App   → Port: Expo Dev Tools  
└── 🏍️ Rider App       → Port: Expo Dev Tools

🌐 APPLICATIONS WEB (Next.js 14)
├── 🌐 Customer Web     → Port: 3000
└── 👨‍💼 Admin Dashboard → Port: 3001

⚙️ BACKEND API (Node.js + GraphQL)
└── 🔗 Backend API     → Port: 8000

🗄️ BASE DE DONNÉES
└── 📊 MongoDB         → Port: 27017
```

### 🎯 Objectif Final

Rendre **6 applications** parfaitement fonctionnelles :
- ✅ Backend API (Node.js/GraphQL)
- ✅ Customer Web (Next.js)
- ✅ Admin Dashboard (Next.js)
- ✅ Customer Mobile (React Native)
- ✅ Restaurant Mobile (React Native)
- ✅ Rider Mobile (React Native)

---

## 🔧 Prérequis Système

### 📋 Checklist Prérequis

| 🔧 Composant | 📌 Version Minimale | 🎯 Version Recommandée | 📝 Installation |
|--------------|---------------------|------------------------|-----------------|
| **Node.js** | 18.0.0 | 18.18.2 | [nodejs.org](https://nodejs.org) |
| **npm** | 9.0.0 | 10.2.3 | Inclus avec Node.js |
| **MongoDB** | 5.0 | 7.0 | [mongodb.com](https://mongodb.com) |
| **Git** | 2.30 | 2.42 | [git-scm.com](https://git-scm.com) |
| **Expo CLI** | 6.0.0 | Latest | `npm install -g @expo/cli` |

### 🖥️ Configuration Windows

```powershell
# 🔧 Configuration Git pour Windows
git config --global core.longpaths true
git config --global core.autocrlf true

# 🔧 Configuration npm pour Windows
npm config set script-shell "C:\\Program Files\\nodejs\\node.exe"
```

### 🐧 Configuration Linux/Mac

```bash
# 🔧 Permissions npm
sudo chown -R $(whoami) ~/.npm

# 🔧 Configuration Git
git config --global core.autocrlf input
```

---

## 📥 Installation Initiale

### Étape 1: Cloner le Repository

```bash
# 📥 Cloner le projet
git clone https://github.com/Marwen-Rabai/Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia.git
cd Swift-Delivery-Official-Swift-Delivery-Multivendor-Tunisia

# 🔍 Vérifier la structure
ls -la
```

### Étape 2: Installation Dépendances Racine

```bash
# 📦 Installer dépendances monorepo
npm install

# 🔧 Installer Expo CLI globalement
npm install -g @expo/cli

# 🔧 Installer dépendances mobiles
npm run install:mobile
```

### Étape 3: Vérification Installation

```bash
# 🔍 Vérifier versions
node --version    # Doit être 18.0.0+
npm --version     # Doit être 9.0.0+
expo --version    # Doit être 6.0.0+

# 🔍 Vérifier structure projet
tree -L 2 -I node_modules
```

---

## ⚙️ Configuration Backend

### Étape 1: Configuration Base de Données

#### Option A: MongoDB Local

```bash
# 🐧 Linux/Ubuntu
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# 🍎 macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# 🪟 Windows
# Télécharger depuis https://mongodb.com/try/download/community
# Installer et démarrer le service
```

#### Option B: MongoDB Docker (Recommandé)

```bash
# 🐳 Démarrer MongoDB avec Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest

# 🔍 Vérifier que MongoDB fonctionne
docker ps | grep mongodb
```

### Étape 2: Configuration Backend

```bash
# 📁 Aller dans le dossier backend
cd apps/swift-delivery-backend

# 📋 Copier le fichier d'environnement
cp env.example .env

# ✏️ Éditer le fichier .env
nano .env  # ou code .env
```

### Étape 3: Configuration .env Minimale

```bash
# 🔧 Configuration minimale requise
MONGO_URL=mongodb://localhost:27017/swift-delivery-tunisia
JWT_SECRET=swift-delivery-tunisia-secret-key-2024
NODE_ENV=development
PORT=8000

# 🌐 URLs (optionnel)
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### Étape 4: Installation et Démarrage Backend

```bash
# 📦 Installer dépendances backend
npm install --legacy-peer-deps

# 🚀 Démarrer le backend
npm run dev

# 🔍 Vérifier que le backend fonctionne
curl http://localhost:8000/health
```

### Étape 5: Vérification Backend

```bash
# 🌐 Ouvrir GraphQL Playground
open http://localhost:8000/graphql

# 🔍 Tester une requête simple
curl -X POST http://localhost:8000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ configurations { key value } }"}'
```

---

## 🌐 Configuration Applications Web

### Étape 1: Configuration Customer Web

```bash
# 📁 Aller dans le dossier web
cd apps/swift-delivery-web

# 📦 Installer dépendances
npm install cross-env next react react-dom --save

# 🚀 Démarrer l'application web
npm run dev

# 🌐 Vérifier l'application
open http://localhost:3000
```

### Étape 2: Configuration Admin Dashboard

```bash
# 📁 Aller dans le dossier admin
cd apps/swift-delivery-admin

# 📦 Installer dépendances
npm install cross-env next react react-dom --save

# 🚀 Démarrer l'admin dashboard
npm run dev

# 🌐 Vérifier l'admin
open http://localhost:3001
```

### Étape 3: Vérification Applications Web

```bash
# 🔍 Vérifier que les deux applications fonctionnent
curl http://localhost:3000  # Customer Web
curl http://localhost:3001  # Admin Dashboard

# 🌐 Ouvrir dans le navigateur
# Customer Web: http://localhost:3000
# Admin Dashboard: http://localhost:3001
```

---

## 📱 Configuration Applications Mobiles

### Étape 1: Configuration Customer Mobile

```bash
# 📁 Aller dans le dossier customer mobile
cd apps/swift-delivery-customer

# 📦 Installer dépendances
npm install --legacy-peer-deps

# 🚀 Démarrer Expo
npm start
# ou
npx expo start

# 📱 Scanner le QR code avec Expo Go
```

### Étape 2: Configuration Restaurant Mobile

```bash
# 📁 Aller dans le dossier restaurant mobile
cd apps/swift-delivery-restaurant

# 📦 Installer dépendances
npm install --legacy-peer-deps

# 🚀 Démarrer Expo
npm start
# ou
npx expo start

# 📱 Scanner le QR code avec Expo Go
```

### Étape 3: Configuration Rider Mobile

```bash
# 📁 Aller dans le dossier rider mobile
cd apps/swift-delivery-rider

# 📦 Installer dépendances
npm install --legacy-peer-deps

# 🚀 Démarrer Expo
npm start
# ou
npx expo start

# 📱 Scanner le QR code avec Expo Go
```

### Étape 4: Installation Expo Go

#### 📱 Sur votre téléphone :

1. **Télécharger Expo Go** :
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scanner les QR codes** affichés dans le terminal

3. **Tester les applications** sur votre téléphone

---

## 🔍 Validation et Tests

### Étape 1: Test Backend API

```bash
# 🔍 Test santé backend
curl http://localhost:8000/health

# 🔍 Test GraphQL
curl -X POST http://localhost:8000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ configurations { key value } }"}'

# 🔍 Test WebSocket
# Ouvrir http://localhost:8000/graphql et tester les subscriptions
```

### Étape 2: Test Applications Web

```bash
# 🌐 Test Customer Web
curl -I http://localhost:3000
# Doit retourner: HTTP/1.1 200 OK

# 🌐 Test Admin Dashboard
curl -I http://localhost:3001
# Doit retourner: HTTP/1.1 200 OK
```

### Étape 3: Test Applications Mobiles

```bash
# 📱 Vérifier que Expo Dev Tools s'ouvre
# 📱 Vérifier que les QR codes s'affichent
# 📱 Tester sur téléphone avec Expo Go
```

### Étape 4: Test Base de Données

```bash
# 🗄️ Se connecter à MongoDB
mongo swift-delivery-tunisia

# 🔍 Vérifier les collections
show collections

# 🔍 Vérifier les données
db.users.find().limit(1)
db.restaurants.find().limit(1)
```

### Étape 5: Test Complet du Système

```bash
# 🚀 Démarrer toutes les applications
npm run dev

# 🔍 Vérifier tous les ports
netstat -tulpn | grep -E ':(3000|3001|8000)'

# 📊 Vérifier les logs
# Backend: http://localhost:8000
# Web: http://localhost:3000
# Admin: http://localhost:3001
# Mobile: Expo Dev Tools
```

---

## 🚨 Résolution de Problèmes

### ❌ Problèmes Courants

#### 1. **MongoDB Connection Failed**

```bash
# 🔍 Vérifier que MongoDB fonctionne
sudo service mongod status  # Linux
brew services list | grep mongodb  # macOS
netstat -an | grep 27017  # Vérifier port

# 🔧 Redémarrer MongoDB
sudo service mongod restart  # Linux
brew services restart mongodb/brew/mongodb-community  # macOS
```

#### 2. **Port Already in Use**

```bash
# 🔍 Trouver le processus utilisant le port
sudo lsof -i :8000  # Backend
sudo lsof -i :3000  # Web
sudo lsof -i :3001  # Admin

# 🔧 Tuer le processus
sudo kill -9 <PID>

# 🔧 Ou utiliser un autre port
PORT=8001 npm run dev
```

#### 3. **Module Not Found**

```bash
# 🔧 Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# 🔧 Pour les applications mobiles
npm install --legacy-peer-deps
```

#### 4. **Permission Denied**

```bash
# 🔧 Corriger les permissions npm
sudo chown -R $(whoami) ~/.npm

# 🔧 Ou utiliser nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### 5. **Expo CLI Issues**

```bash
# 🔧 Réinstaller Expo CLI
npm uninstall -g @expo/cli
npm install -g @expo/cli@latest

# 🔧 Nettoyer le cache Expo
expo r -c
```

#### 6. **Path Too Long (Windows)**

```bash
# 🔧 Activer les chemins longs
git config core.longpaths true

# 🔧 Ou utiliser WSL
wsl --install
```

### 🔧 Commandes de Diagnostic

```bash
# 🔍 Vérifier les versions
node --version
npm --version
mongo --version
expo --version

# 🔍 Vérifier les services
curl http://localhost:8000/health
curl http://localhost:3000
curl http://localhost:3001

# 🔍 Vérifier les ports
netstat -tulpn | grep -E ':(3000|3001|8000|27017)'

# 🔍 Vérifier les logs
tail -f apps/swift-delivery-backend/logs/app.log
```

---

## 🚀 Déploiement Production

### Étape 1: Configuration Production Backend

```bash
# 📁 Aller dans le dossier backend
cd apps/swift-delivery-backend

# 🔧 Configuration .env production
NODE_ENV=production
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/swift-delivery
JWT_SECRET=ultra-secure-production-secret-2024
PORT=8000

# 🌐 URLs production
CLIENT_URL=https://swift-delivery-tunisia.com
ADMIN_URL=https://admin.swift-delivery-tunisia.com
```

### Étape 2: Déploiement Backend (Railway)

```bash
# 🚀 Installer Railway CLI
npm install -g @railway/cli

# 🔐 Se connecter à Railway
railway login

# 📦 Créer un nouveau projet
railway init

# 🚀 Déployer
railway up
```

### Étape 3: Déploiement Web Apps (Vercel)

```bash
# 🌐 Customer Web
cd apps/swift-delivery-web
vercel --prod

# 👨‍💼 Admin Dashboard
cd apps/swift-delivery-admin
vercel --prod
```

### Étape 4: Build Applications Mobiles (EAS)

```bash
# 📱 Build Customer App
cd apps/swift-delivery-customer
eas build --platform all

# 📱 Build Restaurant App
cd apps/swift-delivery-restaurant
eas build --platform all

# 📱 Build Rider App
cd apps/swift-delivery-rider
eas build --platform all
```

---

## 📊 Checklist de Validation Finale

### ✅ Backend API
- [ ] MongoDB connecté et fonctionnel
- [ ] GraphQL Playground accessible
- [ ] Health check retourne 200
- [ ] JWT authentication fonctionne
- [ ] Socket.IO events fonctionnent

### ✅ Applications Web
- [ ] Customer Web accessible sur port 3000
- [ ] Admin Dashboard accessible sur port 3001
- [ ] Responsive design fonctionne
- [ ] API calls fonctionnent

### ✅ Applications Mobiles
- [ ] Expo Dev Tools s'ouvre
- [ ] QR codes s'affichent
- [ ] Applications se chargent sur téléphone
- [ ] Navigation fonctionne

### ✅ Base de Données
- [ ] Collections créées automatiquement
- [ ] Données de test insérées
- [ ] Indexes créés
- [ ] Relations fonctionnent

### ✅ Intégration
- [ ] Toutes les applications communiquent
- [ ] Real-time updates fonctionnent
- [ ] Authentication partagée
- [ ] Data flow complet

---

## 🎉 Félicitations !

### 🏆 Système 100% Fonctionnel

```
🇹🇳 SWIFT DELIVERY TUNISIA - INSTALLATION RÉUSSIE
═══════════════════════════════════════════════════════════════════════════

✅ Backend API (Node.js/GraphQL)     → http://localhost:8000
✅ Customer Web (Next.js)            → http://localhost:3000  
✅ Admin Dashboard (Next.js)          → http://localhost:3001
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

### 🚀 Prochaines Étapes

1. **🔧 Configuration Services Externes**
   - Stripe/PayPal pour paiements
   - Cloudinary pour images
   - Firebase pour notifications
   - SendGrid pour emails

2. **📊 Données de Test**
   - Créer des restaurants
   - Ajouter des plats
   - Créer des utilisateurs
   - Tester les commandes

3. **🚀 Déploiement**
   - Backend sur Railway/Heroku
   - Web apps sur Vercel/Netlify
   - Mobile apps via EAS Build

---

## 📞 Support et Contact

### 👨‍💻 Développeur Principal

**Marwen Rabai**  
*Expert Développeur Full-Stack*

- **📧 Email** : marwenrabai6@gmail.com
- **🌐 Website** : [marwen-rabai.netlify.app](https://marwen-rabai.netlify.app)
- **💼 LinkedIn** : [linkedin.com/in/marwen-rabai](https://linkedin.com/in/marwen-rabai)
- **🐱 GitHub** : [github.com/Marwen-Rabai](https://github.com/Marwen-Rabai)

### 📚 Documentation Complète

- **📖 Guides Complets** : [./guides/](./guides/)
- **🔍 Index Documentation** : [./guides/INDEX.md](./guides/INDEX.md)
- **🚀 Démarrage Rapide** : [./guides/QUICK_START.md](./guides/QUICK_START.md)
- **👨‍💼 Guide Admin** : [./guides/ADMIN_MANAGEMENT_GUIDE.md](./guides/ADMIN_MANAGEMENT_GUIDE.md)

---

<div align="center">

**🌟 Swift Delivery Tunisia - Votre Plateforme de Livraison Premium**  
**👨‍💻 Développée avec Excellence par Marwen Rabai**

*🇹🇳 Prête à Dominer les Marchés Tunisien et Algérien !*

</div>
