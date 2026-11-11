'use client';

import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Bell, Check, X, AlertTriangle, Package, Truck, CreditCard } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead } = useFarm();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'ORDER':
        return <Package className="w-4 h-4 text-amber-600" />;
      case 'STOCK':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'LOGISTICS':
        return <Truck className="w-4 h-4 text-blue-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">การแจ้งเตือน (In-app Notification)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">ไม่มีการแจ้งเตือน</div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3 rounded-xl transition-colors cursor-pointer flex gap-3 ${
                  notif.read ? 'bg-white opacity-75' : 'bg-amber-50/60'
                }`}
              >
                <div className="shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
          <span className="text-[10px] text-slate-400">ระบบแจ้งเตือนแบบเรียลไทม์ตาม TOR ข้อ 3.7</span>
        </div>
      </div>
    </div>
  );
};

