'use client';

import type { Metadata } from 'next';
import History from '@/pages/History';

export const metadata: Metadata = {
  title: 'Session History',
  description: 'View and manage your therapy session history',
};

export default function HistoryPage() {
  return <History />;
} 