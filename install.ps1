# 🇹🇳 Swift Delivery Tunisia - Installation Script Ultra-Professional
# Developed by Marwen Rabai - https://marwen-rabai.netlify.app

Write-Host "🇹🇳 Swift Delivery Tunisia - Installation Starting..." -ForegroundColor Green
Write-Host "👨‍💻 Developed by Marwen Rabai - https://marwen-rabai.netlify.app" -ForegroundColor Cyan

# Enable long paths on Windows
Write-Host "⚙️ Configuring Windows for long paths..." -ForegroundColor Yellow
git config --global core.longpaths true

# Install backend first (most important)
Write-Host "🔧 Installing Backend API..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-backend"
npm install --legacy-peer-deps --no-optional --no-audit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
}
Set-Location "..\..\"

# Install web applications
Write-Host "🌐 Installing Web Application..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-web"
npm install --legacy-peer-deps --no-optional --no-audit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Web app installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Web app installation failed" -ForegroundColor Red
}
Set-Location "..\..\"

Write-Host "👨‍💼 Installing Admin Dashboard..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-admin"
npm install --legacy-peer-deps --no-optional --no-audit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Admin dashboard installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Admin dashboard installation failed" -ForegroundColor Red
}
Set-Location "..\..\"

# Install mobile applications (separately to avoid React conflicts)
Write-Host "📱 Installing Mobile Applications..." -ForegroundColor Yellow

Write-Host "🛒 Installing Customer Mobile App..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-customer"
npm install --legacy-peer-deps --no-optional --no-audit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Customer app installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Customer app installation failed" -ForegroundColor Red
}
Set-Location "..\..\"

Write-Host "🏪 Installing Restaurant Mobile App..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-restaurant"
npm install --legacy-peer-deps --no-optional --no-audit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Restaurant app installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Restaurant app installation failed" -ForegroundColor Red
}
Set-Location "..\..\"

Write-Host "🏍️ Installing Rider Mobile App..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-rider"
npm install --legacy-peer-deps --no-optional --no-audit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Rider app installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Rider app installation failed" -ForegroundColor Red
}
Set-Location "..\..\"

# Test backend
Write-Host "🧪 Testing Backend..." -ForegroundColor Yellow
Set-Location "apps\swift-delivery-backend"
$backendTest = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}
Start-Sleep 5
if (Get-Job $backendTest | Where-Object {$_.State -eq "Running"}) {
    Write-Host "✅ Backend is running successfully!" -ForegroundColor Green
    Stop-Job $backendTest
    Remove-Job $backendTest
} else {
    Write-Host "❌ Backend failed to start" -ForegroundColor Red
}
Set-Location "..\..\"

Write-Host "🎉 Installation Complete!" -ForegroundColor Green
Write-Host "🚀 Quick Start Commands:" -ForegroundColor Cyan
Write-Host "  Backend:    cd apps/swift-delivery-backend && npm run dev" -ForegroundColor White
Write-Host "  Web:        cd apps/swift-delivery-web && npm run dev" -ForegroundColor White
Write-Host "  Admin:      cd apps/swift-delivery-admin && npm run dev" -ForegroundColor White
Write-Host "  Customer:   cd apps/swift-delivery-customer && npm start" -ForegroundColor White
Write-Host "  Restaurant: cd apps/swift-delivery-restaurant && npm start" -ForegroundColor White
Write-Host "  Rider:      cd apps/swift-delivery-rider && npm start" -ForegroundColor White
Write-Host "👨‍💻 Developed by Marwen Rabai - https://marwen-rabai.netlify.app" -ForegroundColor Cyan
