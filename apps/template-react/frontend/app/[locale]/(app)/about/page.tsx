'use client';

import { useTranslations } from 'next-intl';
import {
  Send,
  Mail,
  Rss,
  Sparkles,
  Clock,
  Languages,
  Image as ImageIcon,
  CalendarClock,
  Layers,
  Cpu,
  ShieldCheck,
  Copy,
  BarChart3,
  Globe,
} from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('feelit.about');

  const features = [
    { icon: Rss, key: 'f1' },
    { icon: Clock, key: 'f2' },
    { icon: Languages, key: 'f3' },
    { icon: ImageIcon, key: 'f4' },
    { icon: CalendarClock, key: 'f5' },
    { icon: Layers, key: 'f6' },
    { icon: Cpu, key: 'f7' },
    { icon: ShieldCheck, key: 'f8' },
    { icon: Copy, key: 'f9' },
    { icon: BarChart3, key: 'f10' },
    { icon: Globe, key: 'f11' },
  ];

  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      {/* HERO */}
      <header className="space-y-3 text-center motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.7s] motion-ease-spring-smooth">
        <h1 className="text-3xl font-bold tracking-tight leading-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          {t('lead')}
        </p>
      </header>

      {/* КОМУ ПОДОЙДЁТ */}
      <section className="rounded-2xl bg-card border border-border p-5 space-y-2 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[150ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          {t('forWhomTitle')}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('forWhomText')}
        </p>
      </section>

      {/* ЧТО ВНУТРИ */}
      <section className="space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[250ms] motion-ease-spring-smooth">
        <h2 className="text-sm font-semibold text-foreground px-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          {t('featuresTitle')}
        </h2>

        <ul className="space-y-2">
          {features.map(({ icon: Icon, key }) => (
            <li
              key={key}
              className="flex items-start gap-3 rounded-xl bg-card border border-border/60 px-3.5 py-2.5 motion-opacity-in-[0%] motion-translate-x-in-[-8px] motion-duration-[0.4s]"
            >
              <div className="p-1.5 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm text-foreground leading-relaxed">
                {t(`features.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* КОНТАКТЫ */}
      <section className="rounded-2xl bg-card border border-border p-5 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[350ms] motion-ease-spring-smooth">
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
