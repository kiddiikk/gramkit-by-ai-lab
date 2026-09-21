'use client';

/**
 * AuroraBackground — плавающие изогнутые волны в стиле "северного сияния".
 * Бело-бежево-золотистые, диагональные, с медленной анимацией.
 * Fixed, за контентом, не перехватывает клики.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Базовая тёплая подложка */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.04]" />

      {/* Волна 1 — крупная диагональ, идёт сверху-слева вниз-вправо */}
      <svg
        className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] aurora-w1"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0" />
            <stop offset="40%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0.55" />
            <stop offset="75%" stopColor="oklch(0.92 0.04 75)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0" />
          </linearGradient>
          <filter id="af1">
            <feGaussianBlur stdDeviation="55" />
          </filter>
        </defs>
        <path
          d="M-100,650 C200,500 400,750 700,550 C1000,350 1200,600 1500,400 C1700,270 1800,420 1900,300"
          stroke="url(#ag1)"
          strokeWidth="140"
          fill="none"
          filter="url(#af1)"
          strokeLinecap="round"
        />
      </svg>

      {/* Волна 2 — средняя, движется в противоположном направлении */}
      <svg
        className="absolute inset-0 w-[160%] h-[160%] -left-[30%] -top-[30%] aurora-w2"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ag2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            <stop offset="35%" stopColor="oklch(0.95 0.03 70)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="oklch(0.8088 0.0592 67.76)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
          </linearGradient>
          <filter id="af2">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>
        <path
          d="M-100,300 C150,450 350,200 650,400 C950,600 1150,300 1450,500 C1650,630 1800,480 1900,600"
          stroke="url(#ag2)"
          strokeWidth="180"
          fill="none"
          filter="url(#af2)"
          strokeLinecap="round"
        />
      </svg>

      {/* Волна 3 — тонкая, быстрая, для "перелива" */}
      <svg
        className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] aurora-w3"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ag3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="oklch(0.9 0.06 60)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.88 0.07 55)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.9 0.06 60)" stopOpacity="0" />
          </linearGradient>
          <filter id="af3">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <path
          d="M-100,500 C200,400 350,600 600,450 C850,300 1050,550 1300,400 C1500,290 1700,450 1900,350"
          stroke="url(#ag3)"
          strokeWidth="90"
          fill="none"
          filter="url(#af3)"
          strokeLinecap="round"
        />
      </svg>

      {/* Волна 4 — верхний оттенок, для глубины */}
      <svg
        className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] aurora-w4"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ag4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.88 0.08 45)" stopOpacity="0" />
            <stop offset="45%" stopColor="oklch(0.85 0.07 50)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.92 0.04 80)" stopOpacity="0" />
          </linearGradient>
          <filter id="af4">
            <feGaussianBlur stdDeviation="50" />
          </filter>
        </defs>
        <path
          d="M-100,200 C250,350 500,100 800,300 C1100,500 1300,200 1600,400 C1750,500 1850,400 1900,450"
          stroke="url(#ag4)"
          strokeWidth="120"
          fill="none"
          filter="url(#af4)"
          strokeLinecap="round"
        />
      </svg>

      {/* Тёплые сияния в углах — финальная глубина */}
      <div className="absolute -top-[15%] -right-[15%] w-[55%] h-[55%] rounded-full bg-primary/[0.10] blur-[130px] aurora-glow" />
      <div className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] rounded-full bg-primary/[0.06] blur-[110px] aurora-glow-2" />
    </div>
  );
}
