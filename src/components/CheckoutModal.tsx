'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, QrCode, Upload, CheckCircle2, Clock, ShieldCheck, Truck, Package } from 'lucide-react';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cart, createOrder } = useFarm();

  const [customerName, setCustomerName] = useState('เอกชัย นามสมมุติ');
  const [phone, setPhone] = useState('089-123-4567');
  const [address, setAddress] = useState('123 หมู่ 5 ต.หนองกี่ อ.กบินทร์บุรี จ.ปราจีนบุรี 25110');
  const [slipPreview, setSlipPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  );
  const [submitting, setSubmitting] = useState(false);

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

  const grandTotal = liveSubtotal + liveShipping + parcelSubtotal + parcelShipping;
  const hasDeposit = liveItems.some(i => i.isDeposit);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    setSubmitting(true);
    setTimeout(() => {
      const order = createOrder({
        customerName,
        phone,
        address,
        slipUrl: slipPreview || undefined,
        isDepositOnly: hasDeposit
      });
      setSubmitting(false);
      onOrderSuccess(order);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">ชำระเงินและแจ้งโอน (Checkout & Payment)</h2>
            <p className="text-xs text-slate-500">ระบบชำระเงินปลอดภัยผ่าน พร้อมเพย์ / บัญชีธนาคาร</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Summary Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              สรุปรายการสั่งซื้อที่แยกบิล (Split Package Summary)
            </h3>

            {liveItems.length > 0 && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between font-bold text-amber-900">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-600" /> บิลไก่มีชีวิต (จัดส่งรถตู้สัตว์เลี้ยง)
                  </span>
                  <span>฿{(liveSubtotal + liveShipping).toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-amber-800 flex justify-between">
                  <span>{liveItems.map(i => i.name).join(', ')}</span>
                  <span>รวมค่ารถตู้ ฿600</span>
                </div>
                {hasDeposit && (
                  <div className="text-[11px] font-bold text-red-600 flex items-center gap-1 pt-1 border-t border-amber-200">
                    <Clock className="w-3 h-3" /> ยอดนี้เป็นการวางมัดจำ 30% ล็อกสถานะติดจอง 48 ชม.
                  </div>
                )}
              </div>
            )}

            {parcelItems.length > 0 && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between font-bold text-blue-900">
                  <span className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-blue-600" /> บิลไข่เชื้อ & อุปกรณ์ (พัสดุกันกระแทก)
                  </span>
                  <span>฿{(parcelSubtotal + parcelShipping).toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-blue-800 flex justify-between">
                  <span>จำนวน {parcelItems.reduce((a, b) => a + b.quantity, 0)} ชิ้น</span>
                  <span>รวมค่าส่งพัสดุ ฿80</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700">ยอดรวมทั้งสิ้นที่ต้องโอน:</span>
              <span className="text-2xl font-black text-amber-600">฿{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              ข้อมูลผู้รับและที่อยู่จัดส่ง
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="เช่น สมชาย ใจดี"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">เบอร์โทรศัพท์ติดต่อ *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="เช่น 081-234-5678"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">
                ที่อยู่จัดส่ง / จุดนัดรับรถตู้ที่สะดวก *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="ระบุบ้านเลขที่ ตำบล อำเภอ จังหวัด หรือระบุจุดพักรถ/ปั๊มน้ำมันสำหรับรับไก่"
              />
            </div>
          </div>

          {/* Payment QR Section */}
          <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-3">
              <QrCode className="w-4 h-4 text-amber-600" /> สแกนชำระเงินผ่าน พร้อมเพย์ (PromptPay QR)
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* QR Mock */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0 flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=PROMPTPAY_CYBER_FARM_DEMO"
                  alt="PromptPay QR"
                  className="w-32 h-32"
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1">พร้อมเพย์มาตรฐาน</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 flex-1">
                <p>
                  <span className="text-slate-400">ชื่อบัญชี:</span>{' '}
                  <span className="font-bold">บจก. ไซเบอร์เกมค็อก ฟาร์ม</span>
                </p>
                <p>
                  <span className="text-slate-400">ธนาคาร:</span>{' '}
                  <span className="font-bold">กสิกรไทย (KBANK)</span>
                </p>
                <p>
                  <span className="text-slate-400">เลขที่บัญชี:</span>{' '}
                  <span className="font-mono font-bold text-sm text-slate-900">098-7-65432-1</span>
                </p>
                <p>
                  <span className="text-slate-400">ยอดที่ต้องโอน:</span>{' '}
                  <span className="font-black text-amber-600 text-base">฿{grandTotal.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Upload Slip Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-slate-500" /> แนบสลิปการโอนเงิน (Slip Upload)
            </label>

            <div className="flex items-center gap-3">
              <label className="py-2.5 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" /> เลือกรูปสลิป
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              {slipPreview && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>แนบสลิปเรียบร้อยแล้ว</span>
                </div>
              )}
            </div>

            {slipPreview && (
              <div className="mt-2 w-36 h-48 rounded-xl overflow-hidden border border-slate-300 relative shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slipPreview} alt="Slip Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-colors flex items-center gap-2"
            >
              {submitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการแจ้งชำระเงิน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

