'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Order, OrderStatus } from '../types';
import {
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Phone,
  Package
} from 'lucide-react';

export const AdminKanban: React.FC = () => {
  const { orders, updateOrderStatus, updateOrderLogistics } = useFarm();
  const [activeSlipOrder, setActiveSlipOrder] = useState<Order | null>(null);
  const [logisticsModalOrder, setLogisticsModalOrder] = useState<{
    order: Order;
    pkgIndex: number;
  } | null>(null);

  // Logistics form state
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const columns: { title: string; status: OrderStatus; badgeColor: string; bgCol: string }[] = [
    {
      title: 'รอยืนยันสลิป',
      status: 'PENDING_SLIP',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      bgCol: 'bg-amber-50/40'
    },
    {
      title: 'รอจัดส่ง',
      status: 'PENDING_SHIPMENT',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      bgCol: 'bg-blue-50/40'
    },
    {
      title: 'จัดส่งแล้ว (เดินทาง)',
      status: 'SHIPPED',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      bgCol: 'bg-purple-50/40'
    },
    {
      title: 'จัดส่งสำเร็จ',
      status: 'COMPLETED',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      bgCol: 'bg-emerald-50/40'
    }
  ];

  const getOrdersByStatus = (status: OrderStatus) => orders.filter(o => o.status === status);

  const openLogisticsModal = (order: Order, pkgIndex: number) => {
    const pkg = order.splitPackages[pkgIndex];
    setDriverName(pkg.logistics.driverName || '');
    setDriverPhone(pkg.logistics.driverPhone || '');
    setVehiclePlate(pkg.logistics.vehiclePlate || '');
    setMeetingPoint(pkg.logistics.meetingPoint || '');
    setTrackingNumber(pkg.logistics.trackingNumber || '');
    setLogisticsModalOrder({ order, pkgIndex });
  };

  const handleSaveLogistics = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logisticsModalOrder) return;
    const { order, pkgIndex } = logisticsModalOrder;
    updateOrderLogistics(order.id, pkgIndex, {
      driverName,
      driverPhone,
      vehiclePlate,
      meetingPoint,
      trackingNumber
    });
    setLogisticsModalOrder(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            📋 กระดานจัดการคำสั่งซื้อ (Order Kanban Board)
          </h2>
          <p className="text-xs text-slate-500">
            บริหารจัดการสถานะคำสั่งซื้อ ตรวจสอบสลิป และอัปเดตข้อมูลรถตู้/พัสดุ
          </p>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
          ทั้งหมด: {orders.length} รายการ
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(col => {
          const colOrders = getOrdersByStatus(col.status);
          return (
            <div
              key={col.status}
              className={`rounded-2xl border border-slate-200 p-3.5 flex flex-col min-h-[500px] ${col.bgCol}`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60">
                <span className="text-xs font-bold text-slate-800">{col.title}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${col.badgeColor}`}
                >
                  {colOrders.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colOrders.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">
                    ไม่มีคำสั่งซื้อในสถานะนี้
                  </div>
                ) : (
                  colOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                        <span className="text-[10px] text-slate-400">{order.createdAt}</span>
                      </div>

                      <div className="text-slate-700">
                        <p className="font-bold text-slate-900">{order.customerName}</p>
                        <p className="text-slate-500 text-[11px]">{order.phone}</p>
                      </div>

                      {/* Items preview */}
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1">
                        {order.splitPackages.map((pkg, i) => (
                          <div key={i} className="text-[11px] text-slate-600 flex items-center justify-between">
                            <span className="truncate max-w-[150px]">
                              {pkg.packageType === 'LIVE_ANIMAL' ? '🐓 ไก่มีชีวิต' : '📦 พัสดุ'} (
                              {pkg.items.length} รายการ)
                            </span>
                            <button
                              onClick={() => openLogisticsModal(order, i)}
                              className="text-amber-700 hover:text-amber-900 font-bold underline text-[10px]"
                            >
                              แก้ไขขนส่ง
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-[11px] text-slate-500">ยอดรวม:</span>
                        <span className="font-black text-amber-600 text-sm">
                          ฿{order.totalAmount.toLocaleString()}
                        </span>
                      </div>

                      {/* Slip preview button */}
                      {order.slipUrl && (
                        <button
                          onClick={() => setActiveSlipOrder(order)}
                          className="w-full py-1.5 px-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> ดูสลิปโอนเงิน
                        </button>
                      )}

                      {/* Status Transition buttons */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        {col.status === 'PENDING_SLIP' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'PENDING_SHIPMENT')}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                          >
                            <FileCheck className="w-3.5 h-3.5" /> อนุมัติสลิป ➔ รอจัดส่ง
                          </button>
                        )}

                        {col.status === 'PENDING_SHIPMENT' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'SHIPPED')}
                            className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" /> ขนส่งออกเดินทาง ➔ จัดส่งแล้ว
                          </button>
                        )}

                        {col.status === 'SHIPPED' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> ลูกค้ารับของแล้ว ➔ สำเร็จ
                          </button>
                        )}

                        {col.status === 'COMPLETED' && (
                          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 w-full justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" /> เสร็จสมบูรณ์
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slip Modal */}
      {activeSlipOrder && activeSlipOrder.slipUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                สลิปโอนเงิน #{activeSlipOrder.orderNumber}
              </h3>
              <button
                onClick={() => setActiveSlipOrder(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-3/4 w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSlipOrder.slipUrl}
                alt="Payment Slip"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex justify-between text-xs text-slate-600">
              <span>ยอดสั่งซื้อ: ฿{activeSlipOrder.totalAmount.toLocaleString()}</span>
              <span>อัปโหลดเมื่อ: {activeSlipOrder.slipUploadedAt || '-'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  updateOrderStatus(activeSlipOrder.id, 'CANCELLED');
                  setActiveSlipOrder(null);
                }}
                className="py-2 px-3 rounded-xl border border-rose-300 text-rose-700 font-bold text-xs hover:bg-rose-50"
              >
                ปฏิเสธสลิป
              </button>
              <button
                onClick={() => {
                  updateOrderStatus(activeSlipOrder.id, 'PENDING_SHIPMENT');
                  setActiveSlipOrder(null);
                }}
                className="py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
              >
                อนุมัติสลิปถูกต้อง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Logistics Modal */}
      {logisticsModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                อัปเดตข้อมูลการจัดส่ง #{logisticsModalOrder.order.orderNumber}
              </h3>
              <button
                onClick={() => setLogisticsModalOrder(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLogistics} className="space-y-3 text-xs">
              {logisticsModalOrder.order.splitPackages[logisticsModalOrder.pkgIndex].packageType ===
              'LIVE_ANIMAL' ? (
                <>
                  <div className="p-2 bg-amber-50 text-amber-900 rounded-lg font-bold">
                    🚚 ข้อมูลรถตู้สัตว์เลี้ยง / รถทัวร์
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">จุดนัดรับของลูกค้า</label>
                    <input
                      type="text"
                      value={meetingPoint}
                      onChange={e => setMeetingPoint(e.target.value)}
                      placeholder="เช่น ปั๊ม ปตท. มอเตอร์เวย์ ขาออก"
                      className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 block mb-1">ชื่อคนขับรถตู้</label>
                      <input
                        type="text"
                        value={driverName}
                        onChange={e => setDriverName(e.target.value)}
                        placeholder="เช่น ลุงสมชาย รถสายเหนือ"
                        className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 block mb-1">เบอร์โทรศัพท์คนขับ</label>
                      <input
                        type="text"
                        value={driverPhone}
                        onChange={e => setDriverPhone(e.target.value)}
                        placeholder="เช่น 089-xxx-xxxx"
                        className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">ทะเบียนรถตู้</label>
                    <input
                      type="text"
                      value={vehiclePlate}
                      onChange={e => setVehiclePlate(e.target.value)}
                      placeholder="เช่น ฮฮ-1234 กทม."
                      className="w-full p-2 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-blue-50 text-blue-900 rounded-lg font-bold">
                    📦 ข้อมูลพัสดุด่วน (ไข่เชื้อ/อุปกรณ์)
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">เลขพัสดุ (Tracking Number)</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={e => setTrackingNumber(e.target.value)}
                      placeholder="เช่น TH0123456789 หรือ EMS..."
                      className="w-full p-2 border border-slate-300 rounded-lg font-mono outline-none"
                    />
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLogisticsModalOrder(null)}
                  className="py-2 px-3 border border-slate-300 rounded-lg font-bold text-slate-600"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
                >
                  บันทึกข้อมูลจัดส่ง
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

