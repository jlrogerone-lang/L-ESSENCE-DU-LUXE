/**
 * APP.JS - Punto de Entrada Principal
 * L'Essence du Luxe - La Perfumería del Futuro
 */

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Search, Database, Sparkles, User } from 'lucide-react-native';

// Importar Contextos
import { AuthProvider } from './src/context/AuthContext';
import { InventoryProvider } from './src/context/InventoryContext';

// Importar pantallas
import BibliothequeScreen from './src/screens/BibliothequeScreen';
import CavaScreen from './src/screens/CavaScreen';
import LeNezScreen from './src/screens/LeNezScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Importar servicios
import { initializeGoogleSignIn } from './src/services/AuthService';
import { initializeRevenueCat } from './src/services/RevenueCatService';

// Tema
import { THEME } from './src/config/theme';

const Tab = createBottomTabNavigator();

// ═══════════════════════════════════════════════════════════
// NAVEGADOR PRINCIPAL
// ═══════════════════════════════════════════════════════════
function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME.colors.bg,
          borderTopColor: THEME.colors.cardBorder,
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: THEME.colors.gold,
        tabBarInactiveTintColor: THEME.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          fontFamily: THEME.fonts.serif,
        },
      }}
    >
      {/* BIBLIOTHÈQUE - Enciclopedia Universal */}
      <Tab.Screen
        name="Bibliothèque"
        component={BibliothequeScreen}
        options={{
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />

      {/* CAVA - Inventario de Protocolos */}
      <Tab.Screen
        name="Cava"
        component={CavaScreen}
        options={{
          tabBarIcon: ({ color }) => <Database color={color} size={24} />,
        }}
      />

      {/* LE NEZ - Oracle de IA (Chat) */}
      <Tab.Screen
        name="Le Nez"
        component={LeNezScreen}
        options={{
          tabBarIcon: ({ color }) => <Sparkles color={color} size={24} />,
        }}
      />

      {/* PERFIL - Usuario y Configuración */}
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL CON PROVIDERS
// ═══════════════════════════════════════════════════════════
export default function App() {
  
  // Inicialización de servicios al arrancar
  useEffect(() => {
    const initializeServices = async () => {
      // Inicializar Google Sign-In
      initializeGoogleSignIn();
      
      // Inicializar RevenueCat (monetización)
      await initializeRevenueCat();
      
      console.log('✓ App inicializada correctamente');
    };

    initializeServices();
  }, []);

  return (
    <AuthProvider>
      <InventoryProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <MainNavigator />
        </NavigationContainer>
      </InventoryProvider>
    </AuthProvider>
  );
}
