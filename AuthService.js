/**
 * AUTHSERVICE.JS - Servicio de Autenticación
 * Gestión completa de autenticación con Google Sign-In
 * Estrategia "Zero-Config": El usuario solo presiona un botón
 */

import { 
  signInWithCredential, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebase';

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN INICIAL DE GOOGLE SIGN-IN
// ═══════════════════════════════════════════════════════════
// IMPORTANTE: Obtén el webClientId desde Firebase Console:
// Project Settings > General > Web API Key

const GOOGLE_WEB_CLIENT_ID = 'TU_WEB_CLIENT_ID.apps.googleusercontent.com';

/**
 * Inicializar configuración de Google Sign-In
 * Se llama una vez al inicio de la App
 */
export const initializeGoogleSignIn = () => {
  try {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
    console.log('✓ Google Sign-In configurado');
  } catch (error) {
    console.error('✗ Error al configurar Google Sign-In:', error);
  }
};

// ═══════════════════════════════════════════════════════════
// AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════

/**
 * Iniciar sesión con Google
 * El usuario solo ve el popup de Google y listo
 * @returns {Promise<Object>} Datos del usuario autenticado
 */
export const signInWithGoogle = async () => {
  try {
    // 1. Verificar servicios de Google Play (Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // 2. Obtener usuario de Google (popup automático)
    const userInfo = await GoogleSignin.signIn();
    
    // 3. Obtener token de ID
    const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
    
    // 4. Autenticar en Firebase
    const userCredential = await signInWithCredential(auth, googleCredential);
    
    console.log('✓ Usuario autenticado:', userCredential.user.email);
    
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      }
    };
    
  } catch (error) {
    console.error('✗ Error en Google Sign-In:', error);
    
    // Manejo de errores específicos
    let errorMessage = 'Error al iniciar sesión';
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Inicio de sesión cancelado';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Error de conexión. Verifica tu internet';
    }
    
    return {
      success: false,
      error: errorMessage,
      errorCode: error.code,
    };
  }
};

/**
 * Cerrar sesión
 */
export const logOut = async () => {
  try {
    // Cerrar sesión en Google
    await GoogleSignin.signOut();
    
    // Cerrar sesión en Firebase
    await signOut(auth);
    
    console.log('✓ Sesión cerrada');
    
    return { success: true };
  } catch (error) {
    console.error('✗ Error al cerrar sesión:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener usuario actual
 * @returns {Object|null} Usuario o null si no está autenticado
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};

/**
 * Observador de cambios de autenticación
 * Útil para React Context
 * @param {Function} callback - Función a ejecutar cuando cambia el estado
 * @returns {Function} Función para cancelar la suscripción
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado
      callback({
        isAuthenticated: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      });
    } else {
      // Usuario no autenticado
      callback({
        isAuthenticated: false,
        user: null,
      });
    }
  });
};

/**
 * Obtener token de ID del usuario actual
 * Útil para peticiones autenticadas a APIs
 * @returns {Promise<string|null>}
 */
export const getUserIdToken = async () => {
  try {
    const user = getCurrentUser();
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  } catch (error) {
    console.error('✗ Error al obtener ID token:', error);
    return null;
  }
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════
export default {
  initializeGoogleSignIn,
  signInWithGoogle,
  logOut,
  getCurrentUser,
  isAuthenticated,
  onAuthStateChange,
  getUserIdToken,
};
