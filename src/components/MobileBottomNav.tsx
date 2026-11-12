'use client';

import React from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Home,
  Store,
  Egg,
  Package,
  Truck,
  ShoppingCart,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Bell
} from 'lucide-react';

interface MobileBottomNavProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenNotifications: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeNav,
  onSelectNav,
  onOpenCart,
  onOpenTracking,
  onOpenNotifications
}) => {
  const { role, cart, unreadCount } = useFarm();
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe">
      {role !== 'ADMIN' ? (
        <div className="grid grid-cols-5 gap-1 items-center">
          {/* 1. Home / Overview */}
          <button
            onClick={() => onSelectNav('HOME')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'HOME'
                ? 'text-amber-600 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className={`w-5 h-5 transition-transform ${activeNav === 'HOME' ? 'scale-110 text-amber-600 stroke-[2.5]' : 'text-slate-500'}`} />
            <span className="text-[10px] tracking-tight mt-0.5 font-bold">หน้าแรก</span>
          </button>

          {/* 2. Live Gamecocks */}
          <button
            onClick={() => onSelectNav('LIVE_COCKS')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'LIVE_COCKS'
                ? 'text-amber-600 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={`text-lg transition-transform ${activeNav === 'LIVE_COCKS' ? 'scale-115' : ''}`}>
              🐓
            </span>
            <span className="text-[10px] tracking-tight mt-0.5">ไก่ชน</span>
          </button>

          {/* 3. Fertilized Eggs */}
          <button
            onClick={() => onSelectNav('EGGS')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'EGGS'
                ? 'text-amber-600 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={`text-lg transition-transform ${activeNav === 'EGGS' ? 'scale-115' : ''}`}>
              🥚
            </span>
            <span className="text-[10px] tracking-tight mt-0.5">ไข่เชื้อ</span>
          </button>

          {/* 4. Supplies & Equipment */}
          <button
            onClick={() => onSelectNav('SUPPLIES')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'SUPPLIES'
                ? 'text-amber-600 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className={`w-5 h-5 ${activeNav === 'SUPPLIES' ? 'text-amber-600 stroke-[2.5]' : 'text-slate-500'}`} />
            <span className="text-[10px] tracking-tight mt-0.5">อุปกรณ์</span>
          </button>

          {/* 5. Cart with badge */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-amber-600" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight text-amber-700 font-bold mt-0.5">ตะกร้า</span>
          </button>
        </div>
      ) : (
        /* ADMIN BOTTOM BAR */
        <div className="grid grid-cols-4 gap-1 items-center">
          <button
            onClick={() => onSelectNav('ADMIN_KANBAN')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'ADMIN_KANBAN'
                ? 'text-amber-600 font-black'
                : 'text-slate-500'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">ออเดอร์</span>
          </button>

          <button
            onClick={() => onSelectNav('ADMIN_INVENTORY')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'ADMIN_INVENTORY'
                ? 'text-amber-600 font-black'
                : 'text-slate-500'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">สต๊อก</span>
          </button>

          <button
            onClick={() => onSelectNav('ADMIN_ANALYTICS')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeNav === 'ADMIN_ANALYTICS'
                ? 'text-amber-600 font-black'
                : 'text-slate-500'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">รายงาน</span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <div className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">แจ้งเตือน</span>
          </button>
        </div>
      )}
    </div>
  );
};

