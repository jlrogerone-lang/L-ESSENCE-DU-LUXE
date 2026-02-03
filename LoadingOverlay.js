/**
 * LOADINGOVERLAY.JS - Overlay de Carga
 * Pantalla de carga con efecto glassmorphism y mensaje personalizable
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { THEME } from '../config/theme';

export default function LoadingOverlay({ 
  visible = false, 
  message = 'Cargando...',
  subMessage = null,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <BlurView intensity={90} tint="dark" style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={THEME.colors.gold} />
          
          <Text style={styles.message}>{message}</Text>
          
          {subMessage && (
            <Text style={styles.subMessage}>{subMessage}</Text>
          )}
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: THEME.colors.card,
    padding: 40,
    borderRadius: THEME.layout.radiusLarge,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.gold,
    minWidth: 250,
    ...THEME.shadows.gold,
  },
  message: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.lg,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subMessage: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    marginTop: 8,
    textAlign: 'center',
  },
});
