'use client';

import React from 'react';
import { Shield } from 'lucide-react';

interface WatermarkBadgeProps {
  farmName?: string;
  code?: string;
  className?: string;
}

export const WatermarkBadge: React.FC<WatermarkBadgeProps> = ({
  farmName = 'CYBER GAMECOCK FARM',
  code,
  className = ''
}) => {
  return (
    <div
      className={`pointer-events-none select-none absolute bottom-2 right-2 bg-slate-950/70 backdrop-blur-xs text-white/90 border border-white/20 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm text-[10px] tracking-wider font-mono uppercase ${className}`}
    >
      <Shield className="w-3 h-3 text-amber-400 shrink-0" />
      <span className="font-semibold text-amber-300">{farmName}</span>
      {code && <span className="opacity-75">#{code}</span>}
      <span className="text-[8px] bg-red-600/80 text-white px-1 rounded-xs">VERIFIED</span>
    </div>
  );
};

