'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  /** Куда вести. По умолчанию — router.back() */
  href?: string;
  className?: string;
}

/**
 * Кнопка "Назад" — круглая иконка ChevronLeft в верхнем левом углу.
 * Если href задан — router.push(href), иначе router.back().
 */
export function BackButton({ href, className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      // Если истории нет — на главную
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Назад"
      className={cn(
        'inline-flex items-center justify-center w-9 h-9 rounded-full',
        'bg-card/60 backdrop-blur-sm border border-border/60',
        'hover:bg-card hover:border-border transition-all',
        'active:scale-95',
        'text-foreground',
        className,
      )}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}
