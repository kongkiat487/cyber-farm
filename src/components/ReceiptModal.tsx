'use client';

import React, { useRef } from 'react';
import { Order } from '../types';
import {
  X,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Package,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onOpenTracking?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  order,
  onOpenTracking
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const allItems = order.splitPackages.flatMap(pkg => pkg.items);
  const totalItemsCount = allItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalShippingFee = order.splitPackages.reduce((acc, curr) => acc + curr.shippingFee, 0);
  const rawItemsTotal = order.splitPackages.reduce((acc, curr) => acc + curr.subtotal, 0);

  const formattedDate = new Date(order.createdAt).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 flex flex-col justify-between">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-black text-sm">🧾 ใบเสร็จรับเงิน / ใบคำสั่งซื้อ</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
              #{order.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
              title="พิมพ์ใบเสร็จ / บันทึกเป็น PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div ref={receiptRef} className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white" id="printable-receipt">
          {/* Farm Header & Branding */}
          <div className="border-b-2 border-dashed border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                🐓
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                  CYBER GAMECOCK FARM
                </h1>
                <p className="text-[11px] text-slate-500 font-medium">
                  ฟาร์มเพาะพันธุ์ไก่ชนมาตรฐานสากล (ใบเสร็จรับเงินอิเล็กทรอนิกส์)
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  เลขประจำตัวผู้เสียภาษี: 0-1055-66012-34-5 • โทร 089-888-9999
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ชำระเงินเรียบร้อยแล้ว</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-900 mt-1">
                เลขที่: {order.orderNumber}
              </p>
              <p className="text-[11px] text-slate-500">
                วันที่: {formattedDate} น.
              </p>
            </div>
          </div>

          {/* Customer & Delivery Information Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> ข้อมูลผู้สั่งซื้อและการจัดส่ง
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">ชื่อลูกค้า:</span>
                <span className="font-bold text-slate-900 text-sm">{order.customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">เบอร์โทรศัพท์:</span>
                <span className="font-mono font-bold text-slate-900">{order.phone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px]">ที่อยู่จัดส่ง / จุดนัดรับรถตู้:</span>
                <span className="font-medium text-slate-800">{order.address}</span>
              </div>
            </div>
          </div>

          {/* Purchased Items Table (Smart Split Packages) */}
          <div className="space-y-3">
            <h3 className="font-black text-xs text-slate-900 flex items-center gap-1.5">
              <span>รายการสินค้า ({totalItemsCount} รายการ)</span>
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
              {order.splitPackages.map((pkg, idx) => (
                <div key={idx} className="p-3 bg-white space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold pb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      {pkg.packageType === 'LIVE_ANIMAL' ? (
                        <>
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          <span>บิลที่ {idx + 1}: ไก่มีชีวิต (รถตู้ติดแอร์)</span>
                        </>
                      ) : (
                        <>
                          <Package className="w-3.5 h-3.5 text-blue-600" />
                          <span>บิลที่ {idx + 1}: พัสดุด่วน (กล่องโฟมกันกระแทก)</span>
                        </>
                      )}
                    </span>
                    <span className="text-slate-500 text-[10px]">
                      ค่าส่ง ฿{pkg.shippingFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {pkg.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono text-[11px]">x{item.quantity}</span>
                          <div>
                            <span className="font-bold text-slate-900">{item.name}</span>
                            {item.isDeposit && (
                              <span className="block text-[10px] text-amber-600 font-bold">
                                (วางมัดจำ 30% ล็อกคิว 48 ชม.)
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                          ฿{((item.isDeposit && item.depositAmount ? item.depositAmount : item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary Calculation */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>ราคาสินค้ารวม</span>
              <span className="font-mono font-medium">฿{rawItemsTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>ค่าจัดส่งรวมทุกแพ็กเกจ</span>
              <span className="font-mono font-medium">฿{totalShippingFee.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
              <span>ยอดเงินรวมทั้งสิ้น (Total Paid)</span>
              <span className="text-base text-amber-600 font-mono font-black">
                ฿{order.totalAmount.toLocaleString()}
              </span>
            </div>

            {order.depositPaid && order.depositPaid > 0 && (
              <div className="text-[10px] text-amber-800 bg-amber-100/70 p-2 rounded-xl border border-amber-200/80">
                *หมายเหตุ: คำสั่งซื้อนี้เป็นยอดชำระมัดจำ ฿{order.depositPaid.toLocaleString()} บาท ส่วนที่เหลือชำระปลายทางกับคนขับรถตู้ในวันส่งมอบ
              </div>
            )}
          </div>

          {/* Verification & Trust Seal Footer */}
          <div className="pt-2 border-t border-slate-200 text-center space-y-1 text-slate-400 text-[10px]">
            <p className="flex items-center justify-center gap-1 text-slate-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              รับรองความถูกต้องโดยระบบ Cyber Gamecock Platform
            </p>
            <p>
              กรุณาเก็บใบเสร็จนี้ไว้เป็นหลักฐานเพื่อใช้ยืนยันตัวตนกับคนขับรถตู้ขนส่งและสำหรับเคลมประกันไข่เชื้อแตก
            </p>
          </div>
        </div>

        {/* Bottom Actions Bar (Hidden when printing) */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 print:hidden">
          {onOpenTracking ? (
            <button
              onClick={() => {
                onClose();
                onOpenTracking();
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4 text-amber-600" />
              <span>ติดตามสถานะจัดส่ง</span>
            </button>
          ) : <div />}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลด / บันทึกใบเสร็จ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
