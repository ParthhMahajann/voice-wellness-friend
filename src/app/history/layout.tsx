import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Session History',
  description: 'View and manage your therapy session history',
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 