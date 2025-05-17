'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../auth/AuthProvider';
import { useTheme } from './ThemeProvider';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { user, signOut, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Therapy Session', href: '/session' },
    { name: 'Resources', href: '/resources' },
    { name: 'Profile', href: '/profile' },
  ];

  // Show a loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                  Voice Wellness Friend
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                className="rounded-lg border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                aria-label="Select theme"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 hover:shadow-md"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/profile"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 hover:shadow-md"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Voice Wellness Friend. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 