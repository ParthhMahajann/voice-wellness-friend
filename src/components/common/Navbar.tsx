'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../auth/AuthProvider';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';

export function Navbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              Voice Wellness Friend
            </Link>
            <div className="hidden space-x-4 md:flex">
              <Link
                href="/"
                className={`${
                  pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                } hover:text-primary`}
              >
                Home
              </Link>
              <Link
                href="/session"
                className={`${
                  pathname === '/session' ? 'text-primary' : 'text-muted-foreground'
                } hover:text-primary`}
              >
                Therapy Session
              </Link>
              <Link
                href="/resources"
                className={`${
                  pathname === '/resources' ? 'text-primary' : 'text-muted-foreground'
                } hover:text-primary`}
              >
                Resources
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className={`${
                    pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                  } hover:text-primary`}
                >
                  Profile
                </Link>
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 