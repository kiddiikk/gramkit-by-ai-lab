'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UserPlus, Copy, Check, Users, Share2, Loader2 } from 'lucide-react';
import { useGetMyReferrals } from '@/src/gen';
import { cn } from '@/lib/utils';
import { BackButton } from '@/components/shared/BackButton';

export default function ReferralsPage() {
  const t = useTranslations('feelit.referrals');
  const { data, isLoading, error } = useGetMyReferrals();
  const [copied, setCopied] = useState(false);

  const link = data?.link || '';
  const total = data?.total || 0;
  const active = data?.active || 0;

  const handleCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-5">
        <div className="text-sm text-destructive text-center">
          {t('loadError')}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-5 py-6 space-y-5">
      <div className="flex items-center gap-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      {/* СТАТИСТИКА */}
      <div className="grid grid-cols-2 gap-3 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <div className="rounded-2xl bg-card border border-border p-4 space-y-2">
          <div className="p-2 rounded-lg bg-primary/10 w-fit">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold tabular-nums">{total}</div>
          <div className="text-xs text-muted-foreground">{t('totalInvited')}</div>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 space-y-2">
          <div className="p-2 rounded-lg bg-primary/10 w-fit">
            <Share2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-primary">{active}</div>
          <div className="text-xs text-muted-foreground">{t('activeInvited')}</div>
        </div>
      </div>

      {/* ССЫЛКА */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{t('yourLink')}</div>
            <div className="text-xs text-muted-foreground">{t('yourLinkHint')}</div>
          </div>
        </div>

        <div className="rounded-lg bg-card border border-border p-3 flex items-center gap-2">
          <div className="flex-1 text-xs text-muted-foreground truncate font-mono">
            {link || '—'}
          </div>
        </div>

        <button
          onClick={handleCopy}
          disabled={!link}
          className={cn(
            'w-full h-10 rounded-lg text-sm font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2',
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
            !link && 'opacity-50 cursor-not-allowed',
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {t('copied')}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              {t('copy')}
            </>
          )}
        </button>
      </div>

      {/* СПИСОК */}
      {data && data.referrals.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-semibold px-1">{t('invitedList')}</div>
          <div className="space-y-2">
            {data.referrals.map((r, i) => (
              <div
                key={i}
                className="rounded-xl bg-card border border-border/60 p-3 flex items-center justify-between text-xs motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.4s]"
                style={{ animationDelay: `${String(i * 50)}ms` }}
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
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-medium',
                    r.is_active
                      ? 'bg-emerald-500/20 text-emerald-600'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {r.is_active ? t('active') : t('inactive')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data && data.referrals.length === 0 && (
        <div className="rounded-2xl bg-card border border-border p-6 text-center space-y-1">
          <div className="text-sm">{t('empty')}</div>
          <div className="text-xs text-muted-foreground">{t('emptyHint')}</div>
        </div>
      )}
    </div>
  );
}
