/**
 * FIREBASE.JS - Configuración de Firebase
 * Inicialización de Firebase SDK con soporte para:
 * - Authentication (Google Sign-In)
 * - Firestore Database
 * - Vertex AI for Firebase (Gemini)
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN (Reemplazar con tus credenciales reales)
// ═══════════════════════════════════════════════════════════
// IMPORTANTE: Obtén estos valores desde Firebase Console:
// 1. Ve a https://console.firebase.google.com
// 2. Selecciona tu proyecto
// 3. Project Settings > General > Your apps
// 4. Copia la configuración web

const firebaseConfig = {
  apiKey: "AIzaSy...", // Tu API Key
  authDomain: "lessencedu luxe.firebaseapp.com",
  projectId: "lessenceduluxe",
  storageBucket: "lessenceduluxe.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX" // Opcional (Analytics)
};

// ═══════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  console.log('✓ Firebase inicializado correctamente');
} catch (error) {
  console.error('✗ Error al inicializar Firebase:', error);
}

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════
export { app, auth, db };
export default app;
