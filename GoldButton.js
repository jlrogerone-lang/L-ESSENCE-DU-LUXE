/**
 * GOLDBUTTON.JS - Botón Dorado Principal
 * Botón reutilizable con estilo de lujo y feedback háptico
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { THEME } from '../config/theme';

export default function GoldButton({ 
  title, 
  onPress, 
  loading = false,
  disabled = false,
  variant = 'primary', // primary, secondary, outline
  icon,
  style,
  ...props 
}) {
  
  const handlePress = () => {
    if (!disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress && onPress();
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? THEME.colors.gold : '#000'} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, getTextStyle()]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: THEME.layout.radiusSmall,
    minHeight: 48,
  },
  primary: {
    backgroundColor: THEME.colors.gold,
    ...THEME.shadows.medium,
  },
  secondary: {
    backgroundColor: THEME.colors.bgSecondary,
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: THEME.colors.gold,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: THEME.fonts.sizes.md,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  primaryText: {
    color: '#000',
  },
  outlineText: {
    color: THEME.colors.gold,
  },
  icon: {
    marginRight: 8,
  },
});
