interface AIResponse {
  text: string;
  mood?: 'positive' | 'negative' | 'neutral';
}

const RESPONSES = {
  greeting: [
    "Hello! I'm here to listen and support you. How are you feeling today?",
    "Hi there! I'm ready to chat. What's on your mind?",
    "Welcome! I'm here to listen. How are you doing today?",
  ],
  acknowledgment: [
    "I understand. Please tell me more about that.",
    "That sounds challenging. Would you like to elaborate?",
    "I hear you. How does that make you feel?",
  ],
  followUp: [
    "What do you think about that?",
    "How does that affect you?",
    "Can you tell me more about that?",
  ],
  support: [
    "I'm here to support you through this.",
    "That must be difficult. Remember, you're not alone.",
    "I appreciate you sharing that with me.",
  ],
};

export const aiService = {
  generateResponse: (userInput: string): AIResponse => {
    const input = userInput.toLowerCase();
    
    // Simple keyword matching for now
    if (input.includes('hello') || input.includes('hi')) {
      return {
        text: RESPONSES.greeting[Math.floor(Math.random() * RESPONSES.greeting.length)],
        mood: 'positive',
      };
    }

    if (input.includes('sad') || input.includes('depressed') || input.includes('anxious')) {
      return {
        text: RESPONSES.support[Math.floor(Math.random() * RESPONSES.support.length)],
        mood: 'negative',
      };
    }

    // Default response
    return {
      text: RESPONSES.acknowledgment[Math.floor(Math.random() * RESPONSES.acknowledgment.length)],
      mood: 'neutral',
    };
  },
}; 