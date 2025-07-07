import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { processVoiceCommand } from '../services/geminiApi';

/**
 * VoiceAssistantScreen - Voice-based interface for blind users
 * Features speech-to-text input and text-to-speech output
 */
const VoiceAssistantScreen = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    // Greet user when screen loads
    greetUser();
  }, []);

  // Greet the user when they enter the screen
  const greetUser = () => {
    const greeting = "Welcome to AccessEase Voice Assistant. I'm here to help you with any questions or tasks you may have. Tap the microphone button to start speaking, or tap anywhere on the screen to hear this message again.";
    speakText(greeting);
  };

  // Text-to-speech function
  const speakText = (text) => {
    setIsSpeaking(true);
    Speech.speak(text, {
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      rate: 0.8, // Slightly slower for better comprehension
      pitch: 1.0,
    });
  };

  // Simulate voice recognition for demo purposes
  const startListening = async () => {
    setIsListening(true);
    setTranscribedText('');

    // Simulate listening for 3 seconds
    setTimeout(() => {
      setIsListening(false);
      // Simulate a voice command for demo
      const demoCommands = [
        "What's the weather like today?",
        "Help me find accessible transportation",
        "Read my messages",
        "What time is it?",
        "Help me with navigation"
      ];
      const randomCommand = demoCommands[Math.floor(Math.random() * demoCommands.length)];
      setTranscribedText(randomCommand);
      processUserCommand(randomCommand);
    }, 3000);
  };

  // Stop voice recognition
  const stopListening = async () => {
    setIsListening(false);
  };

  // Process the user's voice command
  const processUserCommand = async (command) => {
    setIsProcessing(true);
    
    try {
      const response = await processVoiceCommand(command);
      speakText(response);
    } catch (error) {
      console.error('Error processing command:', error);
      speakText("I'm sorry, I encountered an error processing your request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle screen tap (for accessibility)
  const handleScreenTap = () => {
    if (!isListening && !isProcessing && !isSpeaking) {
      greetUser();
    }
  };

  // Handle microphone button press
  const handleMicrophonePress = () => {
    if (isListening) {
      stopListening();
    } else if (!isProcessing && !isSpeaking) {
      startListening();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.screenTouchArea}
        onPress={handleScreenTap}
        activeOpacity={1}
        accessibilityLabel="Tap anywhere to hear instructions again"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back to disability selection"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Voice Assistant</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Processing...</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
          ) : (
            <View style={styles.listeningContainer}>
              <TouchableOpacity
                style={[
                  styles.listeningButton,
                  isListening && styles.listeningButtonActive
                ]}
                onPress={handleMicrophonePress}
                accessibilityLabel={isListening ? "Stop listening" : "Start listening"}
                accessibilityState={{ selected: isListening }}
              >
                <Ionicons 
                  name="mic" 
                  size={32} 
                  color="#FFFFFF" 
                />
                <Text style={styles.listeningButtonText}>
                  {isListening ? 'Listening...' : 'Tap to Speak'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Microphone Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.bottomMicButton,
              (isListening || isProcessing || isSpeaking) && styles.bottomMicButtonDisabled
            ]}
            onPress={handleMicrophonePress}
            disabled={isProcessing || isSpeaking}
            accessibilityLabel="Voice input button"
          >
            <Ionicons 
              name="mic" 
              size={24} 
              color={isProcessing || isSpeaking ? "#9E9E9E" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenTouchArea: {
    flex: 1,
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
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  listeningContainer: {
    alignItems: 'center',
  },
  listeningButton: {
    backgroundColor: '#2196F3',
    borderRadius: 80,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  listeningButtonActive: {
    backgroundColor: '#1976D2',
    transform: [{ scale: 1.05 }],
  },
  listeningButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  processingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  processingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    width: '60%',
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    alignItems: 'center',
  },
  bottomMicButton: {
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bottomMicButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});

export default VoiceAssistantScreen;
