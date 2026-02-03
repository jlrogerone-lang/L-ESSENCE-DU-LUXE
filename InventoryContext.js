/**
 * INVENTORYCONTEXT.JS - Contexto de Inventario
 * Gestión global de protocolos y sincronización
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { PROTOCOLS_FULL } from '../data/protocols';
import FirestoreService from '../services/FirestoreService';
import { useAuth } from './AuthContext';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [protocols, setProtocols] = useState(PROTOCOLS_FULL);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Cargar protocolos de Firestore cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProtocolsFromCloud();
    } else {
      // Usuario no autenticado, usar datos locales
      setProtocols(PROTOCOLS_FULL);
    }
  }, [isAuthenticated, user]);

  const loadProtocolsFromCloud = async () => {
    setLoading(true);
    try {
      const result = await FirestoreService.getUserProtocols(user.uid);
      if (result.success && result.data.length > 0) {
        setProtocols(result.data);
      } else {
        // Si no hay protocolos en la nube, usar los locales
        setProtocols(PROTOCOLS_FULL);
      }
    } catch (error) {
      console.error('Error cargando protocolos:', error);
      setProtocols(PROTOCOLS_FULL);
    } finally {
      setLoading(false);
    }
  };

  const addProtocol = async (protocol) => {
    const newProtocol = {
      ...protocol,
      id: `USR-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Agregar localmente
    setProtocols(prev => [newProtocol, ...prev]);

    // Sincronizar con la nube si está autenticado
    if (isAuthenticated && user) {
      setSyncing(true);
      await FirestoreService.saveProtocol(user.uid, newProtocol);
      setSyncing(false);
    }

    return newProtocol;
  };

  const updateProtocol = async (protocolId, updates) => {
    // Actualizar localmente
    setProtocols(prev =>
      prev.map(p => p.id === protocolId ? { ...p, ...updates } : p)
    );

    // Sincronizar con la nube
    if (isAuthenticated && user) {
      setSyncing(true);
      await FirestoreService.updateProtocol(user.uid, protocolId, updates);
      setSyncing(false);
    }
  };

  const deleteProtocol = async (protocolId) => {
    // Eliminar localmente
    setProtocols(prev => prev.filter(p => p.id !== protocolId));

    // Sincronizar con la nube
    if (isAuthenticated && user) {
      setSyncing(true);
      await FirestoreService.deleteProtocol(user.uid, protocolId);
      setSyncing(false);
    }
  };

  const syncToCloud = async () => {
    if (!isAuthenticated || !user) return;

    setSyncing(true);
    try {
      // Guardar todos los protocolos locales en la nube
      for (const protocol of protocols) {
        await FirestoreService.saveProtocol(user.uid, protocol);
      }
    } catch (error) {
      console.error('Error sincronizando:', error);
    } finally {
      setSyncing(false);
    }
  };

  const value = {
    protocols,
    loading,
    syncing,
    addProtocol,
    updateProtocol,
    deleteProtocol,
    syncToCloud,
    loadProtocolsFromCloud,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Hook personalizado
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider');
  }
  return context;
};

export default InventoryContext;
