interface Session {
  id: string;
  startTime: number;
  duration: number;
  messages: Message[];
  mood: string;
  feedback?: {
    rating: number;
    helpful: boolean;
    comments: string;
    timestamp: number;
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const STORAGE_KEY = 'therapy_sessions';

export const sessionStorage = {
  createSession: (): Session => {
    const session: Session = {
      id: Date.now().toString(),
      startTime: Date.now(),
      duration: 0,
      messages: [],
      mood: 'neutral',
    };
    
    const sessions = sessionStorage.getAllSessions();
    sessions.push(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    
    return session;
  },

  getSession: (id: string): Session | null => {
    const sessions = sessionStorage.getAllSessions();
    return sessions.find(session => session.id === id) || null;
  },

  getAllSessions: (): Session[] => {
    const sessions = localStorage.getItem(STORAGE_KEY);
    return sessions ? JSON.parse(sessions) : [];
  },

  updateSession: (id: string, updates: Partial<Session>) => {
    const sessions = sessionStorage.getAllSessions();
    const index = sessions.findIndex(session => session.id === id);
    
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  },

  addMessage: (sessionId: string, message: Message) => {
    const sessions = sessionStorage.getAllSessions();
    const index = sessions.findIndex(session => session.id === sessionId);
    
    if (index !== -1) {
      sessions[index].messages.push(message);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  },

  updateMood: (sessionId: string, mood: string) => {
    sessionStorage.updateSession(sessionId, { mood });
  },

  endSession: (sessionId: string, feedback: Session['feedback']) => {
    sessionStorage.updateSession(sessionId, { feedback });
  },

  deleteSession: (sessionId: string) => {
    const sessions = sessionStorage.getAllSessions();
    const filteredSessions = sessions.filter(session => session.id !== sessionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions));
  },
}; 