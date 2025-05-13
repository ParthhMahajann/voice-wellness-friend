import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { EmergencyResources } from '../components/therapy/EmergencyResources';
import { SessionProgress } from '../components/therapy/SessionProgress';
import SessionSummary from '../components/therapy/SessionSummary';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useAuth } from '../components/auth/AuthProvider';
import { toast } from '../components/common/Toaster';
import { aiService } from '../lib/services/aiService';
import { sessionStorage } from '../lib/services/sessionStorage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function TherapySession() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showEmergency, setShowEmergency] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [sessionDuration, setSessionDuration] = useState(0);
  const [sessionId, setSessionId] = useState<string>('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
  } = useVoiceRecognition({
    onError: (errorMessage) => {
      toast(errorMessage, 'error');
    },
  });

  useEffect(() => {
    if (!user) {
      toast('Please sign in to start a therapy session', 'warning');
      return;
    }

    // Initialize new session
    const session = sessionStorage.createSession();
    setSessionId(session.id);

    // Update session duration every second
    const durationInterval = setInterval(() => {
      const duration = Date.now() - sessionStartTime;
      setSessionDuration(duration);
      sessionStorage.updateSession(sessionId, { duration });
    }, 1000);

    // Add initial greeting
    const initialMessage: Message = {
      id: '1',
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    sessionStorage.addMessage(sessionId, initialMessage);

    return () => {
      clearInterval(durationInterval);
    };
  }, [sessionStartTime, user, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserInput = async (input: string) => {
    if (!input.trim()) return;

    setIsProcessing(true);
    try {
      // Add user message to the conversation
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      sessionStorage.addMessage(sessionId, userMessage);

      // Get AI response
      const response = aiService.generateResponse(input);
      
      // Update mood if provided
      if (response.mood) {
        setCurrentMood(response.mood);
        sessionStorage.updateMood(sessionId, response.mood);
      }

      // Add AI response to the conversation
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      sessionStorage.addMessage(sessionId, aiMessage);
    } catch (error) {
      toast('Failed to process your message. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      // Process the final transcript when stopping
      if (transcript) {
        handleUserInput(transcript);
      }
    } else {
      startListening();
    }
  };

  const handleEndSession = () => {
    if (messages.length > 0) {
      setShowSummary(true);
    } else {
      sessionStorage.deleteSession(sessionId);
      navigate('/');
    }
  };

  const handleSaveFeedback = (feedback: {
    rating: number;
    helpful: boolean;
    comments: string;
  }) => {
    sessionStorage.endSession(sessionId, {
      ...feedback,
      timestamp: Date.now(),
    });
    navigate('/');
  };

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Please Sign In</h2>
        <p className="mt-4 text-muted-foreground">
          You need to be signed in to start a therapy session.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Session Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleEndSession}
          className="text-muted-foreground"
        >
          End Session
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowEmergency(true)}
          className="flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Emergency Resources
        </Button>
      </div>

      {/* Session Progress */}
      <SessionProgress
        currentMood={currentMood}
        sessionDuration={sessionDuration}
        messageCount={messages.length / 2}
        isListening={isListening}
      />

      {/* Main Session Interface */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Conversation Display */}
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 bg-muted/50 rounded-lg">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Your conversation will appear here...
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Current Transcript */}
          {isListening && transcript && (
            <div className="text-sm text-muted-foreground italic">
              {transcript}
            </div>
          )}

          {/* Voice Controls */}
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={isListening ? 'destructive' : 'default'}
              onClick={toggleListening}
              className="w-16 h-16 rounded-full"
              disabled={isProcessing}
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Session Status */}
      <div className="text-center text-sm text-muted-foreground">
        {isProcessing
          ? 'Processing...'
          : isListening
          ? 'Listening...'
          : 'Click the microphone to start speaking'}
      </div>

      {/* Emergency Resources Modal */}
      <EmergencyResources
        isOpen={showEmergency}
        onClose={() => setShowEmergency(false)}
      />

      {/* Session Summary Modal */}
      <SessionSummary
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        sessionDuration={sessionDuration}
        messageCount={messages.length / 2}
        onSaveFeedback={handleSaveFeedback}
      />
    </div>
  );
}
