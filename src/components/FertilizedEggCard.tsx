'use client';

import React, { useState } from 'react';
import { FertilizedEgg, EggPriceTier } from '../types';
import { ShieldCheck, Play, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface FertilizedEggCardProps {
  egg: FertilizedEgg;
}

export const FertilizedEggCard: React.FC<FertilizedEggCardProps> = ({ egg }) => {
  const { addToCart } = useFarm();
  const [selectedTier, setSelectedTier] = useState<EggPriceTier>(egg.priceTiers[1] || egg.priceTiers[0]);
  const [acceptedWarranty, setAcceptedWarranty] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const quotaPercent = Math.round((egg.remainingQuota / egg.weeklyQuota) * 100);
  const isOutOfStock = egg.remainingQuota <= 0;

  const handleAddToCart = () => {
    if (!acceptedWarranty || isOutOfStock) return;

    addToCart({
      productId: egg.id,
      name: `${egg.name} (${selectedTier.label})`,
      code: egg.code,
      type: 'FERTILIZED_EGG',
      price: selectedTier.price,
      quantity: 1,
      imageUrl: egg.imageUrl,
      tierInfo: selectedTier
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Top Media Section */}
      <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={egg.imageUrl}
          alt={egg.name}
          className="w-full h-full object-cover"
        />

        {/* Quota Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          โควตาสัปดาห์นี้: {egg.remainingQuota}/{egg.weeklyQuota} ฟอง
        </div>

        {/* Video button if available */}
        {egg.sireVideoUrl && (
          <button
            onClick={() => setShowVideoModal(true)}
            className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md transition-colors"
          >
            <Play className="w-3 h-3 fill-white" /> คลิปพ่อพันธุ์เตะ
          </button>
        )}

        {/* Sire & Dam overlay miniatures */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/60 backdrop-blur-xs p-2 rounded-xl text-white text-xs border border-white/10">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={egg.sireImageUrl} alt="Sire" className="w-7 h-7 rounded-full object-cover border border-amber-400" />
            <span className="truncate max-w-[130px] text-[11px] font-bold">พ่อ: {egg.sireName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[130px] text-[11px] font-bold">แม่: {egg.damName}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={egg.damImageUrl} alt="Dam" className="w-7 h-7 rounded-full object-cover border border-rose-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900">{egg.name}</h3>
          </div>
          <p className="text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-800">สายเลือดคู่ผสม:</span> {egg.breedCombo}
          </p>

          {/* Quota Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 text-[11px]">สถานะโควตาพร้อมจัดส่งสัปดาห์นี้</span>
              <span className="font-bold text-amber-600 text-[11px]">เหลือ {egg.remainingQuota} ฟอง</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  quotaPercent < 30 ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, quotaPercent)}%` }}
              />
            </div>
          </div>

          {/* Tier Selection Buttons */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              เลือกขนาดเซ็ตไข่เชื้อ (Tier Pricing):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {egg.priceTiers.map(tier => (
                <button
                  key={tier.quantity}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`p-2 rounded-xl text-left border text-xs transition-all ${
                    selectedTier.quantity === tier.quantity
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400 text-slate-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="text-[11px] text-slate-500">{tier.quantity} ฟอง</div>
                  <div className="font-extrabold text-amber-600 text-xs">฿{tier.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Warranty Checkbox & Terms */}
        <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl text-xs space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold">เงื่อนไขการรับประกัน:</span> {egg.warrantyTerms}
            </p>
          </div>

          <label className="flex items-center gap-2 pt-1 border-t border-amber-200/60 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptedWarranty}
              onChange={e => setAcceptedWarranty(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <span className="text-[11px] font-bold text-slate-800">
              ข้าพเจ้ายอมรับเงื่อนไขการเคลมไข่เชื้อก่อนสั่งซื้อ
            </span>
          </label>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleAddToCart}
            disabled={!acceptedWarranty || isOutOfStock}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : !acceptedWarranty
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isOutOfStock
                ? 'bg-rose-100 text-rose-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4" /> เพิ่มลงตะกร้าแล้ว!
              </>
            ) : !acceptedWarranty ? (
              <>
                <AlertCircle className="w-4 h-4" /> ติ๊กยอมรับเงื่อนไขก่อนสั่งซื้อ
              </>
            ) : isOutOfStock ? (
              'โควตาสัปดาห์นี้หมดแล้ว'
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> เพิ่มลงตะกร้า • ฿{selectedTier.price.toLocaleString()}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && egg.sireVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-slate-900">คลิปเตะเป้าพ่อพันธุ์: {egg.sireName}</h4>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕ ปิด
              </button>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={egg.sireVideoUrl}
                title={egg.sireName}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

