'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Gem, Clock, Check, ChevronDown, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetSubscriptionSubscriptionsGet } from '@/src/gen';
import { BackButton } from '@/components/shared/BackButton';

function formatDaysLeft(endDate: string, locale: string): string {
  const now = Date.now();
  const end = new Date(endDate).getTime();
  const diffMs = end - now;
  if (diffMs <= 0) return locale === 'ru' ? 'истекла' : 'expired';
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (locale === 'ru') {
    if (days === 1) return '1 день';
    if (days >= 2 && days <= 4) return `${days} дня`;
    return `${days} дней`;
  }
  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function SubscriptionPage() {
  const t = useTranslations('feelit.subscription');
  const [open, setOpen] = useState(false);
  const { data: subscription, isLoading, error } = useGetSubscriptionSubscriptionsGet();

  const locale = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] || 'ru'
    : 'ru';

  const hasAccess = subscription?.has_access ?? false;
  const status = subscription?.status;
  const productId = subscription?.product_id;
  const isMock = !productId || productId === 'MOCK' || status === 'NONE';

  const features = [
    t('features.schedule'),
    t('features.ai'),
    t('features.images'),
    t('features.moderation'),
    t('features.mix'),
  ];

  const planName = isMock
    ? t('noSub')
    : productId ?? t('noSub');

  const daysLeft = subscription?.end_date && hasAccess
    ? formatDaysLeft(subscription.end_date, locale)
    : null;

  const progressPct = (() => {
    if (!hasAccess || !subscription?.start_date || !subscription?.end_date) return 0;
    const start = new Date(subscription.start_date).getTime();
    const end = new Date(subscription.end_date).getTime();
    const now = Date.now();
    if (end <= start) return 0;
    const remaining = (end - now) / (end - start);
    return Math.max(0, Math.min(100, remaining * 100));
  })();

  return (
    <div className="min-h-dvh px-5 py-6 space-y-5">
      <div className="flex items-center gap-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 space-y-4 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15 motion-scale-in-[0.8] motion-duration-[0.5s] motion-ease-spring-bouncy">
            <Gem className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground">{t('currentPlan')}</div>
            <div className="text-lg font-semibold flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('loading')}</span>
                </>
              ) : (
                planName
              )}
            </div>
          </div>
        </div>

        {!isLoading && !error && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{hasAccess ? t('daysLeft') : t('status')}</span>
              </div>
              <span className="font-medium tabular-nums">
                {hasAccess ? daysLeft : isMock ? t('notActive') : status ?? '—'}
              </span>
            </div>
            {hasAccess && (
              <>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full motion-duration-[1.2s] motion-ease-spring-smooth"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                {subscription?.end_date && (
                  <div className="text-xs text-muted-foreground text-right">
                    {t('until', { date: formatDate(subscription.end_date, locale) })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {error && (
          <div className="text-xs text-destructive">{t('loadError')}</div>
        )}

        <Link
          href="/tariffs"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          {hasAccess ? t('upgrade') : t('subscribe')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3 cursor-pointer text-sm font-semibold hover:text-primary transition-colors"
        >
          <span>{t('whatIncludes')}</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-muted-foreground transition-transform duration-300',
              open && 'rotate-180',
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <ul className="space-y-2.5 pt-1 pb-2">
            {features.map((f, i) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm text-muted-foreground motion-opacity-in-[0%] motion-translate-x-in-[-8px] motion-duration-[0.4s]"
                style={{ animationDelay: `${String(i * 60)}ms` }}
              >
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
