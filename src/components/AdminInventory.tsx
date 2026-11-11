'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import {
  AlertTriangle,
  Plus,
  Package,
  Edit,
  Check,
  X,
  PlusCircle,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { SupplyEquipment, Gamecock, GamecockStatus, SupplyCategory } from '../types';

export const AdminInventory: React.FC = () => {
  const {
    gamecocks,
    eggs,
    equipment,
    updateEquipmentStock,
    addNewGamecock,
    addNewSupply,
    updateEggQuota,
    updateGamecockStatus
  } = useFarm();

  const [activeTab, setActiveTab] = useState<'COCKS' | 'EGGS' | 'SUPPLIES'>('COCKS');
  const [editingSupplyId, setEditingSupplyId] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState<number>(0);

  // Modal States
  const [showAddCockModal, setShowAddCockModal] = useState(false);
  const [showAddSupplyModal, setShowAddSupplyModal] = useState(false);

  // New Gamecock Form State
  const [cockName, setCockName] = useState('');
  const [cockCode, setCockCode] = useState(`CF-${Math.floor(100 + Math.random() * 900)}`);
  const [cockBreed, setCockBreed] = useState('พม่ารำวงลูกผสม');
  const [cockWeight, setCockWeight] = useState(2.8);
  const [cockAge, setCockAge] = useState(10);
  const [cockPrice, setCockPrice] = useState(25000);
  const [cockStyle, setCockStyle] = useState('ม้าล่อสปีด แข้งเปล่าคม ตีลำหัก');
  const [cockTags, setCockTags] = useState('ดาวรุ่ง,ไก่หนุ่มคัดผ่าน');
  const [cockImageUrl, setCockImageUrl] = useState(
    'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'
  );

  // New Supply Form State
  const [supplyName, setSupplyName] = useState('');
  const [supplySku, setSupplySku] = useState(`SUP-${Math.floor(100 + Math.random() * 900)}`);
  const [supplyCategory, setSupplyCategory] = useState<SupplyCategory>('MEDICINE');
  const [supplyPrice, setSupplyPrice] = useState(350);
  const [supplyStock, setSupplyStock] = useState(20);
  const [supplyMinAlert, setSupplyMinAlert] = useState(5);
  const [supplyUnit, setSupplyUnit] = useState('ขวด');
  const [supplyDesc, setSupplyDesc] = useState('');
  const [supplyImageUrl, setSupplyImageUrl] = useState(
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  );

  const startEdit = (supply: SupplyEquipment) => {
    setEditingSupplyId(supply.id);
    setStockInput(supply.stock);
  };

  const saveEdit = (supplyId: string) => {
    updateEquipmentStock(supplyId, stockInput);
    setEditingSupplyId(null);
  };

  const quickAddStock = (supplyId: string, currentStock: number, delta: number) => {
    updateEquipmentStock(supplyId, Math.max(0, currentStock + delta));
  };

  const handleCreateGamecock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cockName || !cockCode) return;

    const newCock: Gamecock = {
      id: `gc-${Date.now()}`,
      code: cockCode,
      name: cockName,
      breed: cockBreed,
      sex: 'MALE',
      ageMonths: Number(cockAge),
      weightKg: Number(cockWeight),
      fightingStyle: cockStyle,
      winRecords: {
        wins: 1,
        draws: 0,
        losses: 0,
        details: ['ชนะน็อคคู่ซ้อมคัดเกรดไฟต์เปิดตัว']
      },
      price: Number(cockPrice),
      status: 'AVAILABLE',
      tags: cockTags.split(',').map(t => t.trim()),
      imageUrl: cockImageUrl,
      galleryImages: [cockImageUrl],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      depositPercentage: 30,
      pedigree: {
        father: {
          id: `ped-f-${Date.now()}`,
          name: 'ยอดพ่อพันธุ์สายหลัก',
          code: 'SIRE-MAIN',
          role: 'FATHER',
          breed: cockBreed,
          wins: 5,
          imageUrl: cockImageUrl
        },
        mother: {
          id: `ped-m-${Date.now()}`,
          name: 'แม่พันธุ์โครงสร้างใหญ่',
          code: 'DAM-MAIN',
          role: 'MOTHER',
          breed: cockBreed,
          imageUrl: cockImageUrl
        },
        paternalGrandSire: {
          id: 'pgs',
          name: 'ปู่แสนเชิง',
          code: 'PGS-01',
          role: 'PATERNAL_GRANDSIRE',
          breed: cockBreed,
          imageUrl: cockImageUrl
        },
        paternalGrandDam: {
          id: 'pgd',
          name: 'ย่าเพชร',
          code: 'PGD-01',
          role: 'PATERNAL_GRANDDAM',
          breed: cockBreed,
          imageUrl: cockImageUrl
        },
        maternalGrandSire: {
          id: 'mgs',
          name: 'ตาสิงห์',
          code: 'MGS-01',
          role: 'MATERNAL_GRANDSIRE',
          breed: cockBreed,
          imageUrl: cockImageUrl
        },
        maternalGrandDam: {
          id: 'mgd',
          name: 'ยายทอง',
          code: 'MGD-01',
          role: 'MATERNAL_GRANDDAM',
          breed: cockBreed,
          imageUrl: cockImageUrl
        }
      }
    };

    addNewGamecock(newCock);
    setShowAddCockModal(false);
    // Reset form
    setCockName('');
    setCockCode(`CF-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleCreateSupply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplyName || !supplySku) return;

    const catName =
      supplyCategory === 'MEDICINE'
        ? 'เวชภัณฑ์ยารักษา'
        : supplyCategory === 'TRAINING'
        ? 'อุปกรณ์ซ้อม'
        : 'อุปกรณ์เลี้ยงดู';

    const newSupply: SupplyEquipment = {
      id: `eq-${Date.now()}`,
      sku: supplySku,
      name: supplyName,
      category: supplyCategory,
      categoryName: catName,
      price: Number(supplyPrice),
      stock: Number(supplyStock),
      minStockAlert: Number(supplyMinAlert),
      unit: supplyUnit,
      imageUrl: supplyImageUrl,
      description: supplyDesc || 'สินค้าเวชภัณฑ์และอุปกรณ์ดูแลไก่ชนมาตรฐานฟาร์ม'
    };

    addNewSupply(newSupply);
    setShowAddSupplyModal(false);
    // Reset form
    setSupplyName('');
    setSupplySku(`SUP-${Math.floor(100 + Math.random() * 900)}`);
  };

  const lowStockCount = equipment.filter(e => e.stock <= e.minStockAlert).length;

  return (
    <div className="space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            📦 จัดการสต๊อกสินค้าและโควตา (Stock & Inventory)
          </h2>
          <p className="text-xs text-slate-500">
            เติมสต๊อกสินค้า ปรับโควตาไข่เชื้อ และเพิ่มสินค้าตัวใหม่เข้าสู่ระบบ
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'COCKS' && (
            <button
              onClick={() => setShowAddCockModal(true)}
              className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> เพิ่มไก่ชนเข้าฟาร์ม
            </button>
          )}

          {activeTab === 'SUPPLIES' && (
            <button
              onClick={() => setShowAddSupplyModal(true)}
              className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> เพิ่มสินค้า/เวชภัณฑ์ใหม่
            </button>
          )}

          {lowStockCount > 0 && (
            <div className="bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              ใกล้หมด {lowStockCount}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('COCKS')}
          className={`py-2 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'COCKS'
              ? 'border-amber-600 text-amber-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          🐓 ไก่มีชีวิต ({gamecocks.length})
        </button>
        <button
          onClick={() => setActiveTab('EGGS')}
          className={`py-2 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'EGGS'
              ? 'border-amber-600 text-amber-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          🥚 โควตาไข่เชื้อ ({eggs.length} คู่ผสม)
        </button>
        <button
          onClick={() => setActiveTab('SUPPLIES')}
          className={`py-2 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1 cursor-pointer ${
            activeTab === 'SUPPLIES'
              ? 'border-amber-600 text-amber-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          💊 เวชภัณฑ์และอุปกรณ์ ({equipment.length})
          {lowStockCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-500" />}
        </button>
      </div>

      {/* 1. COCKS TAB */}
      {activeTab === 'COCKS' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="p-3">รหัส/ชื่อไก่</th>
                  <th className="p-3">สายพันธุ์</th>
                  <th className="p-3">สถิติ/เชิงชน</th>
                  <th className="p-3">ราคาจำหน่าย</th>
                  <th className="p-3">เปลี่ยนสถานะสต๊อก</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gamecocks.map(cock => (
                  <tr key={cock.id} className="hover:bg-slate-50/60">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cock.imageUrl}
                          alt={cock.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 block">{cock.code}</span>
                          <span className="font-bold text-slate-900">{cock.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{cock.breed}</td>
                    <td className="p-3">
                      <span className="text-amber-700 font-bold">ชนะ {cock.winRecords.wins} ไฟต์</span>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{cock.fightingStyle}</p>
                    </td>
                    <td className="p-3 font-black text-amber-600">฿{cock.price.toLocaleString()}</td>
                    <td className="p-3">
                      {/* Interactive Status Changer */}
                      <select
                        value={cock.status}
                        onChange={e => updateGamecockStatus(cock.id, e.target.value as GamecockStatus)}
                        className={`py-1 px-2.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                          cock.status === 'AVAILABLE'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : cock.status === 'RESERVED'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : cock.status === 'SOLD'
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-purple-50 text-purple-800 border-purple-300'
                        }`}
                      >
                        <option value="AVAILABLE">พร้อมขาย</option>
                        <option value="RESERVED">ติดจอง</option>
                        <option value="SOLD">ขายแล้ว</option>
                        <option value="BREEDER">พ่อพันธุ์หลัก</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. EGGS TAB */}
      {activeTab === 'EGGS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eggs.map(egg => (
            <div key={egg.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">{egg.code}</span>
                  <h3 className="text-sm font-bold text-slate-900">{egg.name}</h3>
                  <p className="text-xs text-slate-500">{egg.breedCombo}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600 block">
                    เหลือ {egg.remainingQuota}/{egg.weeklyQuota} ฟอง
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (egg.remainingQuota / egg.weeklyQuota) * 100)}%` }}
                />
              </div>

              {/* Quick replenishment buttons for farm owner */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">เติมโควตาไข่สัปดาห์นี้:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateEggQuota(egg.id, 5)}
                    className="py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-[11px] hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    +5 ฟอง
                  </button>
                  <button
                    onClick={() => updateEggQuota(egg.id, 10)}
                    className="py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-[11px] hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    +10 ฟอง
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. SUPPLIES TAB WITH QUICK RESTOCK & EDIT */}
      {activeTab === 'SUPPLIES' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="p-3">สินค้า / รหัส SKU</th>
                <th className="p-3">หมวดหมู่</th>
                <th className="p-3">ราคา</th>
                <th className="p-3">สต๊อกปัจจุบัน</th>
                <th className="p-3">เติมสต๊อกด่วน</th>
                <th className="p-3 text-right">แก้ไขตัวเลข</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipment.map(item => {
                const isLow = item.stock <= item.minStockAlert;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <span className="font-mono text-[10px] text-slate-400 block">{item.sku}</span>
                          <span className="font-bold text-slate-900">{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{item.categoryName}</td>
                    <td className="p-3 font-bold text-slate-900">฿{item.price}</td>
                    <td className="p-3">
                      {editingSupplyId === item.id ? (
                        <input
                          type="number"
                          value={stockInput}
                          onChange={e => setStockInput(Number(e.target.value))}
                          className="w-20 px-2 py-1 border border-amber-400 rounded-lg text-xs outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold text-sm ${
                              isLow ? 'text-rose-600' : 'text-slate-800'
                            }`}
                          >
                            {item.stock} {item.unit}
                          </span>
                          {isLow && (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded animate-pulse">
                              เตือนใกล้หมด!
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Quick Restock Buttons (+5, +10, +20) */}
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => quickAddStock(item.id, item.stock, 5)}
                          title="เติม 5 ชิ้น"
                          className="py-1 px-2 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => quickAddStock(item.id, item.stock, 10)}
                          title="เติม 10 ชิ้น"
                          className="py-1 px-2 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => quickAddStock(item.id, item.stock, 25)}
                          title="เติม 25 ชิ้น"
                          className="py-1 px-2 rounded-md bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          +25
                        </button>
                      </div>
                    </td>

                    {/* Manual Edit Action */}
                    <td className="p-3 text-right">
                      {editingSupplyId === item.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingSupplyId(null)}
                            className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(item)}
                          className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Edit className="w-3 h-3" /> แก้ไขสต๊อก
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL 1: ADD NEW GAMECOCK */}
      {showAddCockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                🐓 เพิ่มไก่ชนใหม่เข้าฟาร์ม (Add Gamecock)
              </h3>
              <button
                onClick={() => setShowAddCockModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGamecock} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">รหัสไก่ *</label>
                  <input
                    type="text"
                    required
                    value={cockCode}
                    onChange={e => setCockCode(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">ชื่อไก่ *</label>
                  <input
                    type="text"
                    required
                    value={cockName}
                    onChange={e => setCockName(e.target.value)}
                    placeholder="เช่น เจ้าเพชรฆาต"
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">สายพันธุ์</label>
                  <select
                    value={cockBreed}
                    onChange={e => setCockBreed(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  >
                    <option value="พม่ารำวงลูกผสม">พม่ารำวง</option>
                    <option value="ป่าก๋อยพัฒนา">ป่าก๋อยพัฒนา</option>
                    <option value="เชิงไทยดั้งเดิม (ตราด)">เชิงไทยดั้งเดิม</option>
                    <option value="พม่า+ก๋อย">พม่า+ก๋อย</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">น้ำหนัก (กก.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={cockWeight}
                    onChange={e => setCockWeight(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">อายุ (เดือน)</label>
                  <input
                    type="number"
                    value={cockAge}
                    onChange={e => setCockAge(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">ราคาจำหน่ายสด (บาท) *</label>
                <input
                  type="number"
                  required
                  step="1000"
                  value={cockPrice}
                  onChange={e => setCockPrice(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold font-mono text-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">เชิงชน / ลีลาการตี</label>
                <input
                  type="text"
                  value={cockStyle}
                  onChange={e => setCockStyle(e.target.value)}
                  placeholder="เช่น ม้าล่อสปีด แข้งเปล่าจัด"
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">ป้ายกำกับ (คั่นด้วยจุลภาค)</label>
                <input
                  type="text"
                  value={cockTags}
                  onChange={e => setCockTags(e.target.value)}
                  placeholder="เช่น ดาวรุ่ง,แชมป์เปี้ยน,ไก่หนุ่มคัดผ่าน"
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">ลิงก์รูปภาพ (Image URL)</label>
                <input
                  type="url"
                  value={cockImageUrl}
                  onChange={e => setCockImageUrl(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCockModal(false)}
                  className="py-2 px-3 border border-slate-300 rounded-xl text-slate-600 font-bold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl cursor-pointer"
                >
                  บันทึกเข้าสู่สต๊อก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW SUPPLY */}
      {showAddSupplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                💊 เพิ่มสินค้า/เวชภัณฑ์ใหม่ (Add Supply Product)
              </h3>
              <button
                onClick={() => setShowAddSupplyModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSupply} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">รหัส SKU *</label>
                  <input
                    type="text"
                    required
                    value={supplySku}
                    onChange={e => setSupplySku(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">หมวดหมู่</label>
                  <select
                    value={supplyCategory}
                    onChange={e => setSupplyCategory(e.target.value as SupplyCategory)}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  >
                    <option value="MEDICINE">เวชภัณฑ์ยารักษา</option>
                    <option value="TRAINING">อุปกรณ์ซ้อม</option>
                    <option value="FARM_TOOLS">อุปกรณ์เลี้ยงดู</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">ชื่อสินค้า/ยา *</label>
                <input
                  type="text"
                  required
                  value={supplyName}
                  onChange={e => setSupplyName(e.target.value)}
                  placeholder="เช่น ยาบำรุงกำลังสูตรเข้มข้น"
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    value={supplyPrice}
                    onChange={e => setSupplyPrice(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none font-bold text-amber-600"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">จำนวนสต๊อกเริ่มต้น</label>
                  <input
                    type="number"
                    required
                    value={supplyStock}
                    onChange={e => setSupplyStock(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">หน่วยนับ</label>
                  <input
                    type="text"
                    value={supplyUnit}
                    onChange={e => setSupplyUnit(e.target.value)}
                    placeholder="ขวด/ชิ้น/กระปุก"
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">เกณฑ์แจ้งเตือนสต๊อกใกล้หมด</label>
                <input
                  type="number"
                  value={supplyMinAlert}
                  onChange={e => setSupplyMinAlert(Number(e.target.value))}
                  placeholder="เช่น 5"
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">คำอธิบายสินค้า</label>
                <textarea
                  rows={2}
                  value={supplyDesc}
                  onChange={e => setSupplyDesc(e.target.value)}
                  placeholder="สรรพคุณ หรือคุณสมบัติการใช้งาน"
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">ลิงก์รูปภาพ (Image URL)</label>
                <input
                  type="url"
                  value={supplyImageUrl}
                  onChange={e => setSupplyImageUrl(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl outline-none text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSupplyModal(false)}
                  className="py-2 px-3 border border-slate-300 rounded-xl text-slate-600 font-bold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl cursor-pointer"
                >
                  เพิ่มสินค้าลงระบบ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
