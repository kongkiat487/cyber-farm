'use client';

import React, { useState } from 'react';
import { Gamecock } from '../types';
import { PedigreeTree } from './PedigreeTree';
import { WatermarkBadge } from './WatermarkBadge';
import {
  X,
  Play,
  Award,
  Scale,
  Calendar,
  Zap,
  Shield,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface DetailModalProps {
  gamecock: Gamecock | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ gamecock, onClose }) => {
  const { addToCart, cart } = useFarm();
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PEDIGREE' | 'VIDEO'>('OVERVIEW');
  const [depositMode, setDepositMode] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!gamecock) return null;

  const currentImage = activeImage || gamecock.imageUrl;
  const isAvailable = gamecock.status === 'AVAILABLE';
  const inCart = cart.some(c => c.productId === gamecock.id);
  const depositPrice = Math.round(gamecock.price * 0.3);

  const handleAddToCart = (asDeposit: boolean) => {
    addToCart({
      productId: gamecock.id,
      name: `${gamecock.name} (${gamecock.code})`,
      code: gamecock.code,
      type: 'LIVE_GAMECOCK',
      price: asDeposit ? depositPrice : gamecock.price,
      quantity: 1,
      imageUrl: gamecock.imageUrl,
      isDeposit: asDeposit,
      depositAmount: depositPrice
    });
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-amber-500 text-slate-950 rounded-md">
              #{gamecock.code}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 truncate">{gamecock.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              title="คัดลอกลิงก์แชร์"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'OVERVIEW'
                ? 'border-amber-600 text-amber-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" /> ข้อมูลทั่วไปและรูปถ่าย
          </button>
          <button
            onClick={() => setActiveTab('PEDIGREE')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'PEDIGREE'
                ? 'border-amber-600 text-amber-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" /> ผังสายเลือด 3 รุ่น
          </button>
          {gamecock.videoUrl && (
            <button
              onClick={() => setActiveTab('VIDEO')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'VIDEO'
                  ? 'border-amber-600 text-amber-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Play className="w-4 h-4 text-red-600" /> คลิปวิดีโอเตะเป้า
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Media Gallery */}
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentImage} alt={gamecock.name} className="w-full h-full object-cover" />
                  <WatermarkBadge code={gamecock.code} />
                </div>

                {/* Thumbnails */}
                {gamecock.galleryImages && gamecock.galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {gamecock.galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          currentImage === img ? 'border-amber-500 ring-2 ring-amber-400' : 'border-slate-200'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Attributes & Specs */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {gamecock.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full"
                    >
                      ★ {tag}
                    </span>
                  ))}
                  <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {gamecock.breed}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                      <Scale className="w-3.5 h-3.5" /> น้ำหนัก
                    </span>
                    <p className="text-sm font-bold text-slate-900">{gamecock.weightKg} กก.</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> อายุ
                    </span>
                    <p className="text-sm font-bold text-slate-900">{gamecock.ageMonths} เดือน</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> สถิติไฟต์
                    </span>
                    <p className="text-sm font-bold text-amber-600">ชนะ {gamecock.winRecords.wins} ไฟต์</p>
                  </div>
                </div>

                {/* Fighting Style Details */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4 text-amber-600" /> ลีลาและสไตล์การชน (Fighting Style)
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{gamecock.fightingStyle}</p>
                </div>

                {/* Win Record Details */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ประวัติไฟต์การชนที่ผ่านมา
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {gamecock.winRecords.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logistics note */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-[11px] text-blue-900 space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    🚚 การจัดส่งสัตว์เลี้ยงมีชีวิต (Live Animal Transport)
                  </span>
                  <p>
                    จัดส่งผ่านรถตู้สัตว์เลี้ยง/รถทัวร์ติดแอร์ มีน้ำและอาหารดูแลตลอดทาง แอดมินจะแจ้งจุดนัดรับ เบอร์คนขับ
                    และทะเบียนรถทันทีเมื่อรถออกเดินทาง
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PEDIGREE' && <PedigreeTree gamecock={gamecock} />}

          {activeTab === 'VIDEO' && gamecock.videoUrl && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Play className="w-4 h-4 text-red-600" /> วิดีโอคลิปเตะเป้าและไฟต์ประลอง (Sparring Video Embed)
              </h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                <iframe
                  src={gamecock.videoUrl}
                  title={gamecock.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs text-slate-500">
                * ฝังลิงก์วิดีโอจาก YouTube/TikTok ตามมาตรฐาน TOR เพื่อประสิทธิภาพความเร็วสูงสุด
              </p>
            </div>
          )}
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block">ราคาจำหน่าย</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-600">
                ฿{gamecock.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">
                (มัดจำ 30%: ฿{depositPrice.toLocaleString()})
              </span>
            </div>
          </div>

          {isAvailable ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleAddToCart(true)}
                disabled={inCart}
                className="flex-1 sm:flex-none py-3 px-4 rounded-xl border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Clock className="w-4 h-4" /> วางมัดจำ 30% (฿{depositPrice.toLocaleString()})
              </button>

              <button
                onClick={() => handleAddToCart(false)}
                disabled={inCart}
                className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <ShoppingCart className="w-4 h-4" /> ซื้อราคาเต็ม (฿{gamecock.price.toLocaleString()})
              </button>
            </div>
          ) : (
            <div className="py-2.5 px-6 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs">
              {gamecock.status === 'SOLD'
                ? 'ไก่ตัวนี้ขายแล้ว'
                : gamecock.status === 'RESERVED'
                ? 'มีผู้จองแล้ว (กำลังรอชำระ)'
                : 'พ่อพันธุ์ประจำฟาร์ม (ไม่เปิดขาย)'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

