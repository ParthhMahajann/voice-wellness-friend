import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
  };
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const session = localStorage.getItem('session');
        if (session) {
          // TODO: Validate session with backend
          const userData = JSON.parse(session);
          setUser(userData);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Implement actual authentication
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        preferences: {
          theme: 'system',
          notifications: true,
        },
      };
      setUser(mockUser);
      localStorage.setItem('session', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // TODO: Implement actual sign out
      setUser(null);
      localStorage.removeItem('session');
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // TODO: Implement actual registration
      const mockUser: User = {
        id: '1',
        email,
        name,
        preferences: {
          theme: 'system',
          notifications: true,
        },
      };
      setUser(mockUser);
      localStorage.setItem('session', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 