'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, Search, Truck, Package, Phone, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Order } from '../types';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrder?: Order | null;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose, initialOrder }) => {
  const { orders } = useFarm();
  const [searchQuery, setSearchQuery] = useState(initialOrder?.orderNumber || '');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(initialOrder || (orders[0] || null));

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      o =>
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.phone.includes(searchQuery) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) setSelectedOrder(found);
  };

  const getStatusDisplay = (status: Order['status']) => {
    switch (status) {
      case 'PENDING_SLIP':
        return { label: 'รอแจ้งโอน / รอตรวจสอบสลิป', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'PENDING_SHIPMENT':
        return { label: 'ชำระแล้ว - กำลังเตรียมการจัดส่ง', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'SHIPPED':
        return { label: 'จัดส่งแล้ว (อยู่ระหว่างเดินทาง)', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'COMPLETED':
        return { label: 'จัดส่งสำเร็จเรียบร้อย', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'CANCELLED':
        return { label: 'ยกเลิกคำสั่งซื้อ', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" /> ติดตามสถานะคำสั่งซื้อและการจัดส่ง
            </h2>
            <p className="text-xs text-slate-500">ตรวจสอบตำแหน่งรถตู้สัตว์เลี้ยงและเลขพัสดุ</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ค้นหาด้วยเลขคำสั่งซื้อ (เช่น CF-ORD) หรือเบอร์โทรศัพท์"
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              ค้นหา
            </button>
          </form>

          {/* Quick chips of recent orders */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5">คำสั่งซื้อในระบบตัวอย่าง:</span>
            <div className="flex flex-wrap gap-1.5">
              {orders.slice(0, 4).map(o => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrder(o);
                    setSearchQuery(o.orderNumber);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    selectedOrder?.id === o.id
                      ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  #{o.orderNumber} ({o.customerName})
                </button>
              ))}
            </div>
          </div>

          {selectedOrder ? (
            <div className="space-y-4">
              {/* Status Header */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">เลขคำสั่งซื้อ</span>
                    <span className="text-sm font-mono font-black text-slate-900">
                      #{selectedOrder.orderNumber}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        getStatusDisplay(selectedOrder.status).color
                      }`}
                    >
                      {getStatusDisplay(selectedOrder.status).label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div>ผู้สั่งซื้อ: <span className="font-bold text-slate-800">{selectedOrder.customerName}</span></div>
                  <div>เบอร์โทร: <span className="font-bold text-slate-800">{selectedOrder.phone}</span></div>
                  <div className="col-span-2">
                    ที่อยู่ / จุดนัดรับ: <span className="font-bold text-slate-800">{selectedOrder.address}</span>
                  </div>
                </div>
              </div>

              {/* Split Packages Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  รายละเอียดการแยกพัสดุและขนส่ง (Split Packages)
                </h3>

                {selectedOrder.splitPackages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-3 ${
                      pkg.packageType === 'LIVE_ANIMAL'
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-blue-50/50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        {pkg.packageType === 'LIVE_ANIMAL' ? (
                          <>
                            <Truck className="w-4 h-4 text-amber-600" /> ขนส่งสัตว์เลี้ยงมีชีวิต (รถตู้ติดแอร์)
                          </>
                        ) : (
                          <>
                            <Package className="w-4 h-4 text-blue-600" /> ขนส่งพัสดุด่วน (กล่องโฟมกันกระแทก)
                          </>
                        )}
                      </span>
                      <span className="text-slate-500 font-mono">ค่าขนส่ง: ฿{pkg.shippingFee}</span>
                    </div>

                    {/* Items in package */}
                    <div className="space-y-1.5">
                      {pkg.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex justify-between text-xs text-slate-700">
                          <span>
                            • {item.name} x {item.quantity}
                          </span>
                          <span className="font-bold">฿{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                      {pkg.packageType === 'LIVE_ANIMAL' ? (
                        <>
                          <div className="flex items-center gap-2 text-slate-800">
                            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                            <span>
                              <span className="text-slate-400">จุดนัดรับ:</span>{' '}
                              <span className="font-bold">{pkg.logistics.meetingPoint || 'รอแจ้งจุดนัด'}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-800">
                            <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>
                              <span className="text-slate-400">คนขับ / ทะเบียนรถ:</span>{' '}
                              <span className="font-bold">
                                {pkg.logistics.driverName || 'รอจัดสรร'} ({pkg.logistics.vehiclePlate || '-'})
                              </span>
                            </span>
                          </div>
                          {pkg.logistics.driverPhone && pkg.logistics.driverPhone !== '-' && (
                            <div className="flex items-center gap-2 text-slate-800">
                              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>
                                <span className="text-slate-400">เบอร์โทรคนขับ:</span>{' '}
                                <a
                                  href={`tel:${pkg.logistics.driverPhone}`}
                                  className="font-bold text-blue-600 hover:underline"
                                >
                                  {pkg.logistics.driverPhone}
                                </a>
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-slate-800">
                            <Package className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>
                              <span className="text-slate-400">ผู้ให้บริการ:</span>{' '}
                              <span className="font-bold">{pkg.logistics.courierName || 'Flash / EMS'}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-800">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              <span className="text-slate-400">เลขพัสดุ (Tracking):</span>{' '}
                              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                {pkg.logistics.trackingNumber || 'รอแอดมินอัปเดต'}
                              </span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              ไม่พบคำสั่งซื้อที่ค้นหา กรุณาตรวจสอบเลขคำสั่งซื้ออีกครั้ง
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

