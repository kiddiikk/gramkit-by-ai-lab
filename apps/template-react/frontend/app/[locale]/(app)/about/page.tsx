'use client';

import { Bot, Sparkles, Image as ImageIcon, Clock, Send, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  { icon: Bot, title: 'Автопостинг', desc: 'Ведёт твой канал по расписанию' },
  { icon: Sparkles, title: 'AI-обработка', desc: 'Перевод, рерайт, форматирование' },
  { icon: ImageIcon, title: 'Картинки', desc: 'Генерация к постам автоматически' },
  { icon: Clock, title: '24/7', desc: 'Работает без выходных' },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <header className="text-center space-y-2 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.7s] motion-ease-spring-smooth">
        <h1 className="text-3xl font-bold tracking-tight">FEEL IT — AI LAB</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Бот, который ведёт твой Telegram-канал сам
        </p>
      </header>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex items-start gap-3 motion-opacity-in-[0%] motion-translate-x-in-[-10px] motion-duration-[0.4s]"
                style={{ animationDelay: `${String(i * 80 + 200)}ms` }}
              >
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[400ms] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Heart className="w-4 h-4 text-primary" />
            Связь
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Send className="w-3.5 h-3.5" />
            <a href="https://t.me/kiddybesoul" className="hover:text-foreground transition-colors">@kiddybesoul</a>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-xs text-muted-foreground pt-4 motion-opacity-in-[0%] motion-duration-[1s]">
        FEEL IT — AI LAB · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
