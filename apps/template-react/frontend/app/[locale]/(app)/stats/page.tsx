'use client';

import { Send, AlertCircle, Clock, Radio } from 'lucide-react';

const stats = [
  { icon: Send, label: 'Опубликовано', value: 0, accent: true },
  { icon: AlertCircle, label: 'Не опубликовано', value: 0 },
  { icon: Clock, label: 'Всего постов', value: 0 },
  { icon: Radio, label: 'Каналов', value: 0 },
];

export default function StatsPage() {
  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Статистика</h1>
        <p className="text-sm text-muted-foreground">Посты и каналы</p>
      </header>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="space-y-2 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth"
              style={{ animationDelay: `${String(i * 80)}ms` }}
            >
              <div className={`p-2 rounded-lg inline-block ${s.accent ? 'bg-primary/15' : 'bg-muted'}`}>
                <Icon className={`w-4 h-4 ${s.accent ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="text-3xl font-bold tabular-nums tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Radio className="w-4 h-4 text-primary" />
          Мои каналы
        </div>
        <p className="text-sm text-muted-foreground">
          Каналы ещё не подключены. Добавь через бота.
        </p>
      </div>
    </div>
  );
}
