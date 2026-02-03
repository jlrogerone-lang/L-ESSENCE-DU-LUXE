/**
 * AUTHCONTEXT.JS - Contexto de Autenticación
 * Gestión global del estado de autenticación
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChange, getCurrentUser } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribirse a cambios de autenticación
    const unsubscribe = onAuthStateChange((authState) => {
      setUser(authState.user);
      setIsAuthenticated(authState.isAuthenticated);
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
