'use client';

import React from 'react';
import { useFarm } from '../context/FarmContext';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, Package, ShieldAlert, Award } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, role, currentMember } = useFarm();

  if (!isOpen) return null;

  const liveItems = cart.filter(c => c.type === 'LIVE_GAMECOCK');
  const parcelItems = cart.filter(c => c.type === 'FERTILIZED_EGG' || c.type === 'EQUIPMENT');

  const liveSubtotal = liveItems.reduce((acc, curr) => {
    const p = curr.isDeposit && curr.depositAmount ? curr.depositAmount : curr.price;
    return acc + p * curr.quantity;
  }, 0);
  const liveShipping = liveItems.length > 0 ? 600 : 0;

  const parcelSubtotal = parcelItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const parcelShipping = parcelItems.length > 0 ? 80 : 0;

  const rawSubtotal = liveSubtotal + parcelSubtotal;
  const isMember = role === 'MEMBER';
  const memberDiscount = isMember ? Math.round(rawSubtotal * 0.05) : 0;

  const grandTotal = Math.max(0, liveSubtotal + liveShipping + parcelSubtotal + parcelShipping - memberDiscount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              ตะกร้าสินค้า (Smart Split Cart)
            </h2>
            <p className="text-xs text-slate-500">ระบบแยกประเภทบิลและการขนส่งอัตโนมัติ</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Package className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-medium">ยังไม่มีสินค้าในตะกร้า</p>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-bold text-amber-600 hover:underline"
              >
                เลือกชมสินค้าในฟาร์ม
              </button>
            </div>
          ) : (
            <>
              {/* Split Group 1: Live Gamecock */}
              {liveItems.length > 0 && (
                <div className="border border-amber-200 rounded-2xl p-3.5 bg-amber-50/40 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200 text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-600" /> บิลที่ 1: ไก่ชนมีชีวิต (รถตู้สัตว์เลี้ยง)
                    </span>
                    <span className="text-[11px] bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full">
                      ค่าส่ง ฿600
                    </span>
                  </div>

                  {liveItems.map(item => (
                    <div key={item.id} className="flex gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className="text-[10px] text-slate-500 font-mono">
                            ราคาเต็ม: ฿{item.price.toLocaleString()}
                          </span>
                          {item.isDeposit && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                              วางมัดจำ 30% (฿{item.depositAmount?.toLocaleString()})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block leading-none">ยอดชำระตอนนี้:</span>
                            <span className="text-xs font-black text-amber-600 font-mono">
                              ฿{(item.isDeposit && item.depositAmount ? item.depositAmount : item.price).toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Split Group 2: Fertilized Eggs & Supplies */}
              {parcelItems.length > 0 && (
                <div className="border border-blue-200 rounded-2xl p-3.5 bg-blue-50/40 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-200 text-xs font-bold text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-blue-600" /> บิลที่ 2: ไข่เชื้อ & อุปกรณ์ (พัสดุด่วน EMS/Flash)
                    </span>
                    <span className="text-[11px] bg-blue-200/70 text-blue-900 px-2 py-0.5 rounded-full">
                      ค่าส่ง ฿80
                    </span>
                  </div>

                  {parcelItems.map(item => (
                    <div key={item.id} className="flex gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                        <span className="text-[10px] text-slate-500 block">฿{item.price.toLocaleString()}</span>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity control */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="px-2 py-0.5 hover:bg-slate-200 text-slate-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="px-2 py-0.5 hover:bg-slate-200 text-slate-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Explanatory banner */}
              {liveItems.length > 0 && parcelItems.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2 text-amber-900 text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <p>
                    <span className="font-bold">หมายเหตุการแยกบิล:</span> เนื่องจากไก่มีชีวิตต้องจัดส่งด้วยรถตู้สัตว์เลี้ยง
                    ส่วนไข่เชื้อและอุปกรณ์จะบรรจุกล่องโฟมกันกระแทกส่งพัสดุ ทั้งสองส่วนจึงแยกค่าส่งและเลขติดตามพัสดุ
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>ยอดรวมสินค้า (คำนวณตามเงื่อนไขมัดจำ 30%)</span>
                <span className="font-mono">฿{(liveSubtotal + parcelSubtotal).toLocaleString()}</span>
              </div>
              {liveItems.some(i => i.isDeposit) && (
                <div className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200 leading-relaxed">
                  💡 <strong>ไก่ชนมีชีวิต/ประมูล:</strong> ระบบคำนวณยอดชำระมัดจำ <strong>30%</strong> เพื่อล็อกสถานะไก่และจองคิวรถตู้ติดแอร์ ส่วนที่เหลือ 70% ชำระกับคนขับในวันรับมอบ
                </div>
              )}
              {isMember && memberDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg font-bold border border-emerald-200">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" /> ส่วนลดสมาชิก Member 5% ({currentMember?.memberTier || 'VIP'})
                  </span>
                  <span>-฿{memberDiscount.toLocaleString()}</span>
                </div>
              )}
              {liveItems.length > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>ค่าจัดส่งรถตู้สัตว์เลี้ยง</span>
                  <span>฿600</span>
                </div>
              )}
              {parcelItems.length > 0 && (
                <div className="flex justify-between text-blue-700">
                  <span>ค่าจัดส่งพัสดุด่วน (กล่องโฟมกันกระแทก)</span>
                  <span>฿80</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>ยอดรวมที่ต้องชำระทั้งสิ้น</span>
                <span className="text-amber-600 text-base">฿{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              ดำเนินการสั่งซื้อ / ชำระเงิน <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
            >
              ล้างตะกร้าสินค้าทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

