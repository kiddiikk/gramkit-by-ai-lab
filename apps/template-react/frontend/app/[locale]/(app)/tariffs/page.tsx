'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Rocket, Crown, Building2, Check, ChevronDown, Loader2, Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetProductsPaymentsProductsGet,
  useStartPurchasePaymentsStartPurchasePost,
  getSubscriptionSubscriptionsGetQueryKey,
} from '@/src/gen';
import { BackButton } from '@/components/shared/BackButton';

export default function TariffsPage() {
  const t = useTranslations('feelit.tariffs');
  const [openId, setOpenId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useGetProductsPaymentsProductsGet();
  const startPurchase = useStartPurchasePaymentsStartPurchasePost();

  const PRODUCT_META: Record<string, {
    name: string;
    Icon: React.ElementType;
    features: string[];
    popular?: boolean;
  }> = {
    FEELIT_START: {
      name: t('startName'),
      Icon: Rocket,
      features: [
        t('features.channels1'),
        t('features.posts10'),
        t('features.ai'),
        t('features.moderation'),
        t('features.images'),
      ],
    },
    FEELIT_PRO: {
      name: t('proName'),
      Icon: Crown,
      popular: true,
      features: [
        t('features.channels2'),
        t('features.posts30'),
        t('features.ai'),
        t('features.moderation'),
        t('features.images'),
        t('features.priority'),
      ],
    },
    FEELIT_BUSINESS: {
      name: t('businessName'),
      Icon: Building2,
      features: [
        t('features.channels5'),
        t('features.posts100'),
        t('features.ai'),
        t('features.moderation'),
        t('features.images'),
        t('features.priority'),
      ],
    },
  };

  const handleBuy = async (productId: string) => {
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
            tg.showPopup({ title: t('paymentSuccess'), message: '' });
          } else if (status === 'failed') {
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
    <div className="min-h-dvh px-5 py-6 space-y-4">
      <div className="flex items-center gap-3">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      <div className="space-y-3">
        {products?.map((product, i) => {
          const meta = PRODUCT_META[product.id];
          if (!meta) return null;

          const { Icon } = meta;
          const isOpen = openId === product.id;
          const isPending = startPurchase.isPending;

          return (
            <Card
              key={product.id}
              className={cn(
                'motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.5s] motion-ease-spring-smooth',
                meta.popular && 'border-primary/40 bg-gradient-to-br from-card to-primary/[0.04]',
              )}
              style={{ animationDelay: `${String(i * 100)}ms` }}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'p-2.5 rounded-xl transition-colors',
                      meta.popular ? 'bg-primary/20' : 'bg-primary/10',
                    )}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{meta.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.duration_days} {t('daysLabel')}
                      </div>
                    </div>
                  </div>
                  {meta.popular && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                      {t('popular')}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold tabular-nums">
                    {Math.round(product.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {product.currency === 'XTR' ? '⭐' : product.currency} / мес
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    variant={meta.popular ? 'default' : 'outline'}
                    onClick={() => handleBuy(product.id)}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('creating')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t('buy')}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenId(isOpen ? null : product.id)}
                    className="cursor-pointer"
                  >
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )} />
                  </Button>
                </div>

                <div className={cn(
                  'overflow-hidden transition-all duration-300 ease-out',
                  isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
                )}>
                  <ul className="space-y-1.5 pt-2 border-t">
                    {meta.features.map((f, idx) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs text-muted-foreground motion-opacity-in-[0%] motion-translate-x-in-[-8px] motion-duration-[0.4s]"
                        style={{ animationDelay: `${String(idx * 50)}ms` }}
                      >
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        {t('payNote')}
      </p>
    </div>
  );
}
