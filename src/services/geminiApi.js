/**
 * Gemini API Integration Service
 * This service handles all communication with the Gemini AI model
 */

const GEMINI_API_KEY = 'AIzaSyAWVrRx3XJzMcphF-rUxSNaWGFgDtapHA4'; // Replace with your actual API key

// For demo purposes, we'll disable API calls and use mock responses
const USE_MOCK_RESPONSES = true;

/**
 * Generate mock responses for demo purposes
 * @param {string} message - The user's message
 * @param {string} context - Additional context
 * @returns {Promise<string>} - Mock response
 */
const getMockResponse = async (message, context) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const lowerMessage = message.toLowerCase();

  // Context-specific responses
  if (context.includes('motor disabilities')) {
    if (lowerMessage.includes('account') || lowerMessage.includes('help')) {
      return "I can help you with account-related issues! I've provided some quick action buttons below for common tasks like account recovery, password reset, and billing inquiries. You can also type specific questions about your account, and I'll do my best to assist you.";
    }
    if (lowerMessage.includes('password')) {
      return "For password reset, I can guide you through the process step by step. Would you like me to help you reset your password? I can provide instructions that are easy to follow with minimal typing required.";
    }
    if (lowerMessage.includes('billing')) {
      return "I can help with billing questions! Common billing issues include payment problems, subscription changes, and invoice questions. What specific billing issue can I help you with today?";
    }
  }

  if (context.includes('blind') || context.includes('visually impaired')) {
    if (lowerMessage.includes('weather')) {
      return "Today's weather is partly cloudy with a temperature of 72 degrees Fahrenheit. There's a light breeze from the west at 8 miles per hour. No precipitation is expected today. Would you like me to check the forecast for tomorrow as well?";
    }
    if (lowerMessage.includes('transportation') || lowerMessage.includes('taxi')) {
      return "I can help you find accessible transportation options. Many ride-sharing services offer wheelchair-accessible vehicles and audio announcements. Would you like me to help you book a ride or provide information about public transit accessibility in your area?";
    }
    if (lowerMessage.includes('navigation') || lowerMessage.includes('directions')) {
      return "I can provide turn-by-turn audio directions to help you navigate. Where would you like to go? I can also suggest accessible routes and identify landmarks along the way to help with navigation.";
    }
    if (lowerMessage.includes('time')) {
      return "The current time is 2:38 PM. Is there anything else you'd like to know about today's schedule or upcoming appointments?";
    }
    if (lowerMessage.includes('message') || lowerMessage.includes('read')) {
      return "I can help you manage your messages. You have 3 unread messages. Would you like me to read them aloud for you? I can also help you compose and send replies using voice commands.";
    }
  }

  // General responses
  const generalResponses = [
    "Hello! I'm AccessEase, your AI assistant. I'm here to help make your daily tasks easier and more accessible. What can I assist you with today?",
    "I understand you need assistance. I'm designed to help people with various accessibility needs. Could you tell me more about what you'd like help with?",
    "Thank you for using AccessEase! I'm here to provide support and make technology more accessible for you. How can I help you today?",
    "I'm here to assist you with any questions or tasks you might have. My goal is to make your experience as smooth and accessible as possible. What would you like to know?",
    "Great question! I'm designed to help with a wide range of accessibility needs. Whether you need help with navigation, communication, or daily tasks, I'm here to support you."
  ];

  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

/**
 * Generate mock responses for deaf assistant categories
 * @param {string} category - The selected category
 * @returns {Promise<string>} - Mock response for the category
 */
const getDeafMockResponse = async (category) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const responses = {
    transportation: `🚌 **Accessible Transportation Options**

**Public Transit:**
• Most buses and trains have visual displays for stops and announcements
• Many transit apps provide real-time updates with visual notifications
• Look for wheelchair accessible symbols and priority seating areas

**Ride Services:**
• Uber and Lyft offer in-app messaging with drivers
• You can add notes about communication preferences in your profile
• Both services have accessibility features and vehicle options

**Tips:**
• Download transit apps for your city for visual schedules
• Consider ride-sharing for door-to-door convenience
• Many airports offer visual paging systems and assistance services`,

    documents: `📄 **Document Access & Management**

**Digital Tools:**
• Use screen readers and document scanners for paper documents
• Cloud storage services (Google Drive, Dropbox) for easy access
• PDF readers with text-to-speech capabilities

**Accessibility Features:**
• High contrast mode for better document visibility
• Text size adjustment in most document viewers
• Voice-to-text software for document creation

**Support Services:**
• Many government offices provide sign language interpreters
• Document assistance programs available through disability services
• Online forms often have accessibility compliance features`,

    emergency: `🚨 **Emergency Resources & Safety**

**Text-Based Emergency Services:**
• Text 911 is available in many areas (check local availability)
• Emergency apps with location sharing and pre-written messages
• Medical alert systems with visual and vibrating notifications

**Visual Alert Systems:**
• Flashing light smoke detectors and carbon monoxide alarms
• Vibrating bed shakers for emergency alerts
• Smart home systems with visual notifications

**Important:**
• Register with local emergency services for communication preferences
• Keep emergency contact cards with communication needs noted
• Consider medical alert jewelry indicating hearing status`,

    communication: `💬 **Communication Tools & Services**

**Video Services:**
• Video Relay Service (VRS) for phone calls with hearing people
• Video Remote Interpreting (VRI) for on-demand interpretation
• FaceTime, Zoom, and other video platforms for direct communication

**Text & Messaging:**
• SMS and messaging apps for real-time communication
• Email for detailed conversations and documentation
• Live chat features on websites and customer service

**Assistive Technology:**
• Hearing loop systems in public venues
• FM systems for group conversations
• Speech-to-text apps for real-time conversation transcription`
  };

  return responses[category] || "I'm here to help! Please select a category above to get specific information and resources.";
};
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Send a message to Gemini AI and get a response
 * @param {string} message - The user's message/prompt
 * @param {string} context - Additional context for the AI (optional)
 * @returns {Promise<string>} - The AI's response
 */
export const sendMessageToGemini = async (message, context = '') => {
  // Use mock responses for demo purposes
  if (USE_MOCK_RESPONSES) {
    return getMockResponse(message, context);
  }

  try {
    // Construct the prompt with context for accessibility assistance
    const prompt = `You are AccessEase, an AI assistant designed to help people with disabilities.
    ${context}

    User message: ${message}

    Please provide a helpful, clear, and concise response. Keep your response conversational and supportive.`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Extract the text response from Gemini's response format
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);

    // Return a fallback response if API fails
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. If you need immediate assistance, please contact your local emergency services or support hotline.";
  }
};

/**
 * Get predefined responses for deaf assistant screen based on selected category
 * @param {string} category - The category selected by the user
 * @returns {Promise<string>} - The AI's response for that category
 */
export const getDeafAssistantResponse = async (category) => {
  if (USE_MOCK_RESPONSES) {
    return getDeafMockResponse(category);
  }

  const categoryPrompts = {
    transportation: "Provide helpful information about accessible transportation options, including public transit accessibility features, ride-sharing services, and tips for traveling with disabilities.",
    documents: "Explain how to access and manage important documents, including digital accessibility tools, document readers, and assistance programs for people with hearing impairments.",
    emergency: "Provide important emergency information and resources specifically for people who are deaf or hard of hearing, including text-based emergency services and visual alert systems.",
    communication: "Suggest communication tools and resources for deaf individuals, including video relay services, text-to-speech apps, and sign language interpretation services."
  };

  const prompt = categoryPrompts[category] || "Provide general assistance and support information.";
  return await sendMessageToGemini("", prompt);
};

/**
 * Process voice command for blind users
 * @param {string} voiceCommand - The transcribed voice command
 * @returns {Promise<string>} - The AI's response optimized for voice output
 */
export const processVoiceCommand = async (voiceCommand) => {
  const context = `You are responding to a voice command from a user who is blind or visually impaired.
  Your response will be read aloud using text-to-speech, so:
  - Keep responses clear and concise
  - Avoid complex formatting or visual descriptions
  - Use natural, conversational language
  - Provide step-by-step instructions when needed
  - Ask clarifying questions if the request is unclear`;

  return await sendMessageToGemini(voiceCommand, context);
};
