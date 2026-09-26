'use client';

import React, { useEffect, useRef } from 'react';

interface AmbientAtmosphereProps {
  isDark?: boolean;
}

export default function AmbientAtmosphere({ isDark = true }: AmbientAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.3 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha + Math.sin(p.pulse) * 0.1;
        ctx.fillStyle = isDark
          ? `rgba(16, 185, 129, ${Math.max(0.04, currentAlpha)})`
          : `rgba(5, 150, 105, ${Math.max(0.03, currentAlpha * 0.7)})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.strokeStyle = isDark
              ? `rgba(52, 211, 153, ${0.1 * (1 - dist / 85)})`
              : `rgba(16, 185, 129, ${0.07 * (1 - dist / 85)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-80 rounded-full blur-[130px] animate-pulse-slow ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/15'
        }`}
      />
      <div
        className={`absolute top-[40%] -left-36 w-80 h-80 rounded-full blur-[110px] animate-pulse-subtle ${
          isDark ? 'bg-teal-500/[0.07]' : 'bg-teal-400/10'
        }`}
      />
      <div
        className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[120px] ${
          isDark ? 'bg-emerald-400/[0.06]' : 'bg-emerald-300/10'
        }`}
      />

      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}
        style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(circle at 50% 35%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 35%, black 20%, transparent 80%)',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
