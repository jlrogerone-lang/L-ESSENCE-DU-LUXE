/**
 * FIRESTORESERVICE.JS - Servicio de Base de Datos
 * Gestión de persistencia con Firestore:
 * - Sincronización automática del inventario
 * - Protocolos en la nube
 * - Historial de uso
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { FIRESTORE_COLLECTIONS } from '../config/constants';

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE USUARIOS
// ═══════════════════════════════════════════════════════════

/**
 * Crear o actualizar perfil de usuario
 * Se llama automáticamente después del login
 */
export const createUserProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, FIRESTORE_COLLECTIONS.USERS, uid);
    
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      subscription: 'free', // Por defecto
    }, { merge: true });
    
    console.log('✓ Perfil de usuario creado/actualizado');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al crear perfil:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener perfil de usuario
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, FIRESTORE_COLLECTIONS.USERS, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'Usuario no encontrado' };
    }
  } catch (error) {
    console.error('✗ Error al obtener perfil:', error);
    return { success: false, error: error.message };
  }
};

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE PROTOCOLOS (CAVA)
// ═══════════════════════════════════════════════════════════

/**
 * Guardar protocolo en la nube
 */
export const saveProtocol = async (uid, protocol) => {
  try {
    const protocolRef = doc(
      collection(db, FIRESTORE_COLLECTIONS.USERS, uid, FIRESTORE_COLLECTIONS.PROTOCOLS)
    );
    
    await setDoc(protocolRef, {
      ...protocol,
      id: protocolRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    console.log('✓ Protocolo guardado en la nube');
    return { success: true, id: protocolRef.id };
  } catch (error) {
    console.error('✗ Error al guardar protocolo:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener todos los protocolos del usuario
 */
export const getUserProtocols = async (uid) => {
  try {
    const protocolsRef = collection(db, FIRESTORE_COLLECTIONS.USERS, uid, FIRESTORE_COLLECTIONS.PROTOCOLS);
    const snapshot = await getDocs(protocolsRef);
    
    const protocols = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✓ ${protocols.length} protocolos obtenidos`);
    return { success: true, data: protocols };
  } catch (error) {
    console.error('✗ Error al obtener protocolos:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Actualizar protocolo existente
 */
export const updateProtocol = async (uid, protocolId, updates) => {
  try {
    const protocolRef = doc(
      db, 
      FIRESTORE_COLLECTIONS.USERS, 
      uid, 
      FIRESTORE_COLLECTIONS.PROTOCOLS, 
      protocolId
    );
    
    await updateDoc(protocolRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    
    console.log('✓ Protocolo actualizado');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al actualizar protocolo:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Eliminar protocolo
 */
export const deleteProtocol = async (uid, protocolId) => {
  try {
    const protocolRef = doc(
      db, 
      FIRESTORE_COLLECTIONS.USERS, 
      uid, 
      FIRESTORE_COLLECTIONS.PROTOCOLS, 
      protocolId
    );
    
    await deleteDoc(protocolRef);
    
    console.log('✓ Protocolo eliminado');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al eliminar protocolo:', error);
    return { success: false, error: error.message };
  }
};

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE INVENTARIO
// ═══════════════════════════════════════════════════════════

/**
 * Guardar inventario completo del usuario
 */
export const saveInventory = async (uid, inventory) => {
  try {
    const inventoryRef = doc(db, FIRESTORE_COLLECTIONS.USERS, uid, 'data', 'inventory');
    
    await setDoc(inventoryRef, {
      items: inventory,
      updatedAt: new Date().toISOString(),
    });
    
    console.log('✓ Inventario sincronizado');
    return { success: true };
  } catch (error) {
    console.error('✗ Error al guardar inventario:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener inventario del usuario
 */
export const getInventory = async (uid) => {
  try {
    const inventoryRef = doc(db, FIRESTORE_COLLECTIONS.USERS, uid, 'data', 'inventory');
    const snapshot = await getDoc(inventoryRef);
    
    if (snapshot.exists()) {
      return { success: true, data: snapshot.data().items };
    } else {
      return { success: true, data: [] }; // Inventario vacío
    }
  } catch (error) {
    console.error('✗ Error al obtener inventario:', error);
    return { success: false, error: error.message };
  }
};

// ═══════════════════════════════════════════════════════════
// HISTORIAL DE ACTIVIDAD
// ═══════════════════════════════════════════════════════════

/**
 * Registrar acción del usuario (para analytics)
 */
export const logActivity = async (uid, activity) => {
  try {
    const activityRef = doc(
      collection(db, FIRESTORE_COLLECTIONS.USERS, uid, FIRESTORE_COLLECTIONS.HISTORY)
    );
    
    await setDoc(activityRef, {
      ...activity,
      timestamp: new Date().toISOString(),
    });
    
    return { success: true };
  } catch (error) {
    console.error('✗ Error al registrar actividad:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener historial reciente
 */
export const getRecentActivity = async (uid, limitCount = 20) => {
  try {
    const historyRef = collection(db, FIRESTORE_COLLECTIONS.USERS, uid, FIRESTORE_COLLECTIONS.HISTORY);
    const q = query(historyRef, orderBy('timestamp', 'desc'), limit(limitCount));
    
    const snapshot = await getDocs(q);
    const activities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: activities };
  } catch (error) {
    console.error('✗ Error al obtener historial:', error);
    return { success: false, error: error.message };
  }
};

// ═══════════════════════════════════════════════════════════
// SUSCRIPCIONES EN TIEMPO REAL
// ═══════════════════════════════════════════════════════════

/**
 * Escuchar cambios en los protocolos en tiempo real
 * Útil para sincronización multi-dispositivo
 */
export const subscribeToProtocols = (uid, callback) => {
  const protocolsRef = collection(db, FIRESTORE_COLLECTIONS.USERS, uid, FIRESTORE_COLLECTIONS.PROTOCOLS);
  
  return onSnapshot(protocolsRef, (snapshot) => {
    const protocols = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    callback(protocols);
  }, (error) => {
    console.error('✗ Error en suscripción:', error);
  });
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════
export default {
  createUserProfile,
  getUserProfile,
  saveProtocol,
  getUserProtocols,
  updateProtocol,
  deleteProtocol,
  saveInventory,
  getInventory,
  logActivity,
  getRecentActivity,
  subscribeToProtocols,
};
