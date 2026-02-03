/**
 * LOGINSCREEN.JS - Pantalla de Autenticación
 * Inicio de sesión con Google Sign-In
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import GoldButton from '../components/GoldButton';
import LoadingOverlay from '../components/LoadingOverlay';
import { signInWithGoogle } from '../services/AuthService';
import { THEME } from '../config/theme';

export default function LoginScreen({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const result = await signInWithGoogle();

      if (result.success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onLoginSuccess && onLoginSuccess(result.user);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        alert(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error inesperado al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#1A1A1A', '#000000']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo / Título */}
        <View style={styles.header}>
          <Text style={styles.title}>L'ESSENCE</Text>
          <Text style={styles.subtitle}>DU LUXE</Text>
        </View>

        {/* Descripción */}
        <Text style={styles.tagline}>
          La Perfumería del Futuro
        </Text>
        <Text style={styles.description}>
          Arte Olfativo Democratizado mediante Inteligencia Artificial
        </Text>

        {/* Botón de Google Sign-In */}
        <View style={styles.buttonContainer}>
          <GoldButton
            title="CONECTAR CON GOOGLE"
            onPress={handleGoogleSignIn}
            loading={loading}
          />
          
          <Text style={styles.privacyText}>
            Al continuar, aceptas usar tu cuenta de Google{'\n'}
            para autenticación y servicios de IA
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Versión 2.0.0 • Arquitectura de Producción
        </Text>
      </View>

      <LoadingOverlay
        visible={loading}
        message="Iniciando sesión..."
        subMessage="Conectando con Google"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: THEME.colors.gold,
    fontSize: 48,
    fontFamily: THEME.fonts.serif,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  subtitle: {
    color: THEME.colors.gold,
    fontSize: 32,
    fontFamily: THEME.fonts.serif,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: -8,
  },
  tagline: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.lg,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  privacyText: {
    color: THEME.colors.textMuted,
    fontSize: THEME.fonts.sizes.xs,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    color: THEME.colors.textMuted,
    fontSize: THEME.fonts.sizes.xs,
    textAlign: 'center',
  },
});
