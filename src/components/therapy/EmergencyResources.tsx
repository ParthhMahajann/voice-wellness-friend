import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EmergencyResourcesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyResources({ isOpen, onClose }: EmergencyResourcesProps) {
  const resources = [
    {
      title: 'National Suicide Prevention Lifeline',
      description: '24/7, free and confidential support for people in suicidal crisis or emotional distress.',
      phone: '988',
      link: 'https://988lifeline.org',
    },
    {
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 to connect with a Crisis Counselor.',
      link: 'https://www.crisistextline.org',
    },
    {
      title: 'SAMHSA\'s National Helpline',
      description: 'Treatment referral and information service for individuals facing mental health or substance use disorders.',
      phone: '1-800-662-4357',
      link: 'https://www.samhsa.gov/find-help/national-helpline',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">
            Emergency Resources
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="rounded-lg bg-red-50 p-4 text-red-800">
            <h3 className="font-semibold">If you're experiencing a crisis:</h3>
            <p className="mt-2">
              Please contact one of these resources immediately. They are available 24/7 and provide free, confidential support.
            </p>
          </div>

          <div className="space-y-4">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <h3 className="text-lg font-semibold">{resource.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {resource.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone}`}
                      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Call {resource.phone}
                    </a>
                  )}
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
            <h3 className="font-semibold">Remember:</h3>
            <p className="mt-2">
              If you're in immediate danger, please call emergency services (911) or go to your nearest emergency room.
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EmergencyResources; 