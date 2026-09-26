'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Activity, Clock, Radio, ListChecks, Loader2, Bot } from 'lucide-react';
import { useListChannels, useToggleChannel, useSetChannelInterval } from '@/src/gen';
import { Switch } from '@/components/ui/switch';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';

const INTERVALS = [
  { value: 3600, label: '1ч' },
  { value: 7200, label: '2ч' },
  { value: 14400, label: '4ч' },
  { value: 28800, label: '8ч' },
  { value: 86400, label: '24ч' },
];

export default function AIEditorPage() {
  const t = useTranslations('feelit.channels');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { data: channels, isLoading, error } = useListChannels();
  const toggle = useToggleChannel();
  const setInterval = useSetChannelInterval();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const channelList = Array.isArray(channels) ? channels : [];
  const selectedChannel =
    channelList.find((c) => c.id === selectedId) || channelList[0];

  const handleToggle = (e: React.MouseEvent, channelId: number) => {
    e.stopPropagation();
    triggerHaptic('medium');
    playHapticSound('click');
    toggle.mutate({ channel_id: channelId });
  };

  const handleSetInterval = (channelId: number, value: number) => {
    triggerHaptic('light');
    playHapticSound('click');
    setInterval.mutate({ channel_id: channelId, data: { interval: value } });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-sm text-destructive text-center">{t('loadError')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* Подключенные каналы */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="p-1.5 rounded-lg bg-emerald-500/15">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('connected')}
          </div>
        </div>

        {channelList.length === 0 ? (
          <SpotlightCard isDark={isDark} className="p-6 text-center space-y-2">
            <Bot className="w-8 h-8 text-muted-foreground/50 mx-auto" />
            <div className="text-sm">{t('empty')}</div>
            <div className="text-xs text-muted-foreground">{t('emptyHint')}</div>
          </SpotlightCard>
        ) : (
          channelList.map((channel, i) => (
            <SpotlightCard
              key={channel.id}
              isDark={isDark}
              highlight={selectedChannel?.id === channel.id}
              onClick={() => {
                triggerHaptic('light');
                setSelectedId(channel.id);
              }}
              className="p-4 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        channel.is_active ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                      }`}
                    />
                    <h3 className="text-base font-bold truncate">
                      {channel.channel_name || channel.channel_id}
                    </h3>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {channel.topic || t('noTopic')}
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <Switch
                    checked={channel.is_active}
                    onCheckedChange={() => handleToggle({} as React.MouseEvent, channel.id)}
                    disabled={toggle.isPending}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.round(channel.post_interval / 60)} мин
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  {channel.ai_model || 'default'}
                </span>
              </div>
            </SpotlightCard>
          ))
        )}
      </section>

      {/* Интервал */}
      {selectedChannel && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="p-1.5 rounded-lg bg-emerald-500/15">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('interval')}
            </div>
          </div>

          <SpotlightCard isDark={isDark} className="p-4 space-y-3">
            <div className="text-xs text-muted-foreground">
              {t('intervalFor')}{' '}
              <span className="text-foreground font-medium">
                {selectedChannel.channel_name || selectedChannel.channel_id}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {INTERVALS.map((int) => {
                const isActive = selectedChannel.post_interval === int.value;
                return (
                  <button
                    key={int.value}
                    onClick={() => handleSetInterval(selectedChannel.id, int.value)}
                    disabled={setInterval.isPending}
                    className={`h-10 rounded-xl text-xs font-mono font-medium transition-all active:scale-95 ${
                      isActive
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'bg-muted hover:bg-muted/70 text-foreground'
                    }`}
                  >
                    {int.label}
                  </button>
                );
              })}
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* Очередь */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="p-1.5 rounded-lg bg-emerald-500/15">
            <ListChecks className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('queue')}
          </div>
        </div>

        <SpotlightCard isDark={isDark} className="p-6 text-center space-y-1">
          <div className="text-sm">{t('queueEmpty')}</div>
          <div className="text-xs text-muted-foreground">{t('queueHint')}</div>
        </SpotlightCard>
      </section>
    </div>
  );
}
