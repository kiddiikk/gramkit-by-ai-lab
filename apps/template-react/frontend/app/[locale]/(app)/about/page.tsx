'use client';

import { Send } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <header className="space-y-2 text-center motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.7s] motion-ease-spring-smooth">
        <h1 className="text-3xl font-bold tracking-tight">FEEL IT — AI LAB</h1>
        <p className="text-sm text-muted-foreground">Бот, который ведёт твой Telegram-канал сам</p>
      </header>

      <article className="space-y-4 text-sm text-muted-foreground leading-relaxed motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <p>
          FEEL IT — AI LAB это бот для автоматического ведения Telegram-каналов.
          Ты даёшь ему тему, а он сам находит свежие новости из мира AI, обрабатывает
          их нейросетью, переводит на русский, переписывает живым языком и публикует
          по расписанию — без твоего участия.
        </p>
        <p>
          Если к новости нет подходящей картинки — бот сгенерирует её сам. Если нужно
          чередовать серьёзные материалы с чем-то лёгким — сделает и это. Всё, что
          попадает в канал, сначала проходит через тебя: можно одобрить, отклонить
          или отредактировать.
        </p>
        <p>
          Бот работает круглосуточно и не устаёт. Он подойдёт тем, кто ведёт канал
          про технологии, AI, стартапы или хочет просто держать аудиторию в курсе,
          не тратя на это часы каждый день.
        </p>
      </article>

      <section className="pt-4 border-t space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[300ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground">Связь</h2>
        <a
          href="https://t.me/kiddybesoul"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
        >
          <Send className="w-4 h-4 text-primary" />
          @kiddybesoul
        </a>
      </section>

      <footer className="text-center text-xs text-muted-foreground pt-4 motion-opacity-in-[0%] motion-duration-[1s]">
        FEEL IT — AI LAB · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
