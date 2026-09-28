'use client';

import React, { useEffect, useRef } from 'react';

interface AICoreProps {
  isDark?: boolean;
  isGenerating?: boolean;
}

export default function AICore({ isDark = true, isGenerating = false }: AICoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const interactionRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const width = () => canvas.width;
    const height = () => canvas.height;

    // 50 частиц в 3D-сфере
    const numParticles = 50;
    const particles: Array<{
      baseRadius: number;
      theta: number;
      phi: number;
      speedTheta: number;
      speedPhi: number;
      size: number;
      pulseOffset: number;
    }> = [];

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particles.push({
        baseRadius: 56 + Math.random() * 12,
        theta,
        phi,
        speedTheta: (Math.random() - 0.5) * 0.02,
        speedPhi: (Math.random() - 0.5) * 0.015,
        size: 1.2 + Math.random() * 1.8,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = (time: number) => {
      const w = width();
      const h = height();
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) / 220; // адаптивный масштаб под размер

      interactionRef.current.x += (interactionRef.current.targetX - interactionRef.current.x) * 0.08;
      interactionRef.current.y += (interactionRef.current.targetY - interactionRef.current.y) * 0.08;

      const speedMultiplier = isGenerating ? 2.6 : 1.0;
      angleY += 0.012 * speedMultiplier + interactionRef.current.x * 0.0005;
      angleX = 0.25 + Math.sin(time * 0.001) * 0.08 + interactionRef.current.y * 0.0005;

      // Halo
      const halo = ctx.createRadialGradient(cx, cy, 12 * scale, cx, cy, 86 * scale);
      if (isDark) {
        halo.addColorStop(0, isGenerating ? 'rgba(52, 211, 153, 0.45)' : 'rgba(16, 185, 129, 0.28)');
        halo.addColorStop(0.5, isGenerating ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)');
        halo.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
        halo.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
        halo.addColorStop(0.6, 'rgba(6, 182, 212, 0.12)');
        halo.addColorStop(1, 'rgba(255,255,255,0)');
      }
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 86 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Орбитальные кольца
      const rings = [
        { r: 72 * scale, tilt: angleY * 0.85, color: 'rgba(52, 211, 153, 0.4)' },
        { r: 64 * scale, tilt: -angleY * 1.1, color: 'rgba(6, 182, 212, 0.35)' },
        { r: 80 * scale, tilt: angleY * 0.5, color: 'rgba(167, 243, 208, 0.25)' },
      ];

      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.r, ring.r * 0.38, ring.tilt, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2 * scale;
        ctx.setLineDash(isGenerating ? [6 * scale, 4 * scale] : [42 * scale, 8 * scale]);
        ctx.stroke();
        ctx.restore();
      });

      // Проекция частиц
      const projected: Array<{ px: number; py: number; pz: number; alpha: number; size: number }> = [];

      particles.forEach((p) => {
        p.theta += p.speedTheta * speedMultiplier;
        p.phi += p.speedPhi * speedMultiplier;

        const breathe = Math.sin(time * 0.003 + p.pulseOffset) * 4 * scale;
        const r = p.baseRadius * scale + breathe;

        let x = r * Math.sin(p.phi) * Math.cos(p.theta);
        let y = r * Math.cos(p.phi);
        let z = r * Math.sin(p.phi) * Math.sin(p.theta);

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        const fov = 260 * scale;
        const projScale = fov / (fov + z2);
        const px = cx + x2 * projScale;
        const py = cy + y1 * projScale;
        const alpha = Math.max(0.12, (z2 + r) / (2 * r));

        projected.push({ px, py, pz: z2, alpha, size: p.size * projScale });
      });

      projected.sort((a, b) => a.pz - b.pz);

      // Связи
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          if (!p1 || !p2) continue;
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < 32 * scale) {
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.18 * (1 - dist / (32 * scale)) * p1.alpha})`;
            ctx.lineWidth = 0.6 * scale;
            ctx.stroke();
          }
        }
      }

      // Точки
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(167, 243, 208, ${p.alpha * 0.95})`
          : `rgba(5, 150, 105, ${p.alpha * 0.85})`;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 8 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e && e.touches[0] ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches[0] ? e.touches[0].clientY : (e as MouseEvent).clientY;
      interactionRef.current.targetX = (clientX - rect.left - rect.width / 2) * 0.8;
      interactionRef.current.targetY = (clientY - rect.top - rect.height / 2) * 0.8;
    };

    const handlePointerLeave = () => {
      interactionRef.current.targetX = 0;
      interactionRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvas.addEventListener('touchend', handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchend', handlePointerLeave);
    };
  }, [isDark, isGenerating]);

  return (
    <div className="relative w-full h-[220px] flex items-center justify-center overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
