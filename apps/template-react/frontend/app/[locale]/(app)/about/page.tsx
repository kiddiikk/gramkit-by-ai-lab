'use client';

import { useTranslations } from 'next-intl';
import { Send, Mail } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('feelit.about');

  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <header className="space-y-2 text-center motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.7s] motion-ease-spring-smooth">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </header>

      <article className="space-y-4 text-sm text-muted-foreground leading-relaxed motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
      </article>

      <section className="rounded-2xl bg-card border border-border p-5 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[200ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground">
          {t('contactsTitle')}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('contactsText')}
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

      <footer className="text-center text-xs text-muted-foreground pt-4 motion-opacity-in-[0%] motion-duration-[1s]">
        {t('footerText')} · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
