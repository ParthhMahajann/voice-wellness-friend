'use client';

import { useEffect, useState } from 'react';
import { Toaster as Sonner } from 'sonner';

type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
};

type ToasterProps = {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

export function Toaster({ position = 'top-right' }: ToasterProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<Toast>) => {
      const toast = event.detail;
      setToasts((prev) => [...prev, toast]);

      if (toast.duration !== Infinity) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, toast.duration || 3000);
      }
    };

    window.addEventListener('toast' as any, handleToast as any);
    return () => window.removeEventListener('toast' as any, handleToast as any);
  }, []);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-2`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg p-4 shadow-lg transition-all ${typeClasses[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export const toast = (message: string, type: Toast['type'] = 'info', duration?: number) => {
  const event = new CustomEvent('toast', {
    detail: {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      duration,
    },
  });
  window.dispatchEvent(event);
};

export function ToasterSonner() {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
} 