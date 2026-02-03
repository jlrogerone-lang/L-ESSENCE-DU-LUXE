<#
.SYNOPSIS
    AutoDeploy - L'Essence du Luxe
    Script de Orquestación DevOps para React Native/Expo
    
.DESCRIPTION
    Automatiza completamente el ciclo de desarrollo:
    - Verificación de requisitos del sistema
    - Instalación de dependencias
    - Gestión de caché
    - Compilación para producción
    - Estructura de carpetas automática
    
.AUTHOR
    Senior Principal Architect - 2026 Edition
    
.NOTES
    Compatible con: Windows 10/11, PowerShell 5.1+
#>

# =====================================================
# CONFIGURACIÓN GLOBAL
# =====================================================
$AppName = "LEssenceDuLuxe"
$ProjectPath = $PSScriptRoot
$ColorGold = "Yellow"
$ColorGreen = "Green"
$ColorRed = "Red"
$ColorCyan = "Cyan"
$ColorWhite = "White"

# =====================================================
# FUNCIONES DE UI
# =====================================================
Function Print-Logo {
    Clear-Host
    Write-Host ""
    Write-Host "   ╔══════════════════════════════════════════════════╗" -ForegroundColor $ColorGold
    Write-Host "   ║                                                  ║" -ForegroundColor $ColorGold
    Write-Host "   ║      L ' E S S E N C E   D U   L U X E          ║" -ForegroundColor $ColorGold
    Write-Host "   ║                                                  ║" -ForegroundColor $ColorGold
    Write-Host "   ║         Master DevOps Orchestrator v2.0          ║" -ForegroundColor $ColorGold
    Write-Host "   ║              Architecture Edition                ║" -ForegroundColor $ColorGold
    Write-Host "   ║                                                  ║" -ForegroundColor $ColorGold
    Write-Host "   ╚══════════════════════════════════════════════════╝" -ForegroundColor $ColorGold
    Write-Host ""
}

Function Print-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $ColorGold
    Write-Host "  $Title" -ForegroundColor $ColorWhite
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $ColorGold
}

Function Print-Success {
    param([string]$Message)
    Write-Host "[✓] $Message" -ForegroundColor $ColorGreen
}

Function Print-Error {
    param([string]$Message)
    Write-Host "[✗] $Message" -ForegroundColor $ColorRed
}

Function Print-Info {
    param([string]$Message)
    Write-Host "[→] $Message" -ForegroundColor $ColorCyan
}

# =====================================================
# VERIFICACIÓN DEL SISTEMA
# =====================================================
Function Check-Requirements {
    Print-Section "Verificando Requisitos del Sistema"
    
    $allOk = $true
    
    # Node.js
    Print-Info "Verificando Node.js..."
    if (Get-Command node -ErrorAction SilentlyContinue) {
        $nodeVersion = node --version
        Print-Success "Node.js $nodeVersion detectado"
    } else {
        Print-Error "Node.js no instalado. Descarga desde: https://nodejs.org"
        $allOk = $false
    }
    
    # npm
    Print-Info "Verificando npm..."
    if (Get-Command npm -ErrorAction SilentlyContinue) {
        $npmVersion = npm --version
        Print-Success "npm $npmVersion detectado"
    } else {
        Print-Error "npm no detectado"
        $allOk = $false
    }
    
    # Git (opcional pero recomendado)
    Print-Info "Verificando Git..."
    if (Get-Command git -ErrorAction SilentlyContinue) {
        $gitVersion = git --version
        Print-Success "$gitVersion detectado"
    } else {
        Write-Host "[!] Git no detectado (opcional)" -ForegroundColor Yellow
    }
    
    return $allOk
}

# =====================================================
# ESTRUCTURA DE CARPETAS
# =====================================================
Function Create-ProjectStructure {
    Print-Section "Creando Estructura de Carpetas"
    
    $folders = @(
        "assets/fonts",
        "src/components",
        "src/config",
        "src/context",
        "src/data",
        "src/navigation",
        "src/screens",
        "src/services",
        "src/utils",
        ".vscode"
    )
    
    foreach ($folder in $folders) {
        $fullPath = Join-Path $ProjectPath $folder
        if (-not (Test-Path $fullPath)) {
            New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
            Print-Success "Creado: $folder"
        } else {
            Print-Info "Existe: $folder"
        }
    }
}

# =====================================================
# INSTALACIÓN DE DEPENDENCIAS
# =====================================================
Function Install-Dependencies {
    Print-Section "Instalando Dependencias de Lujo"
    
    Print-Info "Este proceso puede tardar 3-5 minutos..."
    Write-Host ""
    
    # Core Expo
    Print-Info "→ Instalando Expo Core..."
    npm install expo@latest react@18.2.0 react-native@0.74.5 --save
    
    Print-Info "→ Instalando Expo Plugins..."
    npm install expo-status-bar expo-haptics expo-blur expo-linear-gradient expo-font expo-splash-screen --save
    
    # Navegación
    Print-Info "→ Instalando React Navigation..."
    npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack --save
    npm install react-native-safe-area-context react-native-screens react-native-gesture-handler --save
    
    # UI & Animación
    Print-Info "→ Instalando UI Libraries..."
    npm install react-native-reanimated@3.10.1 lucide-react-native --save
    
    # Firebase & Backend
    Print-Info "→ Instalando Firebase SDK..."
    npm install firebase @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore --save
    npm install @react-native-google-signin/google-signin --save
    
    # Monetización
    Print-Info "→ Instalando RevenueCat..."
    npm install react-native-purchases --save
    
    # Desarrollo
    Print-Info "→ Instalando Dev Dependencies..."
    npm install --save-dev @babel/core metro-react-native-babel-preset
    
    Write-Host ""
    Print-Success "Todas las dependencias instaladas correctamente"
}

# =====================================================
# LIMPIEZA DE CACHÉ
# =====================================================
Function Clean-Cache {
    Print-Section "Limpiando Caché del Proyecto"
    
    Print-Info "Eliminando node_modules..."
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
        Print-Success "node_modules eliminado"
    }
    
    Print-Info "Eliminando package-lock.json..."
    if (Test-Path "package-lock.json") {
        Remove-Item -Force "package-lock.json"
        Print-Success "package-lock.json eliminado"
    }
    
    Print-Info "Limpiando caché de Metro Bundler..."
    npx expo start --clear
}

# =====================================================
# DESARROLLO
# =====================================================
Function Start-Development {
    Print-Section "Iniciando Servidor de Desarrollo"
    
    Print-Info "Limpiando caché de Metro..."
    Print-Info "El servidor estará disponible en http://localhost:8081"
    Print-Info "Escanea el QR con Expo Go o presiona 'a' para Android"
    Write-Host ""
    
    npx expo start --clear
}

# =====================================================
# COMPILACIÓN
# =====================================================
Function Build-Android {
    Print-Section "Compilando para Android (AAB/APK)"
    
    Print-Info "Verificando configuración de EAS Build..."
    
    if (-not (Test-Path "eas.json")) {
        Print-Info "Creando eas.json..."
        npx eas build:configure
    }
    
    Write-Host ""
    Write-Host "Selecciona el tipo de build:" -ForegroundColor $ColorWhite
    Write-Host "1. APK (Para pruebas locales)" -ForegroundColor Cyan
    Write-Host "2. AAB (Para Google Play Store)" -ForegroundColor Cyan
    Write-Host "3. Cancelar" -ForegroundColor Gray
    
    $buildChoice = Read-Host "Opción"
    
    switch ($buildChoice) {
        "1" { 
            Print-Info "Compilando APK..."
            npx eas build -p android --profile preview 
        }
        "2" { 
            Print-Info "Compilando AAB para producción..."
            npx eas build -p android --profile production 
        }
        "3" { 
            Print-Info "Build cancelado"
            return 
        }
    }
}

# =====================================================
# CONFIGURACIÓN FIREBASE
# =====================================================
Function Setup-Firebase {
    Print-Section "Asistente de Configuración Firebase"
    
    Write-Host ""
    Write-Host "Para configurar Firebase necesitas:" -ForegroundColor Yellow
    Write-Host "1. Crear un proyecto en https://console.firebase.google.com" -ForegroundColor White
    Write-Host "2. Activar Authentication (Google Sign-In)" -ForegroundColor White
    Write-Host "3. Activar Firestore Database" -ForegroundColor White
    Write-Host "4. Activar Vertex AI in Firebase" -ForegroundColor White
    Write-Host "5. Descargar google-services.json (Android)" -ForegroundColor White
    Write-Host ""
    
    $continue = Read-Host "¿Ya tienes google-services.json? (S/N)"
    
    if ($continue -eq "S" -or $continue -eq "s") {
        Print-Info "Coloca google-services.json en la raíz del proyecto"
        Print-Info "Luego ejecuta: npx expo prebuild"
    } else {
        Print-Info "Visita: https://console.firebase.google.com"
        Start-Process "https://console.firebase.google.com"
    }
}

# =====================================================
# MENÚ PRINCIPAL
# =====================================================
Function Show-Menu {
    Print-Logo
    
    Write-Host "┌────────────────────────────────────────────────┐" -ForegroundColor $ColorGold
    Write-Host "│              MENÚ PRINCIPAL                    │" -ForegroundColor $ColorGold
    Write-Host "└────────────────────────────────────────────────┘" -ForegroundColor $ColorGold
    Write-Host ""
    Write-Host "  [1] 🚀 INIT        - Inicializar Proyecto Completo" -ForegroundColor Cyan
    Write-Host "  [2] 📦 INSTALL     - Instalar Dependencias" -ForegroundColor Cyan
    Write-Host "  [3] 🏗️  STRUCTURE   - Crear Estructura de Carpetas" -ForegroundColor Cyan
    Write-Host "  [4] 🔥 FIREBASE    - Configurar Firebase" -ForegroundColor Cyan
    Write-Host "  [5] 💻 DEV         - Iniciar Desarrollo" -ForegroundColor $ColorGreen
    Write-Host "  [6] 🏭 BUILD       - Compilar para Android" -ForegroundColor Yellow
    Write-Host "  [7] 🧹 CLEAN       - Limpiar Caché Total" -ForegroundColor Yellow
    Write-Host "  [8] ℹ️  INFO        - Información del Sistema" -ForegroundColor Gray
    Write-Host "  [X] 🚪 EXIT        - Salir" -ForegroundColor $ColorRed
    Write-Host ""
}

# =====================================================
# INICIO DEL SCRIPT
# =====================================================
if (-not (Check-Requirements)) {
    Write-Host ""
    Print-Error "Instala los requisitos faltantes antes de continuar"
    Write-Host ""
    pause
    exit
}

do {
    Show-Menu
    $choice = Read-Host "Selecciona una opción"
    
    switch ($choice) {
        "1" { 
            Create-ProjectStructure
            Install-Dependencies
            Write-Host ""
            Print-Success "¡Proyecto inicializado! Ahora configura Firebase (opción 4)"
            pause
        }
        "2" { 
            Install-Dependencies
            pause
        }
        "3" { 
            Create-ProjectStructure
            pause
        }
        "4" { 
            Setup-Firebase
            pause
        }
        "5" { 
            Start-Development
        }
        "6" { 
            Build-Android
            pause
        }
        "7" { 
            Clean-Cache
            pause
        }
        "8" { 
            Check-Requirements
            pause
        }
        "X" { 
            Print-Info "Gracias por usar L'Essence du Luxe"
            exit 
        }
        "x" { 
            Print-Info "Gracias por usar L'Essence du Luxe"
            exit 
        }
        default { 
            Print-Error "Opción no válida"
            Start-Sleep -Seconds 1
        }
    }
} while ($true)
