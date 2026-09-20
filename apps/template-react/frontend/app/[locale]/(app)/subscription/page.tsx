'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gem, Clock, Check, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  'Автопостинг по расписанию',
  'AI-обработка новостей',
  'Генерация картинок к постам',
  'Модерация перед публикацией',
  'Чередование новостей и развлечений',
];

export default function SubscriptionPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh px-5 py-6 space-y-5">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Моя подписка</h1>
        <p className="text-sm text-muted-foreground">План, дни, лимиты</p>
      </header>

      <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 space-y-4 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15 motion-scale-in-[0.8] motion-duration-[0.5s] motion-ease-spring-bouncy">
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
            <span className="font-medium tabular-nums">1 день</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full motion-duration-[1.2s] motion-ease-spring-smooth"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <Link
          href="/tariffs"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          Повысить план
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3 cursor-pointer text-sm font-semibold hover:text-primary transition-colors"
        >
          <span>Что входит в подписку</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-muted-foreground transition-transform duration-300',
              open && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
