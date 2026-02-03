/**
 * THEME.JS - Configuración Visual de L'Essence du Luxe
 * Sistema de diseño centralizado para toda la aplicación
 * Paleta: Oscuridad OLED + Acentos Dorados
 */

export const THEME = {
  // ═══════════════════════════════════════════════════════════
  // PALETA DE COLORES
  // ═══════════════════════════════════════════════════════════
  colors: {
    // Fondos
    bg: '#050505',              // Negro OLED principal
    bgSecondary: '#0A0A0A',     // Negro secundario (inputs, cards)
    card: '#121212',            // Cards glassmorphism
    cardBorder: '#2A2A2A',      // Bordes sutiles
    
    // Marca (El Dorado)
    gold: '#D4AF37',            // Dorado principal (CTA, highlights)
    goldDim: 'rgba(212, 175, 55, 0.3)',  // Dorado transparente
    goldGlow: 'rgba(212, 175, 55, 0.15)', // Glow effect
    
    // Textos
    textMain: '#FFFFFF',        // Texto principal
    textSecondary: '#888888',   // Texto secundario
    textMuted: '#666666',       // Texto desactivado
    
    // Estados
    success: '#10B981',         // Verde (confirmaciones)
    danger: '#F43F5E',          // Rojo (errores, eliminaciones)
    warning: '#F59E0B',         // Amarillo (alertas)
    info: '#3B82F6',            // Azul (información)
    
    // Efectos especiales
    glass: 'rgba(20, 20, 20, 0.85)',     // Glassmorphism
    overlay: 'rgba(0, 0, 0, 0.7)',       // Overlays de modal
    gradient: {
      gold: ['#D4AF37', '#F4D03F', '#D4AF37'],
      dark: ['#000000', '#1A1A1A', '#000000'],
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // TIPOGRAFÍAS
  // ═══════════════════════════════════════════════════════════
  fonts: {
    // Familias (se cargan con expo-font)
    serif: 'Cinzel-Bold',          // Títulos de lujo
    serifRegular: 'PlayfairDisplay-Regular', // Textos largos
    sans: 'System',                 // Fallback del sistema
    mono: 'Courier',                // Códigos, datos técnicos
    
    // Tamaños
    sizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      hero: 42,
    },
    
    // Pesos
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700',
      black: '900',
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // ESPACIADO & LAYOUT
  // ═══════════════════════════════════════════════════════════
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  layout: {
    radius: 16,              // Radio de borde por defecto
    radiusSmall: 8,          // Radio pequeño (inputs)
    radiusLarge: 24,         // Radio grande (cards)
    padding: 20,             // Padding estándar de pantalla
    maxWidth: 600,           // Ancho máximo de contenido
  },
  
  // ═══════════════════════════════════════════════════════════
  // EFECTOS & SOMBRAS
  // ═══════════════════════════════════════════════════════════
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 6,
    },
    gold: {
      shadowColor: '#D4AF37',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // ANIMACIONES (para Reanimated)
  // ═══════════════════════════════════════════════════════════
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      // Se usan con Reanimated: Easing.bezier(...)
      smooth: [0.25, 0.1, 0.25, 1],
      elastic: [0.68, -0.55, 0.265, 1.55],
    }
  },
};

/**
 * HELPER: Obtener estilos de glassmorphism
 */
export const glassStyle = {
  backgroundColor: THEME.colors.glass,
  borderWidth: 1,
  borderColor: THEME.colors.cardBorder,
  borderRadius: THEME.layout.radius,
};

/**
 * HELPER: Estilos de botón dorado
 */
export const goldButtonStyle = {
  backgroundColor: THEME.colors.gold,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: THEME.layout.radiusSmall,
  alignItems: 'center',
  justifyContent: 'center',
  ...THEME.shadows.medium,
};

export default THEME;
