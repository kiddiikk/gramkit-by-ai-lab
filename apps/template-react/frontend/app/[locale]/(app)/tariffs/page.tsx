'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  Rocket,
  Crown,
  Building2,
  Check,
  X,
  Loader2,
  Sparkles,
  Star,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetProductsPaymentsProductsGet,
  useStartPurchasePaymentsStartPurchasePost,
  getSubscriptionSubscriptionsGetQueryKey,
} from '@/src/gen';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';

export default function TariffsPage() {
  const t = useTranslations('feelit.tariffs');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useGetProductsPaymentsProductsGet();
  const startPurchase = useStartPurchasePaymentsStartPurchasePost();

  const PRODUCT_META: Record<string, {
    name: string;
    Icon: React.ElementType;
    features: Array<{ key: string; available: boolean }>;
    popular?: boolean;
  }> = {
    FEELIT_START: {
      name: t('startName'),
      Icon: Rocket,
      features: [
        { key: 'channels1', available: true },
        { key: 'posts5', available: true },
        { key: 'interval4h', available: true },
        { key: 'model120b', available: false },
        { key: 'customPrompt', available: false },
        { key: 'teamAccess', available: false },
        { key: 'analytics', available: false },
        { key: 'prioritySupport', available: false },
      ],
    },
    FEELIT_PRO: {
      name: t('proName'),
      Icon: Crown,
      popular: true,
      features: [
        { key: 'channels3', available: true },
        { key: 'posts20', available: true },
        { key: 'interval2h', available: true },
        { key: 'model120b', available: true },
        { key: 'customPrompt', available: true },
        { key: 'teamAccess2', available: true },
        { key: 'analytics', available: false },
        { key: 'prioritySupport', available: false },
      ],
    },
    FEELIT_BUSINESS: {
      name: t('businessName'),
      Icon: Building2,
      features: [
        { key: 'channels10', available: true },
        { key: 'posts100', available: true },
        { key: 'interval1h', available: true },
        { key: 'model120b', available: true },
        { key: 'customPrompt', available: true },
        { key: 'teamAccess5', available: true },
        { key: 'analytics', available: true },
        { key: 'prioritySupport', available: true },
      ],
    },
  };

  const handleBuy = async (productId: string) => {
    triggerHaptic('heavy');
    playHapticSound('pulse');
    try {
      const result = await startPurchase.mutateAsync({
        data: {
          product_id: productId,
          currency: 'XTR',
          provider_id: 'TELEGRAM_STARS',
          return_url: typeof window !== 'undefined' ? window.location.href : '',
        },
      });

      const tg = (window as any).Telegram?.WebApp;
      if (!tg) {
        alert(t('openInTelegram'));
        return;
      }

      if (tg.openInvoice) {
        tg.openInvoice(result.confirmation_url, (status: string) => {
          if (status === 'paid') {
            queryClient.invalidateQueries({
              queryKey: getSubscriptionSubscriptionsGetQueryKey(),
            });
            queryClient.invalidateQueries({ queryKey: [{ url: '/users/me' }] });
            triggerHaptic('success');
            playHapticSound('success');
            tg.showPopup({ title: t('paymentSuccess'), message: '' });
          } else if (status === 'failed') {
            triggerHaptic('error');
            tg.showPopup({ title: t('paymentFailed'), message: '' });
          }
        });
      } else {
        window.open(result.confirmation_url, '_blank');
      }
    } catch (e) {
      console.error('Purchase failed:', e);
      const tg = (window as any).Telegram?.WebApp;
      tg?.showPopup?.({ title: t('paymentError'), message: '' });
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

      <div className="space-y-3">
        {products?.map((product, i) => {
          const meta = PRODUCT_META[product.id];
          if (!meta) return null;

          const { Icon } = meta;
          const isPending = startPurchase.isPending;

          return (
            <SpotlightCard
              key={product.id}
              isDark={isDark}
              highlight={meta.popular}
              className="p-4 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.5s] motion-ease-spring-smooth"
            >
              {/* Header: иконка + название + цена + popular */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold flex items-center gap-2 flex-wrap">
                      {meta.name}
                      {meta.popular && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          {t('popular')}
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      {product.duration_days} {t('daysLabel')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-base font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {Math.round(product.price)}
                </div>
              </div>

              {/* Фичи 2 колонки — всегда видны */}
              <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {meta.features.map(({ key, available }) => (
                  <div
                    key={key}
                    className={`flex items-center gap-1.5 text-[11px] ${
                      available ? 'text-muted-foreground' : 'text-muted-foreground/40'
                    }`}
                  >
                    {available ? (
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="w-3 h-3 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={`truncate ${!available ? 'line-through' : ''}`}>
                      {t(`features.${key}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Кнопка «Оформить» */}
              <button
                onClick={() => handleBuy(product.id)}
                disabled={isPending}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
                  meta.popular
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                    : 'bg-muted hover:bg-muted/70 text-foreground'
                } ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {t('creating')}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    {t('buy')}
                  </>
                )}
              </button>
            </SpotlightCard>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground text-center pt-2">
        {t('payNote')}
      </p>
    </div>
  );
}
