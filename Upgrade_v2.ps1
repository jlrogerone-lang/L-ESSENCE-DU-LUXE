<#
.SYNOPSIS
    Upgrade_v2.ps1 - L'Essence du Luxe v2.0 Global
    Script de Actualización Automática a Versión Global
    
.DESCRIPTION
    Automatiza la implementación de 3 módulos profesionales:
    1. LINGUA FRANCA - Multi-idioma (i18n)
    2. LE RAPPEL - Notificaciones Inteligentes
    3. LE CERCLE - Social & Sharing
    + BONUS: Mood Radar
    
.AUTHOR
    Senior Architect - Global Edition 2026
    
.NOTES
    Compatible con Expo SDK 50+
    Mantiene la arquitectura limpia existente
#>

# ═══════════════════════════════════════════════════════════
# CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════
$ProjectRoot = $PSScriptRoot
$ColorGold = "Yellow"
$ColorSuccess = "Green"
$ColorInfo = "Cyan"
$ColorError = "Red"

# ═══════════════════════════════════════════════════════════
# FUNCIONES DE UI
# ═══════════════════════════════════════════════════════════
Function Print-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor $ColorGold
    Write-Host "║  $Text" -ForegroundColor $ColorGold
    Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor $ColorGold
    Write-Host ""
}

Function Print-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor $ColorSuccess
}

Function Print-Info {
    param([string]$Message)
    Write-Host "→ $Message" -ForegroundColor $ColorInfo
}

Function Print-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor $ColorError
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: CREAR ESTRUCTURA i18n
# ═══════════════════════════════════════════════════════════
Function Create-I18nStructure {
    Print-Header "MÓDULO 1: LINGUA FRANCA (Multi-idioma)"
    
    $i18nPath = Join-Path $ProjectRoot "src\i18n"
    $localesPath = Join-Path $i18nPath "locales"
    
    # Crear carpetas
    New-Item -ItemType Directory -Force -Path $localesPath | Out-Null
    Print-Success "Estructura i18n creada: $i18nPath"
    
    # ═══════════════════════════════════════════════════════════
    # ESPAÑOL (DEFAULT)
    # ═══════════════════════════════════════════════════════════
    $esContent = @'
{
  "common": {
    "appName": "L'Essence du Luxe",
    "welcome": "Bienvenido",
    "loading": "Cargando...",
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar",
    "search": "Buscar",
    "filter": "Filtrar",
    "share": "Compartir",
    "close": "Cerrar"
  },
  "tabs": {
    "bibliotheque": "Bibliothèque",
    "cava": "Cava",
    "leNez": "Le Nez",
    "profile": "Perfil"
  },
  "bibliotheque": {
    "title": "BIBLIOTHÈQUE UNIVERSELLE",
    "subtitle": "El conocimiento olfativo de la humanidad",
    "searchPlaceholder": "Buscar en la red...",
    "searchButton": "BUSCAR",
    "loading": "Consultando la red...",
    "noResults": "Sin resultados",
    "addToCava": "AÑADIR A MI CAVA",
    "executeAudit": "EJECUTAR AUDITORÍA 6 PILARES",
    "auditing": "Ejecutando Auditoría...",
    "auditingDescription": "La IA está analizando los 6 pilares",
    "empty": {
      "title": "Busca cualquier perfume de la historia",
      "subtitle": "Baccarat Rouge, Aventus, Sauvage..."
    }
  },
  "cava": {
    "title": "LA CAVA",
    "subtitle": "{{count}} protocolos • Valor estimado: {{value}}€",
    "filters": {
      "all": "TODOS",
      "diamante": "DIAMANTE",
      "nicho": "NICHO",
      "verano": "VERANO",
      "alquimia": "ALQUIMIA"
    },
    "categories": {
      "diamante": "Diamante",
      "nicho": "Nicho",
      "verano": "Verano",
      "oficina": "Oficina",
      "alquimia": "Alquimia"
    }
  },
  "leNez": {
    "title": "LE NEZ",
    "subtitle": "Oracle de Inteligencia Olfativa",
    "inputPlaceholder": "Pregunta al Oracle...",
    "send": "Enviar",
    "thinking": "El Oracle está pensando..."
  },
  "profile": {
    "title": "PERFIL",
    "settings": "Configuración",
    "language": "Idioma",
    "notifications": "Notificaciones",
    "subscription": "Suscripción",
    "logout": "Cerrar Sesión",
    "version": "Versión {{version}}"
  },
  "notifications": {
    "title": "Notificaciones",
    "dailyProtocol": "Protocolo del día",
    "layerDrying": "Secado de capa",
    "enabled": "Activadas",
    "disabled": "Desactivadas",
    "dailyTime": "Hora del protocolo diario",
    "messages": {
      "dailyProtocol": "🌟 Tu protocolo del día te espera",
      "layerDrying": "⏱️ Capa aplicada. Espera {{seconds}}s sin frotar."
    }
  },
  "sharing": {
    "title": "Compartir Protocolo",
    "message": "🌟 PROTOCOLO DE LUJO 🌟\n\n{{name}}\n\n💎 Referente: {{niche}}\n🎯 Activos: {{assets}}\n📋 Protocolo:\n{{protocol}}\n\n✨ Creado con L'Essence du Luxe",
    "success": "Compartido exitosamente",
    "error": "Error al compartir"
  },
  "moodRadar": {
    "title": "MOOD RADAR",
    "subtitle": "¿Cómo te sientes hoy?",
    "moods": {
      "seductive": "Seductor",
      "authoritative": "Autoritario",
      "relaxed": "Relajado",
      "energetic": "Enérgico"
    },
    "selectMood": "Selecciona tu estado de ánimo",
    "resultsCount": "{{count}} perfumes coinciden con tu estado"
  },
  "languages": {
    "es": "Español",
    "en": "English",
    "fr": "Français"
  }
}
'@
    
    # ═══════════════════════════════════════════════════════════
    # INGLÉS (GLOBAL)
    # ═══════════════════════════════════════════════════════════
    $enContent = @'
{
  "common": {
    "appName": "L'Essence du Luxe",
    "welcome": "Welcome",
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "search": "Search",
    "filter": "Filter",
    "share": "Share",
    "close": "Close"
  },
  "tabs": {
    "bibliotheque": "Library",
    "cava": "Vault",
    "leNez": "The Nose",
    "profile": "Profile"
  },
  "bibliotheque": {
    "title": "UNIVERSAL LIBRARY",
    "subtitle": "Humanity's olfactory knowledge",
    "searchPlaceholder": "Search the web...",
    "searchButton": "SEARCH",
    "loading": "Consulting the web...",
    "noResults": "No results",
    "addToCava": "ADD TO MY VAULT",
    "executeAudit": "EXECUTE 6 PILLARS AUDIT",
    "auditing": "Running Audit...",
    "auditingDescription": "AI is analyzing the 6 pillars",
    "empty": {
      "title": "Search any perfume in history",
      "subtitle": "Baccarat Rouge, Aventus, Sauvage..."
    }
  },
  "cava": {
    "title": "THE VAULT",
    "subtitle": "{{count}} protocols • Estimated value: €{{value}}",
    "filters": {
      "all": "ALL",
      "diamante": "DIAMOND",
      "nicho": "NICHE",
      "verano": "SUMMER",
      "alquimia": "ALCHEMY"
    },
    "categories": {
      "diamante": "Diamond",
      "nicho": "Niche",
      "verano": "Summer",
      "oficina": "Office",
      "alquimia": "Alchemy"
    }
  },
  "leNez": {
    "title": "THE NOSE",
    "subtitle": "Olfactory Intelligence Oracle",
    "inputPlaceholder": "Ask the Oracle...",
    "send": "Send",
    "thinking": "The Oracle is thinking..."
  },
  "profile": {
    "title": "PROFILE",
    "settings": "Settings",
    "language": "Language",
    "notifications": "Notifications",
    "subscription": "Subscription",
    "logout": "Log Out",
    "version": "Version {{version}}"
  },
  "notifications": {
    "title": "Notifications",
    "dailyProtocol": "Daily protocol",
    "layerDrying": "Layer drying",
    "enabled": "Enabled",
    "disabled": "Disabled",
    "dailyTime": "Daily protocol time",
    "messages": {
      "dailyProtocol": "🌟 Your daily protocol awaits",
      "layerDrying": "⏱️ Layer applied. Wait {{seconds}}s without rubbing."
    }
  },
  "sharing": {
    "title": "Share Protocol",
    "message": "🌟 LUXURY PROTOCOL 🌟\n\n{{name}}\n\n💎 Reference: {{niche}}\n🎯 Assets: {{assets}}\n📋 Protocol:\n{{protocol}}\n\n✨ Created with L'Essence du Luxe",
    "success": "Shared successfully",
    "error": "Error sharing"
  },
  "moodRadar": {
    "title": "MOOD RADAR",
    "subtitle": "How do you feel today?",
    "moods": {
      "seductive": "Seductive",
      "authoritative": "Authoritative",
      "relaxed": "Relaxed",
      "energetic": "Energetic"
    },
    "selectMood": "Select your mood",
    "resultsCount": "{{count}} perfumes match your mood"
  },
  "languages": {
    "es": "Español",
    "en": "English",
    "fr": "Français"
  }
}
'@
    
    # ═══════════════════════════════════════════════════════════
    # FRANCÉS (LUJO)
    # ═══════════════════════════════════════════════════════════
    $frContent = @'
{
  "common": {
    "appName": "L'Essence du Luxe",
    "welcome": "Bienvenue",
    "loading": "Chargement...",
    "save": "Sauvegarder",
    "cancel": "Annuler",
    "delete": "Supprimer",
    "edit": "Modifier",
    "search": "Rechercher",
    "filter": "Filtrer",
    "share": "Partager",
    "close": "Fermer"
  },
  "tabs": {
    "bibliotheque": "Bibliothèque",
    "cava": "Cave",
    "leNez": "Le Nez",
    "profile": "Profil"
  },
  "bibliotheque": {
    "title": "BIBLIOTHÈQUE UNIVERSELLE",
    "subtitle": "La connaissance olfactive de l'humanité",
    "searchPlaceholder": "Rechercher sur le web...",
    "searchButton": "RECHERCHER",
    "loading": "Consultation du web...",
    "noResults": "Aucun résultat",
    "addToCava": "AJOUTER À MA CAVE",
    "executeAudit": "EXÉCUTER AUDIT 6 PILIERS",
    "auditing": "Exécution de l'audit...",
    "auditingDescription": "L'IA analyse les 6 piliers",
    "empty": {
      "title": "Recherchez n'importe quel parfum de l'histoire",
      "subtitle": "Baccarat Rouge, Aventus, Sauvage..."
    }
  },
  "cava": {
    "title": "LA CAVE",
    "subtitle": "{{count}} protocoles • Valeur estimée: {{value}}€",
    "filters": {
      "all": "TOUS",
      "diamante": "DIAMANT",
      "nicho": "NICHE",
      "verano": "ÉTÉ",
      "alquimia": "ALCHIMIE"
    },
    "categories": {
      "diamante": "Diamant",
      "nicho": "Niche",
      "verano": "Été",
      "oficina": "Bureau",
      "alquimia": "Alchimie"
    }
  },
  "leNez": {
    "title": "LE NEZ",
    "subtitle": "Oracle d'Intelligence Olfactive",
    "inputPlaceholder": "Interrogez l'Oracle...",
    "send": "Envoyer",
    "thinking": "L'Oracle réfléchit..."
  },
  "profile": {
    "title": "PROFIL",
    "settings": "Réglages",
    "language": "Langue",
    "notifications": "Notifications",
    "subscription": "Abonnement",
    "logout": "Déconnexion",
    "version": "Version {{version}}"
  },
  "notifications": {
    "title": "Notifications",
    "dailyProtocol": "Protocole du jour",
    "layerDrying": "Séchage de couche",
    "enabled": "Activées",
    "disabled": "Désactivées",
    "dailyTime": "Heure du protocole quotidien",
    "messages": {
      "dailyProtocol": "🌟 Votre protocole du jour vous attend",
      "layerDrying": "⏱️ Couche appliquée. Attendez {{seconds}}s sans frotter."
    }
  },
  "sharing": {
    "title": "Partager le Protocole",
    "message": "🌟 PROTOCOLE DE LUXE 🌟\n\n{{name}}\n\n💎 Référence: {{niche}}\n🎯 Actifs: {{assets}}\n📋 Protocole:\n{{protocol}}\n\n✨ Créé avec L'Essence du Luxe",
    "success": "Partagé avec succès",
    "error": "Erreur de partage"
  },
  "moodRadar": {
    "title": "RADAR D'HUMEUR",
    "subtitle": "Comment vous sentez-vous aujourd'hui?",
    "moods": {
      "seductive": "Séducteur",
      "authoritative": "Autoritaire",
      "relaxed": "Détendu",
      "energetic": "Énergique"
    },
    "selectMood": "Sélectionnez votre humeur",
    "resultsCount": "{{count}} parfums correspondent à votre humeur"
  },
  "languages": {
    "es": "Español",
    "en": "English",
    "fr": "Français"
  }
}
'@
    
    # Guardar archivos JSON
    $esContent | Out-File -FilePath (Join-Path $localesPath "es.json") -Encoding UTF8
    $enContent | Out-File -FilePath (Join-Path $localesPath "en.json") -Encoding UTF8
    $frContent | Out-File -FilePath (Join-Path $localesPath "fr.json") -Encoding UTF8
    
    Print-Success "Traducciones creadas: es.json, en.json, fr.json"
    
    # ═══════════════════════════════════════════════════════════
    # ARCHIVO DE CONFIGURACIÓN i18n
    # ═══════════════════════════════════════════════════════════
    $i18nIndexContent = @'
/**
 * I18N/INDEX.JS - Configuración de Internacionalización
 * Sistema multi-idioma con detección automática
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Importar traducciones
import es from './locales/es.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

// Recursos de traducción
const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr },
};

// Detectar idioma del dispositivo
const getDeviceLanguage = () => {
  const locale = Localization.locale;
  
  // Mapear locales del dispositivo a idiomas soportados
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr';
  return 'en'; // Inglés por defecto para el resto
};

// Inicializar i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: getDeviceLanguage(), // Detección automática
    fallbackLng: 'es', // Español como fallback
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
'@
    
    $i18nIndexContent | Out-File -FilePath (Join-Path $i18nPath "index.js") -Encoding UTF8
    Print-Success "Configuración i18n creada: index.js"
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: CREAR SERVICIO DE NOTIFICACIONES
# ═══════════════════════════════════════════════════════════
Function Create-NotificationService {
    Print-Header "MÓDULO 2: LE RAPPEL (Notificaciones)"
    
    $servicesPath = Join-Path $ProjectRoot "src\services"
    $notificationServiceContent = @'
/**
 * NOTIFICATIONSERVICE.JS - Le Rappel (Recordatorios Inteligentes)
 * Gestión profesional de notificaciones locales y programadas
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════
const NOTIFICATION_STORAGE_KEY = '@notifications_enabled';
const DAILY_TIME_STORAGE_KEY = '@daily_notification_time';

// Configurar comportamiento de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ═══════════════════════════════════════════════════════════
// INICIALIZACIÓN Y PERMISOS
// ═══════════════════════════════════════════════════════════

/**
 * Solicitar permisos de notificaciones
 * @returns {Promise<boolean>} True si se otorgaron permisos
 */
export const requestNotificationPermissions = async () => {
  try {
    if (!Device.isDevice) {
      console.warn('Las notificaciones solo funcionan en dispositivos físicos');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Permiso de notificaciones denegado');
      return false;
    }

    // Configurar canal de notificaciones (Android)
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: "L'Essence du Luxe",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#D4AF37', // Dorado
        sound: 'default',
      });
    }

    console.log('✓ Permisos de notificaciones otorgados');
    return true;
  } catch (error) {
    console.error('Error solicitando permisos:', error);
    return false;
  }
};

/**
 * Verificar si las notificaciones están habilitadas
 */
export const areNotificationsEnabled = async () => {
  try {
    const enabled = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return enabled === 'true';
  } catch (error) {
    console.error('Error verificando notificaciones:', error);
    return false;
  }
};

/**
 * Habilitar/deshabilitar notificaciones
 */
export const setNotificationsEnabled = async (enabled) => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, enabled.toString());
    
    if (!enabled) {
      // Cancelar todas las notificaciones programadas
      await Notifications.cancelAllScheduledNotificationsAsync();
    } else {
      // Re-programar notificaciones
      await scheduleDailyProtocol();
    }
    
    return true;
  } catch (error) {
    console.error('Error configurando notificaciones:', error);
    return false;
  }
};

// ═══════════════════════════════════════════════════════════
// NOTIFICACIONES LOCALES (Secado de Capa)
// ═══════════════════════════════════════════════════════════

/**
 * Enviar notificación de recordatorio de secado
 * @param {number} seconds - Segundos de espera
 * @param {string} layerName - Nombre de la capa aplicada
 */
export const scheduleLayerDryingNotification = async (seconds = 60, layerName = 'Capa 1') => {
  try {
    const enabled = await areNotificationsEnabled();
    if (!enabled) return null;

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏱️ Tiempo de Secado',
        body: `${layerName} lista. Espera ${seconds}s sin frotar.`,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { type: 'layer_drying', seconds, layerName },
      },
      trigger: {
        seconds: seconds,
      },
    });

    console.log(`✓ Notificación de secado programada: ${notificationId}`);
    return notificationId;
  } catch (error) {
    console.error('Error programando notificación de secado:', error);
    return null;
  }
};

/**
 * Notificación inmediata cuando se aplica una capa
 * @param {string} perfumeName - Nombre del perfume aplicado
 * @param {number} waitTime - Tiempo de espera en segundos
 */
export const notifyLayerApplied = async (perfumeName, waitTime = 60) => {
  try {
    const enabled = await areNotificationsEnabled();
    if (!enabled) return null;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '✨ Capa Aplicada',
        body: `${perfumeName} - Espera ${waitTime}s para la siguiente capa`,
        sound: 'default',
        data: { type: 'layer_applied', perfume: perfumeName, waitTime },
      },
      trigger: null, // Inmediata
    });

    // Programar recordatorio para cuando termine el tiempo
    await scheduleLayerDryingNotification(waitTime, perfumeName);
    
    console.log('✓ Notificación de capa aplicada enviada');
  } catch (error) {
    console.error('Error enviando notificación:', error);
  }
};

// ═══════════════════════════════════════════════════════════
// NOTIFICACIONES PROGRAMADAS (Protocolo del Día)
// ═══════════════════════════════════════════════════════════

/**
 * Programar notificación diaria del "Protocolo del Día"
 * @param {Object} time - { hour: 9, minute: 0 }
 */
export const scheduleDailyProtocol = async (time = { hour: 9, minute: 0 }) => {
  try {
    const enabled = await areNotificationsEnabled();
    if (!enabled) return null;

    // Cancelar notificación diaria anterior
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Calcular próxima ejecución
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(time.hour, time.minute, 0, 0);

    // Si la hora ya pasó hoy, programar para mañana
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const trigger = {
      hour: time.hour,
      minute: time.minute,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🌟 Tu Protocolo del Día',
        body: 'Descubre la recomendación olfativa de hoy',
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { type: 'daily_protocol' },
      },
      trigger,
    });

    // Guardar hora configurada
    await AsyncStorage.setItem(DAILY_TIME_STORAGE_KEY, JSON.stringify(time));

    console.log(`✓ Protocolo diario programado: ${time.hour}:${time.minute}`);
    return notificationId;
  } catch (error) {
    console.error('Error programando protocolo diario:', error);
    return null;
  }
};

/**
 * Obtener hora configurada del protocolo diario
 */
export const getDailyProtocolTime = async () => {
  try {
    const timeStr = await AsyncStorage.getItem(DAILY_TIME_STORAGE_KEY);
    return timeStr ? JSON.parse(timeStr) : { hour: 9, minute: 0 };
  } catch (error) {
    console.error('Error obteniendo hora del protocolo:', error);
    return { hour: 9, minute: 0 };
  }
};

/**
 * Actualizar hora del protocolo diario
 */
export const updateDailyProtocolTime = async (hour, minute) => {
  try {
    const time = { hour, minute };
    await scheduleDailyProtocol(time);
    return true;
  } catch (error) {
    console.error('Error actualizando hora:', error);
    return false;
  }
};

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE NOTIFICACIONES
// ═══════════════════════════════════════════════════════════

/**
 * Obtener todas las notificaciones programadas
 */
export const getScheduledNotifications = async () => {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    return scheduled;
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    return [];
  }
};

/**
 * Cancelar una notificación específica
 */
export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`✓ Notificación cancelada: ${notificationId}`);
    return true;
  } catch (error) {
    console.error('Error cancelando notificación:', error);
    return false;
  }
};

/**
 * Cancelar todas las notificaciones
 */
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('✓ Todas las notificaciones canceladas');
    return true;
  } catch (error) {
    console.error('Error cancelando notificaciones:', error);
    return false;
  }
};

/**
 * Listener de notificaciones recibidas
 */
export const addNotificationReceivedListener = (callback) => {
  return Notifications.addNotificationReceivedListener(callback);
};

/**
 * Listener de respuestas a notificaciones (cuando el usuario toca)
 */
export const addNotificationResponseReceivedListener = (callback) => {
  return Notifications.addNotificationResponseReceivedListener(callback);
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════
export default {
  requestNotificationPermissions,
  areNotificationsEnabled,
  setNotificationsEnabled,
  scheduleLayerDryingNotification,
  notifyLayerApplied,
  scheduleDailyProtocol,
  getDailyProtocolTime,
  updateDailyProtocolTime,
  getScheduledNotifications,
  cancelNotification,
  cancelAllNotifications,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
};
'@
    
    $notificationServiceContent | Out-File -FilePath (Join-Path $servicesPath "NotificationService.js") -Encoding UTF8
    Print-Success "NotificationService.js creado"
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: CREAR SERVICIO SOCIAL
# ═══════════════════════════════════════════════════════════
Function Create-SocialService {
    Print-Header "MÓDULO 3: LE CERCLE (Social & Sharing)"
    
    $servicesPath = Join-Path $ProjectRoot "src\services"
    $socialServiceContent = @'
/**
 * SOCIALSERVICE.JS - Le Cercle (Compartir & Social)
 * Compartir protocolos de layering con estilo de lujo
 */

import { Share, Platform } from 'react-native';
import * as Linking from 'expo-linking';

// ═══════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════
const EMOJIS = {
  star: '✨',
  diamond: '💎',
  target: '🎯',
  notes: '📋',
  timer: '⏱️',
  chemistry: '🧪',
  luxury: '🌟',
  perfume: '🍾',
  crown: '👑',
};

// ═══════════════════════════════════════════════════════════
// FORMATEO DE PROTOCOLOS
// ═══════════════════════════════════════════════════════════

/**
 * Generar texto elegante para compartir un protocolo
 * @param {Object} protocol - Objeto del protocolo
 * @returns {string} Texto formateado con emojis
 */
export const formatProtocolForSharing = (protocol) => {
  const {
    op = 'Protocolo de Lujo',
    nicho = 'Referente Nicho',
    activos = 'Activos',
    paso = 'Protocolo',
    quimica = 'Familia olfativa',
    qualityScore = 0,
    valor = 0,
  } = protocol;

  return `${EMOJIS.luxury} PROTOCOLO DE LUJO ${EMOJIS.luxury}

${EMOJIS.crown} ${op}

${EMOJIS.diamond} REFERENTE NICHO
${nicho}${valor ? ` (${valor}€)` : ''}

${EMOJIS.target} ACTIVOS UTILIZADOS
${activos}

${EMOJIS.notes} PROTOCOLO DE APLICACIÓN
${paso}

${EMOJIS.chemistry} QUÍMICA OLFATIVA
${quimica}

${EMOJIS.star} PUNTUACIÓN DE CALIDAD: ${qualityScore}/100

${EMOJIS.perfume} Creado con L'Essence du Luxe
La Perfumería del Futuro`;
};

/**
 * Versión corta para redes sociales (Instagram, Twitter)
 */
export const formatProtocolShort = (protocol) => {
  const { op, nicho, qualityScore } = protocol;
  
  return `${EMOJIS.luxury} ${op}

${EMOJIS.diamond} Referente: ${nicho}
${EMOJIS.star} Calidad: ${qualityScore}/100

${EMOJIS.perfume} #LEssenceDuLuxe #Perfumería #Layering`;
};

// ═══════════════════════════════════════════════════════════
// COMPARTIR EN PLATAFORMAS
// ═══════════════════════════════════════════════════════════

/**
 * Compartir protocolo usando el Share nativo
 * @param {Object} protocol - Protocolo a compartir
 * @param {boolean} useShortFormat - Usar formato corto
 * @returns {Promise<Object>} Resultado del share
 */
export const shareProtocol = async (protocol, useShortFormat = false) => {
  try {
    const message = useShortFormat 
      ? formatProtocolShort(protocol)
      : formatProtocolForSharing(protocol);

    const result = await Share.share({
      message,
      title: `${EMOJIS.luxury} ${protocol.op || 'Protocolo de Lujo'}`,
    }, {
      dialogTitle: 'Compartir Protocolo',
      subject: `${protocol.op} - L'Essence du Luxe`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`✓ Compartido via: ${result.activityType}`);
      } else {
        console.log('✓ Protocolo compartido');
      }
      return { success: true, activityType: result.activityType };
    } else if (result.action === Share.dismissedAction) {
      console.log('Share cancelado');
      return { success: false, dismissed: true };
    }
  } catch (error) {
    console.error('Error compartiendo:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Compartir en WhatsApp específicamente
 * @param {Object} protocol - Protocolo a compartir
 */
export const shareOnWhatsApp = async (protocol) => {
  try {
    const message = formatProtocolForSharing(protocol);
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
      return { success: true };
    } else {
      // Fallback a share nativo
      return await shareProtocol(protocol);
    }
  } catch (error) {
    console.error('Error compartiendo en WhatsApp:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Compartir en Instagram Stories
 * NOTA: Requiere configuración adicional en app.json (URL Schemes)
 * @param {Object} protocol - Protocolo a compartir
 */
export const shareOnInstagramStories = async (protocol) => {
  try {
    // Instagram Stories requiere una imagen de fondo
    // Por ahora, usamos el texto compartido
    const message = formatProtocolShort(protocol);
    
    // URL scheme de Instagram
    const url = `instagram-stories://share?text=${encodeURIComponent(message)}`;
    
    const canOpen = await Linking.canOpenURL('instagram://');
    if (canOpen) {
      // Instagram instalado, pero Stories requiere asset de imagen
      // Fallback a share nativo que abrirá Instagram en el selector
      return await shareProtocol(protocol, true);
    } else {
      console.warn('Instagram no está instalado');
      return { success: false, error: 'Instagram no instalado' };
    }
  } catch (error) {
    console.error('Error compartiendo en Instagram:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Copiar protocolo al portapapeles
 * @param {Object} protocol - Protocolo a copiar
 */
export const copyProtocolToClipboard = async (protocol) => {
  try {
    const { Clipboard } = await import('react-native');
    const message = formatProtocolForSharing(protocol);
    
    Clipboard.setString(message);
    console.log('✓ Protocolo copiado al portapapeles');
    return { success: true };
  } catch (error) {
    console.error('Error copiando al portapapeles:', error);
    return { success: false, error: error.message };
  }
};

// ═══════════════════════════════════════════════════════════
// COMPARTIR MÚLTIPLES PROTOCOLOS
// ═══════════════════════════════════════════════════════════

/**
 * Compartir lista de protocolos (ej: "Mi Top 5")
 * @param {Array} protocols - Array de protocolos
 * @param {string} listName - Nombre de la lista
 */
export const shareProtocolList = async (protocols, listName = 'Mis Protocolos de Lujo') => {
  try {
    let message = `${EMOJIS.crown} ${listName.toUpperCase()} ${EMOJIS.crown}\n\n`;
    
    protocols.forEach((protocol, index) => {
      message += `${index + 1}. ${protocol.op}\n`;
      message += `   ${EMOJIS.diamond} ${protocol.nicho}\n`;
      message += `   ${EMOJIS.star} ${protocol.qualityScore}/100\n\n`;
    });
    
    message += `${EMOJIS.perfume} Creado con L'Essence du Luxe`;
    
    const result = await Share.share({
      message,
      title: listName,
    });
    
    return { success: result.action === Share.sharedAction };
  } catch (error) {
    console.error('Error compartiendo lista:', error);
    return { success: false, error: error.message };
  }
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Verificar si una app está instalada
 * @param {string} urlScheme - URL scheme de la app (ej: 'instagram://')
 */
export const isAppInstalled = async (urlScheme) => {
  try {
    return await Linking.canOpenURL(urlScheme);
  } catch (error) {
    console.error('Error verificando app:', error);
    return false;
  }
};

/**
 * Obtener opciones de compartir disponibles
 */
export const getAvailableSharingOptions = async () => {
  const options = [];
  
  // Siempre disponible
  options.push({ id: 'native', name: 'Compartir', icon: 'share' });
  
  // WhatsApp
  if (await isAppInstalled('whatsapp://')) {
    options.push({ id: 'whatsapp', name: 'WhatsApp', icon: 'message-circle' });
  }
  
  // Instagram
  if (await isAppInstalled('instagram://')) {
    options.push({ id: 'instagram', name: 'Instagram', icon: 'instagram' });
  }
  
  // Copiar
  options.push({ id: 'copy', name: 'Copiar', icon: 'copy' });
  
  return options;
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════
export default {
  shareProtocol,
  shareOnWhatsApp,
  shareOnInstagramStories,
  copyProtocolToClipboard,
  shareProtocolList,
  formatProtocolForSharing,
  formatProtocolShort,
  isAppInstalled,
  getAvailableSharingOptions,
};
'@
    
    $socialServiceContent | Out-File -FilePath (Join-Path $servicesPath "SocialService.js") -Encoding UTF8
    Print-Success "SocialService.js creado"
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: CREAR COMPONENTE SELECTOR DE IDIOMA
# ═══════════════════════════════════════════════════════════
Function Create-LanguageSelector {
    Print-Header "COMPONENTE: Selector de Idioma"
    
    $componentsPath = Join-Path $ProjectRoot "src\components"
    $languageSelectorContent = @'
/**
 * LANGUAGESELECTOR.JS - Selector de Idioma para Réglages
 * Componente elegante para cambiar el idioma de la app
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

// Colores de la marca
const COLORS = {
  gold: '#D4AF37',
  bg: '#050505',
  card: '#121212',
  cardBorder: '#2A2A2A',
  textMain: '#FFFFFF',
  textSec: '#888888',
};

// Idiomas disponibles
const LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  
  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];
  
  const changeLanguage = async (languageCode) => {
    await i18n.changeLanguage(languageCode);
    setModalVisible(false);
  };
  
  return (
    <>
      {/* BOTÓN SELECTOR */}
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Globe size={20} color={COLORS.gold} />
        <View style={styles.languageInfo}>
          <Text style={styles.label}>{t('profile.language')}</Text>
          <Text style={styles.currentLanguage}>
            {currentLanguage.flag} {currentLanguage.name}
          </Text>
        </View>
      </TouchableOpacity>
      
      {/* MODAL DE SELECCIÓN */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('profile.language')}</Text>
            
            {LANGUAGES.map((language) => {
              const isSelected = language.code === i18n.language;
              
              return (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    isSelected && styles.languageOptionSelected,
                  ]}
                  onPress={() => changeLanguage(language.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                  {isSelected && (
                    <Check size={20} color={COLORS.gold} />
                  )}
                </TouchableOpacity>
              );
            })}
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t('common.close')}</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 12,
  },
  languageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    color: COLORS.textSec,
    fontSize: 12,
    marginBottom: 4,
  },
  currentLanguage: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  modalTitle: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  languageOptionSelected: {
    borderColor: COLORS.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    flex: 1,
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 12,
    padding: 16,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
'@
    
    $languageSelectorContent | Out-File -FilePath (Join-Path $componentsPath "LanguageSelector.js") -Encoding UTF8
    Print-Success "LanguageSelector.js creado"
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: CREAR COMPONENTE MOOD RADAR (BONUS)
# ═══════════════════════════════════════════════════════════
Function Create-MoodRadar {
    Print-Header "BONUS: Mood Radar Component"
    
    $componentsPath = Join-Path $ProjectRoot "src\components"
    $moodRadarContent = @'
/**
 * MOODRADAR.JS - Radar de Estado de Ánimo
 * Componente visual para filtrar perfumes según el mood del usuario
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heart, Zap, Coffee, Flame } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Colores
const COLORS = {
  gold: '#D4AF37',
  bg: '#050505',
  card: '#121212',
  textMain: '#FFFFFF',
  textSec: '#888888',
};

// Moods disponibles
const MOODS = [
  { 
    id: 'seductive', 
    icon: Heart, 
    color: '#F43F5E', 
    rotation: 0,
    families: ['oriental', 'floral', 'amber'],
  },
  { 
    id: 'authoritative', 
    icon: Flame, 
    color: '#D4AF37', 
    rotation: 90,
    families: ['woody', 'leather', 'spicy'],
  },
  { 
    id: 'relaxed', 
    icon: Coffee, 
    color: '#10B981', 
    rotation: 180,
    families: ['fresh', 'aquatic', 'green'],
  },
  { 
    id: 'energetic', 
    icon: Zap, 
    color: '#3B82F6', 
    rotation: 270,
    families: ['citrus', 'fruity', 'aromatic'],
  },
];

export default function MoodRadar({ onMoodSelect, selectedMood }) {
  const { t } = useTranslation();
  const scale = useSharedValue(1);
  
  const handleMoodPress = (mood) => {
    // Animación de pulso
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    
    onMoodSelect(mood);
  };
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('moodRadar.title')}</Text>
      <Text style={styles.subtitle}>{t('moodRadar.subtitle')}</Text>
      
      <View style={styles.radarContainer}>
        {/* CÍRCULO CENTRAL */}
        <View style={styles.centerCircle}>
          <Text style={styles.centerText}>MOOD</Text>
        </View>
        
        {/* OPCIONES DE MOOD */}
        {MOODS.map((mood, index) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          const angle = (index * 90 * Math.PI) / 180;
          const radius = 80;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <Animated.View
              key={mood.id}
              style={[
                styles.moodButton,
                {
                  left: width / 2 + x - 30,
                  top: 120 + y - 30,
                },
                isSelected && animatedStyle,
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.moodCircle,
                  { 
                    backgroundColor: isSelected ? mood.color : COLORS.card,
                    borderColor: mood.color,
                  },
                ]}
                onPress={() => handleMoodPress(mood.id)}
                activeOpacity={0.7}
              >
                <Icon 
                  size={24} 
                  color={isSelected ? '#FFF' : mood.color} 
                />
              </TouchableOpacity>
              <Text style={[
                styles.moodLabel,
                { color: isSelected ? mood.color : COLORS.textSec }
              ]}>
                {t(`moodRadar.moods.${mood.id}`)}
              </Text>
            </Animated.View>
          );
        })}
      </View>
      
      {selectedMood && (
        <Text style={styles.selectedText}>
          {t(`moodRadar.moods.${selectedMood}`)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.bg,
  },
  title: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSec,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
  },
  radarContainer: {
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width / 2 - 40,
    top: 110,
  },
  centerText: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: 'bold',
  },
  moodButton: {
    position: 'absolute',
    alignItems: 'center',
  },
  moodCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  selectedText: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
'@
    
    $moodRadarContent | Out-File -FilePath (Join-Path $componentsPath "MoodRadar.js") -Encoding UTF8
    Print-Success "MoodRadar.js creado"
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: CREAR GUÍA DE IMPLEMENTACIÓN
# ═══════════════════════════════════════════════════════════
Function Create-ImplementationGuide {
    Print-Header "GENERANDO: Guía de Implementación"
    
    $guideContent = @'
# 📘 GUÍA DE IMPLEMENTACIÓN V2.0 GLOBAL

## 🎯 OBJETIVO
Esta guía te muestra **EXACTAMENTE** dónde y cómo integrar los nuevos módulos en tu `App.js` existente.

---

## 📦 PASO 1: INSTALAR DEPENDENCIAS

Ejecuta en tu terminal:

```bash
npm install i18next react-i18next expo-localization expo-notifications @react-native-async-storage/async-storage
```

---

## 🔧 PASO 2: MODIFICAR `App.js`

### 2.1 IMPORTACIONES (Añadir al inicio del archivo)

```javascript
// ═══════════════════════════════════════════════════════════
// NUEVAS IMPORTACIONES V2.0
// ═══════════════════════════════════════════════════════════
import './src/i18n'; // Inicializar i18n ANTES de cualquier componente
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';
import NotificationService from './src/services/NotificationService';
```

### 2.2 INICIALIZACIÓN DE NOTIFICACIONES

Añade dentro de tu función `App()`, en el `useEffect` existente:

```javascript
export default function App() {
  useEffect(() => {
    const initializeServices = async () => {
      // ... tu código existente ...
      
      // ═══════════════════════════════════════════════════════════
      // INICIALIZAR NOTIFICACIONES (NUEVO)
      // ═══════════════════════════════════════════════════════════
      const hasPermissions = await NotificationService.requestNotificationPermissions();
      if (hasPermissions) {
        // Programar notificación diaria a las 9:00 AM
        await NotificationService.scheduleDailyProtocol({ hour: 9, minute: 0 });
      }
      
      console.log('✓ Todos los servicios inicializados (v2.0)');
    };

    initializeServices();
  }, []);

  // ... resto de tu código ...
}
```

### 2.3 ENVOLVER CON I18NEXTPROVIDER

Modifica el return de tu `App()`:

```javascript
return (
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <InventoryProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <MainNavigator />
        </NavigationContainer>
      </InventoryProvider>
    </AuthProvider>
  </I18nextProvider>
);
```

---

## 📱 PASO 3: USAR TRADUCCIONES EN PANTALLAS

En cualquier pantalla (ej: `BibliothequeScreen.js`), añade al inicio:

```javascript
import { useTranslation } from 'react-i18next';

export default function BibliothequeScreen() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('bibliotheque.title')}</Text>
      <Text>{t('bibliotheque.subtitle')}</Text>
    </View>
  );
}
```

**Ejemplo de reemplazo:**
- Antes: `<Text>BIBLIOTHÈQUE UNIVERSELLE</Text>`
- Después: `<Text>{t('bibliotheque.title')}</Text>`

---

## 🔔 PASO 4: USAR NOTIFICACIONES

### En CavaScreen.js (ejemplo: al aplicar un layering)

```javascript
import NotificationService from '../services/NotificationService';

const applyLayering = async (protocol) => {
  // ... tu lógica existente ...
  
  // Notificar que se aplicó la capa
  await NotificationService.notifyLayerApplied(
    protocol.activos, 
    60 // segundos de espera
  );
};
```

---

## 📤 PASO 5: COMPARTIR PROTOCOLOS

### En CavaScreen.js (añadir botón de compartir)

```javascript
import SocialService from '../services/SocialService';
import { Share2 } from 'lucide-react-native';

const handleShare = async (protocol) => {
  const result = await SocialService.shareProtocol(protocol);
  if (result.success) {
    Alert.alert('✓ Compartido', 'Protocolo compartido exitosamente');
  }
};

// Dentro del renderItem:
<TouchableOpacity onPress={() => handleShare(item)}>
  <Share2 size={20} color="#D4AF37" />
</TouchableOpacity>
```

---

## 🌍 PASO 6: AÑADIR SELECTOR DE IDIOMA EN PERFIL

### En ProfileScreen.js

```javascript
import LanguageSelector from '../components/LanguageSelector';

export default function ProfileScreen() {
  return (
    <View>
      {/* ... tu contenido existente ... */}
      
      <LanguageSelector />
      
      {/* ... resto del perfil ... */}
    </View>
  );
}
```

---

## 🎭 PASO 7: MOOD RADAR (BONUS)

### Opción A: En CavaScreen (filtrar por mood)

```javascript
import MoodRadar from '../components/MoodRadar';
import { useState } from 'react';

export default function CavaScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  
  const filterByMood = (protocols, mood) => {
    if (!mood) return protocols;
    
    // Lógica de filtrado basada en familias olfativas
    const moodFamilies = {
      seductive: ['ámbar', 'floral', 'oriental'],
      authoritative: ['woody', 'leather', 'cuero'],
      relaxed: ['fresh', 'verde', 'marino'],
      energetic: ['cítrico', 'fruity'],
    };
    
    const families = moodFamilies[mood] || [];
    return protocols.filter(p => 
      families.some(f => p.quimica?.toLowerCase().includes(f))
    );
  };
  
  const filteredProtocols = filterByMood(protocols, selectedMood);
  
  return (
    <View>
      <MoodRadar 
        onMoodSelect={setSelectedMood}
        selectedMood={selectedMood}
      />
      <FlatList data={filteredProtocols} ... />
    </View>
  );
}
```

---

## 📋 PASO 8: ACTUALIZAR `app.json`

Añade permisos de notificaciones:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#D4AF37"
        }
      ]
    ],
    "android": {
      "permissions": [
        "NOTIFICATIONS"
      ]
    },
    "ios": {
      "infoPlist": {
        "NSUserNotificationsUsageDescription": "Esta app usa notificaciones para recordatorios de layering."
      }
    }
  }
}
```

---

## ✅ CHECKLIST FINAL

- [ ] Dependencias instaladas (`npm install`)
- [ ] i18n importado en `App.js`
- [ ] `I18nextProvider` envuelve toda la app
- [ ] NotificationService inicializado en `useEffect`
- [ ] Traducciones usadas en al menos 1 pantalla (`useTranslation`)
- [ ] Botón de compartir añadido en alguna pantalla
- [ ] Selector de idioma en Perfil
- [ ] Permisos añadidos en `app.json`
- [ ] App probada: `npx expo start --clear`

---

## 🎯 RESULTADO ESPERADO

Al terminar, tu app tendrá:

1. ✅ **Multi-idioma** - La app detecta el idioma del teléfono
2. ✅ **Notificaciones** - Recordatorios de secado + protocolo diario
3. ✅ **Compartir** - Botón para compartir protocolos elegantemente
4. ✅ **Mood Radar** - Filtro visual por estado de ánimo

---

## 🆘 TROUBLESHOOTING

### Error: "i18n is not defined"
**Solución**: Asegúrate de que `import './src/i18n';` esté ANTES de cualquier componente.

### Notificaciones no funcionan
**Solución**: Verifica permisos en `app.json` y prueba en dispositivo físico (no funciona en simulador).

### Traducciones no cambian
**Solución**: Limpia caché: `npx expo start --clear`

---

## 📞 SOPORTE

Si tienes dudas, revisa:
- `src/i18n/locales/es.json` - Todas las traducciones disponibles
- `src/services/NotificationService.js` - Funciones de notificaciones
- `src/services/SocialService.js` - Funciones de compartir

---

**¡FELICITACIONES! Tu app ahora es Global v2.0** 🌍✨
'@
    
    $guideContent | Out-File -FilePath (Join-Path $ProjectRoot "Guia_Implementacion_v2.md") -Encoding UTF8
    Print-Success "Guia_Implementacion_v2.md creada"
}

# ═══════════════════════════════════════════════════════════
# FUNCIÓN: ACTUALIZAR PACKAGE.JSON
# ═══════════════════════════════════════════════════════════
Function Update-PackageJson {
    Print-Header "ACTUALIZANDO: package.json"
    
    $packageJsonPath = Join-Path $ProjectRoot "package.json"
    
    Print-Info "Las siguientes dependencias deben añadirse a package.json:"
    Print-Info "  - i18next"
    Print-Info "  - react-i18next"
    Print-Info "  - expo-localization"
    Print-Info "  - expo-notifications"
    Print-Info "  - @react-native-async-storage/async-storage"
    
    Write-Host ""
    Print-Info "Ejecuta: npm install i18next react-i18next expo-localization expo-notifications @react-native-async-storage/async-storage"
    Write-Host ""
}

# ═══════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════
Clear-Host

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor $ColorGold
Write-Host "║                                                               ║" -ForegroundColor $ColorGold
Write-Host "║         L ' E S S E N C E   D U   L U X E   v2.0              ║" -ForegroundColor $ColorGold
Write-Host "║                   GLOBAL UPGRADE SCRIPT                       ║" -ForegroundColor $ColorGold
Write-Host "║                                                               ║" -ForegroundColor $ColorGold
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor $ColorGold
Write-Host ""

Print-Info "Iniciando actualización a versión 2.0 Global..."
Write-Host ""

# Ejecutar módulos
Create-I18nStructure
Create-NotificationService
Create-SocialService
Create-LanguageSelector
Create-MoodRadar
Create-ImplementationGuide
Update-PackageJson

# ═══════════════════════════════════════════════════════════
# RESUMEN FINAL
# ═══════════════════════════════════════════════════════════
Print-Header "RESUMEN DE ACTUALIZACIÓN"

Write-Host "✅ MÓDULOS CREADOS:" -ForegroundColor $ColorSuccess
Write-Host "   1. LINGUA FRANCA (i18n) - 3 idiomas: ES, EN, FR" -ForegroundColor $ColorInfo
Write-Host "   2. LE RAPPEL (Notificaciones) - Local + Programadas" -ForegroundColor $ColorInfo
Write-Host "   3. LE CERCLE (Social) - WhatsApp, Instagram, Share" -ForegroundColor $ColorInfo
Write-Host "   4. MOOD RADAR (Bonus) - Filtro visual por estado" -ForegroundColor $ColorInfo
Write-Host ""

Write-Host "📁 ARCHIVOS CREADOS:" -ForegroundColor $ColorSuccess
Write-Host "   └── src/i18n/" -ForegroundColor $ColorInfo
Write-Host "       ├── index.js" -ForegroundColor $ColorInfo
Write-Host "       └── locales/" -ForegroundColor $ColorInfo
Write-Host "           ├── es.json" -ForegroundColor $ColorInfo
Write-Host "           ├── en.json" -ForegroundColor $ColorInfo
Write-Host "           └── fr.json" -ForegroundColor $ColorInfo
Write-Host "   └── src/services/" -ForegroundColor $ColorInfo
Write-Host "       ├── NotificationService.js" -ForegroundColor $ColorInfo
Write-Host "       └── SocialService.js" -ForegroundColor $ColorInfo
Write-Host "   └── src/components/" -ForegroundColor $ColorInfo
Write-Host "       ├── LanguageSelector.js" -ForegroundColor $ColorInfo
Write-Host "       └── MoodRadar.js" -ForegroundColor $ColorInfo
Write-Host "   └── Guia_Implementacion_v2.md" -ForegroundColor $ColorInfo
Write-Host ""

Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor $ColorGold
Write-Host "   1. Instalar dependencias: npm install i18next react-i18next expo-localization expo-notifications @react-native-async-storage/async-storage" -ForegroundColor $ColorInfo
Write-Host "   2. Leer Guia_Implementacion_v2.md" -ForegroundColor $ColorInfo
Write-Host "   3. Modificar App.js según la guía" -ForegroundColor $ColorInfo
Write-Host "   4. Probar: npx expo start --clear" -ForegroundColor $ColorInfo
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor $ColorGold
Write-Host "  ✨ UPGRADE COMPLETADO - L'Essence du Luxe v2.0 Global ✨" -ForegroundColor $ColorGold
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor $ColorGold
Write-Host ""

pause
