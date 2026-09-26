'use client';

import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import { useGetChannel, useToggleChannel, useSetChannelInterval } from '@/src/gen';
import { Switch } from '@/components/ui/switch';
import { Activity, Clock, Radio, Cpu, Loader2 } from 'lucide-react';

const INTERVALS = [
  { value: 3600, label: '1ч' },
  { value: 7200, label: '2ч' },
  { value: 14400, label: '4ч' },
  { value: 28800, label: '8ч' },
  { value: 86400, label: '24ч' },
];

export default function ChannelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const channelId = Number(id);
  const t = useTranslations('feelit.channels');
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { data: channel, isLoading } = useGetChannel({ channel_id: channelId });
  const toggle = useToggleChannel();
  const setIntervalHook = useSetChannelInterval();

  const handleToggle = () => {
    if (!channel) return;
    triggerHaptic('medium');
    playHapticSound('click');
    toggle.mutate({ channel_id: channel.id });
  };

  const handleSetInterval = (value: number) => {
    if (!channel) return;
    triggerHaptic('light');
    playHapticSound('click');
    setIntervalHook.mutate({ channel_id: channel.id, data: { interval: value } });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-sm text-destructive">Канал не найден</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <BackButton />
        <h1>{channel.channel_name || channel.channel_id}</h1>
      </div>

      {/* Инфо */}
      <SpotlightCard isDark={isDark} highlight className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              {channel.topic || t('noTopic')}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 font-mono truncate">
              {channel.channel_id}
            </div>
          </div>
          <div
            className={`p-2.5 rounded-xl border shrink-0 ${
              channel.is_active
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-muted border-border text-muted-foreground'
            }`}
          >
            <Radio className="w-5 h-5" />
          </div>
        </div>

        <div className="pt-2 border-t border-border/50 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Activity className="w-3.5 h-3.5" />
              {t('connected')}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-medium ${
                  channel.is_active ? 'text-emerald-400' : 'text-muted-foreground'
                }`}
              >
                {channel.is_active ? 'ON' : 'OFF'}
              </span>
              <Switch
                checked={channel.is_active}
                onCheckedChange={handleToggle}
                disabled={toggle.isPending}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Cpu className="w-3.5 h-3.5" />
              AI модель
            </span>
            <span className="font-mono text-foreground text-[11px] truncate max-w-[180px]">
              {channel.ai_model || 'default'}
            </span>
          </div>
        </div>
      </SpotlightCard>

      {/* Интервал */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <div className="p-1.5 rounded-lg bg-emerald-500/15">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('interval')}
          </div>
        </div>

        <SpotlightCard isDark={isDark} className="p-4">
          <div className="grid grid-cols-5 gap-1.5">
            {INTERVALS.map((int) => {
              const isActive = channel.post_interval === int.value;
              return (
                <button
                  key={int.value}
                  onClick={() => handleSetInterval(int.value)}
                  disabled={setIntervalHook.isPending}
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
      </div>
    </div>
  );
}
