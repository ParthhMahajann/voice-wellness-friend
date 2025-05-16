'use client';

import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useState } from 'react';

export default function ProfilePage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 font-semibold border-b-2 ${tab === 'signin' ? 'border-primary' : 'border-gray-200'}`}
            onClick={() => setTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 font-semibold border-b-2 ${tab === 'signup' ? 'border-primary' : 'border-gray-200'}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </button>
        </div>
        {tab === 'signin' ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
} 