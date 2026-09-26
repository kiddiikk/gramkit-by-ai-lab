'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import {
  useGetSubscriptionSubscriptionsGet,
  useGetMyLimits,
} from '@/src/gen';
import {
  Gem,
  Clock,
  Check,
  X,
  Loader2,
  Radio,
  FileText,
  Sparkles,
  Shield,
  Users,
  BarChart3,
  Headphones,
  Zap,
  ArrowRight,
} from 'lucide-react';

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function SubscriptionPage() {
  const t = useTranslations('feelit.subscription');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { data: subscription, isLoading, error } = useGetSubscriptionSubscriptionsGet();
  const { data: limitsData } = useGetMyLimits();

  const locale =
    typeof window !== 'undefined'
      ? window.location.pathname.split('/')[1] || 'ru'
      : 'ru';

  const hasAccess = subscription?.has_access ?? false;
  const plan = limitsData?.limits;
  const usage = limitsData?.usage;
  const planName = hasAccess && plan?.name ? plan.name : t('noSub');

  const daysLeft = (() => {
    if (!subscription?.end_date || !hasAccess) return null;
    const diffMs = new Date(subscription.end_date).getTime() - Date.now();
    if (diffMs <= 0) return locale === 'ru' ? 'истекла' : 'expired';
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (locale === 'ru') {
      if (days === 1) return '1 день';
      if (days >= 2 && days <= 4) return `${days} дня`;
      return `${days} дней`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  })();

  const progressPct = (() => {
    if (!hasAccess || !subscription?.start_date || !subscription?.end_date) return 0;
    const start = new Date(subscription.start_date).getTime();
    const end = new Date(subscription.end_date).getTime();
    const now = Date.now();
    if (end <= start) return 0;
    return Math.max(0, Math.min(100, ((end - now) / (end - start)) * 100));
  })();

  const handleClick = () => {
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

      {/* КАРТОЧКА ПОДПИСКИ */}
      <SpotlightCard isDark={isDark} highlight className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              {t('currentPlan')}
            </div>
            <h2 className="text-xl font-black mt-0.5 flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('loading')}</span>
                </>
              ) : (
                planName
              )}
            </h2>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Gem className="w-5 h-5" />
          </div>
        </div>

        {!isLoading && !error && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{hasAccess ? t('daysLeft') : t('status')}</span>
              </div>
              <span className="font-mono font-medium">
                {hasAccess ? daysLeft : t('notActive')}
              </span>
            </div>

            {hasAccess && (
              <>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                {subscription?.end_date && (
                  <div className="text-[11px] text-muted-foreground text-right">
                    {t('until', { date: formatDate(subscription.end_date, locale) })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {error && <div className="text-xs text-destructive">{t('loadError')}</div>}

        <Link
          href="/tariffs"
          onClick={handleClick}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_16px_rgba(16,185,129,0.3)] mt-2"
        >
          <Zap className="w-4 h-4 fill-current" />
          {hasAccess ? t('upgrade') : t('subscribe')}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </SpotlightCard>

      {/* ЛИМИТЫ ТАРИФА */}
      {plan && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
            {t('limits.title')}
          </h3>

          <SpotlightCard isDark={isDark} className="p-4 space-y-4">
            {/* Каналы */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Radio className="w-3.5 h-3.5" />
                  <span>{t('limits.channels')}</span>
                </div>
                <span className="font-mono font-medium">
                  {usage?.channels ?? 0} / {plan.channels}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((usage?.channels ?? 0) / (plan.channels || 1)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Посты в день */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('limits.postsPerDay')}</span>
                </div>
                <span className="font-mono font-medium">
                  {usage?.posts_today ?? 0} / {plan.posts_per_day}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((usage?.posts_today ?? 0) / (plan.posts_per_day || 1)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* 6 фич */}
            <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-2">
              <LimitRow
                icon={Sparkles}
                label={t('limits.model120b')}
                available={plan.model_120b}
              />
              <LimitRow
                icon={Sparkles}
                label={t('limits.customPrompt')}
                available={plan.custom_prompt}
              />
              <LimitRow
                icon={Shield}
                label={t('limits.moderation')}
                available={plan.moderation}
              />
              <LimitRow
                icon={Users}
                label={t('limits.teamAccess', { count: plan.team_size })}
                available={plan.team_size > 0}
              />
              <LimitRow
                icon={BarChart3}
                label={t('limits.analytics')}
                available={plan.analytics}
              />
              <LimitRow
                icon={Headphones}
                label={t('limits.prioritySupport')}
                available={plan.priority_support}
              />
            </div>
          </SpotlightCard>
        </div>
      )}
    </div>
  );
}

function LimitRow({
  icon: Icon,
  label,
  available,
}: {
  icon: React.ElementType;
  label: string;
  available: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 text-[11px] ${
        available ? 'text-muted-foreground' : 'text-muted-foreground/40'
      }`}
    >
      {available ? (
        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
      ) : (
        <X className="w-3 h-3 text-muted-foreground/40 shrink-0" />
      )}
      <Icon className="w-3 h-3 shrink-0" />
      <span className={`truncate ${!available ? 'line-through' : ''}`}>{label}</span>
    </div>
  );
}
