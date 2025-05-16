'use client';

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { VoiceRecorderProps } from '@/types/therapy';

export function VoiceRecorder({
  onRecordingComplete,
  isRecording,
  onStartRecording,
  onStopRecording,
}: VoiceRecorderProps) {
  const [error, setError] = useState<Error | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      onStartRecording();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start recording'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      onStopRecording();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        onClick={isRecording ? stopRecording : startRecording}
        className="rounded-full w-16 h-16"
      >
        {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
      <p className="text-sm text-muted-foreground">
        {isRecording ? 'Recording...' : 'Click to start recording'}
      </p>
    </div>
  );
}
