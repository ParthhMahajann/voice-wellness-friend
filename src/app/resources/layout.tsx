import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Educational content and tools to support your mental wellbeing journey',
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 