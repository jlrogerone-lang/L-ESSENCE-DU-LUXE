/**
 * GLASSCARD.JS - Componente de Tarjeta con Efecto Glassmorphism
 * Tarjeta reutilizable con blur y transparencia
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { THEME } from '../config/theme';

export default function GlassCard({ 
  children, 
  style, 
  intensity = 80,
  borderColor = THEME.colors.cardBorder,
  ...props 
}) {
  return (
    <BlurView 
      intensity={intensity} 
      tint="dark" 
      style={[styles.container, { borderColor }, style]}
      {...props}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.glass,
    borderRadius: THEME.layout.radius,
    borderWidth: 1,
    overflow: 'hidden',
    padding: THEME.spacing.lg,
  },
});
