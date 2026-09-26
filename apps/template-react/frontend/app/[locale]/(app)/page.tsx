'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { SpotlightCard, AICore } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import {
  useGetSubscriptionSubscriptionsGet,
  useListChannels,
  useGetMyReferrals,
} from '@/src/gen';
import {
  Gem,
  ChartLine,
  UserPlus,
  Sparkles,
  ChevronRight,
  Bot,
  ArrowUpRight,
  Zap,
  Send,
  Clock,
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('feelit.home');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { data: subscription } = useGetSubscriptionSubscriptionsGet();
  const { data: channels } = useListChannels();
  const { data: referrals } = useGetMyReferrals();

  const channelList = Array.isArray(channels) ? channels : [];
  const activeChannelsCount = channelList.filter(
    (c: { is_active?: boolean }) => c.is_active
  ).length;

  const handleCardClick = () => {
    triggerHaptic('light');
    playHapticSound('click');
  };

  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="flex items-start justify-between gap-3 pt-2 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI ENGINE v2.4
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight leading-tight">
            FEEL IT — AI LAB
          </h1>
          <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
        <AICore isDark={isDark} />
      </div>

      {/* Сетка карточек 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. Моя подписка */}
        <Link href="/subscription" onClick={handleCardClick} className="block">
          <SpotlightCard
            isDark={isDark}
            className="h-32 p-3.5 flex flex-col justify-between motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
                <Gem className="h-4 w-4" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold leading-tight">{t('cardSubscription')}</h3>
              <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                {subscription?.product_id
                  ? subscription.product_id.replace('FEELIT_', '')
                  : t('cardSubscriptionSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>

        {/* 2. Статистика */}
        <Link href="/stats" onClick={handleCardClick} className="block">
          <SpotlightCard
            isDark={isDark}
            className="h-32 p-3.5 flex flex-col justify-between motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[60ms] motion-ease-spring-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400">
                <ChartLine className="h-4 w-4" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold leading-tight">{t('cardStats')}</h3>
              <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                {channelList.length} {t('cardStatsSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>

        {/* 3. Рефералы */}
        <Link href="/referrals" onClick={handleCardClick} className="block">
          <SpotlightCard
            isDark={isDark}
            className="h-32 p-3.5 flex flex-col justify-between motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[120ms] motion-ease-spring-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-2 text-violet-400">
                <UserPlus className="h-4 w-4" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold leading-tight">{t('cardReferrals')}</h3>
              <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                {referrals?.total ?? 0} {t('cardReferralsSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>

        {/* 4. Тарифы */}
        <Link href="/tariffs" onClick={handleCardClick} className="block">
          <SpotlightCard
            isDark={isDark}
            className="h-32 p-3.5 flex flex-col justify-between motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[180ms] motion-ease-spring-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold leading-tight">{t('cardTariffs')}</h3>
              <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                {t('cardTariffsSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>
      </div>

      {/* 5. ИИ Редактор — на всю ширину */}
      <Link href="/channels" onClick={handleCardClick} className="block">
        <SpotlightCard
          isDark={isDark}
          highlight
          className="p-4 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[240ms] motion-ease-spring-smooth"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
                <Bot className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold flex items-center gap-2 flex-wrap">
                  {t('cardChannels')}
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300">
                    {activeChannelsCount} active
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {t('cardChannelsSub')}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-emerald-400 shrink-0" />
          </div>
        </SpotlightCard>
      </Link>

      {/* Как это работает */}
      <SpotlightCard
        isDark={isDark}
        className="p-5 space-y-3.5 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[300ms] motion-ease-spring-smooth"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/15">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-semibold text-sm">{t('howItWorks')}</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
              <Send className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium leading-tight">{t('step1Title')}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t('step1Text')}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium leading-tight">{t('step2Title')}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t('step2Text')}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium leading-tight">{t('step3Title')}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t('step3Text')}
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
