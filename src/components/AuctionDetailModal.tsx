'use client';

import React, { useState } from 'react';
import { AuctionItem, AuctionBid } from '../types';
import { useFarm } from '../context/FarmContext';
import {
  X,
  Gavel,
  History,
  TrendingUp,
  Award,
  Clock,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Flame,
  Phone,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

interface AuctionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auction: AuctionItem | null;
  onOpenAuth: () => void;
  onProceedToCheckout?: () => void;
}

export const AuctionDetailModal: React.FC<AuctionDetailModalProps> = ({
  isOpen,
  onClose,
  auction,
  onOpenAuth,
  onProceedToCheckout
}) => {
  const { role, currentMember, placeBid, buyoutAuction, auctions } = useFarm();

  // Look up fresh auction state from context
  const liveAuction = auctions.find(a => a?.id === auction?.id) || auction;

  const minRequiredBid = liveAuction ? liveAuction.currentBid + liveAuction.minBidIncrement : 0;
  const [bidAmount, setBidAmount] = useState<number>(minRequiredBid);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  if (!isOpen || !liveAuction) return null;

  const isMember = role === 'MEMBER';
  const isEnded = liveAuction.status === 'ENDED';
  const isWinner = currentMember && liveAuction.highestBidder?.name === currentMember.name;

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError(null);
    setFeedbackSuccess(null);

    if (!isMember) {
      setFeedbackError('สงวนสิทธิ์เฉพาะสมาชิก (Member) เท่านั้นที่เคาะประมูลได้');
      return;
    }

    const res = placeBid(liveAuction.id, bidAmount);
    if (!res.success) {
      setFeedbackError(res.message);
    } else {
      setFeedbackSuccess(res.message);
      setBidAmount(bidAmount + liveAuction.minBidIncrement);
      setTimeout(() => setFeedbackSuccess(null), 3500);
    }
  };

  const handleBuyout = () => {
    if (!isMember) {
      setFeedbackError('สงวนสิทธิ์เฉพาะสมาชิก (Member) เท่านั้นที่เคาะจบได้');
      return;
    }
    if (confirm(`ยืนยันการเคาะจบซื้อทันที (Buyout) ที่ราคา ฿${liveAuction.buyoutPrice?.toLocaleString()} บาท?`)) {
      const res = buyoutAuction(liveAuction.id);
      if (res.success) {
        setFeedbackSuccess(res.message);
      } else {
        setFeedbackError(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 flex flex-col justify-between">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-500/30 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                รหัส {liveAuction.code}
              </span>
              <span className="text-xs text-rose-300 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> ห้องเคาะประมูลสด & ประวัติการเคาะ
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
              {liveAuction.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 flex-1">
          {/* Winner Notification Banner if ended */}
          {isEnded && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border-2 border-amber-400 text-slate-900 space-y-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm sm:text-base">
                <Trophy className="w-6 h-6 text-amber-500 animate-bounce" />
                <span>การประมูลสิ้นสุดลงแล้ว! (AUCTION CLOSED)</span>
              </div>
              <p className="text-xs text-slate-700">
                ผู้ชนะการประมูล: <strong className="text-emerald-700 text-sm font-black">{liveAuction.highestBidder?.name} ({liveAuction.highestBidder?.farm || 'ฟาร์มสมาชิก'})</strong> ด้วยยอดประมูลสุดท้าย <strong className="text-rose-600 font-mono text-sm">฿{liveAuction.currentBid.toLocaleString()}</strong> บาท
              </p>
              {isWinner && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-amber-300/60">
                  <span className="text-xs font-bold text-emerald-800">
                    🎉 ยินดีด้วยครับคุณ {currentMember?.name}! คุณเป็นผู้ชนะการประมูลรายการนี้
                  </span>
                  {onProceedToCheckout && (
                    <button
                      onClick={() => {
                        onClose();
                        onProceedToCheckout();
                      }}
                      className="py-1.5 px-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ไปชำระเงินมัดจำ (30%)</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick Overview Card */}
          <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={liveAuction.imageUrl}
              alt={liveAuction.title}
              className="w-full sm:w-40 h-36 object-cover rounded-xl border border-slate-200 shrink-0"
            />
            <div className="space-y-1.5 text-xs text-slate-600 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">สายพันธุ์: {liveAuction.breed}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  นน. {liveAuction.weightKg} กก.
                </span>
              </div>
              <p className="line-clamp-2 text-slate-700 font-medium">
                {liveAuction.fightingStyle}
              </p>
              <div className="text-[11px] bg-white p-2 rounded-xl border border-slate-200">
                🧬 <span className="font-bold text-slate-800">สายเลือด:</span> {liveAuction.pedigreeSummary || 'สายเลือดแชมป์เงินล้าน 3 รุ่น'}
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">ราคาเริ่มต้น: ฿{liveAuction.startingPrice.toLocaleString()}</span>
                <span className="text-slate-400">ขั้นต่ำต่อครั้ง: ฿{liveAuction.minBidIncrement.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Price & Current Status Bar */}
          <div className="bg-gradient-to-r from-slate-900 to-rose-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <span className="text-slate-300 text-xs block">ราคาประมูลสูงสุดปัจจุบัน</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                ฿{liveAuction.currentBid.toLocaleString()}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-slate-300 text-xs block">สถานะผู้ถือราคา</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                {liveAuction.highestBidder ? `${liveAuction.highestBidder.name} (${liveAuction.highestBidder.farm || 'สมาชิก'})` : 'ยังไม่มีผู้เคาะ'}
              </span>
            </div>
          </div>

          {/* Real-time Bid History Log (ตารางรายละเอียดการเคาะ) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                <History className="w-4 h-4 text-amber-600" />
                <span>ประวัติและรายละเอียดการเคาะประมูลสด ({liveAuction.bids.length} ครั้ง)</span>
              </h3>
              <span className="text-[10px] text-slate-400">เรียงจากล่าสุด</span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-52 overflow-y-auto bg-white">
              {liveAuction.bids.length > 0 ? (
                liveAuction.bids.map((b, idx) => (
                  <div
                    key={b.id || idx}
                    className={`p-3 flex items-center justify-between text-xs transition-colors ${
                      idx === 0 ? 'bg-amber-50/70 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                        idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-500'
                      }`}>
                        #{liveAuction.bids.length - idx}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{b.bidderName}</span>
                          {b.bidderFarm && (
                            <span className="text-[10px] text-slate-500">({b.bidderFarm})</span>
                          )}
                          {idx === 0 && (
                            <span className="text-[9px] bg-rose-600 text-white font-black px-1.5 py-0.2 rounded-full">
                              นำอยู่
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          เวลา: {b.time} {b.bidderTier ? `• ระดับ ${b.bidderTier}` : ''}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-black font-mono ${
                        idx === 0 ? 'text-rose-600 text-base' : 'text-slate-800'
                      }`}>
                        ฿{b.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  ยังไม่มีประวัติการเคาะประมูลในรายการนี้ เปิดราคาเริ่มต้นที่ ฿{liveAuction.startingPrice.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Feedback messages */}
          {feedbackError && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedbackError}</span>
            </div>
          )}
          {feedbackSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-bold">{feedbackSuccess}</span>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        {!isEnded ? (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2">
            {isMember ? (
              <form onSubmit={handlePlaceBid} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">฿</span>
                    <input
                      type="number"
                      step={liveAuction.minBidIncrement}
                      min={liveAuction.currentBid + liveAuction.minBidIncrement}
                      value={bidAmount}
                      onChange={e => setBidAmount(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-xs sm:text-sm font-black font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 bg-white"
                      placeholder="ระบุยอดประมูล"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>เคาะประมูล</span>
                  </button>
                </div>

                {liveAuction.buyoutPrice && (
                  <button
                    type="button"
                    onClick={handleBuyout}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    เคาะจบซื้อทันที (Buyout Now) ที่ราคา ฿{liveAuction.buyoutPrice.toLocaleString()} บาท
                  </button>
                )}
              </form>
            ) : (
              <div className="text-center py-1">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>เข้าสู่ระบบหรือสมัครสมาชิก Member เพื่อร่วมเคาะประมูล</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 border-t border-slate-200 bg-slate-100 text-center text-xs text-slate-500 font-bold">
            การประมูลรายการนี้ปิดสมบูรณ์แล้ว
          </div>
        )}
      </div>
    </div>
  );
};

