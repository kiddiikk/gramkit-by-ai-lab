'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gem, Clock, Check, ChevronDown, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
  'Автопостинг по расписанию',
  'AI-обработка новостей',
  'Генерация картинок',
  'Модерация перед публикацией',
];

export default function SubscriptionPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Моя подписка</h1>
        <p className="text-sm text-muted-foreground">План, дни, лимиты</p>
      </header>

      <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/[0.04] motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/20 motion-scale-in-[0.8] motion-duration-[0.5s] motion-ease-spring-bouncy">
              <Gem className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Текущий план</div>
              <div className="text-lg font-semibold">Пробный период</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Осталось</span>
              </div>
              <span className="font-medium">1 день</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full motion-w-[100%] motion-duration-[1s] motion-ease-spring-smooth" style={{ width: '100%' }} />
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href="/tariffs">
              Повысить план
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <CardContent className="p-0">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <span className="text-sm font-semibold">Что входит в подписку</span>
            <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform duration-300', open && 'rotate-180')} />
          </button>
          <div className={cn('overflow-hidden transition-all duration-300 ease-out', open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
            <ul className="px-5 pb-5 space-y-2">
              {features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-muted-foreground motion-opacity-in-[0%] motion-translate-x-in-[-8px] motion-duration-[0.4s]"
                  style={{ animationDelay: `${String(i * 60)}ms` }}
                >
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
