'use client';

/**
 * AuroraBackground v3 — мягкие плавающие пятна без полос.
 * Использует radial-gradient + blur + mix-blend для плавного слияния.
 * Fixed, за контентом, не перехватывает клики.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Базовая тёплая подложка — очень лёгкая, без границ */}
      <div className="absolute inset-0 bg-background" />

      {/* Пятно 1 — большое, сверху-слева, тёплое бежевое */}
      <div
        className="absolute aurora-blob aurora-blob-1"
        style={{
          top: '-15%',
          left: '-20%',
          width: '70%',
          height: '70%',
          background:
            'radial-gradient(circle at center, oklch(0.8088 0.0592 67.76 / 0.55) 0%, oklch(0.8088 0.0592 67.76 / 0.2) 40%, transparent 70%)',
        }}
      />

      {/* Пятно 2 — снизу-справа, тёплое золотистое */}
      <div
        className="absolute aurora-blob aurora-blob-2"
        style={{
          bottom: '-20%',
          right: '-15%',
          width: '75%',
          height: '75%',
          background:
            'radial-gradient(circle at center, oklch(0.88 0.07 65 / 0.5) 0%, oklch(0.88 0.07 65 / 0.18) 45%, transparent 70%)',
        }}
      />

      {/* Пятно 3 — по центру, светлое (почти белое), для "перелива" */}
      <div
        className="absolute aurora-blob aurora-blob-3"
        style={{
          top: '25%',
          left: '15%',
          width: '65%',
          height: '65%',
          background:
            'radial-gradient(circle at center, oklch(0.98 0.02 80 / 0.45) 0%, oklch(0.95 0.03 70 / 0.15) 50%, transparent 75%)',
        }}
      />

      {/* Пятно 4 — маленькое акцентное, тёплое розово-золотое */}
      <div
        className="absolute aurora-blob aurora-blob-4"
        style={{
          top: '45%',
          right: '10%',
          width: '55%',
          height: '55%',
          background:
            'radial-gradient(circle at center, oklch(0.85 0.08 55 / 0.4) 0%, oklch(0.85 0.08 55 / 0.12) 50%, transparent 75%)',
        }}
      />

      {/* Пятно 5 — маленькое, для глубины, чуть более насыщенное */}
      <div
        className="absolute aurora-blob aurora-blob-5"
        style={{
          top: '10%',
          right: '25%',
          width: '50%',
          height: '50%',
          background:
            'radial-gradient(circle at center, oklch(0.9 0.06 70 / 0.35) 0%, transparent 65%)',
        }}
      />
    </div>
  );
}
