'use client';

import { useTranslations } from 'next-intl';
import {
  Send,
  Mail,
  Rss,
  Sparkles,
  Clock,
  Cpu,
  ShieldCheck,
  BarChart3,
  Settings2,
} from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('feelit.about');

  // 4 цифры в hero
  const stats = [
    { value: '10', key: 'statChannels' },
    { value: '100', key: 'statPosts' },
    { value: '24/7', key: 'stat247' },
    { value: '∞', key: 'statTopics' },
  ];

  // 6 групп фич
  const groups = [
    { icon: Rss, key: 'g1', items: ['i1', 'i2', 'i3'] },
    { icon: Cpu, key: 'g2', items: ['i4', 'i5', 'i6'] },
    { icon: Clock, key: 'g3', items: ['i7', 'i8'] },
    { icon: ShieldCheck, key: 'g4', items: ['i9', 'i10'] },
    { icon: BarChart3, key: 'g5', items: ['i11'] },
    { icon: Settings2, key: 'g6', items: ['i12', 'i13'] },
  ];

  return (
    <div className="min-h-dvh px-5 py-8 space-y-10">
      {/* ═══════════ HERO ═══════════ */}
      <header className="space-y-5 text-center motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.7s] motion-ease-spring-smooth">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[11px] font-medium text-primary tracking-wide uppercase">
            {t('badge')}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight leading-[1.15] max-w-[20ch] mx-auto">
          {t('title')}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          {t('lead')}
        </p>

        {/* 4 цифры */}
        <div className="grid grid-cols-4 gap-2 pt-4 max-w-md mx-auto">
          {stats.map(({ value, key }, i) => (
            <div
              key={key}
              className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.5s] motion-ease-spring-smooth"
              style={{ animationDelay: `${String(300 + i * 80)}ms` }}
            >
              <div className="text-xl font-bold tabular-nums text-primary">
                {value}
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight uppercase tracking-wide">
                {t(key)}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ═══════════ КОМУ ПОДОЙДЁТ ═══════════ */}
      <section className="space-y-2 pt-2 border-t border-border/60 motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest pt-6">
          {t('forWhomLabel')}
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          {t('forWhomText')}
        </p>
      </section>

      {/* ═══════════ ЧТО ВНУТРИ ═══════════ */}
      <section className="space-y-4 pt-2 border-t border-border/60 motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest pt-6">
          {t('featuresLabel')}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {groups.map(({ icon: Icon, key, items }, gi) => (
            <div
              key={key}
              className="flex gap-3.5 motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.5s] motion-ease-spring-smooth"
              style={{ animationDelay: `${String(gi * 60)}ms` }}
            >
              {/* Icon column */}
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/15 h-fit shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>

              {/* Text column */}
              <div className="space-y-1.5 pt-0.5 min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground">
                  {t(`${key}.title`)}
                </div>
                <ul className="space-y-0.5">
                  {items.map((itemKey) => (
                    <li
                      key={itemKey}
                      className="text-[13px] text-muted-foreground leading-relaxed flex items-start gap-1.5"
                    >
                      <span className="text-primary/60 select-none">·</span>
                      <span>{t(`${key}.${itemKey}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ КОНТАКТЫ ═══════════ */}
      <section className="space-y-3 pt-2 border-t border-border/60 motion-opacity-in-[0%] motion-translate-y-in-[10px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest pt-6">
          {t('contactsLabel')}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('contactsText')}
        </p>
        <div className="flex flex-col gap-2 pt-2">
          <a
            href="https://t.me/kiddybesoul"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors py-2"
          >
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/15 group-hover:bg-primary/15 transition-colors">
              <Send className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-medium">@kiddybesoul</span>
          </a>
          <a
            href="mailto:tvdusa90@gmail.com"
            className="group flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors py-2"
          >
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/15 group-hover:bg-primary/15 transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-medium">tvdusa90@gmail.com</span>
          </a>
        </div>
      </section>

      <footer className="text-center text-[11px] text-muted-foreground/60 pt-6 pb-2 motion-opacity-in-[0%] motion-duration-[1s]">
        {t('footerText')} · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
