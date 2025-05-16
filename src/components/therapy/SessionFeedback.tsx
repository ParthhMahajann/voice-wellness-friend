'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SessionFeedbackProps } from '@/types/therapy';

export function SessionFeedback({ onSubmit, onSkip }: SessionFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comments, setComments] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = () => {
    if (rating === 0 || helpful === null) {
      setError(new Error('Please provide a rating and indicate if the session was helpful'));
      return;
    }

    onSubmit({
      rating,
      helpful,
      comments,
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Session Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error.message}</p>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              How would you rate this session?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  variant={rating === value ? "default" : "outline"}
                  onClick={() => setRating(value)}
                  className="w-10 h-10"
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Was this session helpful?
            </label>
            <div className="flex gap-2">
              <Button
                variant={helpful === true ? "default" : "outline"}
                onClick={() => setHelpful(true)}
              >
                Yes
              </Button>
              <Button
                variant={helpful === false ? "default" : "outline"}
                onClick={() => setHelpful(false)}
              >
                No
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Additional comments (optional)
            </label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share your thoughts about the session..."
              className="h-24"
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
            <Button onClick={handleSubmit}>
              Submit Feedback
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 