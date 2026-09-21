'use client';

import { useTranslations } from 'next-intl';
import { Send, AlertCircle, Clock, Radio } from 'lucide-react';
import { BackButton } from '@/components/shared/BackButton';

export default function StatsPage() {
  const t = useTranslations('feelit.stats');

  const stats = [
    { icon: Send, key: 'published', value: 0, accent: true },
    { icon: AlertCircle, key: 'notPublished', value: 0 },
    { icon: Clock, key: 'totalPosts', value: 0 },
    { icon: Radio, key: 'channels', value: 0 },
  ];

  return (
    <div className="min-h-dvh px-5 py-6 space-y-6">
      <div className="flex items-center gap-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const label = t(s.key);
          return (
            <div
              key={s.key}
              className="space-y-2 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth"
              style={{ animationDelay: `${String(i * 80)}ms` }}
            >
              <div className={`p-2 rounded-lg inline-block ${s.accent ? 'bg-primary/15' : 'bg-muted'}`}>
                <Icon className={`w-4 h-4 ${s.accent ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="text-3xl font-bold tabular-nums tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{label}</div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Radio className="w-4 h-4 text-primary" />
          {t('myChannels')}
        </div>
        <p className="text-sm text-muted-foreground">
          {t('noChannels')}
        </p>
      </div>
    </div>
  );
}
