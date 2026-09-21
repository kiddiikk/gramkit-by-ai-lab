'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Activity, Clock, Radio, ListChecks } from 'lucide-react';
import { useListChannels, useToggleChannel, useSetChannelInterval } from '@/src/gen';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { BackButton } from '@/components/shared/BackButton';

const INTERVALS = [
  { value: 3600, label: '1 ч' },
  { value: 7200, label: '2 ч' },
  { value: 14400, label: '4 ч' },
  { value: 28800, label: '8 ч' },
  { value: 86400, label: '24 ч' },
];

export default function AIEditorPage() {
  const t = useTranslations('feelit.channels');
  const { data: channels, isLoading, error } = useListChannels();
  const toggle = useToggleChannel();
  const setInterval = useSetChannelInterval();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedChannel = channels?.find((c) => c.id === selectedId) || channels?.[0];

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground text-center">{t('loading')}</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-destructive text-center">
        {t('loadError')}
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-5 py-6 space-y-5">
      <div className="flex items-center gap-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/15">
            <Radio className="w-4 h-4 text-primary" />
          </div>
          <div className="font-semibold text-sm">{t('connected')}</div>
        </div>

        {channels && channels.length === 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 text-center space-y-1">
            <div className="text-sm">{t('empty')}</div>
            <div className="text-xs text-muted-foreground">{t('emptyHint')}</div>
          </div>
        )}

        {channels?.map((channel) => (
          <div
            key={channel.id}
            onClick={() => setSelectedId(channel.id)}
            className={cn(
              'rounded-2xl bg-card border p-4 cursor-pointer transition-all active:scale-[0.99]',
              selectedChannel?.id === channel.id ? 'border-primary/50 bg-primary/[0.04]' : 'border-border',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full shrink-0',
                      channel.is_active ? 'bg-emerald-500' : 'bg-muted-foreground',
                    )}
                  />
                  <div className="font-semibold text-base truncate">
                    {channel.channel_name || channel.channel_id}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {channel.topic || t('noTopic')}
                </div>
              </div>
              <Switch
                checked={channel.is_active}
                onCheckedChange={() => toggle.mutate({ channel_id: channel.id })}
                disabled={toggle.isPending}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~{Math.round(channel.post_interval / 60)} мин
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {channel.ai_model || 'default'}
              </span>
            </div>
          </div>
        ))}
      </section>

      {selectedChannel && (
        <section className="space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/15">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="font-semibold text-sm">{t('interval')}</div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
            <div className="text-xs text-muted-foreground">
              {t('intervalFor')}{' '}
              <span className="text-foreground font-medium">
                {selectedChannel.channel_name || selectedChannel.channel_id}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {INTERVALS.map((int) => {
                const isActive = selectedChannel.post_interval === int.value;
                return (
                  <button
                    key={int.value}
                    onClick={() =>
                      setInterval.mutate({
                        channel_id: selectedChannel.id,
                        data: { interval: int.value },
                      })
                    }
                    disabled={setInterval.isPending}
                    className={cn(
                      'h-10 rounded-lg text-xs font-medium transition-all active:scale-[0.97]',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground',
                    )}
                  >
                    {int.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/15">
            <ListChecks className="w-4 h-4 text-primary" />
          </div>
          <div className="font-semibold text-sm">{t('queue')}</div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 text-center space-y-1">
          <div className="text-sm">{t('queueEmpty')}</div>
          <div className="text-xs text-muted-foreground">{t('queueHint')}</div>
        </div>
      </section>
    </div>
  );
}
