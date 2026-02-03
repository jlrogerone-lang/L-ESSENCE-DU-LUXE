/**
 * FORMATTERS.JS - Funciones de Formateo
 * Helpers para formatear datos de la aplicación
 */

/**
 * Formatear precio en Euros
 * @param {number} price - Precio numérico
 * @returns {string} Precio formateado
 */
export const formatPrice = (price) => {
  if (!price || price === null) return '—';
  return `${price.toFixed(2)}€`;
};

/**
 * Formatear fecha relativa (hace X tiempo)
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha relativa
 */
export const formatRelativeDate = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Ahora mismo';
  if (minutes < 60) return `Hace ${minutes} min`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 7) return `Hace ${days} días`;
  
  return then.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  });
};

/**
 * Formatear quality score con color
 * @param {number} score - Puntuación (0-100)
 * @returns {object} {color, label}
 */
export const formatQualityScore = (score) => {
  if (score >= 90) return { color: '#D4AF37', label: 'Excelente' };
  if (score >= 80) return { color: '#10B981', label: 'Muy Bueno' };
  if (score >= 70) return { color: '#3B82F6', label: 'Bueno' };
  if (score >= 60) return { color: '#F59E0B', label: 'Aceptable' };
  return { color: '#F43F5E', label: 'Mejorable' };
};

/**
 * Formatear ahorro porcentual
 * @param {string} ahorro - String de ahorro (ej: "~65%")
 * @returns {string} Ahorro formateado
 */
export const formatSavings = (ahorro) => {
  if (!ahorro || ahorro === '—') return 'Sin datos';
  return ahorro;
};

/**
 * Truncar texto largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formatear nombre de protocolo
 * @param {string} name - Nombre del protocolo
 * @returns {string} Nombre formateado
 */
export const formatProtocolName = (name) => {
  if (!name) return 'Sin nombre';
  
  // Eliminar (Layering) del final
  return name.replace(/\(Layering\)$/i, '').trim();
};

/**
 * Formatear categoría
 * @param {string} category - Categoría
 * @returns {string} Categoría formateada
 */
export const formatCategory = (category) => {
  const categories = {
    'Diamante': '💎 Diamante',
    'Nicho': '🏛️ Nicho',
    'Verano': '☀️ Verano',
    'Oficina': '💼 Oficina',
    'Alquimia': '⚗️ Alquimia',
  };
  
  return categories[category] || category;
};

/**
 * Formatear tiempo de aplicación
 * @param {string} tiempo - Tiempo de secado
 * @returns {string} Tiempo formateado
 */
export const formatTiming = (tiempo) => {
  if (!tiempo || tiempo === '—') return 'Inmediato';
  
  // Convertir "60-120s" a "1-2 min"
  const match = tiempo.match(/(\d+)-(\d+)s/);
  if (match) {
    const min1 = Math.floor(parseInt(match[1]) / 60);
    const min2 = Math.floor(parseInt(match[2]) / 60);
    return `${min1}-${min2} min`;
  }
  
  return tiempo;
};

/**
 * Formatear lista de activos
 * @param {string} activos - String de activos separados por '+'
 * @returns {array} Array de activos
 */
export const parseAssets = (activos) => {
  if (!activos) return [];
  return activos.split('+').map(a => a.trim());
};

/**
 * Generar ID único
 * @returns {string} ID único
 */
export const generateId = () => {
  return `ID-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default {
  formatPrice,
  formatRelativeDate,
  formatQualityScore,
  formatSavings,
  truncateText,
  formatProtocolName,
  formatCategory,
  formatTiming,
  parseAssets,
  generateId,
};
