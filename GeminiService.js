/**
 * GEMINISERVICE.JS - Servicio de Inteligencia Artificial
 * Conecta con Google Gemini para:
 * 1. Auditoría Automática de 6 Pilares
 * 2. Búsqueda Semántica en Bibliothèque
 * 3. Génesis Cuántica (crear layerings)
 */

import { API_KEYS, API_URLS } from '../config/constants';

// ═══════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════
const GEMINI_API_KEY = API_KEYS.GEMINI_API_KEY;
const BASE_URL = `${API_URLS.GEMINI_BASE}/models/${API_URLS.GEMINI_MODEL}:generateContent`;

/**
 * Realizar petición a Gemini API
 * @param {string} prompt - Instrucciones para la IA
 * @param {number} maxTokens - Límite de tokens de respuesta
 * @returns {Promise<string>} Respuesta de la IA
 */
const callGeminiAPI = async (prompt, maxTokens = 2000) => {
  try {
    const response = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extraer texto de la respuesta
    if (data.candidates && data.candidates[0]?.content?.parts) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Formato de respuesta inválido');
    
  } catch (error) {
    console.error('✗ Error en Gemini API:', error);
    throw error;
  }
};

/**
 * Limpiar respuesta JSON de Gemini (eliminar markdown)
 * @param {string} text - Texto con posible markdown
 * @returns {Object} Objeto JSON parseado
 */
const cleanAndParseJSON = (text) => {
  // Eliminar markdown ```json ... ```
  let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  // Parsear JSON
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('✗ Error al parsear JSON:', cleaned);
    throw new Error('Respuesta de IA no válida');
  }
};

// ═══════════════════════════════════════════════════════════
// AUDITORÍA DE 6 PILARES
// ═══════════════════════════════════════════════════════════

/**
 * Ejecutar Auditoría Completa de 6 Pilares
 * El corazón del sistema: analiza un perfume y genera su ficha técnica
 * 
 * @param {string} perfumeName - Nombre del perfume a auditar
 * @param {string|null} nicheReference - Perfume nicho de referencia (opcional)
 * @param {Array} availableAssets - Lista de perfumes disponibles del usuario
 * @returns {Promise<Object>} Auditoría completa con los 6 pilares
 */
export const auditPerfume = async (perfumeName, nicheReference = null, availableAssets = []) => {
  const assetsText = availableAssets.length > 0 
    ? `Activos disponibles del usuario: ${availableAssets.join(', ')}`
    : 'No hay información de activos disponibles';
  
  const prompt = `
Eres un MAESTRO PERFUMISTA DE ÉLITE con 30 años de experiencia en perfumería de nicho.
Tu misión es realizar una AUDITORÍA FINANCIERA Y TÉCNICA completa de 6 PILARES para:

PERFUME A ANALIZAR: "${perfumeName}"
${nicheReference ? `REFERENCIA NICHO: "${nicheReference}"` : ''}
${assetsText}

═══════════════════════════════════════════════════════════
INSTRUCCIONES CRÍTICAS:
═══════════════════════════════════════════════════════════
1. Debes analizar este perfume desde 6 perspectivas profesionales
2. Si el perfume es un layering, identifica los componentes exactos
3. Si es un perfume comercial, sugiere cómo replicarlo con layering
4. Calcula el AHORRO REAL en Euros comparando con el referente nicho

FORMATO DE RESPUESTA (JSON PURO, SIN TEXTO ADICIONAL):
{
  "pillar1_strategy": "Nombre de la operación (estilo militar/lujo). Ejemplo: 'Operación Rosa Sombría'",
  "pillar2_assets": "Lista de activos/ingredientes clave. Ejemplo: 'Boss Parfum (base ámbar) + Chloé Nomade (rosa)'",
  "pillar3_financial": "Análisis coste vs nicho. Ejemplo: 'Coste real: 85€. Referente Nicho: Portrait of a Lady (340€). AHORRO: 255€ (75%)'",
  "pillar4_protocol": "Protocolo paso a paso. Ejemplo: '1) 3 sprays Boss Parfum en pecho como base\\n2) 2 sprays Chloé Nomade en hombros\\n3) Esperar 60-90s sin frotar'",
  "pillar5_timing": "Factor tiempo. Ejemplo: 'Secado óptimo: 90 segundos. NO FROTAR. La fricción destruye la complejidad molecular'",
  "pillar6_chemistry": "Compatibilidad química. Ejemplo: 'Familia: Floral Ámbar. Parentesco molecular: 92% con Portrait of a Lady. Longevidad: 8-10h'",
  "qualityScore": 95,
  "nicheReferent": "Portrait of a Lady (F. Malle)",
  "dayNight": "Noche",
  "season": "Otoño/Invierno"
}

IMPORTANTE: 
- Los precios deben ser REALES y en Euros
- El ahorro debe calcularse correctamente
- El protocolo debe ser QUIRÚRGICAMENTE PRECISO
- La puntuación (qualityScore) debe ser objetiva (1-100)
`;

  try {
    const rawResponse = await callGeminiAPI(prompt, 2500);
    const audit = cleanAndParseJSON(rawResponse);
    
    // Validar que tenga los 6 pilares
    const requiredFields = [
      'pillar1_strategy',
      'pillar2_assets',
      'pillar3_financial',
      'pillar4_protocol',
      'pillar5_timing',
      'pillar6_chemistry',
      'qualityScore',
      'nicheReferent'
    ];
    
    const missingFields = requiredFields.filter(field => !audit[field]);
    if (missingFields.length > 0) {
      throw new Error(`Auditoría incompleta: faltan ${missingFields.join(', ')}`);
    }
    
    console.log('✓ Auditoría 6 Pilares completada:', perfumeName);
    return audit;
    
  } catch (error) {
    console.error('✗ Error en auditoría:', error);
    throw error;
  }
};

// ═══════════════════════════════════════════════════════════
// BIBLIOTHÈQUE UNIVERSELLE - BÚSQUEDA SEMÁNTICA
// ═══════════════════════════════════════════════════════════

/**
 * Buscar perfumes en la "Bibliothèque" (enciclopedia olfativa)
 * Usa Gemini para búsqueda semántica inteligente
 * 
 * @param {string} query - Búsqueda del usuario
 * @param {number} maxResults - Número máximo de resultados
 * @returns {Promise<Array>} Lista de perfumes encontrados
 */
export const searchBibliotheque = async (query, maxResults = 5) => {
  const prompt = `
Eres un ENCICLOPEDISTA OLFATIVO con conocimiento completo de todos los perfumes creados.

BÚSQUEDA DEL USUARIO: "${query}"

INSTRUCCIONES:
1. Busca perfumes que coincidan con esta búsqueda
2. Incluye tanto perfumes comerciales como de nicho
3. Prioriza los más relevantes y conocidos
4. Incluye información precisa (casa, año, notas)

FORMATO DE RESPUESTA (JSON, ${maxResults} resultados):
[
  {
    "name": "Nombre del perfume",
    "house": "Casa/Marca",
    "year": "Año de lanzamiento",
    "notes": "Notas principales (top/corazón/base)",
    "description": "Descripción lujosa de 1-2 líneas",
    "type": "Eau de Parfum/Toilette/etc",
    "price": "Precio aproximado en EUR (puede ser null)"
  }
]

Ejemplo:
[
  {
    "name": "Baccarat Rouge 540",
    "house": "Maison Francis Kurkdjian",
    "year": "2015",
    "notes": "Azafrán, Ámbar gris, Cedro",
    "description": "Una alquimia poética gráfica y condensada. Luminoso y etéreo.",
    "type": "Extrait de Parfum",
    "price": "260"
  }
]
`;

  try {
    const rawResponse = await callGeminiAPI(prompt, 1500);
    const results = cleanAndParseJSON(rawResponse);
    
    if (!Array.isArray(results)) {
      throw new Error('La respuesta no es un array');
    }
    
    console.log(`✓ Bibliothèque: ${results.length} resultados para "${query}"`);
    return results;
    
  } catch (error) {
    console.error('✗ Error en búsqueda de Bibliothèque:', error);
    throw error;
  }
};

// ═══════════════════════════════════════════════════════════
// GÉNESIS CUÁNTICA - CREACIÓN DE LAYERINGS
// ═══════════════════════════════════════════════════════════

/**
 * Crear un layering nuevo usando el inventario del usuario
 * "Génesis Cuántica": la IA inventa combinaciones nunca antes creadas
 * 
 * @param {Array} userInventory - Perfumes disponibles del usuario
 * @param {string} desiredProfile - Perfil deseado (ej: "fresco veraniego", "oriental nocturno")
 * @returns {Promise<Object>} Nuevo protocolo de layering
 */
export const quantumGenesis = async (userInventory, desiredProfile = null) => {
  const inventoryText = userInventory.map(p => `- ${p.name || p}`).join('\n');
  
  const prompt = `
Eres un ALQUIMISTA CUÁNTICO con la habilidad de crear fórmulas olfativas únicas.

INVENTARIO DEL USUARIO:
${inventoryText}

${desiredProfile ? `PERFIL DESEADO: "${desiredProfile}"` : 'PERFIL: Sorpréndeme con algo único'}

INSTRUCCIONES:
1. Crea un layering ORIGINAL usando SOLO los perfumes del inventario
2. Debe ser una combinación que probablemente nadie haya hecho antes
3. Explica la lógica química detrás de la combinación
4. Asigna un nombre de "operación" épico

FORMATO DE RESPUESTA (JSON):
{
  "operationName": "Nombre épico de la operación",
  "assets": ["Perfume 1", "Perfume 2"],
  "protocol": "1) X sprays de Perfume 1 en zona\\n2) Y sprays de Perfume 2 en zona\\n3) Esperar Z segundos",
  "chemistryExplanation": "Por qué funciona esta combinación a nivel molecular",
  "expectedProfile": "Cómo debería oler el resultado final",
  "qualityScore": 85,
  "difficulty": "Media",
  "bestFor": "Día/Noche/Versatil"
}
`;

  try {
    const rawResponse = await callGeminiAPI(prompt, 1500);
    const genesis = cleanAndParseJSON(rawResponse);
    
    console.log('✓ Génesis Cuántica completada:', genesis.operationName);
    return genesis;
    
  } catch (error) {
    console.error('✗ Error en Génesis Cuántica:', error);
    throw error;
  }
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════
export default {
  auditPerfume,
  searchBibliotheque,
  quantumGenesis,
};
