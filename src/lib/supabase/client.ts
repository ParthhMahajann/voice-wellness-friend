import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'voice-wellness-friend'
    }
  }
});

// Database types
export type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
};

export type Session = {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  duration: number;
  messages: Message[];
  mood_history: string[];
  feedback?: {
    rating: number;
    helpful: boolean;
    comments: string;
    timestamp: string;
  };
};

export type Message = {
  id: string;
  session_id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}; 