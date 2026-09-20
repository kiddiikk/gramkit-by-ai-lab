'use client';

import Link from 'next/link';
import {
  Gem,
  ChartLine,
  UserPlus,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Список разделов — большие иконки на главной.
// Настройки и Обо мне — в нижнем меню, дублировать не нужно.
const sections = [
  {
    href: '/subscription',
    icon: Gem,
    title: 'Моя подписка',
    subtitle: 'План, дни, лимиты',
    accent: true,
  },
  {
    href: '/stats',
    icon: ChartLine,
    title: 'Статистика',
    subtitle: 'Посты и каналы',
  },
  {
    href: '/referrals',
    icon: UserPlus,
    title: 'Мои рефералы',
    subtitle: 'Приглашай друзей',
  },
  {
    href: '/tariffs',
    icon: Sparkles,
    title: 'Тарифы',
    subtitle: 'Выбери план',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh px-4 py-8 space-y-8">
      {/* === HERO === */}
      <section className="text-center space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          FEEL IT - AI LAB
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
          Бот, который ведёт твой Telegram-канал сам
        </p>
      </section>

      {/* === СЕТКА КНОПОК (2×2) === */}
      <section className="grid grid-cols-2 gap-3 md:gap-4">
        {sections.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="block">
              <Card
                className={[
                  'group relative overflow-hidden cursor-pointer',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
                  'active:scale-[0.98]',
                  'motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s]',
                  'motion-ease-spring-smooth',
                  item.accent && 'border-primary/30 bg-gradient-to-br from-card to-primary/[0.04]',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ animationDelay: `${String(index * 60)}ms` }}
              >
                {/* Мягкий градиент при hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/[0.03] to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <CardContent className="relative p-4 flex flex-col items-start gap-3">
                  {/* Иконка */}
                  <div
                    className={[
                      'p-2.5 rounded-xl transition-all duration-300',
                      item.accent
                        ? 'bg-primary/20 group-hover:bg-primary/30'
                        : 'bg-primary/10 group-hover:bg-primary/20',
                    ].join(' ')}
                  >
                    <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Текст */}
                  <div className="space-y-0.5 w-full">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      {/* === FOOTER === */}
      <footer className="text-center text-xs text-muted-foreground pt-4 pb-2 motion-opacity-in-[0%] motion-duration-[1s]">
        FEEL IT - AI LAB · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
