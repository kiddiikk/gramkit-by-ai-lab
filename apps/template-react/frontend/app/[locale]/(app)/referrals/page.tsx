'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import { useGetMyReferrals } from '@/src/gen';
import {
  Users,
  Copy,
  Check,
  Share2,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function ReferralsPage() {
  const t = useTranslations('feelit.referrals');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { data, isLoading, error } = useGetMyReferrals();
  const [copied, setCopied] = useState(false);

  const link = data?.link || '';
  const total = data?.total ?? 0;
  const active = data?.active ?? 0;

  const handleCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      triggerHaptic('success');
      playHapticSound('success');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-sm text-destructive text-center">{t('loadError')}</div>
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
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-2 text-violet-400 w-fit">
            <Users className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-violet-400 font-mono pt-1">{total}</div>
          <div className="text-[11px] text-muted-foreground">{t('totalInvited')}</div>
        </SpotlightCard>

        <SpotlightCard
          isDark={isDark}
          className="p-3.5 space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[60ms] motion-ease-spring-smooth"
        >
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 w-fit">
            <Share2 className="h-4 w-4" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono pt-1">{active}</div>
          <div className="text-[11px] text-muted-foreground">{t('activeInvited')}</div>
        </SpotlightCard>
      </div>

      {/* Реферальная ссылка */}
      <SpotlightCard
        isDark={isDark}
        highlight
        className="p-4 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[120ms] motion-ease-spring-smooth"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">{t('yourLink')}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {t('yourLinkHint')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            readOnly
            value={link || '—'}
            className="flex-1 bg-black/20 dark:bg-black/40 border border-border/60 rounded-xl px-3 py-2 text-xs text-foreground font-mono select-all focus:outline-none"
          />
          <button
            onClick={handleCopy}
            disabled={!link}
            className={`p-2.5 rounded-xl transition-all shrink-0 active:scale-95 ${
              copied
                ? 'bg-emerald-500 text-black'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_16px_rgba(16,185,129,0.3)]'
            } ${!link ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </SpotlightCard>

      {/* Список рефералов */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
          {t('invitedList')}
        </h3>

        {!data?.referrals || data.referrals.length === 0 ? (
          <SpotlightCard isDark={isDark} className="p-6 text-center space-y-1">
            <div className="text-sm">{t('empty')}</div>
            <div className="text-xs text-muted-foreground">{t('emptyHint')}</div>
          </SpotlightCard>
        ) : (
          <div className="space-y-2">
            {data.referrals.map((r, i) => (
              <SpotlightCard
                key={i}
                isDark={isDark}
                className="p-3 flex items-center justify-between text-xs motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.4s]"
              >
                <span className="text-muted-foreground">
                  {r.invited_at
                    ? new Date(r.invited_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '—'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    r.is_active
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {r.is_active ? t('active') : t('inactive')}
                </span>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
