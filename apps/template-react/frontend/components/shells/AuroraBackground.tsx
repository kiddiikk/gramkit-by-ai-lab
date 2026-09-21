'use client';

/**
 * AuroraBackground — мягкий анимированный фон с волнистыми линиями.
 * Бело-бежевый, "северное сияние". Рендерится один раз в AppShell.
 * Не перехватывает клики, лежит за контентом (z-0).
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Базовая подложка — лёгкий тёплый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.06]" />

      {/* Линия 1 — широкая, самая медленная */}
      <svg
        className="absolute -left-[20%] top-[10%] h-[80%] w-[140%] aurora-wave-1"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aurora-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0" />
            <stop offset="30%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="oklch(0.92 0.04 75)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0" />
          </linearGradient>
          <filter id="aurora-blur-1">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <path
          d="M0,400 C200,300 400,500 600,400 C800,300 1000,500 1200,400"
          stroke="url(#aurora-grad-1)"
          strokeWidth="120"
          fill="none"
          filter="url(#aurora-blur-1)"
          strokeLinecap="round"
        />
      </svg>

      {/* Линия 2 — пониже, чуть быстрее, чуть светлее */}
      <svg
        className="absolute -left-[30%] top-[35%] h-[70%] w-[160%] aurora-wave-2"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aurora-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            <stop offset="25%" stopColor="oklch(0.95 0.03 70)" stopOpacity="0.6" />
            <stop offset="65%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
          </linearGradient>
          <filter id="aurora-blur-2">
            <feGaussianBlur stdDeviation="55" />
          </filter>
        </defs>
        <path
          d="M0,500 C300,600 500,350 800,450 C1000,520 1150,400 1200,450"
          stroke="url(#aurora-grad-2)"
          strokeWidth="150"
          fill="none"
          filter="url(#aurora-blur-2)"
          strokeLinecap="round"
        />
      </svg>

      {/* Линия 3 — тонкая, самая быстрая, для "перелива" */}
      <svg
        className="absolute -right-[25%] top-[20%] h-[90%] w-[130%] aurora-wave-3"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aurora-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.9 0.06 60)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.85 0.07 55)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.9 0.06 60)" stopOpacity="0" />
          </linearGradient>
          <filter id="aurora-blur-3">
            <feGaussianBlur stdDeviation="35" />
          </filter>
        </defs>
        <path
          d="M0,300 C250,200 450,450 700,350 C950,250 1100,420 1200,350"
          stroke="url(#aurora-grad-3)"
          strokeWidth="80"
          fill="none"
          filter="url(#aurora-blur-3)"
          strokeLinecap="round"
        />
      </svg>

      {/* Тёплое сияние в углу — для глубины */}
      <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/[0.08] blur-[120px] aurora-glow" />
      <div className="absolute -bottom-[15%] -left-[15%] w-[55%] h-[55%] rounded-full bg-primary/[0.05] blur-[100px] aurora-glow-2" />
    </div>
  );
}
