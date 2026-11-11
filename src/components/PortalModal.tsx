'use client';

import React from 'react';
import {
  Monitor,
  Smartphone,
  Shield,
  Truck,
  X,
  ArrowRight,
  Sparkles,
  GitFork,
  Calculator
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSystem: (system: 'WEB' | 'MOBILE' | 'BACKOFFICE' | 'TRACKING') => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  onSelectSystem
}) => {
  if (!isOpen) return null;

  const systems = [
    {
      id: 'WEB' as const,
      title: 'เว็บหน้าร้าน (Web Storefront)',
      badge: 'Desktop View',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      icon: <Monitor className="w-6 h-6 text-sky-600" />,
      description:
        'สำหรับลูกค้าทั่วไป: เลือกชมไก่ชน, ดูคลิปเตะเป้า, ส่องผังสายเลือด 3 รุ่น, สั่งซื้อไข่เชื้อรับประกัน และระบบแยกตะกร้าสินค้า (Smart Split Cart)',
      features: ['ผังสายเลือด 3 รุ่นแบบคลิกได้', 'ระบบมัดจำ 30% Auto-timeout', 'แนบสลิปพร้อมเพย์']
    },
    {
      id: 'MOBILE' as const,
      title: 'จำลองจอมือถือ (Mobile Simulator)',
      badge: 'Responsive View',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
      description:
        'จำลองหน้าจอมือถือสมาร์ตโฟน (Mobile Frame) สำหรับทดสอบการแสดงผลบนอุปกรณ์พกพาตามข้อกำหนด Responsive Design ใน TOR',
      features: ['กรอบ iPhone จำลอง', 'สั่งซื้อและติดตามขนส่งบนมือถือ', 'แตะเลือกขนาดเซ็ตไข่เชื้อ']
    },
    {
      id: 'BACKOFFICE' as const,
      title: 'ระบบหลังบ้าน (Backoffice Admin)',
      badge: 'Farm Owner',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      description:
        'สำหรับเจ้าของฟาร์ม: บอร์ดจัดการออเดอร์แบบ Kanban ลากเปลี่ยนสถานะ ตรวจสอบสลิป อัปเดตข้อมูลรถตู้สัตว์เลี้ยง และดูรายงานพ่อพันธุ์ทำเงิน',
      features: ['Order Kanban Board 4 ขั้น', 'อัปเดตคนขับรถตู้/เลขพัสดุ', 'รายงานสถิติ & สายพันธุ์']
    },
    {
      id: 'TRACKING' as const,
      title: 'ติดตามสถานะขนส่ง (Logistics Tracking)',
      badge: 'Real-time',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: <Truck className="w-6 h-6 text-amber-600" />,
      description:
        'ระบบค้นหาสถานะจัดส่ง: แสดงพิกัดจุดนัดรับรถตู้สัตว์เลี้ยง เบอร์คนขับ ทะเบียนรถ และเลขพัสดุด่วน Flash/EMS',
      features: ['ค้นหาด้วยเลขคำสั่งซื้อ', 'ข้อมูลรถตู้สัตว์เลี้ยงติดแอร์', 'เลขพัสดุกล่องโฟม']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header matching the screenshot text */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 font-bold text-xs border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Demo Portal Navigation Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            เลือกระบบที่ต้องการทดสอบ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            สลับไปมาระหว่างหน้าร้าน โมบายล์ และหลังบ้านได้อย่างอิสระผ่านแถบด้านล่างของหน้าจอ
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systems.map(sys => (
            <div
              key={sys.id}
              onClick={() => {
                onSelectSystem(sys.id);
                onClose();
              }}
              className="group p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200 group-hover:scale-110 transition-transform">
                    {sys.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sys.badgeColor}`}
                  >
                    {sys.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {sys.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{sys.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {sys.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-medium"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                  เข้าทดสอบ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

