import React from "react";
import { Card, CardContent } from '../ui/card';
import { Progress } from "@/components/ui/progress";
import { Smile, Meh, Frown, Mic, MicOff, Clock, MessageSquare, Heart } from "lucide-react";

interface SessionProgressProps {
  currentMood?: string;
  sessionDuration: number;
  messageCount: number;
  isListening: boolean;
}

export function SessionProgress({
  currentMood,
  sessionDuration,
  messageCount,
  isListening,
}: SessionProgressProps) {
  const getMoodIcon = () => {
    switch (currentMood?.toLowerCase()) {
      case "positive":
        return <Smile className="w-6 h-6 text-green-500" />;
      case "negative":
        return <Frown className="w-6 h-6 text-red-500" />;
      default:
        return <Meh className="w-6 h-6 text-yellow-500" />;
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-2xl font-bold">{formatDuration(sessionDuration)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Messages</p>
              <p className="text-2xl font-bold">{messageCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Current Mood</p>
              <p className="text-2xl font-bold">{currentMood || 'Neutral'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-2xl font-bold">
                {isListening ? 'Listening' : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Session Progress</span>
            <span>{Math.min(100, Math.round((messageCount / 20) * 100))}%</span>
          </div>
          <Progress value={Math.min(100, (messageCount / 20) * 100)} />
        </div>
      </CardContent>
    </Card>
  );
}

export default SessionProgress; 