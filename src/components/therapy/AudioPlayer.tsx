'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { AudioPlayerProps } from '@/types/therapy';

export function AudioPlayer({ audioUrl, onPlaybackComplete, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(err => {
        setError(err instanceof Error ? err : new Error('Failed to play audio'));
      });
    }
  }, [autoPlay]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        setError(err instanceof Error ? err : new Error('Failed to play audio'));
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onPlaybackComplete?.();
  };

  return (
    <div className="flex items-center gap-2">
      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
      <Button
        size="sm"
        variant="ghost"
        onClick={togglePlayback}
        className="p-1"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
