'use client';

import { useState } from 'react';
import { Sparkles, Check, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'start',
    name: '🚀 Старт',
    price: 250,
    channels: 1,
    posts: 10,
    popular: false,
    features: ['1 канал', '10 постов в день', 'AI-обработка', 'Модерация'],
  },
  {
    id: 'pro',
    name: '💎 Про',
    price: 500,
    channels: 2,
    posts: 30,
    popular: true,
    features: ['2 канала', '30 постов в день', 'AI-обработка', 'Модерация', 'Приоритетная очередь'],
  },
  {
    id: 'business',
    name: '🏢 Бизнес',
    price: 1000,
    channels: 5,
    posts: 100,
    popular: false,
    features: ['5 каналов', '100 постов в день', 'AI-обработка', 'Модерация', 'Приоритетная очередь', 'Персональная поддержка'],
  },
];

export default function TariffsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <header className="space-y-1 text-center motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Тарифы</h1>
        <p className="text-sm text-muted-foreground">Выбери подходящий план</p>
      </header>

      <div className="space-y-4">
        {plans.map((plan, i) => {
          const isOpen = openId === plan.id;
          return (
            <Card
              key={plan.id}
              className={cn(
                'motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.5s] motion-ease-spring-smooth',
                plan.popular && 'border-primary/40 bg-gradient-to-br from-card to-primary/[0.04]'
              )}
              style={{ animationDelay: `${String(i * 100)}ms` }}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {plan.channels} {plan.channels === 1 ? 'канал' : 'каналов'} · {plan.posts} постов/день
                    </div>
                  </div>
                  {plan.popular && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium motion-scale-in-[0.8] motion-duration-[0.6s] motion-ease-spring-bouncy">
                      Популярный
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold tabular-nums">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">⭐ / мес</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" variant={plan.popular ? 'default' : 'outline'}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Оформить
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setOpenId(isOpen ? null : plan.id)} className="cursor-pointer">
                    <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
                  </Button>
                </div>

                <div className={cn('overflow-hidden transition-all duration-300 ease-out', isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0')}>
                  <ul className="space-y-1.5 pt-2 border-t">
                    {plan.features.map((f, idx) => (
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

      <p className="text-xs text-muted-foreground text-center">Оплата через Telegram Stars</p>
    </div>
  );
}
