export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  messageCount: number;
  feedback?: {
    rating: number;
    helpful: boolean;
    comments: string;
    timestamp: number;
  };
}

export interface TherapySessionProps {
  onSessionEnd?: (session: Session) => void;
}

export interface SessionHistoryProps {
  sessions: Session[];
  onDeleteSession: (sessionId: string) => void;
}

export interface SessionFeedbackProps {
  sessionId: string;
  onSubmit: (feedback: {
    rating: number;
    helpful: boolean;
    comments: string;
  }) => void;
  onSkip: () => void;
}

export interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export interface AudioPlayerProps {
  audioUrl: string;
  onPlaybackComplete?: () => void;
  autoPlay?: boolean;
} 