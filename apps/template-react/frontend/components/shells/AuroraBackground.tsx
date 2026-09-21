'use client';

/**
 * AuroraBackground v3 — мягкие плавающие пятна без полос.
 * Light: multiply (тонирование белого). Dark: screen (свечение).
 * Цвет: изумрудный (emerald).
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Базовая подложка */}
      <div className="absolute inset-0 bg-background" />

      {/* Пятно 1 — большое, сверху-слева */}
      <div
        className="absolute aurora-blob aurora-blob-1"
        style={{
          top: '-15%',
          left: '-20%',
          width: '70%',
          height: '70%',
          background:
            'radial-gradient(circle at center, oklch(0.65 0.15 160 / 0.75) 0%, oklch(0.65 0.15 160 / 0.35) 40%, transparent 70%)',
        }}
      />

      {/* Пятно 2 — снизу-справа, чуть светлее изумруд */}
      <div
        className="absolute aurora-blob aurora-blob-2"
        style={{
          bottom: '-20%',
          right: '-15%',
          width: '75%',
          height: '75%',
          background:
            'radial-gradient(circle at center, oklch(0.72 0.14 165 / 0.7) 0%, oklch(0.72 0.14 165 / 0.3) 45%, transparent 70%)',
        }}
      />

      {/* Пятно 3 — по центру, светлое (почти белое-зелёное) */}
      <div
        className="absolute aurora-blob aurora-blob-3"
        style={{
          top: '25%',
          left: '15%',
          width: '65%',
          height: '65%',
          background:
            'radial-gradient(circle at center, oklch(0.90 0.06 160 / 0.6) 0%, oklch(0.85 0.08 165 / 0.25) 50%, transparent 75%)',
        }}
      />

      {/* Пятно 4 — акцентное, чуть бирюзовое (для перелива) */}
      <div
        className="absolute aurora-blob aurora-blob-4"
        style={{
          top: '45%',
          right: '10%',
          width: '55%',
          height: '55%',
          background:
            'radial-gradient(circle at center, oklch(0.70 0.12 175 / 0.6) 0%, oklch(0.70 0.12 175 / 0.2) 50%, transparent 75%)',
        }}
      />

      {/* Пятно 5 — маленькое, для глубины */}
      <div
        className="absolute aurora-blob aurora-blob-5"
        style={{
          top: '10%',
          right: '25%',
          width: '50%',
          height: '50%',
          background:
            'radial-gradient(circle at center, oklch(0.75 0.12 155 / 0.55) 0%, transparent 65%)',
        }}
      />
    </div>
  );
}
