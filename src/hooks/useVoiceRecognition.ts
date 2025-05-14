import { useState, useCallback, useEffect } from 'react';

interface UseVoiceRecognitionProps {
  onError?: (error: string) => void;
}

export function useVoiceRecognition({ onError }: UseVoiceRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (!SpeechRecognition) {
      const errorMessage = 'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError]);

  const recognition = isSupported
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event) => {
      let errorMessage = 'Error occurred in recognition';
      
      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          errorMessage = 'Microphone access was denied. Please allow microphone access in your browser settings.';
          break;
        case 'no-speech':
          errorMessage = 'No speech was detected. Please try speaking again.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone was found. Please ensure your microphone is properly connected.';
          break;
        case 'network':
          errorMessage = 'Network error occurred. Please check your internet connection.';
          break;
        default:
          errorMessage = `Error occurred in recognition: ${event.error}`;
      }
      
      setError(errorMessage);
      onError?.(errorMessage);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (isListening) {
        recognition.abort();
      }
    };
  }, [recognition, isListening, onError]);

  const startListening = useCallback(async () => {
    if (!recognition) {
      const errorMessage = 'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.';
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      
      recognition.start();
    } catch (err) {
      let errorMessage = 'Error starting speech recognition';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage = 'Microphone access was denied. Please allow microphone access in your browser settings.';
        } else if (err.name === 'NotFoundError') {
          errorMessage = 'No microphone was found. Please ensure your microphone is properly connected.';
        }
      }
      
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
    isSupported,
    startListening,
    stopListening,
  };
} 