'use client';

import { Send, AlertCircle, Clock, Radio } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { icon: Send, label: 'Опубликовано', value: 0, accent: true },
  { icon: AlertCircle, label: 'Не опубликовано', value: 0 },
  { icon: Clock, label: 'Всего постов', value: 0 },
  { icon: Radio, label: 'Каналов подключено', value: 0 },
];

export default function StatsPage() {
  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Статистика</h1>
        <p className="text-sm text-muted-foreground">Посты и каналы</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className={[
                'motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth',
                s.accent && 'border-primary/30 bg-gradient-to-br from-card to-primary/[0.04]',
              ].filter(Boolean).join(' ')}
              style={{ animationDelay: `${String(i * 80)}ms` }}
            >
              <CardContent className="p-4 space-y-3">
                <div className={`p-2.5 rounded-xl inline-block ${s.accent ? 'bg-primary/20' : 'bg-primary/10'}`}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold tabular-nums">{s.value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[300ms] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Radio className="w-4 h-4 text-primary" />
            Мои каналы
          </div>
          <p className="text-sm text-muted-foreground">
            Каналы ещё не подключены. Добавь через бота.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
