import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDeafAssistantResponse } from '../services/geminiApi';

/**
 * DeafAssistantScreen - Visual interface for deaf users
 * Features large icons for different service categories and text-based responses
 */
const DeafAssistantScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Service categories with icons and descriptions
  const serviceCategories = [
    {
      id: 'transportation',
      title: 'Transportation',
      icon: 'car',
      description: 'Public transit, ride services, and accessible transportation options',
      color: '#2196F3',
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: 'document-text',
      description: 'Access and manage important documents and forms',
      color: '#4CAF50',
    },
    {
      id: 'emergency',
      title: 'Emergency',
      icon: 'warning',
      description: 'Emergency services and safety information',
      color: '#FF5722',
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: 'chatbubbles',
      description: 'Communication tools and interpretation services',
      color: '#9C27B0',
    },
  ];

  // Handle category selection
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category.id);
    setIsLoading(true);
    setResponseText('');

    try {
      const response = await getDeafAssistantResponse(category.id);
      setResponseText(response);
    } catch (error) {
      console.error('Error getting response:', error);
      setResponseText('Sorry, I encountered an error. Please try again or contact support for assistance.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear selection and response
  const clearSelection = () => {
    setSelectedCategory(null);
    setResponseText('');
  };

  // Render service category icon
  const renderCategoryIcon = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        { backgroundColor: category.color },
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => handleCategorySelect(category)}
      accessibilityLabel={`${category.title}: ${category.description}`}
      accessibilityRole="button"
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons 
          name={category.icon} 
          size={40} 
          color="#FFFFFF" 
        />
      </View>
      <Text style={styles.categoryTitle}>{category.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back to disability selection"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearSelection}
          accessibilityLabel="Clear selection"
        >
          <Ionicons name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Question */}
        <Text style={styles.mainQuestion}>How can I help you?</Text>

        {/* Service Categories Grid */}
        <View style={styles.categoriesGrid}>
          {serviceCategories.map(renderCategoryIcon)}
        </View>

        {/* Response Area */}
        {(responseText || isLoading) && (
          <View style={styles.responseContainer}>
            <View style={styles.responseHeader}>
              <Text style={styles.responseTitle}>
                {selectedCategory && serviceCategories.find(cat => cat.id === selectedCategory)?.title}
              </Text>
            </View>
            
            <View style={styles.responseContent}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>Loading information...</Text>
                  <View style={styles.loadingDots}>
                    <View style={[styles.dot, styles.dot1]} />
                    <View style={[styles.dot, styles.dot2]} />
                    <View style={[styles.dot, styles.dot3]} />
                  </View>
                </View>
              ) : (
                <Text style={styles.responseText}>{responseText}</Text>
              )}
            </View>
          </View>
        )}

        {/* Instructions */}
        {!selectedCategory && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              The assistant will respond with helpful information and resources based on your selection. 
              Tap on any category above to get started.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  clearButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainQuestion: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 32,
    lineHeight: 36,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryButtonSelected: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  categoryIconContainer: {
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  responseContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  responseHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  responseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  responseContent: {
    padding: 20,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  dot1: {
    opacity: 1,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 0.4,
  },
  instructionsContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1565C0',
    textAlign: 'center',
  },
});

export default DeafAssistantScreen;
