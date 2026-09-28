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
  { key: 'g1', title: 'Парсер', step: '01' },
  { key: 'g2', title: 'Фильтр', step: '02' },
  { key: 'g3', title: 'Генерация', step: '03' },
  { key: 'g4', title: 'Постинг', step: '04' },
];

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
    { prefix: 'до', value: '10', key: 'statChannels' },
    { prefix: 'до', value: '100', key: 'statPosts' },
    { prefix: '', value: '24/7', key: 'stat247' },
    { prefix: '', value: '∞', key: 'statTopics' },
  ];

  const currentStep = PIPELINE[activeStep];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* HERO — без карточки */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400">
          <Sparkles
            className="w-3 h-3 animate-spin"
            style={{ animationDuration: '6s' }}
          />
          {t('badge')}
        </div>

        <h2 className="text-[28px] font-black tracking-tight leading-[1.1]">
          {t('heroHeading1')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            {t('heroHeading2')}
          </span>
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px] mx-auto">
          {t('heroLead')}
        </p>
      </div>

      {/* 4 МЕТРИКИ — в одной карточке */}
      <SpotlightCard isDark={isDark} className="p-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {stats.map(({ value, prefix, key }) => (
            <div key={key} className="text-center space-y-1">
              {prefix && (
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  {prefix}
                </div>
              )}
              <div className="text-4xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-300 to-cyan-400 leading-none">
                {value}
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                {t(key)}
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* ПАЙПЛАЙН */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
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
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                      : 'bg-muted/40 border-border/50 text-muted-foreground'
                  }`}
                >
                  <div className="text-[10px] font-mono leading-none opacity-70">
                    {step.step}
                  </div>
                  <div className={`text-[11px] mt-0.5 truncate ${isActive ? 'font-bold' : ''}`}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-black/30 border border-emerald-500/20">
            <div className="font-bold text-sm text-emerald-400 mb-1">
              {currentStep?.step}. {currentStep?.title === 'Парсер' ? 'Мониторинг 24/7' : currentStep?.title === 'Фильтр' ? 'AI Фильтрация' : currentStep?.title === 'Генерация' ? 'Генерация' : 'Умный автопостинг'}
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {t(`${currentStep?.key}.i1`)}
            </p>
          </div>
        </SpotlightCard>
      </div>

      {/* КОМУ ПОДОЙДЁТ */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider px-1">
          Кому идеально подойдёт
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {AUDIENCES.map((niche, i) => (
            <SpotlightCard key={i} isDark={isDark} className="p-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-sm font-medium text-foreground/90">
                {niche}
              </span>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* КОНТАКТЫ */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider px-1">
          Связь с разработчиками
        </h3>

        <SpotlightCard isDark={isDark} className="p-4 space-y-3">
          <div className="space-y-3">
            <a
              href="https://t.me/kiddybesoul"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerHaptic('light');
                playHapticSound('click');
              }}
              className="flex items-center gap-3 text-sm hover:text-emerald-400 transition-colors"
            >
              <Send className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">@kiddybesoul</span>
            </a>

            <a
              href="mailto:tvdusa90@gmail.com"
              onClick={() => {
                triggerHaptic('light');
                playHapticSound('click');
              }}
              className="flex items-center gap-3 text-sm hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
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
        className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-black font-black text-base shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
      >
        <span>Открыть ИИ Редактор</span>
        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
      </Link>

      <footer className="text-center pt-2 pb-4">
        <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
          {t('footerText')} · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
