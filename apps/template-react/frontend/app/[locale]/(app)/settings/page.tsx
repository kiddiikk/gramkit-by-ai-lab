'use client';

import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';

export default function SettingsPage() {
  const t = useTranslations('feelit.settings');

  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </header>

      <section className="space-y-4 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground">{t('interface')}</h2>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('theme')}</span>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('language')}</span>
          <LanguageToggle />
        </div>
      </section>
    </div>
  );
}
