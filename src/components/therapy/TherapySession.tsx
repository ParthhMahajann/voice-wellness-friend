'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Message, Session, TherapySessionProps } from '@/types/therapy';
import { VoiceRecorder } from './VoiceRecorder';
import { AudioPlayer } from './AudioPlayer';
import { SessionFeedback } from './SessionFeedback';

export function TherapySession({ onSessionEnd }: TherapySessionProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/profile');
      return;
    }

    const initializeSession = async () => {
      try {
        const { data, error } = await supabase
          .from('sessions')
          .insert([
            {
              user_id: user.id,
              start_time: new Date().toISOString(),
              message_count: 0,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        setSessionId(data.id);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize session'));
        toast({
          title: 'Error',
          description: 'Failed to start session. Please try again.',
          variant: 'destructive',
        });
      }
    };

    initializeSession();
  }, [user, router, toast]);

  const handleRecordingComplete = useCallback(async (audioBlob: Blob) => {
    if (!sessionId) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Convert audio to text using speech-to-text service
      const formData = new FormData();
      formData.append('audio', audioBlob);
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to convert speech to text');
      const { text } = await response.json();

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Get AI response
      const aiResponse = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!aiResponse.ok) throw new Error('Failed to get AI response');
      const { response: aiText, audioUrl } = await aiResponse.json();

      // Add AI message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update session in database
      await supabase
        .from('sessions')
        .update({ message_count: messages.length + 2 })
        .eq('id', sessionId);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to process message'));
      toast({
        title: 'Error',
        description: 'Failed to process your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [sessionId, messages.length, toast]);

  const handleEndSession = async () => {
    if (!sessionId) return;

    try {
      await supabase
        .from('sessions')
        .update({
          end_time: new Date().toISOString(),
        })
        .eq('id', sessionId);

      const session: Session = {
        id: sessionId,
        startTime: Date.now() - 3600000, // Approximate start time
        endTime: Date.now(),
        duration: 3600000, // Approximate duration
        messageCount: messages.length,
      };

      onSessionEnd?.(session);
      setShowFeedback(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end session'));
      toast({
        title: 'Error',
        description: 'Failed to end session. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleFeedbackSubmit = async (feedback: {
    rating: number;
    helpful: boolean;
    comments: string;
  }) => {
    if (!sessionId) return;

    try {
      await supabase
        .from('sessions')
        .update({
          feedback: {
            ...feedback,
            timestamp: Date.now(),
          },
        })
        .eq('id', sessionId);

      router.push('/history');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit feedback'));
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (showFeedback) {
    return (
      <ErrorBoundary>
        <SessionFeedback
          sessionId={sessionId!}
          onSubmit={handleFeedbackSubmit}
          onSkip={() => router.push('/history')}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <div className="p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.role === 'assistant' && (
                      <AudioPlayer
                        audioUrl={`/api/tts?text=${encodeURIComponent(
                          message.content
                        )}`}
                        autoPlay
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              {isProcessing ? (
                <LoadingSpinner size="lg" />
              ) : (
                <VoiceRecorder
                  onRecordingComplete={handleRecordingComplete}
                  isRecording={isRecording}
                  onStartRecording={() => setIsRecording(true)}
                  onStopRecording={() => setIsRecording(false)}
                />
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={handleEndSession}
                disabled={isProcessing}
              >
                End Session
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ErrorBoundary>
  );
} 