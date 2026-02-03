/**
 * BIBLIOTHEQUESCREEN.JS - Enciclopedia Olfativa Universal
 * La nueva super-función: búsqueda en internet + auto-auditoría
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Search, PlusCircle, Globe, X, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { THEME } from '../config/theme';
import GeminiService from '../services/GeminiService';

export default function BibliothequeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [auditing, setAuditing] = useState(false);

  /**
   * Ejecutar búsqueda semántica
   */
  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('', 'Escribe algo para buscar');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    setResults([]);

    try {
      const searchResults = await GeminiService.searchBibliotheque(query, 5);
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        Alert.alert('Sin resultados', `No se encontraron perfumes para "${query}"`);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      Alert.alert('Error', 'No se pudo completar la búsqueda. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * MAGIA: Auto-Auditoría de 6 Pilares + Añadir a Cava
   */
  const executeAuditAndAdd = async (perfume) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    setAuditing(true);
    setSelectedItem(null); // Cerrar modal de detalle

    try {
      // 1. Ejecutar auditoría completa
      const audit = await GeminiService.auditPerfume(perfume.name, perfume.name);

      // 2. Navegar a la Cava con los datos pre-rellenados
      navigation.navigate('Cava', {
        newProtocol: {
          name: perfume.name,
          house: perfume.house,
          year: perfume.year,
          notes: perfume.notes,
          ...audit, // Los 6 pilares ya calculados
        }
      });

      setAuditing(false);
      
      Alert.alert(
        '✨ Auditoría Completa',
        `"${perfume.name}" ha sido analizado y añadido a tu cava.`,
        [{ text: 'Ver ahora', onPress: () => navigation.navigate('Cava') }]
      );

    } catch (error) {
      console.error('Error en auditoría:', error);
      setAuditing(false);
      Alert.alert('Error', 'No se pudo completar la auditoría. Intenta de nuevo.');
    }
  };

  /**
   * Renderizar cada resultado
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedItem(item);
      }}
      activeOpacity={0.7}
    >
      {/* Header: Casa + Año */}
      <View style={styles.cardHeader}>
        <Text style={styles.house}>{item.house}</Text>
        <Text style={styles.year}>{item.year || '—'}</Text>
      </View>

      {/* Nombre del perfume */}
      <Text style={styles.perfumeName}>{item.name}</Text>

      {/* Notas olfativas */}
      {item.notes && (
        <Text style={styles.notes}>
          <Text style={styles.notesLabel}>NOTAS: </Text>
          {item.notes}
        </Text>
      )}

      {/* Descripción */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Precio (si existe) */}
      {item.price && (
        <Text style={styles.price}>≈ {item.price}€</Text>
      )}

      {/* Botón de acción rápida */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => executeAuditAndAdd(item)}
        >
          <Sparkles size={14} color="#000" />
          <Text style={styles.addButtonText}>AUDITORÍA + AÑADIR</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>BIBLIOTHÈQUE UNIVERSELLE</Text>
        <Text style={styles.subtitle}>
          El conocimiento olfativo de la humanidad
        </Text>
      </View>

      {/* BARRA DE BÚSQUEDA */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color={THEME.colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Busca cualquier perfume del mundo..."
            placeholderTextColor={THEME.colors.textMuted}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Globe color={THEME.colors.gold} size={20} />
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </View>

      {/* RESULTADOS */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={THEME.colors.gold} />
          <Text style={styles.loadingText}>Consultando la red...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Globe size={48} color={THEME.colors.textMuted} />
              <Text style={styles.emptyText}>
                Busca cualquier perfume de la historia
              </Text>
              <Text style={styles.emptySubtext}>
                Baccarat Rouge, Aventus, Sauvage...
              </Text>
            </View>
          }
        />
      )}

      {/* MODAL DE DETALLE (Glassmorphism) */}
      <Modal
        visible={!!selectedItem && !auditing}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedItem(null)}
      >
        <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Botón cerrar */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedItem(null)}
            >
              <X color="#fff" size={24} />
            </TouchableOpacity>

            {/* Contenido */}
            <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
            <Text style={styles.modalHouse}>
              {selectedItem?.house} • {selectedItem?.year}
            </Text>

            {selectedItem?.notes && (
              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>NOTAS OLFATIVAS</Text>
                <Text style={styles.modalText}>{selectedItem.notes}</Text>
              </View>
            )}

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>DESCRIPCIÓN</Text>
              <Text style={styles.modalText}>{selectedItem?.description}</Text>
            </View>

            {selectedItem?.price && (
              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>PRECIO APROXIMADO</Text>
                <Text style={styles.modalPrice}>{selectedItem.price}€</Text>
              </View>
            )}

            {/* CTA Principal */}
            <TouchableOpacity
              style={styles.primaryCTA}
              onPress={() => executeAuditAndAdd(selectedItem)}
            >
              <Sparkles size={18} color="#000" />
              <Text style={styles.primaryCTAText}>
                EJECUTAR AUDITORÍA 6 PILARES
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      {/* MODAL DE AUDITORÍA EN PROGRESO */}
      <Modal visible={auditing} transparent animationType="fade">
        <View style={styles.auditingOverlay}>
          <View style={styles.auditingCard}>
            <ActivityIndicator size="large" color={THEME.colors.gold} />
            <Text style={styles.auditingTitle}>Ejecutando Auditoría...</Text>
            <Text style={styles.auditingText}>
              La IA está analizando los 6 pilares
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    fontStyle: 'italic',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.bgSecondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: THEME.layout.radiusSmall,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
  },
  searchInput: {
    flex: 1,
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.md,
    marginHorizontal: 10,
    fontFamily: THEME.fonts.mono,
  },
  searchButton: {
    backgroundColor: THEME.colors.gold,
    paddingVertical: 12,
    borderRadius: THEME.layout.radiusSmall,
    alignItems: 'center',
    marginTop: 12,
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: THEME.fonts.sizes.md,
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: THEME.colors.textSecondary,
    marginTop: 16,
    fontSize: THEME.fonts.sizes.md,
  },
  listContent: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: THEME.colors.card,
    padding: 16,
    borderRadius: THEME.layout.radius,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.gold,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  house: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  year: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xs,
    fontWeight: 'bold',
  },
  perfumeName: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.lg,
    fontFamily: THEME.fonts.serif,
    marginBottom: 8,
  },
  notes: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    marginBottom: 8,
  },
  notesLabel: {
    color: THEME.colors.gold,
    fontWeight: 'bold',
  },
  description: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  price: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.md,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickActions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.gold,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: THEME.fonts.sizes.xs,
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.lg,
    marginTop: 16,
  },
  emptySubtext: {
    color: THEME.colors.textMuted,
    fontSize: THEME.fonts.sizes.sm,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    padding: 24,
    borderRadius: THEME.layout.radiusLarge,
    borderWidth: 2,
    borderColor: THEME.colors.gold,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xxl,
    fontFamily: THEME.fonts.serif,
    marginTop: 10,
  },
  modalHouse: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.md,
    marginTop: 5,
  },
  modalSection: {
    marginTop: 20,
  },
  modalLabel: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xs,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  modalText: {
    color: THEME.colors.textMain,
    fontSize: THEME.fonts.sizes.md,
    lineHeight: 20,
  },
  modalPrice: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xl,
    fontWeight: 'bold',
  },
  primaryCTA: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.gold,
    paddingVertical: 16,
    borderRadius: THEME.layout.radiusSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    ...THEME.shadows.gold,
  },
  primaryCTAText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: THEME.fonts.sizes.md,
    marginLeft: 8,
    letterSpacing: 1,
  },
  auditingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  auditingCard: {
    backgroundColor: THEME.colors.card,
    padding: 40,
    borderRadius: THEME.layout.radius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.gold,
  },
  auditingTitle: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.lg,
    fontWeight: 'bold',
    marginTop: 16,
  },
  auditingText: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.sm,
    marginTop: 8,
  },
});
