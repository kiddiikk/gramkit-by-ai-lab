'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 18, text: 'text-sm', gap: 'gap-1.5' },
  md: { icon: 22, text: 'text-base', gap: 'gap-2' },
  lg: { icon: 28, text: 'text-lg', gap: 'gap-2.5' },
} as const;

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={cn('flex items-center', s.gap, className)}>
      <Sparkles
        size={s.icon}
        className="text-primary shrink-0"
        strokeWidth={2.2}
      />
      {showText && (
        <span className={cn(s.text, 'font-bold tracking-tight whitespace-nowrap')}>
          AI LAB!
        </span>
      )}
    </div>
  );
}
