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
  Zap,
  ArrowUpRight,
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
  const activeChannelsCount = channelList.filter((c) => c.is_active).length;

  const handleCardClick = () => {
    triggerHaptic('light');
    playHapticSound('click');
  };

  return (
    <div className="space-y-4">
      {/* HERO CARD — как Gemini */}
      <SpotlightCard isDark={isDark} highlight className="p-5 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              Live Monitor
            </span>
          </div>
          <span className="text-muted-foreground font-mono">@feelit_ailab_bot</span>
        </div>

        {/* AICore — БОЛЬШАЯ, ЦЕНТР */}
        <AICore isDark={isDark} />

        <div className="text-center pt-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Нейроядро активно • 24/7
          </div>
        </div>

        <h2 className="text-center text-xl font-black tracking-tight pt-1">
          FEEL IT — AI LAB
        </h2>
        <p className="text-center text-xs text-muted-foreground leading-relaxed max-w-[300px] mx-auto">
          {t('heroSubtitle')}
        </p>
      </SpotlightCard>

      {/* ИИ РЕДАКТОР — как Gemini, но без фейкового «Тест генерации» */}
      <SpotlightCard isDark={isDark} className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold flex items-center gap-2 flex-wrap">
                {t('cardChannels')}
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                  {activeChannelsCount} active
                </span>
              </h3>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                {t('cardChannelsSub')}
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/channels"
          onClick={handleCardClick}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_16px_rgba(16,185,129,0.3)]"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Открыть ИИ Редактор
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </SpotlightCard>

      {/* BENTO 2×2 — как Gemini, но с реальными данными */}
      <div className="grid grid-cols-2 gap-3">
        {/* Подписка */}
        <Link href="/subscription" onClick={handleCardClick} className="block">
          <SpotlightCard isDark={isDark} className="h-32 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
                <Gem className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {subscription?.product_id?.replace('FEELIT_', '') || 'START'}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold leading-tight">{t('cardSubscription')}</h3>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight line-clamp-1">
                {t('cardSubscriptionSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>

        {/* Статистика */}
        <Link href="/stats" onClick={handleCardClick} className="block">
          <SpotlightCard isDark={isDark} className="h-32 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400">
                <ChartLine className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                {channelList.length}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold leading-tight">{t('cardStats')}</h3>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight line-clamp-1">
                {channelList.length} {t('cardStatsSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>

        {/* Рефералы */}
        <Link href="/referrals" onClick={handleCardClick} className="block">
          <SpotlightCard isDark={isDark} className="h-32 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-2 text-violet-400">
                <UserPlus className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold text-violet-400 bg-violet-400/10 px-1.5 py-0.5 rounded">
                {referrals?.total ?? 0}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold leading-tight">{t('cardReferrals')}</h3>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight line-clamp-1">
                {referrals?.total ?? 0} {t('cardReferralsSub')}
              </p>
            </div>
          </SpotlightCard>
        </Link>

        {/* Тарифы */}
        <Link href="/tariffs" onClick={handleCardClick} className="block">
          <SpotlightCard isDark={isDark} className="h-32 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400 text-black">
                HOT
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold leading-tight">{t('cardTariffs')}</h3>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight line-clamp-1">
                от 250 ⭐
              </p>
            </div>
          </SpotlightCard>
        </Link>
      </div>
    </div>
  );
}
