/**
 * CONSTANTS.JS - Constantes de la Aplicación
 * Variables de configuración, API Keys y URLs
 */

// ═══════════════════════════════════════════════════════════
// INFORMACIÓN DE LA APP
// ═══════════════════════════════════════════════════════════
export const APP_INFO = {
  name: "L'Essence du Luxe",
  version: '2.0.0',
  author: 'Master Alchemist',
  description: 'La Perfumería del Futuro',
  tagline: 'Arte Olfativo Democratizado',
};

// ═══════════════════════════════════════════════════════════
// API KEYS (Configurar con tus credenciales reales)
// ═══════════════════════════════════════════════════════════
export const API_KEYS = {
  // Gemini AI (para Auditoría de 6 Pilares)
  // Obtener en: https://makersuite.google.com/app/apikey
  GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'TU_GEMINI_API_KEY_AQUI',
  
  // RevenueCat (para suscripciones)
  // Obtener en: https://app.revenuecat.com
  REVENUECAT_API_KEY: process.env.EXPO_PUBLIC_REVENUECAT_KEY || 'TU_REVENUECAT_KEY_AQUI',
  
  // Google Custom Search (para Bibliothèque)
  // Obtener en: https://developers.google.com/custom-search
  GOOGLE_SEARCH_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_SEARCH_KEY || '',
  GOOGLE_SEARCH_ENGINE_ID: process.env.EXPO_PUBLIC_GOOGLE_SEARCH_ENGINE_ID || '',
};

// ═══════════════════════════════════════════════════════════
// URLs DE SERVICIOS
// ═══════════════════════════════════════════════════════════
export const API_URLS = {
  // Gemini AI
  GEMINI_BASE: 'https://generativelanguage.googleapis.com/v1beta',
  GEMINI_MODEL: 'gemini-2.0-flash-exp',
  
  // Google Custom Search
  GOOGLE_SEARCH: 'https://www.googleapis.com/customsearch/v1',
};

// ═══════════════════════════════════════════════════════════
// COLECCIONES FIRESTORE
// ═══════════════════════════════════════════════════════════
export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  PROTOCOLS: 'protocols',
  INVENTORY: 'inventory',
  HISTORY: 'history',
};

// ═══════════════════════════════════════════════════════════
// CATEGORÍAS DE PROTOCOLOS
// ═══════════════════════════════════════════════════════════
export const CATEGORIES = {
  DIAMANTE: { 
    name: 'Diamante', 
    color: '#D4AF37', 
    icon: 'gem',
    description: 'Protocolos Premium de Alta Complejidad'
  },
  NICHO: { 
    name: 'Nicho', 
    color: '#10B981', 
    icon: 'flask-conical',
    description: 'Emulaciones de Fragancias Nicho'
  },
  VERANO: { 
    name: 'Verano', 
    color: '#3B82F6', 
    icon: 'sun',
    description: 'Frescura y Ligereza Estival'
  },
  OFICINA: { 
    name: 'Oficina', 
    color: '#8B5CF6', 
    icon: 'briefcase',
    description: 'Elegancia Profesional Discreta'
  },
  ALQUIMIA: { 
    name: 'Alquimia', 
    color: '#F59E0B', 
    icon: 'flask',
    description: 'Creaciones Experimentales Avanzadas'
  },
};

// ═══════════════════════════════════════════════════════════
// PLANES DE SUSCRIPCIÓN
// ═══════════════════════════════════════════════════════════
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Aprendiz',
    price: 0,
    features: [
      'Acceso limitado a Bibliothèque (3 búsquedas/día)',
      '1 Auditoría 6 Pilares por día',
      'Anuncios discretos',
      'Almacenamiento local',
    ],
    limitations: {
      dailySearches: 3,
      dailyAudits: 1,
      maxProtocols: 10,
    }
  },
  ALQUIMISTA: {
    id: 'alquimista_monthly',
    name: 'Alquimista',
    price: 4.99,
    period: 'mes',
    features: [
      'Bibliothèque ilimitada',
      'Auditorías 6 Pilares ilimitadas',
      'Sin anuncios',
      'Sincronización en la nube',
      'OCR de frascos',
      'Génesis Cuántica (10/día)',
    ],
    limitations: {
      dailyGenesis: 10,
    }
  },
  MAESTRO: {
    id: 'maestro_yearly',
    name: 'Maestro',
    price: 39.99,
    period: 'año',
    features: [
      'Todo lo de Alquimista',
      'Génesis Cuántica ILIMITADA',
      'Consultas IA avanzadas',
      'Soporte prioritario',
      'Acceso anticipado a nuevas funciones',
      '2 meses gratis',
    ],
    limitations: {},
  }
};

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN DE LA APP
// ═══════════════════════════════════════════════════════════
export const APP_CONFIG = {
  // Idioma por defecto
  defaultLanguage: 'es',
  
  // Caché de búsquedas (milisegundos)
  searchCacheDuration: 3600000, // 1 hora
  
  // Límite de protocolos para usuarios gratuitos
  freeUserProtocolLimit: 10,
  
  // Tiempo de espera para requests (ms)
  requestTimeout: 30000,
  
  // Feedback háptico
  hapticEnabled: true,
};

// ═══════════════════════════════════════════════════════════
// MENSAJES DE ERROR
// ═══════════════════════════════════════════════════════════
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  AUTH_ERROR: 'Error de autenticación. Inicia sesión nuevamente.',
  FIRESTORE_ERROR: 'Error al sincronizar datos.',
  GEMINI_ERROR: 'La IA está temporalmente indisponible.',
  SUBSCRIPTION_REQUIRED: 'Esta función requiere una suscripción.',
  LIMIT_REACHED: 'Has alcanzado el límite diario. Mejora tu plan.',
  INVALID_INPUT: 'Datos inválidos. Verifica e intenta nuevamente.',
};

export default {
  APP_INFO,
  API_KEYS,
  API_URLS,
  FIRESTORE_COLLECTIONS,
  CATEGORIES,
  SUBSCRIPTION_PLANS,
  APP_CONFIG,
  ERROR_MESSAGES,
};
