import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, MessageSquare, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Session {
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

interface SessionHistoryProps {
  sessions: Session[];
  onDeleteSession: (sessionId: string) => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({
  sessions,
  onDeleteSession,
}) => {
  const [selectedSession, setSelectedSession] = React.useState<Session | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Session History</h2>
      
      {sessions.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No sessions recorded yet
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formatDate(session.startTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{session.messageCount} messages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(session.duration)}</span>
                    </div>
                  </div>
                  {session.feedback && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        Rated {session.feedback.rating}/5
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSession(session)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSession(session.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Session Details Dialog */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogDescription>
              {selectedSession && formatDate(selectedSession.startTime)}
            </DialogDescription>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                  <p className="text-sm">{formatDuration(selectedSession.duration)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Messages</h4>
                  <p className="text-sm">{selectedSession.messageCount}</p>
                </div>
              </div>

              {selectedSession.feedback && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">Feedback</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">
                        Rated {selectedSession.feedback.rating}/5
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Helpful: </span>
                      {selectedSession.feedback.helpful ? "Yes" : "No"}
                    </div>
                    {selectedSession.feedback.comments && (
                      <div className="text-sm">
                        <span className="font-medium">Comments: </span>
                        {selectedSession.feedback.comments}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionHistory; 