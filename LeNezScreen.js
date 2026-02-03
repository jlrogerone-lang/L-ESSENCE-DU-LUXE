/**
 * LENEZSCREEN.JS - Le Nez (Oracle de IA)
 * Chat inteligente para consultas olfativas
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { THEME } from '../config/theme';
import GeminiService from '../services/GeminiService';

export default function LeNezScreen() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour! Soy Le Nez, tu Oracle Olfativo. Pregúntame sobre perfumes, layering, o cualquier duda que tengas.',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Llamar a Gemini para respuesta
      const response = await GeminiService.searchBibliotheque(inputText, 1);
      
      // Simular respuesta (en producción real, crearías un método específico en GeminiService)
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.length > 0 
          ? `He encontrado información sobre "${response[0].name}": ${response[0].description}`
          : 'No he encontrado información específica. ¿Podrías reformular tu pregunta?',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    } catch (error) {
      console.error('Error en chat:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Disculpa, he tenido un problema procesando tu consulta. Intenta nuevamente.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === 'user' ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      {item.role === 'assistant' && (
        <Sparkles size={14} color={THEME.colors.gold} style={styles.icon} />
      )}
      
      <Text
        style={[
          styles.messageText,
          item.role === 'user' ? styles.userText : styles.assistantText,
        ]}
      >
        {item.content}
      </Text>

      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Sparkles size={24} color={THEME.colors.gold} />
        <View style={styles.headerText}>
          <Text style={styles.title}>LE NEZ</Text>
          <Text style={styles.subtitle}>Oracle Olfativo</Text>
        </View>
      </View>

      {/* MENSAJES */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pregunta sobre perfumes..."
          placeholderTextColor={THEME.colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || loading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        >
          <Send size={20} color={!inputText.trim() || loading ? THEME.colors.textMuted : '#000'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.cardBorder,
  },
  headerText: {
    marginLeft: 12,
  },
  title: {
    color: THEME.colors.gold,
    fontSize: THEME.fonts.sizes.xl,
    fontFamily: THEME.fonts.serif,
    fontWeight: 'bold',
  },
  subtitle: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fonts.sizes.xs,
  },
  messagesList: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: THEME.colors.gold,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.card,
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
  },
  messageText: {
    fontSize: THEME.fonts.sizes.md,
    lineHeight: 20,
  },
  userText: {
    color: '#000',
  },
  assistantText: {
    color: THEME.colors.textMain,
  },
  timestamp: {
    fontSize: THEME.fonts.sizes.xs,
    color: THEME.colors.textMuted,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  icon: {
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.cardBorder,
    backgroundColor: THEME.colors.bgSecondary,
  },
  input: {
    flex: 1,
    backgroundColor: THEME.colors.card,
    color: THEME.colors.textMain,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.cardBorder,
    maxHeight: 100,
    fontSize: THEME.fonts.sizes.md,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: THEME.colors.gold,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: THEME.colors.card,
  },
});
