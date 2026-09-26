'use client';

import React, { useEffect, useRef } from 'react';

interface AICoreProps {
  isDark?: boolean;
  isGenerating?: boolean;
}

export default function AICore({ isDark = true, isGenerating = false }: AICoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const size = 110;
    canvas.width = size * 2;
    canvas.height = size * 2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const speed = isGenerating ? 0.055 : 0.018;
      angle += speed;

      const baseR = isGenerating ? 42 : 36;
      const pulse = Math.sin(angle * 2.5) * (isGenerating ? 4 : 2);
      const currentRadius = baseR + pulse;

      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, currentRadius * 1.6);
      grad.addColorStop(0, isDark ? 'rgba(52, 211, 153, 0.95)' : 'rgba(16, 185, 129, 0.9)');
      grad.addColorStop(0.5, isDark ? 'rgba(5, 150, 105, 0.4)' : 'rgba(5, 150, 105, 0.3)');
      grad.addColorStop(1, 'rgba(4, 120, 87, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      const rings = [
        { rx: currentRadius * 1.3, ry: currentRadius * 0.45, rot: angle * 0.8, color: '#34d399' },
        { rx: currentRadius * 1.25, ry: currentRadius * 0.5, rot: -angle * 1.1 + Math.PI / 3, color: '#6ee7b7' },
        { rx: currentRadius * 1.4, ry: currentRadius * 0.35, rot: angle * 0.6 - Math.PI / 4, color: '#10b981' },
      ];

      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = isGenerating ? 2 : 1.2;
        ctx.shadowBlur = isGenerating ? 14 : 7;
        ctx.shadowColor = ring.color;
        ctx.stroke();

        const photonX = Math.cos(angle * 2) * ring.rx;
        const photonY = Math.sin(angle * 2) * ring.ry;
        ctx.beginPath();
        ctx.arc(photonX, photonY, isGenerating ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isDark, isGenerating]);

  return (
    <canvas
      ref={canvasRef}
      className="w-24 h-24 drop-shadow-[0_0_24px_rgba(16,185,129,0.35)] shrink-0"
    />
  );
}
