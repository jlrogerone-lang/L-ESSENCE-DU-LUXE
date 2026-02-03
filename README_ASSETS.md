# 🎨 ASSETS - INSTRUCCIONES DE GENERACIÓN

## 📋 ARCHIVOS REQUERIDOS

Para que la app compile correctamente, necesitas estos archivos en la carpeta `assets/`:

```
assets/
├── icon.png              (1024x1024 px)
├── splash.png            (1284x2778 px)
├── adaptive-icon.png     (1024x1024 px)
└── favicon.png           (48x48 px)
```

---

## 🎨 ESPECIFICACIONES DE DISEÑO

### 1. icon.png (Icono de la App)
- **Tamaño**: 1024x1024 px
- **Formato**: PNG con transparencia
- **Diseño sugerido**:
  - Fondo: Negro (#050505) con gradiente sutil
  - Símbolo: Frasco de perfume dorado (#D4AF37) minimalista
  - Texto: "LE" o "L'E" en tipografía serif elegante

### 2. splash.png (Pantalla de Carga)
- **Tamaño**: 1284x2778 px (iPhone 13 Pro Max)
- **Formato**: PNG
- **Diseño sugerido**:
  - Fondo: Negro puro (#050505)
  - Centro: Logo dorado de la app
  - Abajo: "L'Essence du Luxe" en letra serif

### 3. adaptive-icon.png (Android)
- **Tamaño**: 1024x1024 px
- **Formato**: PNG con transparencia
- **Diseño**: Igual que icon.png pero con 20% de margen

### 4. favicon.png (Web)
- **Tamaño**: 48x48 px
- **Formato**: PNG
- **Diseño**: Versión simplificada del icon.png

---

## 🚀 MÉTODO RÁPIDO: GENERAR AUTOMÁTICAMENTE

### Opción A: Usar Expo Asset Generator (RECOMENDADO)

1. Crea solo el **icon.png** (1024x1024 px)
2. Colócalo en `assets/icon.png`
3. Ejecuta:
   ```bash
   npx expo-asset-utils generate
   ```
4. Esto genera automáticamente todos los demás archivos

### Opción B: Diseñar Manualmente

Usa herramientas como:
- **Figma**: [figma.com](https://figma.com)
- **Canva**: [canva.com](https://canva.com)
- **Adobe Express**: [express.adobe.com](https://express.adobe.com)

**Plantilla sugerida para Canva**:
```
1. Crear diseño personalizado: 1024x1024
2. Fondo: Negro (#050505)
3. Añadir elemento: Frasco de perfume (buscar en elementos)
4. Color del frasco: Dorado (#D4AF37)
5. Añadir texto: "LE" en tipografía Playfair Display
6. Descargar como PNG
```

---

## 📦 ARCHIVOS PLACEHOLDER TEMPORALES

Mientras creas los diseños finales, puedes usar estos placeholders:

### Para compilar sin errores:
```bash
# Crear assets temporales (1x1 px negro)
mkdir -p assets
cd assets

# En Linux/Mac:
convert -size 1024x1024 xc:black icon.png
convert -size 1284x2778 xc:black splash.png
convert -size 1024x1024 xc:black adaptive-icon.png
convert -size 48x48 xc:black favicon.png

# En Windows (con ImageMagick):
magick -size 1024x1024 xc:black icon.png
magick -size 1284x2778 xc:black splash.png
magick -size 1024x1024 xc:black adaptive-icon.png
magick -size 48x48 xc:black favicon.png
```

**O descarga placeholders aquí**:
- https://via.placeholder.com/1024x1024/050505/D4AF37?text=LE
- Guarda como `icon.png`

---

## ✅ VERIFICACIÓN

Después de crear los archivos:

```bash
# Verificar que existan
ls -lh assets/

# Deberías ver:
# icon.png         ~50KB
# splash.png       ~100KB
# adaptive-icon.png ~50KB
# favicon.png      ~2KB
```

---

## 🎯 SIGUIENTE PASO

Una vez tengas los assets:

```bash
# Ejecutar prebuild para generar carpetas nativas
npx expo prebuild

# Iniciar desarrollo
npx expo start
```

**¡Listo para compilar!** 🚀
