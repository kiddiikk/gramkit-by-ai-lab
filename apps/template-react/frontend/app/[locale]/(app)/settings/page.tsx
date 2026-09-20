'use client';

import { MessageCircle, Send, Mail, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';

export default function SettingsPage() {
  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Настройки</h1>
        <p className="text-sm text-muted-foreground">Связь и интерфейс</p>
      </header>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[50ms] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MessageCircle className="w-4 h-4 text-primary" />
            Связь с админом
          </div>
          <p className="text-sm text-muted-foreground">Вопросы, идеи, сотрудничество</p>
          <div className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="https://t.me/kiddybesoul" target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4 mr-2" />
                @kiddybesoul
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="mailto:tvdusa90@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                tvdusa90@gmail.com
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            Интерфейс
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Тема</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Язык</span>
            <LanguageToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[150ms] motion-ease-spring-smooth">
        <CardContent className="p-5">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Выйти из аккаунта
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
