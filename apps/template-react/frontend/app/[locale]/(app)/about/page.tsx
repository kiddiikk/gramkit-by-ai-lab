'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import {
  Send,
  Mail,
  Rss,
  Sparkles,
  Clock,
  Cpu,
  ShieldCheck,
  BarChart3,
  Settings2,
} from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('feelit.about');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const stats = [
    { prefix: t('statUpTo'), value: '10', key: 'statChannels' },
    { prefix: t('statUpTo'), value: '100', key: 'statPosts' },
    { prefix: '', value: '24/7', key: 'stat247' },
    { prefix: '', value: '∞', key: 'statTopics' },
  ];

  const groups = [
    { icon: Rss, key: 'g1', items: ['i1', 'i2', 'i3'] },
    { icon: Cpu, key: 'g2', items: ['i4', 'i5', 'i6'] },
    { icon: Clock, key: 'g3', items: ['i7', 'i8'] },
    { icon: ShieldCheck, key: 'g4', items: ['i9', 'i10'] },
    { icon: BarChart3, key: 'g5', items: ['i11'] },
    { icon: Settings2, key: 'g6', items: ['i12', 'i13'] },
  ];

  const handleContact = () => {
    triggerHaptic('light');
    playHapticSound('click');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* Hero */}
      <SpotlightCard
        isDark={isDark}
        highlight
        className="p-5 space-y-3 text-center motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
          <Sparkles className="w-3 h-3" />
          {t('badge')}
        </div>

        <h2 className="text-2xl font-black leading-tight">
          {t('title')}
        </h2>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          {t('lead')}
        </p>
      </SpotlightCard>

      {/* 4 цифры */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map(({ value, prefix, key }, i) => (
          <SpotlightCard
            key={key}
            isDark={isDark}
            className="p-2.5 text-center motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.5s] motion-ease-spring-smooth"
          >
            <div className="flex items-baseline justify-center gap-0.5">
              {prefix && (
                <span className="text-[9px] font-medium text-emerald-400/70 uppercase tracking-wide">
                  {prefix}
                </span>
              )}
              <span className="text-base font-black tabular-nums text-emerald-400 font-mono">
                {value}
              </span>
            </div>
            <div className="text-[9px] text-muted-foreground leading-tight uppercase tracking-wide mt-0.5">
              {t(key)}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Кому подойдёт */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('forWhomLabel')}
        </h3>
        <SpotlightCard isDark={isDark} className="p-4">
          <p className="text-xs text-foreground/90 leading-relaxed">
            {t('forWhomText')}
          </p>
        </SpotlightCard>
      </div>

      {/* Что внутри */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('featuresLabel')}
        </h3>

        <div className="space-y-2">
          {groups.map(({ icon: Icon, key, items }, gi) => (
            <SpotlightCard
              key={key}
              isDark={isDark}
              className="p-3.5 motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.4s]"
            >
              <div className="flex gap-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 h-fit shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="text-sm font-semibold">
                    {t(`${key}.title`)}
                  </div>
                  <ul className="space-y-0.5">
                    {items.map((itemKey) => (
                      <li
                        key={itemKey}
                        className="text-[11px] text-muted-foreground leading-relaxed flex items-start gap-1.5"
                      >
                        <span className="text-emerald-400/60 select-none">·</span>
                        <span>{t(`${key}.${itemKey}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Контакты */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('contactsLabel')}
        </h3>

        <SpotlightCard isDark={isDark} className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('contactsText')}
          </p>

          <div className="space-y-2">
            <a
              href="https://t.me/kiddybesoul"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleContact}
              className="flex items-center gap-3 text-xs hover:text-emerald-400 transition-colors py-1"
            >
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">@kiddybesoul</span>
            </a>

            <a
              href="mailto:tvdusa90@gmail.com"
              onClick={handleContact}
              className="flex items-center gap-3 text-xs hover:text-emerald-400 transition-colors py-1"
            >
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">tvdusa90@gmail.com</span>
            </a>
          </div>
        </SpotlightCard>
      </div>

      {/* Футер */}
      <footer className="text-center pt-4">
        <span className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
          {t('footerText')} · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
