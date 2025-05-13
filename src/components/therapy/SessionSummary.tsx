import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface SessionSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  sessionDuration: number;
  messageCount: number;
  onSaveFeedback: (feedback: {
    rating: number;
    helpful: boolean;
    comments: string;
  }) => void;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({
  isOpen,
  onClose,
  sessionDuration,
  messageCount,
  onSaveFeedback,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [helpful, setHelpful] = useState<boolean>(false);
  const [comments, setComments] = useState("");

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    onSaveFeedback({
      rating,
      helpful,
      comments,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Session Summary</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Session Duration
              </h3>
              <p className="mt-2 text-2xl font-bold">
                {formatDuration(sessionDuration)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Messages Exchanged
              </h3>
              <p className="mt-2 text-2xl font-bold">{messageCount}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>How would you rate this session?</Label>
              <RadioGroup
                value={rating.toString()}
                onValueChange={(value) => setRating(parseInt(value))}
                className="mt-2 grid grid-cols-5 gap-4"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                    <Label htmlFor={`rating-${value}`}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="helpful"
                checked={helpful}
                onCheckedChange={(checked) => setHelpful(checked as boolean)}
              />
              <Label htmlFor="helpful">This session was helpful</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts about the session..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Feedback</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionSummary; 