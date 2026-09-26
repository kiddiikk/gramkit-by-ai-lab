'use client';

import { cn } from '@/lib/utils';
import { usePlatform } from '@/hooks';
import { AppNav } from '@/components/navigation/AppNav';
import { layoutConfig } from '@/config/layout';
import { AuroraBackground } from '@/components/shells/AuroraBackground';
import { AmbientAtmosphere } from '@/components/effects';
import { useTheme } from 'next-themes';

const variantClasses = {
  default: 'max-w-[var(--page-max-width)]',
  wide: 'max-w-[90rem]',
  narrow: 'max-w-[40rem]',
  full: 'w-full',
} as const;

export interface AppShellProps {
  children: React.ReactNode;
  /** Optional footer slot (pass <Footer /> or <FooterMinimal />) */
  footer?: React.ReactNode;
  /** Content width variant (default: 'default') */
  variant?: keyof typeof variantClasses;
}

/**
 * AppShell - Unified layout wrapper for all pages
 *
 * Provides:
 * - AuroraBackground (animated beige-white waves)
 * - AmbientAtmosphere (cyber grid + particles + noise)  ← НОВОЕ
 * - AppNav (handles guest/auth, desktop/mobile automatically)
 * - Responsive content area with width variants
 * - Optional footer slot
 */
export function AppShell({
  children,
  footer,
  variant = 'default'
}: AppShellProps) {
  const { isTelegramMobile } = usePlatform();
  const { mobileLayout } = layoutConfig;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Telegram Mini App on mobile device with bottom tabs: reduce top padding
  const useMobilePadding = isTelegramMobile && mobileLayout === 'bottom-tabs';

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Aurora-фон — fixed, за контентом */}
      <AuroraBackground />

      {/* AmbientAtmosphere — сетка + частицы + noise поверх aurora */}
      <AmbientAtmosphere isDark={isDark} />

      {/* Весь UI поверх фона */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <AppNav />
        <main className={cn(
          'flex-1 w-full mx-auto px-[var(--page-padding-x)] py-[var(--page-padding-y)] pb-[var(--bottom-nav-height)] md:pb-[var(--page-padding-y)]',
          variantClasses[variant],
          useMobilePadding && 'pt-2'
        )}>
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
