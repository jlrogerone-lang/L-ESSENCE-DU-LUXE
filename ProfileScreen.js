/**
 * PROFILESCREEN.JS - Perfil del Usuario
 * Gestión de cuenta, suscripción y configuración
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { User, LogOut, Crown, Settings, Info } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { THEME } from '../config/theme';
import { APP_INFO } from '../config/constants';
import GoldButton from '../components/GoldButton';
import LoadingOverlay from '../components/LoadingOverlay';
import { logOut, getCurrentUser } from '../services/AuthService';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            
            const result = await logOut();
            
            if (result.success) {
              // En una app real, esto navegaría a LoginScreen
              Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
            } else {
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
            
            setLoading(false);
          },
        },
      ]
    );
  };

  const handleUpgrade = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Plan Alquimista',
      '¿Deseas actualizar a la versión premium?\n\n✨ Auditorías ilimitadas\n🔍 Búsquedas sin límite\n🚫 Sin anuncios\n\nPrecio: 4.99€/mes',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Actualizar', onPress: () => alert('RevenueCat integrado aquí') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER CON FOTO DE PERFIL */}
      <View style={styles.header}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <User size={40} color={THEME.colors.gold} />
          </View>
        )}

        <Text style={styles.name}>{user?.displayName || 'Usuario'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>

        {/* Badge de Plan */}
        <View style={styles.planBadge}>
          <Crown size={14} color={THEME.colors.gold} />
          <Text style={styles.planText}>PLAN APRENDIZ</Text>
        </View>
      </View>

      {/* SECCIÓN: SUSCRIPCIÓN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUSCRIPCIÓN</Text>
        
        <TouchableOpacity style={styles.card} onPress={handleUpgrade}>
          <View style={styles.cardLeft}>
            <Crown size={20} color={THEME.colors.gold} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Actualizar a Alquimista</Text>
              <Text style={styles.cardSubtitle}>Desbloquea todo el potencial</Text>
            </View>
          </View>
          <Text style={styles.cardPrice}>4.99€/mes</Text>
        </TouchableOpacity>
      </View>

      {/* SECCIÓN: ESTADÍSTICAS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ESTADÍSTICAS</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>46</Text>
            <Text style={styles.statLabel}>Protocolos</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3/3</Text>
            <Text style={styles.statLabel}>Búsquedas Hoy</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1/1</Text>
            <Text style={styles.statLabel}>Auditorías Hoy</Text>
          </View>
        </View>
      </View>

      {/* SECCIÓN: CONFIGURACIÓN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONFIGURACIÓN</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => alert('Ajustes aquí')}
        >
          <Settings size={20} color={THEME.colors.textSecondary} />
          <Text style={styles.menuText}>Ajustes de la App</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert(
            'Acerca de',
            `${APP_INFO.name}\nVersión ${APP_INFO.version}\n\n${APP_INFO.description}`
          )}
        >
          <Info size={20} color={THEME.colors.textSecondary} />
          <Text style={styles.menuText}>Acerca de</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <GoldButton
        title="CERRAR SESIÓN"
        variant="outline"
        icon={<LogOut size={18} color={THEME.colors.gold} />}
        onPress={handleLogout}
        style={styles.logoutButton}
      />

      {/* FOOTER */}
      <Text style={styles.footer}>
        {APP_INFO.name} • Versión {APP_INFO.version}
      </Text>

      <LoadingOverlay visible={loading} message="Cerrando sesión..." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.bg,
  },
  content: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.cardBorder,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: THEME.colors.gold,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.card,
    borderWidth: 2,
    borderColor: THEME.colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.xl,
    fontWeight: 'bold',
    marginTop: 12,
  },
  email: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    marginTop: 4,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.colors.gold,
    marginTop: 12,
  },
  planText: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xs,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.sm,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: THEME.colors.card,
    padding: 16,
    borderRadius: THEME.layout.radius,
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    marginLeft: 12,
  },
  cardTitle: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.md,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.xs,
    marginTop: 2,
  },
  cardPrice: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.md,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: THEME.colors.card,
    padding: 16,
    borderRadius: THEME.layout.radius,
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xxl,
    fontWeight: 'bold',
  },
  statLabel: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.xs,
    marginTop: 4,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.cardBorder,
  },
  menuText: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.md,
    marginLeft: 12,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  footer: {
    color: THEME.colors.textMuted,
    fontSize: THEME.fonts.sizes.xs,
    textAlign: 'center',
    marginTop: 30,
  },
});
