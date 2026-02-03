/**
 * CAVASCREEN.JS - Gestión de Inventario de Protocolos
 * La "cava" del usuario: todos sus layerings guardados
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Database, Sparkles, Trash2, Star } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { THEME } from '../config/theme';
import { PROTOCOLS_FULL } from '../data/protocols';

export default function CavaScreen({ route }) {
  const [protocols, setProtocols] = useState(PROTOCOLS_FULL);
  const [filter, setFilter] = useState('all'); // all, diamante, nicho, etc.

  // Si llega un nuevo protocolo desde Bibliothèque
  useEffect(() => {
    if (route.params?.newProtocol) {
      const newP = route.params.newProtocol;
      setProtocols(prev => [
        {
          id: `USR-${Date.now()}`,
          cat: 'Alquimia',
          op: newP.name,
          nicho: newP.pillar6_chemistry || 'N/A',
          valor: null,
          ahorro: newP.pillar3_financial || '—',
          activos: newP.pillar2_assets || '—',
          paso: newP.pillar4_protocol || '—',
          tiempo: newP.pillar5_timing || '—',
          quimica: newP.pillar6_chemistry || '—',
          qualityScore: newP.qualityScore || 85,
          dayNight: newP.dayNight || 'Día',
        },
        ...prev
      ]);

      // Limpiar parámetros
      route.params.newProtocol = null;
    }
  }, [route.params?.newProtocol]);

  const renderProtocol = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: getCategoryColor(item.cat) }
      ]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert(
          item.op,
          `${item.nicho}\n\nActivos: ${item.activos}\n\nProtocolo:\n${item.paso}`,
          [{ text: 'OK' }]
        );
      }}
      activeOpacity={0.8}
    >
      {/* Badge de categoría */}
      <View style={[styles.badge, { backgroundColor: getCategoryColor(item.cat) }]}>
        <Text style={styles.badgeText}>{item.cat.toUpperCase()}</Text>
      </View>

      {/* Nombre de la operación */}
      <Text style={styles.operationName}>{item.op}</Text>

      {/* Referente nicho */}
      <Text style={styles.nicheRef}>
        REF: {item.nicho}
      </Text>

      {/* Quality Score */}
      <View style={styles.scoreContainer}>
        <Star size={14} color={THEME.colors.gold} fill={THEME.colors.gold} />
        <Text style={styles.scoreText}>{item.qualityScore}/100</Text>
      </View>

      {/* Química */}
      <Text style={styles.chemistry}>{item.quimica}</Text>

      {/* Día/Noche */}
      <Text style={styles.dayNight}>{item.dayNight}</Text>
    </TouchableOpacity>
  );

  const getCategoryColor = (cat) => {
    const colors = {
      'Diamante': THEME.colors.gold,
      'Nicho': '#10B981',
      'Verano': '#3B82F6',
      'Oficina': '#8B5CF6',
      'Alquimia': '#F59E0B',
    };
    return colors[cat] || THEME.colors.gold;
  };

  const filteredProtocols = filter === 'all'
    ? protocols
    : protocols.filter(p => p.cat.toLowerCase() === filter);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>LA CAVA</Text>
        <Text style={styles.subtitle}>
          {filteredProtocols.length} protocolos • Valor estimado: {calculateTotalValue()}€
        </Text>
      </View>

      {/* FILTROS */}
      <View style={styles.filters}>
        {['all', 'diamante', 'nicho', 'verano', 'alquimia'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredProtocols}
        renderItem={renderProtocol}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );

  function calculateTotalValue() {
    return protocols
      .filter(p => p.valor)
      .reduce((sum, p) => sum + p.valor, 0);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.bg,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xxl,
    fontFamily: THEME.fonts.serif,
    fontWeight: 'bold',
  },
  subtitle: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    marginTop: 5,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
  },
  filterActive: {
    backgroundColor: THEME.colors.gold,
    borderColor: THEME.colors.gold,
  },
  filterText: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.xs,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#000',
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: THEME.colors.card,
    padding: 16,
    borderRadius: THEME.layout.radius,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: 'bold',
  },
  operationName: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.lg,
    fontFamily: THEME.fonts.serif,
    marginBottom: 6,
  },
  nicheRef: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.md,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  chemistry: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
  },
  dayNight: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xs,
    marginTop: 6,
    fontWeight: 'bold',
  },
});
