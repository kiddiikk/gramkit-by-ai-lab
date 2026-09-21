'use client';

import { useState } from 'react';
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

const PRODUCT_META: Record<string, {
  name: string;
  Icon: React.ElementType;
  features: string[];
  popular?: boolean;
}> = {
  FEELIT_START: {
    name: 'Старт',
    Icon: Rocket,
    features: [
      '1 канал',
      '10 постов в день',
      'AI-обработка',
      'Модерация',
      'Генерация картинок',
    ],
  },
  FEELIT_PRO: {
    name: 'Про',
    Icon: Crown,
    popular: true,
    features: [
      '2 канала',
      '30 постов в день',
      'AI-обработка',
      'Модерация',
      'Генерация картинок',
      'Приоритетная очередь',
    ],
  },
  FEELIT_BUSINESS: {
    name: 'Бизнес',
    Icon: Building2,
    features: [
      '5 каналов',
      '100 постов в день',
      'AI-обработка',
      'Модерация',
      'Генерация картинок',
      'Приоритетная очередь',
    ],
  },
};

export default function TariffsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useGetProductsPaymentsProductsGet();
  const startPurchase = useStartPurchasePaymentsStartPurchasePost();

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
        alert('Открой из Telegram, чтобы оплатить');
        return;
      }

      if (tg.openInvoice) {
        tg.openInvoice(result.confirmation_url, (status: string) => {
          if (status === 'paid') {
            queryClient.invalidateQueries({
              queryKey: getSubscriptionSubscriptionsGetQueryKey(),
            });
            queryClient.invalidateQueries({ queryKey: [{ url: '/users/me' }] });
            tg.showPopup({ title: 'Успешно!', message: 'Подписка активирована 🎉' });
          } else if (status === 'failed') {
            tg.showPopup({ title: 'Ошибка', message: 'Оплата не прошла' });
          }
        });
      } else {
        window.open(result.confirmation_url, '_blank');
      }
    } catch (e) {
      console.error('Purchase failed:', e);
      const tg = (window as any).Telegram?.WebApp;
      tg?.showPopup?.({ title: 'Ошибка', message: 'Не удалось создать платёж' });
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
          Не удалось загрузить тарифы. Попробуй позже.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-5 py-6 space-y-4">
      <div className="flex items-center gap-3">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Тарифы</h1>
          <p className="text-sm text-muted-foreground">Выбери подходящий план</p>
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
                        {product.duration_days} дней
                      </div>
                    </div>
                  </div>
                  {meta.popular && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                      Популярный
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
                        Создание...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Оформить
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
        Оплата через Telegram Stars
      </p>
    </div>
  );
}
