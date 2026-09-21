'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Gem, ChartLine, UserPlus, Sparkles, ChevronRight, Zap, Send, Clock, Bot,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const t = useTranslations('feelit.home');

  const sections = [
    {
      href: '/subscription',
      icon: Gem,
      title: t('cardSubscription'),
      subtitle: t('cardSubscriptionSub'),
      accent: true,
    },
    {
      href: '/stats',
      icon: ChartLine,
      title: t('cardStats'),
      subtitle: t('cardStatsSub'),
    },
    {
      href: '/referrals',
      icon: UserPlus,
      title: t('cardReferrals'),
      subtitle: t('cardReferralsSub'),
    },
    {
      href: '/tariffs',
      icon: Sparkles,
      title: t('cardTariffs'),
      subtitle: t('cardTariffsSub'),
    },
    {
      href: '/channels',
      icon: Bot,
      title: t('cardChannels'),
      subtitle: t('cardChannelsSub'),
      accent: true,
      wide: true,
    },
  ];

  return (
    <div className="min-h-dvh px-4 py-6 flex flex-col gap-5">
      <section className="text-center space-y-2 pt-2 motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-blur-in-[4px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <h1 className="tracking-tight">{t('heroTitle')}</h1>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          {t('heroSubtitle')}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {sections.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('block', item.wide && 'col-span-2')}
            >
              <Card
                className={cn(
                  'group relative overflow-hidden cursor-pointer gap-0 py-0 h-[124px]',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
                  'active:scale-[0.98]',
                  'motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s]',
                  'motion-ease-spring-smooth',
                  item.accent && 'border-primary/30 bg-gradient-to-br from-card to-primary/[0.04]',
                )}
                style={{ animationDelay: `${String(index * 60)}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/[0.03] to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <CardContent className="relative p-3.5 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        'p-2.5 rounded-xl w-fit transition-all duration-300',
                        item.accent
                          ? 'bg-primary/20 group-hover:bg-primary/30'
                          : 'bg-primary/10 group-hover:bg-primary/20',
                      )}
                    >
                      <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-base font-medium leading-tight line-clamp-1">
                      {item.title}
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 space-y-3.5 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[300ms] motion-ease-spring-smooth">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/15">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div className="font-semibold text-sm">{t('howItWorks')}</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <Send className="w-3 h-3 text-primary" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium leading-tight">{t('step1Title')}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t('step1Text')}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3 h-3 text-primary" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium leading-tight">{t('step2Title')}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t('step2Text')}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3 h-3 text-primary" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium leading-tight">{t('step3Title')}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {t('step3Text')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto text-center text-xs text-muted-foreground pt-4 motion-opacity-in-[0%] motion-duration-[1s]">
        {t('heroTitle')} · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
