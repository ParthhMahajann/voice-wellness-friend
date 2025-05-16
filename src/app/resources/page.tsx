'use client';

import type { Metadata } from 'next';
import { Resources } from '@/pages/Resources'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Educational content and tools to support your mental wellbeing journey',
};

export default function ResourcesPage() {
  return <Resources />
} 