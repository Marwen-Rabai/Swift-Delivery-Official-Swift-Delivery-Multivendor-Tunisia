# 🇹🇳 Swift Delivery Tunisia - Script de Démarrage Automatique
# Developed by Marwen Rabai - https://marwen-rabai.netlify.app

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("all", "backend", "web", "admin", "mobile")]
    [string]$Mode = "all"
)

Write-Host "🇹🇳 Swift Delivery Tunisia - Démarrage Automatique" -ForegroundColor Green
Write-Host "👨‍💻 Developed by Marwen Rabai - https://marwen-rabai.netlify.app" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Yellow

function Start-Backend {
    Write-Host "⚙️ Démarrage Backend API..." -ForegroundColor Yellow
    
    # Vérifier si le port 8000 est libre
    $portInUse = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Host "⚠️ Port 8000 déjà utilisé - Backend probablement actif" -ForegroundColor Yellow
    } else {
        Set-Location "apps\swift-delivery-backend"
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server-minimal.js"
        Set-Location "..\..\"
        Start-Sleep 3
        Write-Host "✅ Backend démarré sur http://localhost:8000" -ForegroundColor Green
    }
}

function Start-WebApps {
    Write-Host "🌐 Démarrage Applications Web..." -ForegroundColor Yellow
    
    # Customer Web App
    Write-Host "🛒 Démarrage Customer Web App..." -ForegroundColor Cyan
    Set-Location "apps\swift-delivery-web"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    Set-Location "..\..\"
    
    # Admin Dashboard
    Write-Host "👨‍💼 Démarrage Admin Dashboard..." -ForegroundColor Cyan
    Set-Location "apps\swift-delivery-admin"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    Set-Location "..\..\"
    
    Start-Sleep 5
    Write-Host "✅ Applications Web démarrées:" -ForegroundColor Green
    Write-Host "   🌐 Customer: http://localhost:3000" -ForegroundColor White
    Write-Host "   👨‍💼 Admin: http://localhost:3001" -ForegroundColor White
}

function Start-MobileApps {
    Write-Host "📱 Démarrage Applications Mobiles..." -ForegroundColor Yellow
    
    # Customer Mobile
    Write-Host "🛒 Customer Mobile App..." -ForegroundColor Cyan
    Set-Location "apps\swift-delivery-customer"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
    Set-Location "..\..\"
    
    # Restaurant Mobile
    Write-Host "🏪 Restaurant Mobile App..." -ForegroundColor Cyan
    Set-Location "apps\swift-delivery-restaurant"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
    Set-Location "..\..\"
    
    # Rider Mobile
    Write-Host "🏍️ Rider Mobile App..." -ForegroundColor Cyan
    Set-Location "apps\swift-delivery-rider"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
    Set-Location "..\..\"
    
    Write-Host "✅ Applications Mobiles démarrées (Expo Dev Tools)" -ForegroundColor Green
}

function Test-System {
    Write-Host "🧪 Test du Système..." -ForegroundColor Yellow
    
    Start-Sleep 10  # Attendre que les services démarrent
    
    # Test Backend
    try {
        $backendResponse = Invoke-WebRequest -Uri "http://localhost:8000/health" -UseBasicParsing -TimeoutSec 5
        if ($backendResponse.StatusCode -eq 200) {
            Write-Host "✅ Backend API: FONCTIONNEL" -ForegroundColor Green
        }
    } catch {
        Write-Host "❌ Backend API: NON ACCESSIBLE" -ForegroundColor Red
    }
    
    # Test Web Apps
    try {
        $webResponse = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
        Write-Host "✅ Customer Web: FONCTIONNEL" -ForegroundColor Green
    } catch {
        Write-Host "⏳ Customer Web: EN COURS DE DÉMARRAGE..." -ForegroundColor Yellow
    }
    
    try {
        $adminResponse = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 10
        Write-Host "✅ Admin Dashboard: FONCTIONNEL" -ForegroundColor Green
    } catch {
        Write-Host "⏳ Admin Dashboard: EN COURS DE DÉMARRAGE..." -ForegroundColor Yellow
    }
}

function Show-Summary {
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Yellow
    Write-Host "📊 SWIFT DELIVERY TUNISIA - RÉSUMÉ DÉMARRAGE" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Yellow
    
    Write-Host "🔗 URLS APPLICATIONS:" -ForegroundColor White
    Write-Host "   ⚙️ Backend API:        http://localhost:8000" -ForegroundColor Green
    Write-Host "   🌐 Customer Web:       http://localhost:3000" -ForegroundColor Green
    Write-Host "   👨‍💼 Admin Dashboard:   http://localhost:3001" -ForegroundColor Green
    Write-Host "   📱 Mobile Apps:        Expo Dev Tools" -ForegroundColor Green
    
    Write-Host "" 
    Write-Host "🧪 TESTS RAPIDES:" -ForegroundColor White
    Write-Host "   curl http://localhost:8000/health" -ForegroundColor Gray
    Write-Host "   curl http://localhost:8000/api/info" -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "📚 DOCUMENTATION:" -ForegroundColor White
    Write-Host "   📖 README.md - Vue d'ensemble" -ForegroundColor Gray
    Write-Host "   🚀 QUICK_START.md - Démarrage rapide" -ForegroundColor Gray
    Write-Host "   📚 COMPLETE_USAGE_GUIDE.md - Guide complet" -ForegroundColor Gray
    Write-Host "   👨‍💼 ADMIN_MANAGEMENT_GUIDE.md - Guide admin" -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "👨‍💻 DÉVELOPPEUR: Marwen Rabai" -ForegroundColor Cyan
    Write-Host "🌐 WEBSITE: https://marwen-rabai.netlify.app" -ForegroundColor Cyan
    Write-Host "📧 EMAIL: marwenrabai6@gmail.com" -ForegroundColor Cyan
    
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Yellow
    Write-Host "🎉 SWIFT DELIVERY TUNISIA PRÊT POUR PRODUCTION!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Yellow
}

# Exécution selon le mode choisi
switch ($Mode) {
    "backend" {
        Start-Backend
        Test-System
    }
    "web" {
        Start-Backend
        Start-WebApps
        Test-System
    }
    "admin" {
        Start-Backend
        Set-Location "apps\swift-delivery-admin"
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
        Set-Location "..\..\"
        Test-System
    }
    "mobile" {
        Start-MobileApps
    }
    "all" {
        Start-Backend
        Start-WebApps
        # Start-MobileApps  # Optionnel
        Test-System
        Show-Summary
    }
}

Write-Host "🎯 Démarrage terminé! Mode: $Mode" -ForegroundColor Green
