'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import {
  LayoutGrid,
  Monitor,
  Smartphone,
  Shield,
  Calculator,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Truck,
  ArrowRight
} from 'lucide-react';

interface DemoSwitcherBarProps {
  viewMode: 'PORTAL' | 'WEB' | 'MOBILE';
  setViewMode: (mode: 'PORTAL' | 'WEB' | 'MOBILE') => void;
  onOpenPortal: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const DemoSwitcherBar: React.FC<DemoSwitcherBarProps> = ({
  viewMode,
  setViewMode,
  onOpenPortal,
  activeNav,
  setActiveNav
}) => {
  const { role, setRole, resetAllData, cart } = useFarm();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Quick calculator state
  const [cockPrice, setCockPrice] = useState<number>(35000);
  const deposit30 = Math.round(cockPrice * 0.3);
  const remaining70 = cockPrice - deposit30;
  const vanShipping = 600;

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-in fade-in duration-200">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-slate-900/95 hover:bg-slate-900 text-white px-3.5 py-2 rounded-full shadow-2xl border border-slate-700 text-xs font-bold backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        >
          <LayoutGrid className="w-4 h-4 text-amber-400" />
          <span>เมนูทดสอบระบบ (Demo Bar)</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Capsule Dock Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw] animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-[#0f2338]/95 backdrop-blur-xl border border-slate-700/80 rounded-full shadow-2xl p-1.5 flex items-center gap-1 sm:gap-1.5 text-white text-xs select-none">
          {/* 1. Portal Button */}
          <button
            onClick={() => setViewMode('PORTAL')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black transition-all shadow-md hover:scale-105 cursor-pointer ${
              viewMode === 'PORTAL'
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
            <span>Portal</span>
          </button>

          {/* 2. Web Storefront Mode (Guest) */}
          <button
            onClick={() => {
              setRole('GUEST');
              setViewMode('WEB');
              if (activeNav.startsWith('ADMIN')) setActiveNav('HOME');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              role === 'GUEST' && viewMode === 'WEB'
                ? 'bg-white/20 text-white ring-1 ring-white/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-sky-400" />
            <span>Web (Guest)</span>
            {totalCartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* 3. Member Mode (Member Portal with 5% discount) */}
          <button
            onClick={() => {
              setRole('MEMBER');
              setViewMode('WEB');
              if (activeNav.startsWith('ADMIN')) setActiveNav('HOME');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              role === 'MEMBER' && viewMode === 'WEB'
                ? 'bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-400/50'
                : 'text-emerald-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Member (-5%)</span>
          </button>

          {/* 4. Mobile Viewport Simulator Mode */}
          <button
            onClick={() => {
              if (role === 'ADMIN') setRole('GUEST');
              setViewMode('MOBILE');
              if (activeNav.startsWith('ADMIN')) setActiveNav('HOME');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              role !== 'ADMIN' && viewMode === 'MOBILE'
                ? 'bg-white/20 text-white ring-1 ring-white/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Mobile</span>
          </button>

          {/* 5. Backoffice / Admin Mode */}
          <button
            onClick={() => {
              setRole('ADMIN');
              setViewMode('WEB');
              setActiveNav('ADMIN_KANBAN');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              role === 'ADMIN'
                ? 'bg-purple-600/40 text-purple-200 ring-1 ring-purple-400'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Backoffice</span>
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-slate-700 mx-0.5" />

          {/* 5. Custom Tool: Calculator / Quick Utility */}
          <button
            onClick={() => setShowCalculator(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/50 text-amber-300 hover:bg-amber-500/25 font-bold transition-all cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">คำนวณมัดจำ</span>
          </button>

          {/* 6. Reset Demo Button */}
          <button
            onClick={() => {
              if (confirm('ต้องการรีเซ็ตข้อมูลตัวอย่างกลับเป็นค่าเริ่มต้นหรือไม่?')) {
                resetAllData();
              }
            }}
            title="รีเซ็ตข้อมูล Demo ทั้งหมด"
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* 7. Minimize Toggle */}
          <button
            onClick={() => setIsMinimized(true)}
            title="ย่อแถบเครื่องมือ"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Calculator Popover */}
      {showCalculator && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-80 text-xs animate-in zoom-in-95 duration-150">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-600" /> เครื่องคำนวณมัดจำ 30% & ค่าส่ง
            </h4>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-500 block mb-1">
                กำหนดราคาตัวไก่ชน (บาท):
              </label>
              <input
                type="number"
                step={1000}
                value={cockPrice}
                onChange={e => setCockPrice(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5 font-medium">
              <div className="flex justify-between text-slate-600">
                <span>ราคาเต็ม:</span>
                <span className="font-bold text-slate-900">฿{cockPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-bold">
                <span>ยอดมัดจำ 30% (ล็อกติดจอง):</span>
                <span>฿{deposit30.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>ยอดคงเหลือชำระวันรับไก่ (70%):</span>
                <span>฿{remaining70.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-700 text-[11px] pt-1 border-t border-slate-200">
                <span>+ ค่ารถตู้สัตว์เลี้ยงติดแอร์:</span>
                <span>฿{vanShipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-300">
                <span>ยอดโอนมัดจำรอบแรก:</span>
                <span className="text-amber-600">฿{(deposit30 + vanShipping).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              * คำนวณตามมาตรฐาน TOR ข้อ 3.5 (Deposit & Transport)
            </p>
          </div>
        </div>
      )}
    </>
  );
};

