# VERIFICADOR DE PROYECTO - L'Essence du Luxe
# Ejecuta este script para verificar que todos los archivos necesarios existen

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "   VERIFICADOR DE PROYECTO - L'Essence du Luxe" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""

$total = 0
$found = 0
$missing = @()

Function Test-File {
    param([string]$path, [string]$desc)
    $global:total++
    if (Test-Path $path) {
        Write-Host "[✓] $desc" -ForegroundColor Green
        $global:found++
        return $true
    } else {
        Write-Host "[✗] $desc" -ForegroundColor Red
        $global:missing += $path
        return $false
    }
}

Write-Host "━━━ ARCHIVOS DE CONFIGURACIÓN ━━━" -ForegroundColor Cyan
Test-File "App.js" "Componente raíz"
Test-File "index.js" "Punto de entrada"
Test-File "package.json" "Dependencias"
Test-File "app.json" "Config Expo"
Test-File "babel.config.js" "Config Babel"
Test-File "eas.json" "Config EAS Build"
Test-File ".gitignore" "Git ignore"

Write-Host ""
Write-Host "━━━ CÓDIGO FUENTE ━━━" -ForegroundColor Cyan
Test-File "src/config/theme.js" "Tema visual"
Test-File "src/config/firebase.js" "Firebase config"
Test-File "src/config/constants.js" "Constantes"
Test-File "src/services/AuthService.js" "Servicio Auth"
Test-File "src/services/GeminiService.js" "Servicio IA"
Test-File "src/services/FirestoreService.js" "Servicio BD"
Test-File "src/screens/BibliothequeScreen.js" "Pantalla Bibliothèque"
Test-File "src/screens/CavaScreen.js" "Pantalla Cava"
Test-File "src/components/GlassCard.js" "Componente GlassCard"
Test-File "src/context/AuthContext.js" "Contexto Auth"
Test-File "src/data/protocols.js" "Datos protocolos"

Write-Host ""
Write-Host "━━━ ASSETS (OPCIONAL) ━━━" -ForegroundColor Cyan
$hasIcon = Test-File "assets/icon.png" "Icono principal"
$hasSplash = Test-File "assets/splash.png" "Splash screen"

Write-Host ""
Write-Host "━━━ CREDENCIALES (CRÍTICO) ━━━" -ForegroundColor Cyan
$hasGoogleServices = Test-File "google-services.json" "Firebase credentials"
$hasEnv = Test-File ".env" "Variables de entorno"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host "   RESUMEN" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host ""
Write-Host "Archivos encontrados: $found / $total" -ForegroundColor White

$percentage = [math]::Round(($found / $total) * 100)
if ($percentage -eq 100) {
    Write-Host "Estado: ✅ PROYECTO 100% COMPLETO" -ForegroundColor Green
} elseif ($percentage -ge 80) {
    Write-Host "Estado: ⚠️  CASI LISTO ($percentage%)" -ForegroundColor Yellow
} else {
    Write-Host "Estado: ❌ FALTAN ARCHIVOS CRÍTICOS ($percentage%)" -ForegroundColor Red
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "━━━ ARCHIVOS FALTANTES ━━━" -ForegroundColor Red
    foreach ($file in $missing) {
        Write-Host "  • $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "━━━ RECOMENDACIONES ━━━" -ForegroundColor Cyan

if (-not $hasIcon -or -not $hasSplash) {
    Write-Host "⚠️  Crea los assets: ver assets/README_ASSETS.md" -ForegroundColor Yellow
}

if (-not $hasGoogleServices) {
    Write-Host "❌ CRÍTICO: Descarga google-services.json de Firebase" -ForegroundColor Red
    Write-Host "   → https://console.firebase.google.com" -ForegroundColor Gray
}

if (-not $hasEnv) {
    Write-Host "❌ CRÍTICO: Crea .env (copia de .env.example)" -ForegroundColor Red
    Write-Host "   → cp .env.example .env" -ForegroundColor Gray
}

if ($percentage -ge 80) {
    Write-Host ""
    Write-Host "━━━ SIGUIENTE PASO ━━━" -ForegroundColor Green
    Write-Host "npm install              # Instalar dependencias" -ForegroundColor White
    Write-Host "npx expo prebuild        # Generar carpetas nativas" -ForegroundColor White
    Write-Host "npx expo start --clear   # Probar en desarrollo" -ForegroundColor White
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""
