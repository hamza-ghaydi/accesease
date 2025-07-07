import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * DisabilityTypeScreen - Initial screen for selecting disability type
 * Allows users to choose between Blind, Deaf, or Motor Disability options
 */
const DisabilityTypeScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);

  // Handle disability type selection
  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  // Handle continue button press
  const handleContinue = () => {
    if (!selectedType) {
      Alert.alert('Selection Required', 'Please select a disability type to continue.');
      return;
    }

    // Navigate to appropriate screen based on selection
    switch (selectedType) {
      case 'blind':
        navigation.navigate('VoiceAssistant');
        break;
      case 'deaf':
        navigation.navigate('DeafAssistant');
        break;
      case 'motor':
        navigation.navigate('Chat');
        break;
      default:
        Alert.alert('Error', 'Please select a valid option.');
    }
  };

  // Render radio button option
  const renderRadioOption = (type, label) => (
    <TouchableOpacity
      key={type}
      style={styles.radioContainer}
      onPress={() => handleTypeSelection(type)}
      accessibilityRole="radio"
      accessibilityState={{ checked: selectedType === type }}
      accessibilityLabel={`${label} option`}
    >
      <View style={styles.radioContent}>
        <Text style={styles.radioLabel}>{label}</Text>
        <View style={styles.radioButton}>
          {selectedType === type && <View style={styles.radioButtonSelected} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AccessEase</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.questionText}>
          What type of disability do you have?
        </Text>

        <View style={styles.optionsContainer}>
          {renderRadioOption('blind', 'Blind')}
          {renderRadioOption('deaf', 'Deaf')}
          {renderRadioOption('motor', 'Motor Disability')}
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedType ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          accessibilityLabel="Continue to selected assistance type"
          accessibilityState={{ disabled: !selectedType }}
        >
          <Text style={[
            styles.continueButtonText,
            selectedType ? styles.continueButtonTextActive : styles.continueButtonTextInactive
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerSpacer: {
    width: 40, // Same width as back button to center title
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 40,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  radioContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  continueButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#2196F3',
  },
  continueButtonInactive: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextActive: {
    color: '#FFFFFF',
  },
  continueButtonTextInactive: {
    color: '#9E9E9E',
  },
});

export default DisabilityTypeScreen;
