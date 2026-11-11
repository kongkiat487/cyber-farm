'use client';

import React from 'react';
import { Smartphone, Tablet, Monitor, Maximize2 } from 'lucide-react';

export type DeviceType = 'IPHONE' | 'IPHONE_MAX' | 'IPAD' | 'FLUID';
export type FrameStyle = 'TITANIUM' | 'FLAT' | 'NONE';
export type ZoomLevel = 100 | 90 | 80;

interface DeviceSimulatorBarProps {
  device: DeviceType;
  setDevice: (d: DeviceType) => void;
  frame: FrameStyle;
  setFrame: (f: FrameStyle) => void;
  zoom: ZoomLevel;
  setZoom: (z: ZoomLevel) => void;
}

export const DeviceSimulatorBar: React.FC<DeviceSimulatorBarProps> = ({
  device,
  setDevice,
  frame,
  setFrame,
  zoom,
  setZoom
}) => {
  return (
    <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md p-3 sm:p-4 mb-4 select-none space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Top Row: Brand & Device Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-xs">
            🐓
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span className="text-amber-600 font-black">CYBER FARM</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 text-[11px] font-normal hidden sm:inline">
                จำลองหน้าจอบนอุปกรณ์สมาร์ตโฟน & แท็บเล็ต
              </span>
            </div>
          </div>
        </div>

        {/* Device Switcher Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setDevice('IPHONE')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              device === 'IPHONE'
                ? 'bg-[#0f2338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 390px</span>
          </button>

          <button
            onClick={() => setDevice('IPHONE_MAX')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              device === 'IPHONE_MAX'
                ? 'bg-[#0f2338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone Max 430px</span>
          </button>

          <button
            onClick={() => setDevice('IPAD')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              device === 'IPAD'
                ? 'bg-[#0f2338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>iPad 768px</span>
          </button>

          <button
            onClick={() => setDevice('FLUID')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              device === 'FLUID'
                ? 'bg-[#0f2338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>เต็มจอ Fluid</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Frame Style & Zoom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Frame Style Options */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-bold">กรอบ:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFrame('TITANIUM')}
              className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                frame === 'TITANIUM'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ไทเทเนียม
            </button>
            <button
              onClick={() => setFrame('FLAT')}
              className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                frame === 'FLAT'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ขอบเรียบ
            </button>
            <button
              onClick={() => setFrame('NONE')}
              className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                frame === 'NONE'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ไม่มีกรอบ
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-bold">ย่อ-ขยาย:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
            {([100, 90, 80] as ZoomLevel[]).map(z => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition-all cursor-pointer ${
                  zoom === z
                    ? 'bg-[#0f2338] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {z}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

