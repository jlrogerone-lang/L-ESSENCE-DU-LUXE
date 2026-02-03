# 🚀 INICIO RÁPIDO - 3 MINUTOS

## 📋 LO QUE HAS RECIBIDO

✅ **16 archivos de código** listos para producción  
✅ **Script PowerShell automático** (AutoDeploy.ps1)  
✅ **Manual completo** (README.md - 10 secciones)  
✅ **Arquitectura Zero-Config** (Google Sign-In + IA gratis)

---

## ⚡ INSTALAR EN 3 PASOS

### PASO 1: Descarga Node.js
👉 https://nodejs.org (versión LTS)

### PASO 2: Descarga todos los archivos
Colócalos en una carpeta llamada: `LEssenceDuLuxe`

### PASO 3: Ejecuta el script
```powershell
# Abre PowerShell en la carpeta
cd C:\ruta\a\LEssenceDuLuxe

# Ejecuta el script maestro
.\AutoDeploy.ps1

# Selecciona opción 1 (INIT)
```

**¡LISTO!** El script instalará todo automáticamente (3-5 minutos).

---

## 🔑 CONFIGURAR FIREBASE (5 MINUTOS)

### 1. Crear proyecto
👉 https://console.firebase.google.com
- Crea proyecto: `LEssenceDuLuxe`

### 2. Activar servicios
- ✅ Authentication → Método Google
- ✅ Firestore Database

### 3. Descargar archivo
- Descarga `google-services.json`
- Colócalo en la raíz del proyecto

### 4. Copiar credenciales
Desde Firebase Console → Project Settings:
```javascript
// Copia esto en: src/config/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "lessenceduluxe.firebaseapp.com",
  projectId: "lessenceduluxe",
  // ... (te lo da Firebase)
};
```

---

## 🧠 CONFIGURAR GEMINI AI (2 MINUTOS)

### 1. Obtener API Key
👉 https://makersuite.google.com/app/apikey

### 2. Pegar en la app
Abre: `src/config/constants.js`
```javascript
GEMINI_API_KEY: 'AIzaSy...TU_KEY_AQUI',
```

---

## 🎯 PROBAR LA APP

### Opción A: Script (FÁCIL)
```powershell
.\AutoDeploy.ps1
# Selecciona opción 5 (DEV)
```

### Opción B: Manual
```bash
npx expo start --clear
```

Luego:
- **Escanea el QR** con la app "Expo Go" en tu móvil
- O presiona **'a'** para abrir en Android emulator

---

## 📱 ESTRUCTURA DE ARCHIVOS

```
LEssenceDuLuxe/
├── AutoDeploy.ps1        ⭐ SCRIPT MAESTRO
├── App.js                   Navegación principal
├── README.md                Manual completo
├── app.json                 Configuración
├── package.json             Dependencias
│
└── src/
    ├── config/              Tema + Firebase + Constantes
    ├── services/            Auth + IA + Firestore
    ├── screens/             Bibliothèque + Cava
    └── data/                Tus 46 protocolos
```

---

## 🎨 NUEVAS FUNCIONES

### ⭐ BIBLIOTHÈQUE UNIVERSELLE
**Búsqueda en Internet + Auto-Auditoría**

1. Abre la app
2. Ve a la pestaña "Bibliothèque"
3. Busca cualquier perfume (ej: "Baccarat Rouge")
4. Presiona el botón **"AUDITORÍA + AÑADIR"**
5. La IA genera los 6 pilares automáticamente
6. Se añade a tu Cava

### 🏛️ LA CAVA
**Inventario Mejorado**

- 46 protocolos pre-cargados
- Filtros por categoría
- Quality scores
- Detalles al presionar

---

## 💡 SIGUIENTE PASO

Lee el archivo **README.md** para:
- Configuración avanzada
- Compilar APK para Android
- Integrar RevenueCat (suscripciones)
- FAQ y solución de problemas

---

## 📞 COMANDOS ÚTILES

```powershell
# Limpiar caché completamente
npx expo start --clear

# Compilar APK para pruebas
eas build -p android --profile preview

# Ver estructura de carpetas
tree /F
```

---

## ✅ CHECKLIST FINAL

- [ ] Node.js instalado
- [ ] Ejecutado AutoDeploy.ps1 → Opción 1
- [ ] Firebase configurado (google-services.json)
- [ ] Gemini API Key configurada
- [ ] App ejecutándose en Expo Go

**¡Si marcaste todo, estás listo para desarrollar!** 🎉

---

**Dudas?** → Lee el `README.md` (Sección 9: FAQ)
