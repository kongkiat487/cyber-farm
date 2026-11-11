'use client';

import React from 'react';
import { useFarm } from '../context/FarmContext';
import { TrendingUp, Award, DollarSign, PieChart, Users } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { orders } = useFarm();

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  // Top Earning Breeders mock data
  const topBreeders = [
    {
      name: 'เจ้านินจาดำ (ยอดม้าล่อเงินล้าน)',
      code: 'SIRE-009',
      breed: 'พม่ารำวงแท้',
      totalRevenue: '฿1,450,000',
      clutches: 18,
      sireOffspringsWon: '85%'
    },
    {
      name: 'เจ้าแสนชัย (ป่าก๋อยร้อยเหลี่ยม)',
      code: 'SIRE-015',
      breed: 'ป่าก๋อยสายตรงลำพูน',
      totalRevenue: '฿980,000',
      clutches: 14,
      sireOffspringsWon: '78%'
    },
    {
      name: 'เจ้าพญาอินทรี',
      code: 'SIRE-022',
      breed: 'เชิงไทยตราดแท้',
      totalRevenue: '฿640,000',
      clutches: 9,
      sireOffspringsWon: '70%'
    }
  ];

  // Top Selling Breeds
  const topBreeds = [
    { name: 'พม่ารำวงลูกผสม', percentage: 48, revenue: '฿1,850,000' },
    { name: 'ป่าก๋อยพัฒนา', percentage: 32, revenue: '฿1,230,000' },
    { name: 'เชิงไทยดั้งเดิม (ตราด/พนัส)', percentage: 20, revenue: '฿770,000' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          📊 รายงานเชิงวิเคราะห์และยอดขาย (Farm Data Analytics)
        </h2>
        <p className="text-xs text-slate-500">
          วิเคราะห์รายได้ ยอดขายแยกประเภท สถิติสายพันธุ์ และอันดับพ่อพันธุ์ทำเงิน
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-emerald-600" /> ยอดคำสั่งซื้อสะสม
          </span>
          <p className="text-2xl font-black text-slate-900">฿{totalRevenue.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-600 font-bold">↑ +14.8% จากเดือนก่อน</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-amber-600" /> ยอดขายไข่เชื้อสัปดาห์นี้
          </span>
          <p className="text-2xl font-black text-amber-600">38 ฟอง</p>
          <span className="text-[11px] text-slate-500">คิดเป็น 82% ของโควตารวม</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Award className="w-4 h-4 text-purple-600" /> พ่อพันธุ์อันดับ 1
          </span>
          <p className="text-lg font-black text-slate-900 truncate">เจ้านินจาดำ</p>
          <span className="text-[11px] text-purple-700 font-bold">สร้างรายได้ ฿1.45M</span>
        </div>
      </div>

      {/* Revenue Split Chart Simulation */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-amber-600" /> สัดส่วนรายได้ตามประเภทสินค้า (Revenue by Category)
        </h3>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-slate-700">🐓 ไก่ชนมีชีวิต (Live Gamecock)</span>
              <span className="font-bold text-amber-600">68% (฿2,618,000)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-amber-500 h-3 rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-slate-700">🥚 ไข่เชื้อพร้อมจัดส่ง (Fertilized Eggs)</span>
              <span className="font-bold text-emerald-600">24% (฿924,000)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-slate-700">💊 เวชภัณฑ์และอุปกรณ์ (Supplies)</span>
              <span className="font-bold text-blue-600">8% (฿308,000)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '8%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Earning Breeders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            🏆 อันดับ "พ่อ-แม่พันธุ์ทำเงินสูงสุด" (Top Earning Breeders)
          </h3>
          <p className="text-xs text-slate-500">
            คำนวณจากยอดขายลูกไก่และยอดจำหน่ายไข่เชื้อย้อนหลัง
          </p>
        </div>

        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-100/70 text-slate-700 font-bold border-b border-slate-200 text-[10px] uppercase">
            <tr>
              <th className="p-3">อันดับ / รหัส</th>
              <th className="p-3">ชื่อพ่อพันธุ์</th>
              <th className="p-3">สายพันธุ์</th>
              <th className="p-3">จำนวนคอก/ชุด</th>
              <th className="p-3">อัตราการชนชนะของลูก</th>
              <th className="p-3 text-right">รายได้รวมที่สร้าง</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {topBreeders.map((breeder, index) => (
              <tr key={breeder.code} className="hover:bg-slate-50">
                <td className="p-3">
                  <span
                    className={`font-black text-xs px-2 py-0.5 rounded-full ${
                      index === 0
                        ? 'bg-amber-400 text-amber-950'
                        : index === 1
                        ? 'bg-slate-300 text-slate-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 ml-2">{breeder.code}</span>
                </td>
                <td className="p-3 font-bold text-slate-900">{breeder.name}</td>
                <td className="p-3">{breeder.breed}</td>
                <td className="p-3">{breeder.clutches} ชุด</td>
                <td className="p-3 text-emerald-600 font-bold">{breeder.sireOffspringsWon}</td>
                <td className="p-3 text-right font-black text-amber-600 text-sm">
                  {breeder.totalRevenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Selling Breeds */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {topBreeds.map(b => (
          <div key={b.name} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-800 block mb-1">{b.name}</span>
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-black text-amber-600">{b.percentage}%</span>
              <span className="text-xs text-slate-500">{b.revenue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

