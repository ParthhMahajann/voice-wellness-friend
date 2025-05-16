import type { Metadata } from 'next';
import { Profile } from '@/components/auth/Profile';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your Voice Wellness Friend profile and preferences',
};

export default function ProfilePage() {
  return <Profile />;
} 