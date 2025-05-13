import { useState, useCallback, useEffect } from 'react';

interface UseVoiceRecognitionProps {
  onError?: (error: string) => void;
}

export function useVoiceRecognition({ onError }: UseVoiceRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognition = typeof window !== 'undefined'
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

  useEffect(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      const errorMessage = `Error occurred in recognition: ${event.error}`;
      setError(errorMessage);
      onError?.(errorMessage);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.abort();
    };
  }, [recognition, onError]);

  const startListening = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    try {
      recognition.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      const errorMessage = 'Error starting speech recognition';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [recognition, onError]);

  const stopListening = useCallback(() => {
    if (!recognition) return;

    try {
      recognition.stop();
      setIsListening(false);
    } catch (err) {
      const errorMessage = 'Error stopping speech recognition';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [recognition, onError]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
  };
} 