# AccessEase - Mobile Accessibility Assistant

AccessEase is a React Native mobile application designed to help people with disabilities by providing tailored assistance through different interfaces based on their specific needs.

## Features

### 🎯 Disability-Specific Interfaces
- **Blind Users**: Voice-based interface with speech-to-text and text-to-speech
- **Deaf Users**: Visual interface with large icons and text-based responses
- **Motor Disabilities**: Chat interface with text input and voice input options

### 🤖 AI Integration
- Powered by Google's Gemini AI model
- Context-aware responses tailored to accessibility needs
- Interactive assistance for various daily tasks

### 📱 Screens
1. **Disability Type Selection**: Choose your accessibility needs
2. **Voice Assistant**: Voice-controlled interface for blind users
3. **Chat Interface**: Text-based chat with AI assistant
4. **Visual Assistant**: Icon-based navigation for deaf users

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack Navigator)
- **AI Integration**: Google Gemini API
- **Speech**: Expo Speech (Text-to-Speech)
- **Icons**: Expo Vector Icons
- **Language**: JavaScript (JSX)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AccessEase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AI Integration (Optional)**

   **The app works immediately with mock responses!** No API setup required for testing.

   For production use with real AI responses:
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Open `src/services/geminiApi.js`
   - Change `USE_MOCK_RESPONSES = true` to `USE_MOCK_RESPONSES = false`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `w` to run in web browser for testing

## Project Structure

```
AccessEase/
├── App.js                          # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── DisabilityTypeScreen.js # Initial selection screen
│   │   ├── VoiceAssistantScreen.js # Voice interface for blind users
│   │   ├── ChatScreen.js           # Chat interface for motor disabilities
│   │   └── DeafAssistantScreen.js  # Visual interface for deaf users
│   └── services/
│       └── geminiApi.js            # AI integration service
├── assets/                         # App icons and images
└── package.json                    # Dependencies and scripts
```

## Usage

### For Blind Users
1. Select "Blind" on the initial screen
2. Tap the microphone button to start voice input
3. Speak your question or request
4. Listen to the AI's spoken response

### For Deaf Users
1. Select "Deaf" on the initial screen
2. Tap on category icons (Transportation, Documents, Emergency, Communication)
3. Read the text-based responses and information

### For Users with Motor Disabilities
1. Select "Motor Disability" on the initial screen
2. Type messages in the chat interface
3. Use the microphone button for voice input if needed
4. Interact with suggested action buttons

## Accessibility Features

- **Large touch targets** for easy interaction
- **High contrast colors** for better visibility
- **Screen reader support** with proper accessibility labels
- **Voice feedback** for blind users
- **Visual feedback** for deaf users
- **Simplified navigation** for users with motor disabilities

## AI Integration

### Mock Responses (Default)
The app comes with intelligent mock responses that work immediately without any setup:
- **Context-aware responses** for different disability types
- **Realistic conversation flow** for demonstration purposes
- **No API costs** during development and testing
- **Offline functionality** - works without internet connection

### Real AI Integration (Optional)
For production use, the app can integrate with Google's Gemini AI model:

#### Setup Steps:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Open `src/services/geminiApi.js`
4. Change `USE_MOCK_RESPONSES = true` to `USE_MOCK_RESPONSES = false`
5. Update the `GEMINI_API_KEY` with your actual API key

#### Benefits of Real AI:
- **Dynamic responses** based on user input
- **Learning capabilities** for better assistance
- **Broader knowledge base** for complex queries
- **Natural conversation flow**

## Development Notes

### Voice Recognition
- Currently uses simulated voice input for Expo Go compatibility
- For production, implement actual voice recognition using `@react-native-voice/voice`
- Requires custom development build for native voice features

### Testing
- Test on actual devices for best experience
- Use Expo Go for quick development testing
- Consider creating development builds for full native feature testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on different devices
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions about AccessEase, please contact the development team or create an issue in the repository.

---

**Note**: This app is designed to be a helpful tool for people with disabilities. Always ensure that critical accessibility needs are met through appropriate professional services and support systems.
