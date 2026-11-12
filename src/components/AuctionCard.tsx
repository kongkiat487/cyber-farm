'use client';

import React, { useState, useEffect } from 'react';
import { AuctionItem } from '../types';
import { useFarm } from '../context/FarmContext';
import {
  Gavel,
  Clock,
  Flame,
  Award,
  Lock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  History,
  Trophy
} from 'lucide-react';

interface AuctionCardProps {
  auction: AuctionItem;
  onOpenAuth: () => void;
  onViewDetails?: (auction: AuctionItem) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onOpenAuth, onViewDetails }) => {
  const { role, currentMember, placeBid, buyoutAuction } = useFarm();

  const minRequiredBid = auction.currentBid + auction.minBidIncrement;
  const [customBidAmount, setCustomBidAmount] = useState<number>(minRequiredBid);
  const [bidError, setBidError] = useState<string | null>(null);
  const [bidSuccess, setBidSuccess] = useState<string | null>(null);

  // Time remaining countdown calculation
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; ended: boolean }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(auction.endTime).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds, ended: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [auction.endTime]);

  // Keep customBidAmount aligned when currentBid changes
  useEffect(() => {
    setCustomBidAmount(auction.currentBid + auction.minBidIncrement);
  }, [auction.currentBid, auction.minBidIncrement]);

  const handleQuickAdd = (increment: number) => {
    setCustomBidAmount(prev => prev + increment);
    setBidError(null);
  };

  const handlePlaceBid = () => {
    setBidError(null);
    setBidSuccess(null);

    if (role !== 'MEMBER') {
      setBidError('สงวนสิทธิ์เฉพาะสมาชิก (Member) เท่านั้นที่เคาะประมูลได้');
      return;
    }

    const res = placeBid(auction.id, customBidAmount);
    if (!res.success) {
      setBidError(res.message);
    } else {
      setBidSuccess(res.message);
      setTimeout(() => setBidSuccess(null), 3500);
    }
  };

  const handleBuyout = () => {
    if (role !== 'MEMBER') {
      setBidError('สงวนสิทธิ์เฉพาะสมาชิก (Member) เท่านั้นที่เคาะจบได้');
      return;
    }
    if (confirm(`ยืนยันการเคาะจบซื้อทันที (Buyout) ที่ราคา ฿${auction.buyoutPrice?.toLocaleString()} บาท?`)) {
      const res = buyoutAuction(auction.id);
      if (res.success) {
        alert(res.message);
      } else {
        setBidError(res.message);
      }
    }
  };

  const isMember = role === 'MEMBER';
  const isHighestBidder = currentMember && auction.highestBidder?.name === currentMember.name;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white px-3.5 py-1.5 flex items-center justify-between text-xs font-black">
        <span className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>เปิดประมูลสด (Live Auction)</span>
        </span>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
          รหัส {auction.code}
        </span>
      </div>

      {/* Main Image & Live Countdown Overlay */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Member Exclusive Watermark */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-amber-400/60 rounded-xl px-2.5 py-1 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>สิทธิพิเศษเฉพาะ Member</span>
        </div>

        {/* Countdown Timer Pill */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-xl p-2 border border-white/10 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>เวลาที่เหลือ:</span>
          </div>
          {timeLeft.ended ? (
            <span className="font-bold text-rose-400">ปิดประมูลแล้ว</span>
          ) : (
            <div className="flex items-center gap-1 font-mono font-black text-xs text-amber-300">
              <span className="bg-slate-800/90 px-1.5 py-0.5 rounded text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-800/90 px-1.5 py-0.5 rounded text-white">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-800/90 px-1.5 py-0.5 rounded text-amber-400 animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Cock Details Header */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
              {auction.title}
            </h3>
          </div>

          <p className="text-[11px] text-slate-500 font-medium mt-1">
            สายพันธุ์: <span className="text-slate-800 font-bold">{auction.breed}</span> • นน. {auction.weightKg} กก. • อายุ {auction.ageMonths} เดือน
          </p>

          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {auction.fightingStyle}
          </p>

          {auction.pedigreeSummary && (
            <div className="mt-2 text-[10px] bg-amber-50/80 border border-amber-200/60 rounded-lg p-1.5 text-amber-900 line-clamp-1">
              🧬 {auction.pedigreeSummary}
            </div>
          )}
        </div>

        {/* Current Bid Display Section */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">ราคาประมูลสูงสุดปัจจุบัน:</span>
            <span className="text-lg sm:text-xl font-black text-rose-600 font-mono">
              ฿{auction.currentBid.toLocaleString()}
            </span>
          </div>

          {/* Highest Bidder Details */}
          {auction.highestBidder ? (
            <div className="flex items-center justify-between text-[11px] bg-white rounded-xl px-2.5 py-1 border border-slate-200">
              <span className="text-slate-500">ผู้เคาะสูงสุด:</span>
              <span className={`font-black ${isHighestBidder ? 'text-emerald-600' : 'text-slate-800'}`}>
                {isHighestBidder ? '⭐ คุณเคาะสูงสุดอยู่!' : `${auction.highestBidder.name} (${auction.highestBidder.farm || 'ฟาร์มสมาชิก'})`}
              </span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 text-center">ยังไม่มีผู้เคาะประมูล (เปิดราคาที่ ฿{auction.startingPrice.toLocaleString()})</div>
          )}

          {/* Total bids count & View details button */}
          <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
            <span className="text-slate-500">เคาะไปแล้ว: <b className="text-slate-800">{auction.bids.length}</b> ครั้ง</span>
            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails(auction)}
                className="text-[11px] font-black text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <History className="w-3.5 h-3.5 text-amber-600" />
                <span>ดูประวัติการเคาะทั้งหมด</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback Messages */}
        {bidError && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-1.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-tight">{bidError}</span>
          </div>
        )}
        {bidSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-bold leading-tight">{bidSuccess}</span>
          </div>
        )}

        {/* Bidding Action Zone - Differentiated by Role */}
        <div className="space-y-2 pt-1">
          {isMember ? (
            /* MEMBER VIEW: Full bidding controls */
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-2 text-slate-400 text-xs font-bold">฿</span>
                  <input
                    type="number"
                    step={auction.minBidIncrement}
                    min={minRequiredBid}
                    value={customBidAmount}
                    onChange={e => {
                      setCustomBidAmount(Number(e.target.value));
                      setBidError(null);
                    }}
                    className="w-full pl-6 pr-2 py-1.5 text-xs font-black font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
                  />
                </div>

                {/* Quick Add Chips */}
                <button
                  onClick={() => handleQuickAdd(1000)}
                  type="button"
                  className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-[11px] transition-colors cursor-pointer"
                >
                  +1,000
                </button>
                <button
                  onClick={() => handleQuickAdd(2000)}
                  type="button"
                  className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-[11px] transition-colors cursor-pointer hidden sm:block"
                >
                  +2,000
                </button>
              </div>

              {/* Action Buttons: Bid & Buyout */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePlaceBid}
                  className="py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>เคาะประมูล</span>
                </button>

                {auction.buyoutPrice && (
                  <button
                    onClick={handleBuyout}
                    className="py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1 shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                    title={`ซื้อทันทีที่ราคา ฿${auction.buyoutPrice.toLocaleString()}`}
                  >
                    <span>เคาะจบ ฿{(auction.buyoutPrice / 1000).toFixed(0)}k</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* NON-MEMBER VIEW: Locked, Prompting to Register/Login */
            <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs font-bold">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>จำกัดสิทธิ์เฉพาะสมาชิก (Member Only)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                ผู้ใช้งานทั่วไปไม่สามารถร่วมประมูลได้ กรุณาเข้าสู่ระบบหรือลงทะเบียนเป็นสมาชิกเพื่อเคาะประมูล
              </p>
              <button
                onClick={onOpenAuth}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>สมัคร / เข้าสู่ระบบสมาชิกเพื่อร่วมประมูล</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

