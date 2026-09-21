'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { useGetChannel, useToggleChannel, useSetChannelInterval } from '@/src/gen';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const INTERVALS = [
  { value: 3600, label: '1 ч' },
  { value: 7200, label: '2 ч' },
  { value: 14400, label: '4 ч' },
  { value: 28800, label: '8 ч' },
  { value: 86400, label: '24 ч' },
];

export default function ChannelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const channelId = Number(id);
  const router = useRouter();

  const { data: channel, isLoading } = useGetChannel({ channel_id: channelId });
  const toggle = useToggleChannel();
  const setInterval = useSetChannelInterval();

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Загрузка...</div>;
  }

  if (!channel) {
    return <div className="p-6 text-sm text-destructive">Канал не найден</div>;
  }

  return (
    <div className="min-h-dvh px-5 py-6 space-y-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад
      </button>

      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">
          {channel.channel_name || channel.channel_id}
        </h1>
        <p className="text-sm text-muted-foreground">{channel.topic || 'Без темы'}</p>
      </header>

      <div className="rounded-2xl bg-card border border-border p-4 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Активность</div>
            <div className="text-xs text-muted-foreground">
              {channel.is_active ? 'Бот публикует' : 'На паузе'}
            </div>
          </div>
          <Switch
            checked={channel.is_active}
            onCheckedChange={() => toggle.mutate({ channel_id: channel.id })}
            disabled={toggle.isPending}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
        <div>
          <div className="font-medium text-sm">Интервал между постами</div>
          <div className="text-xs text-muted-foreground">Как часто публиковать</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {INTERVALS.map((int) => {
            const isActive = channel.post_interval === int.value;
            return (
              <button
                key={int.value}
                onClick={() => setInterval.mutate({ channel_id: channel.id, data: { interval: int.value } })}
                disabled={setInterval.isPending}
                className={cn(
                  'relative h-10 rounded-lg text-xs font-medium transition-all active:scale-[0.97]',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-foreground',
                )}
              >
                {int.label}
                {isActive && <Check className="w-3 h-3 absolute top-1 right-1" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-4 space-y-1">
        <div className="text-xs text-muted-foreground">Модель AI</div>
        <div className="font-mono text-sm">{channel.ai_model || 'default'}</div>
      </div>
    </div>
  );
}
