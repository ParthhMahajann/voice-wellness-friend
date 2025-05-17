import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Therapy Session',
  description: 'Start a new therapy session with your AI companion',
};

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 