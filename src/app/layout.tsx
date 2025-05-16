import { ThemeProvider } from '@/components/common/ThemeProvider'
import { Toaster } from '@/components/common/Toaster'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Layout } from '@/components/common/Layout'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Voice Wellness Friend',
    template: '%s | Voice Wellness Friend',
  },
  description: 'Your AI-powered voice therapy companion',
  keywords: ['mental health', 'therapy', 'AI', 'voice therapy', 'wellness'],
  authors: [{ name: 'Voice Wellness Friend Team' }],
  creator: 'Voice Wellness Friend',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voicewellnessfriend.com',
    title: 'Voice Wellness Friend',
    description: 'Your AI-powered voice therapy companion',
    siteName: 'Voice Wellness Friend',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voice Wellness Friend',
    description: 'Your AI-powered voice therapy companion',
    creator: '@voicewellness',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 