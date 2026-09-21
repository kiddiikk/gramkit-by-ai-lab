'use client';

import Link from 'next/link';
import { Activity, Clock, ChevronRight, Plus } from 'lucide-react';
import { useListChannels, useToggleChannel } from '@/gen';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function ChannelsPage() {
  const { data: channels, isLoading, error } = useListChannels();
  const toggle = useToggleChannel();

  return (
    <div className="min-h-dvh px-5 py-6 space-y-5">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Мои каналы</h1>
        <p className="text-sm text-muted-foreground">Пауза, интервал, AI</p>
      </header>

      {isLoading && (
        <div className="text-sm text-muted-foreground py-8 text-center">Загрузка...</div>
      )}

      {error && (
        <div className="text-sm text-destructive py-8 text-center">
          Ошибка: не удалось загрузить каналы
        </div>
      )}

      {channels && channels.length === 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] p-5 space-y-4 text-center motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
          <div className="text-sm text-muted-foreground">У вас пока нет каналов</div>
          <div className="text-xs text-muted-foreground">Добавьте канал через бота — он появится здесь</div>
        </div>
      )}

      {channels?.map((channel, index) => (
        <div
          key={channel.id}
          className="rounded-2xl bg-card border border-border p-4 space-y-3 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth"
          style={{ animationDelay: `${String(index * 60)}ms` }}
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
                {channel.topic || 'Без темы'}
              </div>
            </div>
            <Switch
              checked={channel.is_active}
              onCheckedChange={() => toggle.mutate({ channel_id: channel.id })}
              disabled={toggle.isPending}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~{Math.round(channel.post_interval / 60)} мин
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {channel.ai_model || 'default'}
              </span>
            </div>
            <Link
              href={`/channels/${channel.id}`}
              className="flex items-center gap-1 text-primary hover:gap-2 transition-all"
            >
              Настройки
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
