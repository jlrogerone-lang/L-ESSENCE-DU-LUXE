/**
 * VALIDATORS.JS - Funciones de Validación
 * Validadores para datos de la aplicación
 */

/**
 * Validar protocolo completo
 * @param {object} protocol - Protocolo a validar
 * @returns {object} {valid: boolean, errors: array}
 */
export const validateProtocol = (protocol) => {
  const errors = [];

  if (!protocol.op || protocol.op.trim() === '') {
    errors.push('El nombre de la operación es obligatorio');
  }

  if (!protocol.activos || protocol.activos.trim() === '') {
    errors.push('Los activos son obligatorios');
  }

  if (!protocol.cat) {
    errors.push('La categoría es obligatoria');
  }

  if (protocol.qualityScore && (protocol.qualityScore < 0 || protocol.qualityScore > 100)) {
    errors.push('El quality score debe estar entre 0 y 100');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar URL
 * @param {string} url - URL a validar
 * @returns {boolean}
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validar que un número esté en un rango
 * @param {number} value - Valor a validar
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {boolean}
 */
export const validateRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Validar longitud de texto
 * @param {string} text - Texto a validar
 * @param {number} minLength - Longitud mínima
 * @param {number} maxLength - Longitud máxima
 * @returns {boolean}
 */
export const validateLength = (text, minLength = 0, maxLength = Infinity) => {
  if (!text) return minLength === 0;
  return text.length >= minLength && text.length <= maxLength;
};

/**
 * Validar categoría de protocolo
 * @param {string} category - Categoría
 * @returns {boolean}
 */
export const validateCategory = (category) => {
  const validCategories = ['Diamante', 'Nicho', 'Verano', 'Oficina', 'Alquimia'];
  return validCategories.includes(category);
};

/**
 * Validar datos de auditoría 6 pilares
 * @param {object} audit - Datos de auditoría
 * @returns {object} {valid: boolean, errors: array}
 */
export const validateAudit = (audit) => {
  const errors = [];

  const requiredFields = [
    'pillar1_strategy',
    'pillar2_assets',
    'pillar3_financial',
    'pillar4_protocol',
    'pillar5_timing',
    'pillar6_chemistry',
  ];

  requiredFields.forEach(field => {
    if (!audit[field]) {
      errors.push(`Falta el campo: ${field}`);
    }
  });

  if (audit.qualityScore && !validateRange(audit.qualityScore, 0, 100)) {
    errors.push('Quality score debe estar entre 0 y 100');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitizar texto (eliminar caracteres peligrosos)
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  
  // Eliminar scripts y tags HTML
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

/**
 * Validar JSON
 * @param {string} jsonString - String JSON
 * @returns {boolean}
 */
export const validateJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

export default {
  validateProtocol,
  validateEmail,
  validateURL,
  validateRange,
  validateLength,
  validateCategory,
  validateAudit,
  sanitizeText,
  validateJSON,
};
