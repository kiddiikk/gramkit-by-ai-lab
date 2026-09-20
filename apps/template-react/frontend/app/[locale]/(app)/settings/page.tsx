'use client';

import { Send, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';

export default function SettingsPage() {
  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Настройки</h1>
        <p className="text-sm text-muted-foreground">Связь и интерфейс</p>
      </header>

      <section className="space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[50ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground">Вопросы и сотрудничество</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Идеи, вопросы, реклама, сотрудничество — пиши, отвечаем быстро.
        </p>
        <div className="space-y-2 pt-1">
          <a
            href="https://t.me/kiddybesoul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors py-1"
          >
            <Send className="w-4 h-4 text-primary shrink-0" />
            @kiddybesoul
          </a>
          <a
            href="mailto:tvdusa90@gmail.com"
            className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors py-1"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            tvdusa90@gmail.com
          </a>
        </div>
      </section>

      <section className="space-y-4 pt-4 border-t motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground">Интерфейс</h2>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Тема</span>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Язык</span>
          <LanguageToggle />
        </div>
      </section>
    </div>
  );
}
