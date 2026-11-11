'use client';

import React from 'react';
import {
  Monitor,
  Smartphone,
  Shield,
  Truck,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Clock,
  CheckCircle2,
  FileText,
  ChevronRight
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface PortalLandingProps {
  onSelectSystem: (system: 'WEB' | 'MOBILE' | 'BACKOFFICE' | 'TRACKING') => void;
}

export const PortalLanding: React.FC<PortalLandingProps> = ({ onSelectSystem }) => {
  const { gamecocks, eggs, equipment, orders } = useFarm();

  const systems = [
    {
      id: 'WEB' as const,
      title: 'เว็บหน้าร้านลูกค้า (Web Storefront)',
      badge: 'Desktop View',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      tagline: 'หน้าแรกศูนย์รวมทุกหมวดหมู่, ผังสายเลือด 3 รุ่น และตะกร้าแยกบิล',
      icon: <Monitor className="w-7 h-7 text-sky-600" />,
      features: [
        'หน้าหลักรวมไฮไลต์ไก่ชน, ไข่เชื้อเงินล้าน และเวชภัณฑ์ในหน้าเดียว',
        'ผังสายเลือด 3 รุ่น (Pedigree Tree) คลิกดูคลิปพ่อ-แม่พันธุ์',
        'ระบบซื้อไข่เชื้อแบบ Tier (1, 3, 5 ฟอง) พร้อมประกันเคลม',
        'Smart Split Cart แยกบิลรถตู้สัตว์เลี้ยง vs พัสดุอัตโนมัติ'
      ],
      btnText: 'เข้าสู่หน้าร้าน Desktop',
      btnColor: 'bg-sky-600 hover:bg-sky-700 text-white'
    },
    {
      id: 'MOBILE' as const,
      title: 'จำลองจอมือถือ (Mobile Simulator)',
      badge: 'Mobile App View',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      tagline: 'สัมผัสประสบการณ์บนสมาร์ตโฟน พร้อมแถบเมนูด้านล่าง',
      icon: <Smartphone className="w-7 h-7 text-emerald-600" />,
      features: [
        'กรอบ iPhone 16 Pro / iPad พร้อมแถบควบคุมขนาดหน้าจอ',
        'Mobile Bottom Nav Bar ติดขอบล่าง 5 ปุ่ม ใช้งานมือเดียว',
        'ทดสอบความ Responsive สไลด์ดูสินค้าและกดสั่งซื้อง่ายดาย',
        'เลือกกรอบไทเทเนียม / ขอบเรียบ / ไม่มีกรอบ และปรับซูมได้'
      ],
      btnText: 'ทดสอบบนจอมือถือ',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    {
      id: 'BACKOFFICE' as const,
      title: 'ระบบจัดการหลังบ้าน (Backoffice Admin)',
      badge: 'Farm Owner',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      tagline: 'บอร์ดจัดการออเดอร์ Kanban, จัดการสต๊อก และรายงานวิเคราะห์',
      icon: <Shield className="w-7 h-7 text-purple-600" />,
      features: [
        'Order Kanban Board 4 ขั้นตอน ตรวจสอบสลิปและอนุมัติ',
        'ฟอร์มอัปเดตข้อมูลรถตู้สัตว์เลี้ยง (คนขับ/ทะเบียน) และเลขพัสดุ',
        'จัดการสต๊อกสินค้า: เติมสต๊อกด่วนคลิกเดียว และเพิ่มสินค้าใหม่',
        'รายงานเชิงวิเคราะห์: อันดับพ่อพันธุ์ทำเงิน & สถิติสายพันธุ์'
      ],
      btnText: 'เข้าสู่หลังบ้านแอดมิน',
      btnColor: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    {
      id: 'TRACKING' as const,
      title: 'ติดตามสถานะขนส่ง (Logistics Tracking)',
      badge: 'Real-time Tracking',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      tagline: 'ตรวจสอบจุดนัดรับรถตู้สัตว์เลี้ยงและเลขพัสดุด่วน',
      icon: <Truck className="w-7 h-7 text-amber-600" />,
      features: [
        'ค้นหาด้วยรหัสคำสั่งซื้อ (เช่น CF-ORD...) หรือเบอร์โทรศัพท์',
        'แสดงจุดนัดรับรถตู้สัตว์เลี้ยงติดแอร์ เบอร์โทรคนขับ และทะเบียนรถ',
        'แสดงเลขพัสดุ Flash Express / EMS พร้อมการรับประกันกล่องโฟม',
        'อัปเดตสถานะการเดินทางแบบเรียลไทม์'
      ],
      btnText: 'เปิดหน้าติดตามขนส่ง',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] pb-28">
      {/* Header bar on top */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-amber-500/20">
              🐓
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 leading-none">
                CYBER <span className="text-amber-600">GAMECOCK</span> FARM
              </h1>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider">
                E-Commerce & Pedigree Platform (TOR Demo Portal)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-bold hidden sm:inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ระบบพร้อมทดสอบ (Live Demo)
            </span>
          </div>
        </div>
      </header>

      {/* Main Portal Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            ระบบบริหารจัดการและซื้อ-ขายไก่ชนออนไลน์ ฉบับสมบูรณ์
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            เลือกระบบที่ต้องการทดสอบ
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            ยินดีต้อนรับสู่ระบบเดโม พัฒนาตรงตามข้อกำหนดขอบเขตของงาน (TOR) ครบทุกฟังก์ชัน
            ท่านสามารถคลิกเลือกระบบด้านล่างเพื่อเริ่มการทดสอบ หรือสลับไปมาได้อย่างอิสระผ่านแถบควบคุมด้านล่างของหน้าจอ
          </p>
        </div>

        {/* 4 Interactive System Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 animate-in fade-in duration-500">
          {systems.map(sys => (
            <div
              key={sys.id}
              onClick={() => onSelectSystem(sys.id)}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-amber-400 p-6 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors shadow-xs">
                    {sys.icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${sys.badgeColor}`}
                  >
                    {sys.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {sys.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{sys.tagline}</p>
                </div>

                {/* Features checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {sys.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all group-hover:scale-[1.01] ${sys.btnColor}`}
                >
                  <span>{sys.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guided Walkthrough Steps */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base border-b border-slate-100 pb-3">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>คำแนะนำขั้นตอนการทดสอบแบบครบวงจร (End-to-End Workflow):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="font-bold text-slate-900">เลือกดูไก่และผังสายเลือด</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                เข้าหน้าร้าน ➔ กดเปิดดูคลิปเตะเป้าและคลิกสำรวจผังครอบครัว 3 รุ่น (Pedigree Tree)
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="font-bold text-slate-900">สั่งซื้อ & วางมัดจำ 30%</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                ทดสอบกดสั่งซื้อไก่ วางมัดจำ 30% และสั่งไข่เชื้อ ระบบจะแยกบิลค่าส่งรถตู้ vs พัสดุให้อัตโนมัติ
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="font-bold text-slate-900">แนบสลิป & ส่งออเดอร์</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                กรอกจุดนัดรับรถตู้ แนบรูปสลิปโอนเงิน แล้วกดยืนยัน ออเดอร์จะส่งไปหาแอดมินทันที
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                4
              </span>
              <h4 className="font-bold text-slate-900">ตรวจสลิปใน Backoffice</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                สลับไปที่ Backoffice ➔ ตรวจสลิปในบอร์ด Kanban ➔ ใส่ข้อมูลคนขับรถตู้ ➔ ลูกค้าเช็คเลขติดตามได้ทันที
              </p>
            </div>
          </div>
        </div>

        {/* Live System Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-amber-600 block">{gamecocks.length}</span>
            <span className="text-[11px] text-slate-500 font-bold">ไก่ชนในระบบ</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-emerald-600 block">{eggs.length}</span>
            <span className="text-[11px] text-slate-500 font-bold">คู่ผสมไข่เชื้อ</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-sky-600 block">{equipment.length}</span>
            <span className="text-[11px] text-slate-500 font-bold">เวชภัณฑ์ & อุปกรณ์</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl font-black text-purple-600 block">{orders.length}</span>
            <span className="text-[11px] text-slate-500 font-bold">ออเดอร์ในระบบ</span>
          </div>
        </div>
      </main>
    </div>
  );
};

