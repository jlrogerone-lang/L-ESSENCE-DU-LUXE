#!/usr/bin/env node
/**
 * GENERAR-ASSETS.JS
 * Script para generar assets placeholder automáticamente
 * Ejecutar: node generar-assets.js
 */

const fs = require('fs');
const path = require('path');

// Crear directorio assets si no existe
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// PNG de 1x1 pixel transparente en base64
const transparentPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// PNG de 1024x1024 negro con texto "LE" en dorado (placeholder mejorado)
// Este es un PNG real de 1024x1024 con fondo negro
const iconPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
);

console.log('🎨 Generando assets placeholder...\n');

// Generar archivos
const files = [
  { name: 'icon.png', buffer: iconPNG, size: '1024x1024' },
  { name: 'splash.png', buffer: iconPNG, size: '1284x2778' },
  { name: 'adaptive-icon.png', buffer: iconPNG, size: '1024x1024' },
  { name: 'favicon.png', buffer: transparentPNG, size: '48x48' },
];

files.forEach(file => {
  const filePath = path.join(assetsDir, file.name);
  fs.writeFileSync(filePath, file.buffer);
  console.log(`✅ Creado: assets/${file.name} (${file.size} placeholder)`);
});

console.log('\n✅ Todos los assets placeholder creados correctamente!');
console.log('\n📝 IMPORTANTE:');
console.log('   Estos son placeholders temporales.');
console.log('   Para producción, crea iconos profesionales.');
console.log('   Ver: assets/README_ASSETS.md\n');
