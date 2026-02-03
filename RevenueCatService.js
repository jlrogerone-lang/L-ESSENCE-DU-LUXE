/**
 * REVENUECATSERVICE.JS - Servicio de Suscripciones
 * Gestión de monetización con RevenueCat
 */

import Purchases from 'react-native-purchases';
import { API_KEYS } from '../config/constants';

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════

/**
 * Inicializar RevenueCat
 * Llamar una vez al inicio de la app
 */
export const initializeRevenueCat = async () => {
  try {
    await Purchases.configure({
      apiKey: API_KEYS.REVENUECAT_API_KEY,
    });
    
    console.log('✓ RevenueCat inicializado');
  } catch (error) {
    console.error('✗ Error al inicializar RevenueCat:', error);
  }
};

// ═══════════════════════════════════════════════════════════
// SUSCRIPCIONES
// ═══════════════════════════════════════════════════════════

/**
 * Obtener productos disponibles
 * @returns {Promise<Array>} Lista de productos
 */
export const getAvailableProducts = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    
    if (offerings.current !== null) {
      return offerings.current.availablePackages;
    }
    
    return [];
  } catch (error) {
    console.error('✗ Error al obtener productos:', error);
    return [];
  }
};

/**
 * Comprar suscripción
 * @param {object} packageToPurchase - Paquete a comprar
 * @returns {Promise<object>} Resultado de la compra
 */
export const purchasePackage = async (packageToPurchase) => {
  try {
    const purchaseInfo = await Purchases.purchasePackage(packageToPurchase);
    
    return {
      success: true,
      customerInfo: purchaseInfo.customerInfo,
      productIdentifier: purchaseInfo.productIdentifier,
    };
  } catch (error) {
    if (error.userCancelled) {
      return {
        success: false,
        error: 'Compra cancelada por el usuario',
        userCancelled: true,
      };
    }
    
    console.error('✗ Error en compra:', error);
    return {
      success: false,
      error: error.message || 'Error al procesar la compra',
    };
  }
};

/**
 * Restaurar compras
 * @returns {Promise<object>} Información del cliente
 */
export const restorePurchases = async () => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    
    return {
      success: true,
      customerInfo,
    };
  } catch (error) {
    console.error('✗ Error al restaurar compras:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Obtener información del cliente actual
 * @returns {Promise<object>} Info del cliente
 */
export const getCustomerInfo = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('✗ Error al obtener info del cliente:', error);
    return null;
  }
};

/**
 * Verificar si el usuario tiene acceso premium
 * @param {string} entitlementIdentifier - ID del entitlement (ej: 'pro_access')
 * @returns {Promise<boolean>}
 */
export const hasEntitlement = async (entitlementIdentifier = 'pro_access') => {
  try {
    const customerInfo = await getCustomerInfo();
    
    if (!customerInfo) return false;
    
    return (
      customerInfo.entitlements.active[entitlementIdentifier] !== undefined
    );
  } catch (error) {
    console.error('✗ Error al verificar entitlement:', error);
    return false;
  }
};

/**
 * Verificar si el usuario es premium (cualquier plan)
 * @returns {Promise<boolean>}
 */
export const isPremium = async () => {
  const hasProAccess = await hasEntitlement('pro_access');
  const hasEliteAccess = await hasEntitlement('elite_access');
  
  return hasProAccess || hasEliteAccess;
};

/**
 * Obtener fecha de expiración de la suscripción
 * @returns {Promise<Date|null>}
 */
export const getSubscriptionExpiration = async () => {
  try {
    const customerInfo = await getCustomerInfo();
    
    if (!customerInfo) return null;
    
    const activeEntitlements = Object.values(customerInfo.entitlements.active);
    
    if (activeEntitlements.length === 0) return null;
    
    return new Date(activeEntitlements[0].expirationDate);
  } catch (error) {
    console.error('✗ Error al obtener expiración:', error);
    return null;
  }
};

/**
 * Cancelar suscripción
 * Nota: En RevenueCat, la cancelación se hace desde la tienda (Google Play/App Store)
 * Esta función solo redirige al usuario
 */
export const cancelSubscription = () => {
  console.log('ℹ️ Para cancelar, ve a Google Play Store → Suscripciones');
  return {
    message: 'Gestiona tu suscripción desde Google Play Store',
    storeURL: 'https://play.google.com/store/account/subscriptions',
  };
};

// ═══════════════════════════════════════════════════════════
// LISTENERS
// ═══════════════════════════════════════════════════════════

/**
 * Escuchar cambios en las compras del usuario
 * @param {Function} callback - Función a ejecutar cuando cambien las compras
 */
export const addCustomerInfoUpdateListener = (callback) => {
  Purchases.addCustomerInfoUpdateListener((customerInfo) => {
    callback(customerInfo);
  });
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

export default {
  initializeRevenueCat,
  getAvailableProducts,
  purchasePackage,
  restorePurchases,
  getCustomerInfo,
  hasEntitlement,
  isPremium,
  getSubscriptionExpiration,
  cancelSubscription,
  addCustomerInfoUpdateListener,
};
