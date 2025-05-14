import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Mic, MicOff, AlertCircle, Volume2, VolumeX } from 'lucide-react';
import { EmergencyResources } from '../components/therapy/EmergencyResources';
import { SessionProgress } from '../components/therapy/SessionProgress';
import SessionSummary from '../components/therapy/SessionSummary';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useAuth } from '../components/auth/AuthProvider';
import { toast } from '../components/common/Toaster';
import { openaiService } from '../lib/services/openaiService';
import { supabase } from '../lib/supabase/client';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    isSupported,
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

    // Initialize new session in Supabase
    const initializeSession = async () => {
      const { data: session, error } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          start_time: new Date().toISOString(),
          duration: 0,
          messages: [],
          mood_history: ['neutral'],
        })
        .select()
        .single();

      if (error) {
        toast('Failed to start session. Please try again.', 'error');
        return;
      }

      setSessionId(session.id);

      // Add initial greeting
      const initialMessage: Message = {
        id: '1',
        text: "Hello! I'm here to listen and support you. How are you feeling today?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([initialMessage]);

      // Save initial message to Supabase
      await supabase.from('messages').insert({
        session_id: session.id,
        user_id: user.id,
        content: initialMessage.text,
        role: 'assistant',
        timestamp: initialMessage.timestamp.toISOString(),
      });
    };

    initializeSession();

    // Update session duration every second
    const durationInterval = setInterval(() => {
      const duration = Date.now() - sessionStartTime;
      setSessionDuration(duration);
      
      // Update duration in Supabase
      supabase
        .from('sessions')
        .update({ duration })
        .eq('id', sessionId);
    }, 1000);

    return () => {
      clearInterval(durationInterval);
    };
  }, [sessionStartTime, user, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakResponse = async (text: string) => {
    try {
      setIsSpeaking(true);
      const audioBuffer = await openaiService.generateSpeech(text);
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      toast('Failed to play audio response', 'error');
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleUserInput = async (input: string) => {
    if (!input.trim() || !user || !sessionId) return;

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

      // Get AI response
      const { text: response, mood } = await openaiService.generateResponse(
        input,
        sessionId,
        user.id
      );
      
      // Update mood
      setCurrentMood(mood);

      // Add AI response to the conversation
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Speak the response
      await speakResponse(response);
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
      supabase.from('sessions').delete().eq('id', sessionId);
      navigate('/');
    }
  };

  const handleSaveFeedback = async (feedback: {
    rating: number;
    helpful: boolean;
    comments: string;
  }) => {
    await supabase
      .from('sessions')
      .update({
        end_time: new Date().toISOString(),
        feedback: {
          ...feedback,
          timestamp: new Date().toISOString(),
        },
      })
      .eq('id', sessionId);
    
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
      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden" />

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
          <div className="flex justify-center gap-4">
            {!isSupported ? (
              <div className="text-center text-muted-foreground">
                <p>Voice recognition is not supported in your browser.</p>
                <p className="text-sm">Please use Chrome, Edge, or Safari.</p>
              </div>
            ) : (
              <>
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
                <Button
                  size="lg"
                  variant={isSpeaking ? 'destructive' : 'default'}
                  onClick={() => {
                    if (audioRef.current) {
                      if (isSpeaking) {
                        audioRef.current.pause();
                        setIsSpeaking(false);
                      } else {
                        audioRef.current.play();
                        setIsSpeaking(true);
                      }
                    }
                  }}
                  className="w-16 h-16 rounded-full"
                  disabled={!messages.length || isProcessing}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Session Status */}
      <div className="text-center text-sm text-muted-foreground">
        {!isSupported ? (
          'Voice recognition is not supported'
        ) : isProcessing ? (
          'Processing...'
        ) : isListening ? (
          'Listening...'
        ) : isSpeaking ? (
          'Speaking...'
        ) : (
          'Click the microphone to start speaking'
        )}
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
