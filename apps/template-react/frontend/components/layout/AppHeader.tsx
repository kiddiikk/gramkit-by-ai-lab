'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Bot, Volume2, VolumeX } from 'lucide-react';
import { triggerHaptic, playHapticSound } from '@/lib/haptic';

export function AppHeader() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('feelit_sound') : null;
    if (saved !== null) setSoundEnabled(saved === 'true');
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (typeof window !== 'undefined') localStorage.setItem('feelit_sound', String(next));
    if (next) {
      triggerHaptic('light');
      playHapticSound('click');
    }
  };

  return (
    <div className="flex items-center justify-between pb-3 pt-1">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[1px] shadow-lg shadow-emerald-500/25">
            <div className={`w-full h-full rounded-[11px] ${isDark ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-tight">FEEL IT</span>
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              AI LAB
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono leading-tight">
            Autonomous Telegram Engine
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleSound}
          className="p-2 rounded-xl hover:bg-muted/50 transition-all active:scale-95"
          aria-label="Sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
