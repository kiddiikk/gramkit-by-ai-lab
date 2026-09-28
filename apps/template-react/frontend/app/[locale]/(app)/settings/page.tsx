'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import { User, ShieldCheck, Palette, Globe, Zap } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('feelit.settings');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Реальные данные Telegram
  const tgUser =
    typeof window !== 'undefined'
      ? (window as any).Telegram?.WebApp?.initDataUnsafe?.user
      : null;

  const displayName =
    tgUser?.first_name
      ? `${tgUser.first_name}${tgUser.last_name ? ' ' + tgUser.last_name : ''}`
      : t('guest');
  const handle = tgUser?.username ? `@${tgUser.username}` : `ID: ${tgUser?.id || '—'}`;

  const handleTestHaptic = () => {
    triggerHaptic('success');
    playHapticSound('success');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* Профиль */}
      <SpotlightCard isDark={isDark} className="p-4 flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400 shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">{displayName}</h3>
          <p className="text-xs text-muted-foreground font-mono truncate">{handle}</p>
        </div>
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      </SpotlightCard>

      {/* Настройки интерфейса */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('interface')}
        </h3>

        <SpotlightCard isDark={isDark} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-400 shrink-0">
              <Palette className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold">{t('theme')}</h4>
              <p className="text-[11px] text-muted-foreground">
                {isDark ? 'Cyber Dark' : 'Clean Light'}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </SpotlightCard>

        <SpotlightCard isDark={isDark} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400 shrink-0">
              <Globe className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold">{t('language')}</h4>
              <p className="text-[11px] text-muted-foreground">RU / EN</p>
            </div>
          </div>
          <LanguageToggle />
        </SpotlightCard>
      </div>

      {/* Тактильный отклик */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          Haptic
        </h3>

        <SpotlightCard isDark={isDark} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-2 text-violet-400 shrink-0">
              <Zap className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold">Haptic Feedback</h4>
              <p className="text-[11px] text-muted-foreground">
                Telegram Haptic
              </p>
            </div>
          </div>
          <button
            onClick={handleTestHaptic}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all active:scale-95"
          >
            Тест
          </button>
        </SpotlightCard>
      </div>

      {/* Версия */}
      <div className="text-center pt-4">
        <span className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
          FEEL IT — AI LAB v2.4.0
        </span>
      </div>
    </div>
  );
}
