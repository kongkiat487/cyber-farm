'use client';

import React from 'react';
import { Gamecock } from '../types';
import { WatermarkBadge } from './WatermarkBadge';
import { Award, Play, Scale, Calendar, Zap, Check, Eye } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface GamecockCardProps {
  gamecock: Gamecock;
  onViewDetails: (gamecock: Gamecock) => void;
}

export const GamecockCard: React.FC<GamecockCardProps> = ({ gamecock, onViewDetails }) => {
  const { addToCart, cart } = useFarm();

  const isSold = gamecock.status === 'SOLD';
  const isReserved = gamecock.status === 'RESERVED';
  const isBreeder = gamecock.status === 'BREEDER';
  const isAvailable = gamecock.status === 'AVAILABLE';

  const inCart = cart.some(c => c.productId === gamecock.id);

  const getStatusBadge = () => {
    switch (gamecock.status) {
      case 'AVAILABLE':
        return <span className="bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">พร้อมขาย</span>;
      case 'RESERVED':
        return <span className="bg-amber-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">ติดจอง (มัดจำแล้ว)</span>;
      case 'SOLD':
        return <span className="bg-slate-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">ขายแล้ว</span>;
      case 'BREEDER':
        return <span className="bg-purple-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">พ่อพันธุ์หลักฟาร์ม</span>;
    }
  };

  const handleQuickAdd = () => {
    if (!isAvailable || inCart) return;
    addToCart({
      productId: gamecock.id,
      name: `${gamecock.name} (${gamecock.code})`,
      code: gamecock.code,
      type: 'LIVE_GAMECOCK',
      price: gamecock.price,
      quantity: 1,
      imageUrl: gamecock.imageUrl,
      isDeposit: false
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image with Badges & Watermark */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewDetails(gamecock)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gamecock.imageUrl}
          alt={gamecock.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {getStatusBadge()}
          <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-md">
            #{gamecock.code}
          </span>
        </div>

        {/* Video Badge */}
        {gamecock.videoUrl && (
          <div className="absolute top-2.5 right-2.5 bg-red-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <Play className="w-3 h-3 fill-white" /> คลิปเตะเป้า
          </div>
        )}

        {/* Custom Tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {gamecock.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
                tag === 'แชมป์เปี้ยน'
                  ? 'bg-amber-400 text-amber-950 font-extrabold'
                  : tag === 'ดาวรุ่ง'
                  ? 'bg-sky-500 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              ★ {tag}
            </span>
          ))}
        </div>

        {/* Watermark */}
        <WatermarkBadge code={gamecock.code} />
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              onClick={() => onViewDetails(gamecock)}
              className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer line-clamp-1"
            >
              {gamecock.name}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
              {gamecock.breed}
            </span>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-1.5 my-2.5 py-2 px-2.5 bg-slate-50 rounded-xl text-center border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5">
                <Scale className="w-3 h-3" /> น้ำหนัก
              </span>
              <p className="text-xs font-bold text-slate-800">{gamecock.weightKg} กก.</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5">
                <Calendar className="w-3 h-3" /> อายุ
              </span>
              <p className="text-xs font-bold text-slate-800">{gamecock.ageMonths} เดือน</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5">
                <Award className="w-3 h-3 text-amber-500" /> สถิติ
              </span>
              <p className="text-xs font-bold text-amber-600">ชนะ {gamecock.winRecords.wins} ไฟต์</p>
            </div>
          </div>

          {/* Fighting Style */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-3 bg-amber-50/50 p-2 rounded-lg border border-amber-100/60">
            <Zap className="w-3 h-3 text-amber-600 inline mr-1" />
            <span className="font-semibold text-slate-800">เชิงชน:</span> {gamecock.fightingStyle}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 block">ราคาขายสด</span>
              <span className="text-xl font-black text-amber-600">
                ฿{gamecock.price.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">เปิดจองมัดจำ 30%</span>
              <span className="text-xs font-bold text-slate-700">
                ฿{Math.round(gamecock.price * 0.3).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(gamecock)}
              className="py-2 px-3 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> ดูสายเลือด
            </button>

            {isAvailable ? (
              <button
                onClick={handleQuickAdd}
                disabled={inCart}
                className={`py-2 px-3 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 ${
                  inCart
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> ในตะกร้าแล้ว
                  </>
                ) : (
                  'สั่งซื้อ / จอง'
                )}
              </button>
            ) : (
              <button
                disabled
                className="py-2 px-3 text-xs font-bold rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed text-center"
              >
                {isSold ? 'ขายแล้ว' : isReserved ? 'ติดจองแล้ว' : 'พ่อพันธุ์หลัก'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

