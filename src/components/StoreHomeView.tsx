'use client';

import React from 'react';
import { Gamecock, FertilizedEgg, SupplyEquipment } from '../types';
import { GamecockCard } from './GamecockCard';
import { FertilizedEggCard } from './FertilizedEggCard';
import { SupplyCard } from './SupplyCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  Zap,
  Layers,
  ChevronRight,
  Clock,
  Star,
  CheckCircle2,
  TrendingUp,
  Package,
  HeartHandshake
} from 'lucide-react';

interface StoreHomeViewProps {
  gamecocks: Gamecock[];
  eggs: FertilizedEgg[];
  equipment: SupplyEquipment[];
  onSelectNav: (nav: string) => void;
  onViewGamecockDetails: (gamecock: Gamecock, tab?: 'OVERVIEW' | 'PEDIGREE' | 'VIDEO') => void;
  onOpenTracking: () => void;
}

export const StoreHomeView: React.FC<StoreHomeViewProps> = ({
  gamecocks,
  eggs,
  equipment,
  onSelectNav,
  onViewGamecockDetails,
  onOpenTracking
}) => {
  // Showcase top 3 live cocks
  const featuredCocks = gamecocks.slice(0, 3);
  // Showcase top 2 egg pairs
  const featuredEggs = eggs.slice(0, 2);
  // Showcase top 3 equipment items
  const featuredSupplies = equipment.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Main Banner */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-4 sm:p-8 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> แพลตฟอร์มไก่ชนพันธุ์แท้ มาตรฐานระดับประเทศ
          </div>

          <h2 className="text-xl sm:text-4xl font-black tracking-tight leading-snug">
            ศูนย์รวมยอดสายพันธุ์เงินล้าน <br />
            <span className="text-amber-400">ผังสายเลือด 3 รุ่น</span> รับรองแท้ 100%
          </h2>

          <p className="text-[11px] sm:text-sm text-slate-300 leading-relaxed">
            สัมผัสประสบการณ์สั่งซื้อครบวงจร ทั้งไก่ชนมีชีวิตพร้อมคลิปเตะเป้า, ไข่เชื้อสายเลือดแชมป์พร้อมประกัน,
            และเวชภัณฑ์มาตรฐานฟาร์ม พร้อมบริการจัดส่งด้วยรถตู้สัตว์เลี้ยงติดแอร์ดูแลตลอดทาง
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => onSelectNav('LIVE_COCKS')}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>ชมไก่ชนพร้อมขาย</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectNav('EGGS')}
              className="py-2 px-4 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer"
            >
              จองไข่เชื้อเงินล้าน
            </button>
            <button
              onClick={() => onSelectNav('SUPPLIES')}
              className="py-2 px-3.5 bg-white/10 hover:bg-white/20 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>อุปกรณ์ & เวชภัณฑ์</span>
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none hidden md:flex items-center justify-center font-black text-9xl text-amber-400/40 select-none">
          🐓
        </div>
      </div>

      {/* 2. Quick Category Navigation Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600" /> หมวดหมู่หลักของฟาร์ม
          </h3>
          <span className="text-[11px] text-slate-400">เลือกดูสินค้าตามประเภท</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {/* Card 1: Live Cocks */}
          <div
            onClick={() => onSelectNav('LIVE_COCKS')}
            className="group bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">🐓</span>
              <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {gamecocks.length} ตัว
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                ไก่ชนมีชีวิต
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                คลิปเตะเป้า + สายเลือด
              </p>
            </div>
          </div>

          {/* Card 2: Eggs */}
          <div
            onClick={() => onSelectNav('EGGS')}
            className="group bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">🥚</span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {eggs.length} คู่ผสม
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                ไข่เชื้อพร้อมเพาะ
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                ราคา Tier 1/3/5 ฟอง
              </p>
            </div>
          </div>

          {/* Card 3: Supplies */}
          <div
            onClick={() => onSelectNav('SUPPLIES')}
            className="group bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">💊</span>
              <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {equipment.length} รายการ
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                อุปกรณ์ & เวชภัณฑ์
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                ยาบำรุง, วัคซีน, นวม
              </p>
            </div>
          </div>

          {/* Card 4: Pedigree Tree Shortcut */}
          <div
            onClick={() => gamecocks[0] && onViewGamecockDetails(gamecocks[0], 'PEDIGREE')}
            className="group bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ring-1 ring-amber-300/40"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">🌳</span>
              <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                เส้นโยง 3 รุ่น
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                ผังสายเลือด
              </h4>
              <p className="text-[10px] sm:text-[11px] text-amber-700 font-medium mt-0.5 line-clamp-1">
                เช็คบรรพบุรุษ 3 ชั่วโคตร
              </p>
            </div>
          </div>

          {/* Card 5: Van Tracking */}
          <div
            onClick={onOpenTracking}
            className="group bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">🚐</span>
              <span className="text-[10px] font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                รถตู้สัตว์เลี้ยง
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                ติดตามขนส่ง
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                เช็คสถานะและเบอร์คนขับ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section: Featured Live Gamecocks */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                🐓 ไก่ชนมีชีวิตดาวรุ่งและแชมป์เปี้ยน
              </h3>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                คัดเกรดพิเศษ
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              ผ่านการคัดเบอร์แข้ง มีคลิปเตะเป้าและผังสายเลือด 3 รุ่น
            </p>
          </div>

          <button
            onClick={() => onSelectNav('LIVE_COCKS')}
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>ดูทั้งหมด ({gamecocks.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featuredCocks.map(cock => (
            <GamecockCard
              key={cock.id}
              gamecock={cock}
              onViewDetails={c => onViewGamecockDetails(c)}
            />
          ))}
        </div>
      </section>

      {/* 4. Section: Popular Fertilized Eggs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                🥚 ไข่เชื้อสายเลือดเงินล้านพร้อมเพาะ
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                รับประกันเคลม 100%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              คู่ผสมระดับเงินล้าน โควตามีจำนวนจำกัดต่อสัปดาห์
            </p>
          </div>

          <button
            onClick={() => onSelectNav('EGGS')}
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>ดูทั้งหมด ({eggs.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {featuredEggs.map(egg => (
            <FertilizedEggCard key={egg.id} egg={egg} />
          ))}
        </div>
      </section>

      {/* 5. Section: Popular Supplies & Medicine */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                💊 อุปกรณ์และเวชภัณฑ์ดูแลไก่ชน
              </h3>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                จัดส่งพัสดุด่วน
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              ยาบำรุงกำลัง สมุนไพร นวมซ้อม และเวชภัณฑ์มาตรฐานฟาร์ม
            </p>
          </div>

          <button
            onClick={() => onSelectNav('SUPPLIES')}
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>ดูทั้งหมด ({equipment.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featuredSupplies.map(item => (
            <SupplyCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 6. Why Choose Us / Trust Badges Section */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
            STANDARD & GUARANTEE
          </span>
          <h3 className="text-base sm:text-xl font-black text-slate-900">
            4 มาตรฐานความมั่นใจจาก CYBER FARM
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            สร้างความโปร่งใสและมั่นใจสูงสุดในการซื้อขายไก่ชนออนไลน์
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          {/* Badge 1 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              🧬
            </div>
            <h4 className="font-bold text-xs text-slate-900">ผังสายเลือด 3 รุ่น 100%</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              บันทึกสายบรรพบุรุษ พ่อ-แม่ ปู่-ย่า ตา-ยาย พร้อมสถิติเงินรางวัลและคลิปเตะเป้า
            </p>
          </div>

          {/* Badge 2 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              🚐
            </div>
            <h4 className="font-bold text-xs text-slate-900">รถตู้สัตว์เลี้ยงติดแอร์</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              คนขับมืออาชีพคอยดูแล ป้อนน้ำ ป้อนอาหาร พร้อมระบบติดตามเบอร์คนขับและจุดนัดรับ
            </p>
          </div>

          {/* Badge 3 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h4 className="font-bold text-xs text-slate-900">รับประกันไข่เชื้อแตก 100%</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              กล่องกันกระแทกพิเศษ เคลมส่งฟองใหม่ทันทีหากเกิดความเสียหายจากการขนส่ง
            </p>
          </div>

          {/* Badge 4 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              🔒
            </div>
            <h4 className="font-bold text-xs text-slate-900">มัดจำ 30% ล็อกคิว 48 ชม.</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ระบบ Smart Split Cart แยกบิลรถตู้ vs พัสดุ และวางมัดจำล็อกสถานะไก่ทันที
            </p>
          </div>
        </div>
      </section>

      {/* 7. Latest Wins & Customer Reviews Bar */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-bold text-amber-950">
              เกียรติประวัติ & เสียงตอบรับจากผู้ซื้อ
            </h3>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full">
            คะแนนความพึงพอใจ 4.9/5 ★
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">เสี่ยเบิร์ด โคราช</span>
              <span className="text-amber-500 text-[11px]">★★★★★</span>
            </div>
            <p className="text-[11px] text-slate-600">
              "ลูกเจ้าเยียร์แสนเชิง โตมาเบอร์แข้งโหดมาก ชนะไฟต์แรกที่สนามทองคำรับเงินแสน สายเลือดตรงปก 100%"
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">ผู้ใหญ่สมบัติ จ.แพร่</span>
              <span className="text-amber-500 text-[11px]">★★★★★</span>
            </div>
            <p className="text-[11px] text-slate-600">
              "สั่งไข่เชื้อ 5 ฟอง แพ็กกล่องดีมาก มีเชื้อสมบูรณ์ 4 ฟอง ออกมาแข็งแรงทุกตัว ระบบรับประกันดีเยี่ยม"
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">คุณชนาธิป ปทุมธานี</span>
              <span className="text-amber-500 text-[11px]">★★★★★</span>
            </div>
            <p className="text-[11px] text-slate-600">
              "รถตู้สัตว์เลี้ยงติดแอร์มาส่งถึงหน้าบ้าน ไก่สดชื่นไม่โทรมเลย มีคนขับโทรแจ้งล่วงหน้า ประทับใจมากครับ"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

