
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
}

const VoiceRecorder = ({ onAudioRecorded }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onAudioRecorded(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center mb-4">
        {isRecording && (
          <div className="absolute -inset-4">
            <div className="w-full h-full rounded-full bg-therapy-primary/20 animate-pulse-subtle" />
          </div>
        )}
        <Button
          className={`rounded-full w-16 h-16 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'therapy-gradient'}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
      </div>
      
      {isRecording && (
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2" />
          <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-2">
        {isRecording ? "Recording... Tap to stop" : "Tap to start speaking"}
      </p>
    </div>
  );
};

export default VoiceRecorder;
