'use client';

import React from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Shield,
  ShoppingCart,
  Bell,
  Truck,
  RotateCcw,
  LayoutDashboard,
  Store,
  User,
  Star,
  LogOut,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenNotifications: () => void;
  onOpenTracking: () => void;
  onOpenAuth?: (mode?: 'LOGIN' | 'REGISTER') => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenNotifications,
  onOpenTracking,
  onOpenAuth,
  activeNav,
  onSelectNav
}) => {
  const { role, setRole, currentMember, logoutMember, cart, unreadCount, resetAllData } = useFarm();

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar - Desktop only, hidden on mobile */}
      <div className="hidden sm:flex bg-slate-900 text-white text-xs px-4 py-1.5 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
            <Shield className="w-3.5 h-3.5" /> CYBER FARM PLATFORM
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-[11px]">
            ระบบบริหารจัดการและซื้อ-ขายไก่ชนออนไลน์ (มาตรฐาน TOR)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Switch Role Pill (TOR 3 Roles: GUEST / MEMBER / ADMIN) */}
          <div className="flex items-center bg-slate-800 rounded-full p-0.5 border border-slate-700">
            <button
              onClick={() => setRole('GUEST')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                role === 'GUEST'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Store className="w-3 h-3" /> ทั่วไป (Guest)
            </button>
            <button
              onClick={() => {
                setRole('MEMBER');
                if (!currentMember && onOpenAuth) {
                  onOpenAuth('LOGIN');
                }
              }}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                role === 'MEMBER'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-emerald-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3" /> สมาชิก (Member -5%)
            </button>
            <button
              onClick={() => setRole('ADMIN')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                role === 'ADMIN'
                  ? 'bg-purple-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" /> แอดมิน (Admin)
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('ต้องการรีเซ็ตข้อมูลตัวอย่างกลับเป็นค่าเริ่มต้นหรือไม่?')) {
                resetAllData();
              }
            }}
            title="รีเซ็ตข้อมูล Demo ทั้งหมด"
            className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> <span>รีเซ็ตข้อมูล</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      {/* pt-8 on mobile to avoid iPhone dynamic island / notch overlap */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-7 pb-2.5 sm:pt-3 sm:pb-3 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectNav(role !== 'ADMIN' ? 'HOME' : 'ADMIN_KANBAN')}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-black text-base sm:text-xl">
            🐓
          </div>
          <div>
            <h1 className="text-xs sm:text-base font-black tracking-tight text-slate-900 leading-none">
              CYBER <span className="text-amber-600">GAMECOCK</span>
            </h1>
            <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wider block">
              ฟาร์มมาตรฐานสากล
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Hidden on mobile - moved to bottom tab bar) */}
        {role !== 'ADMIN' ? (
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => onSelectNav('HOME')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'HOME'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏠 หน้าแรก
            </button>
            <button
              onClick={() => onSelectNav('LIVE_COCKS')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'LIVE_COCKS'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🐓 ไก่ชนมีชีวิต
            </button>
            <button
              onClick={() => onSelectNav('EGGS')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'EGGS'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🥚 ไข่เชื้อพร้อมเพาะ
            </button>
            <button
              onClick={() => onSelectNav('SUPPLIES')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'SUPPLIES'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💊 อุปกรณ์ & เวชภัณฑ์
            </button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => onSelectNav('ADMIN_KANBAN')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'ADMIN_KANBAN'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📋 กระดานออเดอร์ (Kanban)
            </button>
            <button
              onClick={() => onSelectNav('ADMIN_INVENTORY')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'ADMIN_INVENTORY'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📦 สต๊อก & โควตา
            </button>
            <button
              onClick={() => onSelectNav('ADMIN_ANALYTICS')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNav === 'ADMIN_ANALYTICS'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 รายงานยอดขาย
            </button>
          </nav>
        )}

        {/* Action icons (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* Member Profile Badge / Login Trigger */}
          {role === 'MEMBER' && currentMember ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left">
                <span className="font-black block leading-none text-[11px] text-emerald-800">
                  ⭐ {currentMember.name}
                </span>
                <span className="text-[9px] text-emerald-600 block">
                  {currentMember.memberTier} • สิทธิ์ลด 5%
                </span>
              </div>
              <button
                onClick={logoutMember}
                title="ออกจากระบบสมาชิก"
                className="ml-1 p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : role === 'MEMBER' && !currentMember ? (
            <button
              onClick={() => onOpenAuth && onOpenAuth('LOGIN')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>เข้าสู่ระบบ Member</span>
            </button>
          ) : role === 'GUEST' ? (
            <button
              onClick={() => onOpenAuth && onOpenAuth('LOGIN')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>เข้าสู่ระบบ / สมาชิก</span>
            </button>
          ) : null}

          {/* Tracking button */}
          <button
            onClick={onOpenTracking}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <Truck className="w-4 h-4 text-amber-600" />
            <span>ติดตามขนส่ง</span>
          </button>

          {/* In-app Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="การแจ้งเตือน"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ตะกร้า</span>
            {totalCartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Quick Action Pill (Right side on mobile) */}
        <div className="sm:hidden flex items-center gap-1.5">
          <button
            onClick={() => {
              if (role === 'GUEST') setRole('MEMBER');
              else if (role === 'MEMBER') setRole('ADMIN');
              else setRole('GUEST');
            }}
            className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
          >
            {role === 'GUEST' && '👤 ทั่วไป'}
            {role === 'MEMBER' && '⭐ สมาชิก'}
            {role === 'ADMIN' && '🛡️ แอดมิน'}
          </button>
        </div>
      </div>
    </header>
  );
};
