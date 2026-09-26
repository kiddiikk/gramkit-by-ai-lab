'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
  onClick?: () => void;
  highlight?: boolean;
}

export default function SpotlightCard({
  children,
  className = '',
  isDark = true,
  onClick,
  highlight = false,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handlePointerLeave = () => {
    setCoords((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-2xl ${
        isDark
          ? 'bg-[#0c1017]/70 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.36)]'
          : 'bg-white/80 border-zinc-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
      } ${
        highlight ? 'border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.12)]' : ''
      } ${onClick ? 'cursor-pointer active:scale-[0.985]' : ''} ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: coords.opacity,
          background: isDark
            ? `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.15), transparent 70%)`
            : `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.12), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
