'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import {
  Sparkles,
  Check,
  ArrowUpRight,
  Send,
  Mail,
  Rss,
  Cpu,
  Zap,
  TrendingUp,
} from 'lucide-react';

const PIPELINE = [
  { key: 'g1', icon: Rss, title: 'Парсер', step: '01' },
  { key: 'g2', icon: Cpu, title: 'Фильтр', step: '02' },
  { key: 'g3', icon: Zap, title: 'Генерация', step: '03' },
  { key: 'g4', icon: TrendingUp, title: 'Постинг', step: '04' },
];

const PIPELINE_DETAILS: Record<string, { title: string; desc: string }> = {
  g1: {
    title: '01. Мониторинг 24/7',
    desc: 'Бот сканирует RSS-ленты, Reddit и новостные сайты в режиме реального времени.',
  },
  g2: {
    title: '02. AI Фильтрация',
    desc: 'Нейросеть удаляет дубли, кликбейт и проверяет первоисточник новости.',
  },
  g3: {
    title: '03. Генерация',
    desc: 'Рерайт с tone-of-voice канала, перевод, форматирование и генерация обложки через FLUX.',
  },
  g4: {
    title: '04. Умный автопостинг',
    desc: 'Публикация по расписанию в моменты наивысшей активности аудитории.',
  },
};

const AUDIENCES = [
  'Новостные каналы',
  'Авторские блоги',
  'Крипта и Web3',
  'Бизнес и E-com',
];

export default function AboutPage() {
  const t = useTranslations('feelit.about');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [activeStep, setActiveStep] = useState(0);

  const stats = [
    { prefix: t('statUpTo'), value: '10', key: 'statChannels' },
    { prefix: t('statUpTo'), value: '100', key: 'statPosts' },
    { prefix: '', value: '24/7', key: 'stat247' },
    { prefix: '', value: '∞', key: 'statTopics' },
  ];

  const currentStep = PIPELINE[activeStep];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* HERO */}
      <div className="text-center space-y-3 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-black uppercase tracking-widest text-emerald-400">
          <Sparkles
            className="w-3 h-3 animate-spin"
            style={{ animationDuration: '6s' }}
          />
          {t('badge')}
        </div>

        <h2 className="text-2xl font-black tracking-tight leading-tight">
          {t('heroHeading1')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            {t('heroHeading2')}
          </span>
        </h2>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-[320px] mx-auto">
          {t('heroLead')}
        </p>
      </div>

      {/* 4 МЕТРИКИ 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ value, prefix, key }, i) => (
          <SpotlightCard
            key={key}
            isDark={isDark}
            className="p-4 text-center space-y-1"
          >
            {prefix && (
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                {prefix}
              </div>
            )}
            <div className="text-4xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-300">
              {value}
            </div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {t(key)}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* ПАЙПЛАЙН */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Как устроен пайплайн
          </h3>
          <span className="text-[10px] font-mono text-emerald-400">Нажми на этап</span>
        </div>

        <SpotlightCard isDark={isDark} className="p-4 space-y-3">
          <div className="grid grid-cols-4 gap-1.5">
            {PIPELINE.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.key}
                  onClick={() => {
                    setActiveStep(idx);
                    triggerHaptic('light');
                    playHapticSound('click');
                  }}
                  className={`py-2 px-1 rounded-xl text-center border transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="text-[10px] font-mono leading-none">{step.step}</div>
                  <div className="text-[10px] truncate mt-0.5">{step.title}</div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-black/20 dark:bg-black/40 border border-emerald-500/20">
            <div className="font-bold text-xs text-emerald-400 mb-1">
              {PIPELINE_DETAILS[currentStep?.key || 'g1']?.title}
            </div>
            <p className="text-[11px] text-foreground/80 leading-relaxed">
              {PIPELINE_DETAILS[currentStep?.key || 'g1']?.desc}
            </p>
          </div>
        </SpotlightCard>
      </div>

      {/* КОМУ ПОДОЙДЁТ */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('forWhomLabel')}
        </h3>

        <SpotlightCard isDark={isDark} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {AUDIENCES.map((niche, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-xl bg-muted/30 border border-border/50"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-medium text-foreground/90">
                  {niche}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
            {t('forWhomText')}
          </p>
        </SpotlightCard>
      </div>

      {/* КОНТАКТЫ */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('contactsLabel')}
        </h3>

        <SpotlightCard isDark={isDark} className="p-4 space-y-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {t('contactsText')}
          </p>

          <div className="space-y-2">
            <a
              href="https://t.me/kiddybesoul"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerHaptic('light');
                playHapticSound('click');
              }}
              className="flex items-center gap-3 text-xs hover:text-emerald-400 transition-colors py-1"
            >
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">@kiddybesoul</span>
            </a>

            <a
              href="mailto:tvdusa90@gmail.com"
              onClick={() => {
                triggerHaptic('light');
                playHapticSound('click');
              }}
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

      {/* CTA */}
      <Link
        href="/channels"
        onClick={() => {
          triggerHaptic('medium');
          playHapticSound('pulse');
        }}
        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-black font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
      >
        <span>Открыть ИИ Редактор</span>
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </Link>

      {/* Footer */}
      <footer className="text-center pt-2 pb-4">
        <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
          {t('footerText')} · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
