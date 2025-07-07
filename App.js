import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import DisabilityTypeScreen from './src/screens/DisabilityTypeScreen';
import VoiceAssistantScreen from './src/screens/VoiceAssistantScreen';
import ChatScreen from './src/screens/ChatScreen';
import DeafAssistantScreen from './src/screens/DeafAssistantScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="DisabilityType"
        screenOptions={{
          headerShown: false, // We'll create custom headers for each screen
        }}
      >
        <Stack.Screen
          name="DisabilityType"
          component={DisabilityTypeScreen}
        />
        <Stack.Screen
          name="VoiceAssistant"
          component={VoiceAssistantScreen}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
        <Stack.Screen
          name="DeafAssistant"
          component={DeafAssistantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
