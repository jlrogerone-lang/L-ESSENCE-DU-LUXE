# 🏛️ L'ESSENCE DU LUXE - Manual del Arquitecto

**La Perfumería del Futuro**: Arte Olfativo Democratizado mediante Inteligencia Artificial.

Versión: **2.0.0 (Arquitectura de Producción)**  
Plataforma: **React Native (Expo SDK 52+)**  
Estrategia: **Zero-Config + Coste Cero**

---

## 📑 TABLA DE CONTENIDOS

1. [Requisitos del Sistema](#requisitos)
2. [Instalación Rápida](#instalación-rápida)
3. [Configuración Firebase (Zero-Config)](#configuración-firebase)
4. [Configuración Gemini AI](#configuración-gemini-ai)
5. [Monetización (RevenueCat)](#monetización)
6. [Desarrollo](#desarrollo)
7. [Compilación para Producción](#compilación)
8. [Estructura del Proyecto](#estructura)
9. [FAQ](#faq)

---

<a name="requisitos"></a>
## 🔧 1. REQUISITOS DEL SISTEMA

### Obligatorios
- **Node.js**: v18.0.0 o superior ([Descargar](https://nodejs.org))
- **npm**: v9.0.0 o superior (incluido con Node.js)
- **Sistema Operativo**: Windows 10/11, macOS 12+, o Linux

### Recomendados
- **Git**: Para control de versiones
- **Android Studio**: Para probar en emulador Android
- **Expo Go App**: Para pruebas en dispositivo real

### Cuentas Necesarias (GRATUITAS)
- [ ] Google Account (para Firebase)
- [ ] Google Cloud Account (para Gemini AI)
- [ ] Expo Account (para builds)
- [ ] RevenueCat Account (opcional, para suscripciones)

---

<a name="instalación-rápida"></a>
## 🚀 2. INSTALACIÓN RÁPIDA

### Opción A: Script Automático (RECOMENDADO)

1. **Descarga el proyecto** y navega a la carpeta:
   ```powershell
   cd /ruta/a/LEssenceDuLuxe
   ```

2. **Ejecuta el script maestro**:
   ```powershell
   .\AutoDeploy.ps1
   ```

3. **Selecciona la opción 1** (INIT) para inicializar todo automáticamente.

### Opción B: Manual

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Crear estructura de carpetas**:
   ```bash
   mkdir -p assets/fonts src/components src/config src/context src/data src/navigation src/screens src/services src/utils .vscode
   ```

3. **Iniciar desarrollo**:
   ```bash
   npx expo start --clear
   ```

---

<a name="configuración-firebase"></a>
## 🔥 3. CONFIGURACIÓN FIREBASE (EL TRUCO DEL COSTE CERO)

Firebase es el corazón de la estrategia "Zero-Config". El usuario se autentica con Google y **usa SU PROPIA cuota gratuita** para IA y datos.

### Paso 1: Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Clic en **"Crear un proyecto"**
3. Nombre: `LEssenceDuLuxe`
4. Desactiva Google Analytics (opcional)
5. Clic en **"Crear proyecto"**

### Paso 2: Activar Authentication

1. En el menú lateral: **Build > Authentication**
2. Clic en **"Comenzar"**
3. Activa el método **"Google"**:
   - Habilita el toggle
   - Nombre público del proyecto: `L'Essence du Luxe`
   - Correo de soporte: tu email
   - Guardar

### Paso 3: Activar Firestore Database

1. En el menú lateral: **Build > Firestore Database**
2. Clic en **"Crear base de datos"**
3. Modo: **Producción** (configuraremos reglas después)
4. Ubicación: Selecciona la más cercana (ej: `europe-west`)
5. Clic en **"Habilitar"**

### Paso 4: Configurar tu App

1. En **Project Settings** (⚙️ arriba a la izquierda)
2. Sección **"Tus apps"** → Clic en el ícono **Android** `</>`
3. Registra tu app:
   - Nombre del paquete: `com.yourcompany.lessenceduluxe`
   - Alias: `L'Essence du Luxe`
4. **Descarga `google-services.json`**
5. **Colócalo en la raíz** del proyecto

### Paso 5: Copiar Credenciales Web

1. En **Project Settings** → pestaña **"General"**
2. En **"Tus apps"**, sección **"SDK de Firebase para la Web"**
3. Copia la configuración:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "lessenceduluxe.firebaseapp.com",
     projectId: "lessenceduluxe",
     storageBucket: "lessenceduluxe.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

4. **Pega esta configuración** en `src/config/firebase.js`

### Paso 6: Obtener Web Client ID (para Google Sign-In)

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona el proyecto de Firebase
3. **APIs & Services** → **Credentials**
4. Busca el **"Web client"** (tipo OAuth 2.0)
5. Copia el **Client ID** (termina en `.apps.googleusercontent.com`)
6. Pega en `src/services/AuthService.js`:
   ```javascript
   const GOOGLE_WEB_CLIENT_ID = 'TU_CLIENT_ID.apps.googleusercontent.com';
   ```

---

<a name="configuración-gemini-ai"></a>
## 🧠 4. CONFIGURACIÓN GEMINI AI (Auditorías de 6 Pilares)

Gemini es la IA que ejecuta las auditorías automáticas. Usamos la **API REST gratuita**.

### Paso 1: Obtener API Key

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta Google
3. Clic en **"Crear clave de API"**
4. Selecciona tu proyecto de Google Cloud (el de Firebase)
5. Copia la clave

### Paso 2: Configurar en la App

1. Abre `src/config/constants.js`
2. Reemplaza la línea:
   ```javascript
   GEMINI_API_KEY: 'TU_GEMINI_API_KEY_AQUI',
   ```

### Límites de la Capa Gratuita

| Límite | Valor |
|--------|-------|
| Peticiones por día | 1,500 |
| Tokens por petición | 32,000 |
| Peticiones por minuto | 60 |

✅ **Suficiente para uso personal ilimitado**

---

<a name="monetización"></a>
## 💰 5. MONETIZACIÓN (RevenueCat)

RevenueCat gestiona suscripciones sin necesidad de backend propio.

### Paso 1: Crear Cuenta

1. Ve a [RevenueCat](https://www.revenuecat.com/)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto: `L'Essence du Luxe`

### Paso 2: Configurar Productos

1. En **Products**, crea:
   - `alquimista_monthly` - 4.99€/mes
   - `maestro_yearly` - 39.99€/año

2. Configura **Entitlements**:
   - `pro_access` (para Alquimista)
   - `elite_access` (para Maestro)

### Paso 3: Integrar en la App

1. Copia tu **Public SDK Key** desde RevenueCat
2. Pega en `src/config/constants.js`:
   ```javascript
   REVENUECAT_API_KEY: 'TU_REVENUECAT_KEY_AQUI',
   ```

---

<a name="desarrollo"></a>
## 💻 6. DESARROLLO

### Iniciar el Servidor

```bash
npx expo start --clear
```

Esto abrirá el **Metro Bundler**. Opciones:

- **Presiona `a`**: Abrir en Android (emulador o físico)
- **Escanea el QR**: Con la app Expo Go en tu móvil
- **Presiona `w`**: Abrir en navegador web (preview)

### Comandos Útiles

```bash
# Limpiar caché completamente
npx expo start --clear

# Ver logs de Android
npx react-native log-android

# Reiniciar servidor
Presiona 'r' en la terminal de Metro
```

### Estructura de Archivos (Recordatorio)

```
src/
├── config/       # Tema, Firebase, Constantes
├── services/     # AuthService, GeminiService, FirestoreService
├── screens/      # BibliothequeScreen, CavaScreen, etc.
├── components/   # Componentes reutilizables
├── data/         # Protocolos iniciales
└── utils/        # Helpers y formatters
```

---

<a name="compilación"></a>
## 🏭 7. COMPILACIÓN PARA PRODUCCIÓN

### Prerrequisitos

1. **Instalar EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login en Expo**:
   ```bash
   eas login
   ```

### Configurar EAS Build

1. **Inicializar configuración**:
   ```bash
   eas build:configure
   ```

2. Esto crea `eas.json`. Edítalo:
   ```json
   {
     "build": {
       "preview": {
         "android": {
           "buildType": "apk"
         }
       },
       "production": {
         "android": {
           "buildType": "app-bundle"
         }
       }
     }
   }
   ```

### Compilar APK (Para Pruebas)

```bash
eas build -p android --profile preview
```

### Compilar AAB (Para Google Play)

```bash
eas build -p android --profile production
```

El proceso tarda ~10-15 minutos. Al finalizar, recibirás un link para descargar el archivo.

---

<a name="estructura"></a>
## 📂 8. ESTRUCTURA DEL PROYECTO

```
LEssenceDuLuxe/
│
├── 📜 AutoDeploy.ps1        # Script maestro DevOps
├── 📜 App.js                 # Punto de entrada
├── 📜 app.json               # Configuración Expo
├── 📜 package.json           # Dependencias
├── 📜 babel.config.js        # Babel + Reanimated
├── 📜 google-services.json   # Firebase (NO SUBIR A GIT)
│
├── 📁 assets/
│   ├── fonts/                # Cinzel, Playfair Display
│   └── icon.png              # Ícono de la app
│
└── 📁 src/
    ├── 📁 config/
    │   ├── theme.js          # Colores, fuentes, espaciado
    │   ├── firebase.js       # Inicialización Firebase
    │   └── constants.js      # API Keys, URLs
    │
    ├── 📁 services/
    │   ├── AuthService.js    # Google Sign-In
    │   ├── GeminiService.js  # IA (6 Pilares, Génesis)
    │   └── FirestoreService.js  # Persistencia
    │
    ├── 📁 screens/
    │   ├── BibliothequeScreen.js  # Búsqueda Universal
    │   └── CavaScreen.js          # Inventario
    │
    ├── 📁 data/
    │   └── protocols.js       # 200+ protocolos iniciales
    │
    └── 📁 components/         # UI reutilizable
```

---

<a name="faq"></a>
## ❓ 9. FAQ

### ¿Por qué no compila en Android?

**Solución**:
```bash
cd android
./gradlew clean
cd ..
npx expo prebuild
npx expo start --clear
```

### ¿Cómo actualizo las dependencias?

```bash
npx expo install --fix
```

### ¿Dónde guardo las API Keys de forma segura?

Las claves están en `src/config/constants.js`. **NO subas este archivo a GitHub**. Añade a `.gitignore`:
```
src/config/constants.js
google-services.json
```

### ¿La app funciona sin internet?

Parcialmente. La **Cava** funciona offline con datos locales. La **Bibliothèque** requiere internet para búsquedas.

### ¿Cuánto cuesta mantener la app?

| Servicio | Coste |
|----------|-------|
| Firebase (Auth + Firestore) | **GRATIS** (hasta 50K usuarios) |
| Gemini AI | **GRATIS** (1,500 requests/día) |
| Expo Build | **GRATIS** |
| RevenueCat | **GRATIS** (hasta $10K MRR) |
| **TOTAL** | **0€** |

---

## 📞 SOPORTE

- **Issues**: Abre un issue en GitHub
- **Documentación**: [docs.expo.dev](https://docs.expo.dev)
- **Firebase**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

## 📜 LICENCIA

Proyecto privado. Todos los derechos reservados.

**Creado por**: Master Alchemist  
**Arquitectura**: Senior Principal Architect  
**Versión**: 2.0.0 - Production Ready

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Ejecutar `.\AutoDeploy.ps1` → Opción 1 (INIT)
2. ✅ Configurar Firebase
3. ✅ Obtener Gemini API Key
4. ✅ Probar en Expo Go
5. ✅ Compilar APK para producción

**¡Bienvenido a la revolución olfativa!** 🌟
