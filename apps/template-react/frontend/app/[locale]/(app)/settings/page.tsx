'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { BackButton } from '@/components/shared/BackButton';
import { SpotlightCard } from '@/components/effects';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';
import { useLanguageService } from '@/lib/services/useLanguageService';
import {
  User,
  ShieldCheck,
  Moon,
  Sun,
  CheckCircle2,
  Volume2,
  Image as ImageIcon,
  Bell,
  Vibrate,
  Globe,
} from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('feelit.settings');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Local states — читаем из localStorage
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [autoArt, setAutoArt] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const { currentLocale, supportedLocales, changeLanguage } = useLanguageService();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setSoundEnabled(localStorage.getItem('feelit_sound') !== 'false');
      setHapticEnabled(localStorage.getItem('feelit_haptic') !== 'false');
      setAutoArt(localStorage.getItem('feelit_auto_art') !== 'false');
      setNotifications(localStorage.getItem('feelit_notifications') !== 'false');
    }
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const save = (key: string, value: boolean) => {
    if (typeof window !== 'undefined') localStorage.setItem(key, String(value));
  };

  const tgUser =
    typeof window !== 'undefined'
      ? (window as any).Telegram?.WebApp?.initDataUnsafe?.user
      : null;

  const displayName = tgUser?.first_name
    ? `${tgUser.first_name}${tgUser.last_name ? ' ' + tgUser.last_name : ''}`
    : 'Telegram User';
  const handle = tgUser?.username ? `@${tgUser.username}` : `ID: ${tgUser?.id || '—'}`;

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pt-1">
        <BackButton />
        <h1>{t('title')}</h1>
      </div>

      {/* Профиль */}
      <SpotlightCard isDark={isDark} className="p-4 flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400 shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">{displayName}</h3>
          <p className="text-xs text-muted-foreground font-mono truncate">{handle}</p>
        </div>
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      </SpotlightCard>

      {/* Тема — 2 карточки */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Тема оформления
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              setTheme('dark');
              triggerHaptic('light');
              playHapticSound('click');
            }}
            className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.97] ${
              isDark
                ? 'bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500 shadow-lg shadow-emerald-950/50'
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <Moon className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-muted-foreground'}`} />
              {isDark && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>
            <div className="font-bold text-xs">Cyber Dark</div>
            <p className="text-[10px] text-muted-foreground">Глубокий обсидиановый</p>
          </button>

          <button
            onClick={() => {
              setTheme('light');
              triggerHaptic('light');
              playHapticSound('click');
            }}
            className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.97] ${
              !isDark
                ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <Sun className={`w-4 h-4 ${!isDark ? 'text-emerald-600' : 'text-muted-foreground'}`} />
              {!isDark && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
            <div className="font-bold text-xs">Clean Light</div>
            <p className="text-[10px] text-muted-foreground">Светлый стиль</p>
          </button>
        </div>
      </div>

      {/* Язык — Segmented Control */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Язык интерфейса
        </h3>

        <div className="p-1 rounded-2xl border border-border bg-card flex">
          {[
            { code: 'ru', label: 'Русский' },
            { code: 'en', label: 'English' },
          ].map((lang) => {
            const isSelected = currentLocale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  void changeLanguage(lang.code);
                  triggerHaptic('light');
                  playHapticSound('click');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Тумблеры — в одном блоке */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Физика и уведомления
        </h3>

        <SpotlightCard isDark={isDark} className="divide-y divide-border/50">
          {/* Haptic */}
          <ToggleRow
            icon={Vibrate}
            color="emerald"
            title="Haptic отклик"
            subtitle="Тактильная вибро-отдача в Telegram"
            checked={hapticEnabled}
            onToggle={() => {
              const next = !hapticEnabled;
              setHapticEnabled(next);
              save('feelit_haptic', next);
              if (next) {
                triggerHaptic('medium');
                playHapticSound('click');
              }
            }}
          />

          {/* Sound */}
          <ToggleRow
            icon={Volume2}
            color="cyan"
            title="Звуковые эффекты UI"
            subtitle="Синтез аудио-щелчков кликов"
            checked={soundEnabled}
            onToggle={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              save('feelit_sound', next);
              if (next) {
                triggerHaptic('light');
                playHapticSound('click');
              }
            }}
          />

          {/* Auto Art */}
          <ToggleRow
            icon={ImageIcon}
            color="violet"
            title="Авто-генерация обложек"
            subtitle="FLUX.1 для каждого поста"
            checked={autoArt}
            onToggle={() => {
              const next = !autoArt;
              setAutoArt(next);
              save('feelit_auto_art', next);
              triggerHaptic('light');
              playHapticSound('click');
            }}
          />

          {/* Notifications */}
          <ToggleRow
            icon={Bell}
            color="amber"
            title="Пуши в Telegram"
            subtitle="Оповещать при каждой публикации"
            checked={notifications}
            onToggle={() => {
              const next = !notifications;
              setNotifications(next);
              save('feelit_notifications', next);
              triggerHaptic('light');
              playHapticSound('click');
            }}
          />
        </SpotlightCard>
      </div>

      {/* Версия */}
      <div className="text-center pt-4">
        <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">
          FEEL IT • Core v2.4.0 • Telegram WebApp SDK 7.0
        </span>
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  color,
  title,
  subtitle,
  checked,
  onToggle,
}: {
  icon: React.ElementType;
  color: 'emerald' | 'cyan' | 'violet' | 'amber';
  title: string;
  subtitle: string;
  checked: boolean;
  onToggle: () => void;
}) {
  const colorClasses: Record<string, string> = {
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
    violet: 'border-violet-500/20 bg-violet-500/10 text-violet-400',
    amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`rounded-xl border p-2 shrink-0 ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold">{title}</div>
          <div className="text-[10px] text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
          checked ? 'bg-emerald-500' : 'bg-muted'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
