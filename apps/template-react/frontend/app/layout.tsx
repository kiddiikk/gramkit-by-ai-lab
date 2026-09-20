import type { Metadata, Viewport } from 'next';
import { Onest, Alumni_Sans } from 'next/font/google';
import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import '@/styles/globals.css';

import { PlatformDetector } from '@/components/platform-detector';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-onest',
});

const alumniSans = Alumni_Sans({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-alumni',
  weight: ['700', '800', '900'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'FEEL IT — AI LAB',
  description: 'Бот для автопостинга в Telegram-каналы',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${onest.variable} ${alumniSans.variable}`}
    >
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-dvh bg-background antialiased">
        <NuqsAdapter>
          <ViewTransitions>
            <PlatformDetector />
            {children}
          </ViewTransitions>
        </NuqsAdapter>
      </body>
    </html>
  );
}
