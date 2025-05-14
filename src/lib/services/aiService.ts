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
  positive: [
    "I'm glad to hear that! What's contributing to these positive feelings?",
    "That's wonderful! Would you like to share more about what's going well?",
    "It's great to hear you're feeling positive. What's been helping you?",
  ],
  negative: [
    "I'm sorry to hear you're feeling this way. Would you like to talk more about it?",
    "That sounds really difficult. How long have you been feeling this way?",
    "I'm here to listen and support you. What's been on your mind?",
  ],
  gratitude: [
    "Thank you for sharing that with me. It means a lot that you trust me with your thoughts.",
    "I appreciate you opening up to me. How else can I support you?",
    "Thank you for being so honest. Would you like to explore this further?",
  ],
  confusion: [
    "I'm not quite sure I understand. Could you explain that differently?",
    "I want to make sure I understand you correctly. Could you elaborate?",
    "I'm here to listen, but I need a bit more context. Could you tell me more?",
  ],
};

const KEYWORDS = {
  greeting: ['hello', 'hi', 'hey', 'greetings'],
  positive: ['happy', 'good', 'great', 'wonderful', 'excited', 'joy', 'love', 'enjoy'],
  negative: ['sad', 'depressed', 'anxious', 'worried', 'scared', 'afraid', 'angry', 'upset', 'hurt', 'pain'],
  gratitude: ['thank', 'thanks', 'appreciate', 'grateful'],
  confusion: ['confused', 'don\'t understand', 'not sure', 'unclear'],
};

export const aiService = {
  generateResponse: (userInput: string): AIResponse => {
    const input = userInput.toLowerCase();
    
    // Check for keywords in the input
    const matchedKeywords = Object.entries(KEYWORDS).filter(([_, keywords]) =>
      keywords.some(keyword => input.includes(keyword))
    );

    if (matchedKeywords.length > 0) {
      // Get the first matched category
      const [category] = matchedKeywords[0];
      const responses = RESPONSES[category as keyof typeof RESPONSES];
      
      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        mood: category === 'positive' ? 'positive' : 
              category === 'negative' ? 'negative' : 'neutral',
      };
    }

    // If no specific keywords are found, use context-based response
    if (input.length < 10) {
      return {
        text: RESPONSES.followUp[Math.floor(Math.random() * RESPONSES.followUp.length)],
        mood: 'neutral',
      };
    }

    // Default to acknowledgment for longer inputs
    return {
      text: RESPONSES.acknowledgment[Math.floor(Math.random() * RESPONSES.acknowledgment.length)],
      mood: 'neutral',
    };
  },
}; 