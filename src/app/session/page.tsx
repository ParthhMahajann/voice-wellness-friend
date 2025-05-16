'use client';

import type { Metadata } from 'next';
import { TherapySession } from '@/pages/TherapySession';

export const metadata: Metadata = {
  title: 'Therapy Session',
  description: 'Start a new therapy session with your AI companion',
};

export default function SessionPage() {
  return <TherapySession />;
} 