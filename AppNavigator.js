/**
 * APPNAVIGATOR.JS - Navegación Centralizada
 * Sistema de navegación completo con autenticación
 */

import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Search, Database, Sparkles, User } from 'lucide-react-native';

import { AuthContext } from '../context/AuthContext';
import { THEME } from '../config/theme';

// Pantallas
import LoginScreen from '../screens/LoginScreen';
import BibliothequeScreen from '../screens/BibliothequeScreen';
import CavaScreen from '../screens/CavaScreen';
import LeNezScreen from '../screens/LeNezScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Navegador de Tabs Principal (Pantallas autenticadas)
 */
function MainTabs() {
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
      <Tab.Screen
        name="Bibliothèque"
        component={BibliothequeScreen}
        options={{
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      
      <Tab.Screen
        name="Cava"
        component={CavaScreen}
        options={{
          tabBarIcon: ({ color }) => <Database color={color} size={24} />,
        }}
      />
      
      <Tab.Screen
        name="Le Nez"
        component={LeNezScreen}
        options={{
          tabBarIcon: ({ color }) => <Sparkles color={color} size={24} />,
        }}
      />
      
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

/**
 * Navegador Principal con Autenticación
 */
export default function AppNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return null; // O un LoadingScreen
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Usuario NO autenticado → mostrar Login
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Usuario autenticado → mostrar app principal
        <Stack.Screen name="Main" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
}
