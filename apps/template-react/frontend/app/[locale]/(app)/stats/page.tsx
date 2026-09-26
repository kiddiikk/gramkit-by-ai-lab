'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import { useListChannels, useGetSubscriptionSubscriptionsGet } from '@/src/gen';
import {
  Send,
  ChartLine,
  Radio,
  ChevronRight,
  Loader2,
} from 'lucide-react';

export default function StatsPage() {
  const t = useTranslations('feelit.stats');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { data: channels, isLoading } = useListChannels();
  const { data: subscription } = useGetSubscriptionSubscriptionsGet();

  const channelList = Array.isArray(channels) ? channels : [];
  const activeCount = channelList.filter((c) => c.is_active).length;
  const inactiveCount = channelList.length - activeCount;

  const handleClick = () => {
    triggerHaptic('light');
    playHapticSound('click');
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* Метрики 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        <SpotlightCard
          isDark={isDark}
          className="p-3.5 space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth"
        >
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 w-fit">
            <Send className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono pt-1">
            {activeCount}
          </div>
          <div className="text-[11px] text-muted-foreground">{t('published')}</div>
        </SpotlightCard>

        <SpotlightCard
          isDark={isDark}
          className="p-3.5 space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[60ms] motion-ease-spring-smooth"
        >
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-400 w-fit">
            <ChartLine className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono pt-1">
            {inactiveCount}
          </div>
          <div className="text-[11px] text-muted-foreground">{t('notPublished')}</div>
        </SpotlightCard>

        <SpotlightCard
          isDark={isDark}
          className="p-3.5 space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[120ms] motion-ease-spring-smooth"
        >
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400 w-fit">
            <Send className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono pt-1">
            {subscription?.product_id ? '∞' : '—'}
          </div>
          <div className="text-[11px] text-muted-foreground">{t('totalPosts')}</div>
        </SpotlightCard>

        <SpotlightCard
          isDark={isDark}
          className="p-3.5 space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[180ms] motion-ease-spring-smooth"
        >
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-2 text-violet-400 w-fit">
            <Radio className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-violet-400 font-mono pt-1">
            {channelList.length}
          </div>
          <div className="text-[11px] text-muted-foreground">{t('channels')}</div>
        </SpotlightCard>
      </div>

      {/* Список каналов */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('myChannels')}
          </h3>
          <Link
            href="/channels"
            onClick={handleClick}
            className="text-xs text-emerald-400 flex items-center gap-0.5 hover:underline"
          >
            {t('myChannels')}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {channelList.length === 0 ? (
          <SpotlightCard isDark={isDark} className="p-6 text-center space-y-1">
            <div className="text-sm text-muted-foreground">{t('noChannels')}</div>
          </SpotlightCard>
        ) : (
          <div className="space-y-2">
            {channelList.map((ch, i) => (
              <SpotlightCard
                key={ch.id}
                isDark={isDark}
                onClick={handleClick}
                className="p-3.5 flex items-center justify-between text-xs motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.4s]"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">
                    {ch.channel_name || ch.channel_id}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {ch.topic || '—'} · {Math.round((ch.post_interval ?? 7200) / 3600)}ч
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      ch.is_active ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                    }`}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {ch.is_active ? 'ON' : 'OFF'}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
