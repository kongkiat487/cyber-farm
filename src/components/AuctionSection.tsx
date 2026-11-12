'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { AuctionCard } from './AuctionCard';
import {
  Gavel,
  Flame,
  Award,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Lock,
  CheckCircle2,
  Info
} from 'lucide-react';

interface AuctionSectionProps {
  onOpenAuth: () => void;
  onViewAuctionDetails?: (auction: any) => void;
}

export const AuctionSection: React.FC<AuctionSectionProps> = ({ onOpenAuth, onViewAuctionDetails }) => {
  const { auctions, role, currentMember } = useFarm();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'ENDING_SOON'>('ALL');

  const isMember = role === 'MEMBER';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Banner / Header */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white p-4 sm:p-7 border border-rose-900/40 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[10px] sm:text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> ห้องประมูลสดออนไลน์ (Live Gamecock Auction)
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
            ประมูลยอดไก่ชนสายพันธุ์เงินล้าน <br />
            <span className="text-amber-400">สิทธิ์เฉพาะสมาชิก (Member Only)</span>
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
            เปิดโอกาสให้เฉพาะสมาชิกฟาร์มได้ร่วมเป็นเจ้าของไก่ชนสายเลือดแชมป์เกรดท็อป ในราคาเริ่มต้นพิเศษ
            เคาะประมูลสดแบบ Real-time พร้อมฟังก์ชันเคาะจบซื้อทันที (Buyout)
          </p>

          {/* Member Status Badge / Guest Prompt */}
          <div className="pt-2">
            {isMember && currentMember ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>คุณเข้าสู่ระบบในฐานะ: {currentMember.name} ({currentMember.memberTier}) • สิทธิ์ร่วมประมูลพร้อมใช้งาน</span>
              </div>
            ) : (
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs">
                <span className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-4 h-4 text-amber-400" /> บัญชีของคุณขณะนี้เป็น &quot;ผู้ใช้ทั่วไป&quot; ไม่สามารถเคาะประมูลได้
                </span>
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[11px] transition-all cursor-pointer w-fit"
                >
                  สมัครหรือเข้าสู่ระบบสมาชิกที่นี่
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none hidden md:block text-8xl font-black select-none">
          🔨
        </div>
      </div>

      {/* Rules & Policy Accordion / Notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 sm:p-4 text-amber-900 text-xs space-y-1">
        <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
          <Info className="w-4 h-4 text-amber-600" /> กฎกติกาการประมูล (Auction Rules):
        </h4>
        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-900/90 pl-1">
          <li><strong>สงวนสิทธิ์เฉพาะสมาชิก (Member)</strong> ที่ลงทะเบียนและยืนยันเบอร์โทรศัพท์เท่านั้น</li>
          <li>การเสนอราคาต้องเพิ่มขึ้นไม่ต่ำกว่าขั้นต่ำที่กำหนดในแต่ละรายการ (฿500 - ฿1,000)</li>
          <li>เมื่อหมดเวลา ผู้เสนอราคาสูงสุดจะได้รับสิทธิ์เป็นเจ้าของ และมีเวลาชำระเงินมัดจำภายใน 24 ชั่วโมง</li>
          <li>หากต้องการซื้อทันทีโดยไม่ต้องรอหมดเวลา สามารถกดปุ่ม <strong>&quot;เคาะจบ (Buyout)&quot;</strong> ได้ทันที</li>
        </ul>
      </div>

      {/* Auction Items Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
            <Gavel className="w-4 h-4 text-rose-600" /> รายการที่กำลังเปิดประมูล ({auctions.length} ตัว)
          </h3>
          <span className="text-[11px] text-slate-400">อัปเดตราคาแบบ Real-time</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {auctions.map(auction => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onOpenAuth={onOpenAuth}
              onViewDetails={onViewAuctionDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

