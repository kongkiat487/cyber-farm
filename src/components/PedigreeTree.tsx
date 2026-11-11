'use client';

import React, { useState } from 'react';
import { PedigreeNode, Gamecock } from '../types';
import { Play, Award, ShieldCheck, ChevronRight, X } from 'lucide-react';

interface PedigreeTreeProps {
  gamecock: Gamecock;
}

export const PedigreeTree: React.FC<PedigreeTreeProps> = ({ gamecock }) => {
  const [activeProfile, setActiveProfile] = useState<PedigreeNode | null>(null);
  const { pedigree } = gamecock;

  const renderCard = (
    node: PedigreeNode,
    label: string,
    gender: 'MALE' | 'FEMALE',
    level: 'L1' | 'L2' | 'L3'
  ) => {
    const isMale = gender === 'MALE';
    return (
      <div
        onClick={() => setActiveProfile(node)}
        className={`relative p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] ${
          isMale
            ? 'bg-blue-50/70 border-blue-200 hover:border-blue-400'
            : 'bg-rose-50/70 border-rose-200 hover:border-rose-400'
        } ${level === 'L1' ? 'ring-2 ring-amber-400/50' : ''}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isMale ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            {label}
          </span>
          {node.videoUrl && (
            <span className="flex items-center gap-0.5 text-[11px] font-semibold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
              <Play className="w-2.5 h-2.5 fill-red-600" /> คลิป
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.imageUrl}
            alt={node.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-300 shadow-xs shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{node.name}</h4>
            <p className="text-[11px] text-slate-500 truncate">{node.breed}</p>
            {node.wins !== undefined && (
              <p className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5">
                <Award className="w-2.5 h-2.5" /> ชนะ {node.wins} ไฟต์
              </p>
            )}
          </div>
        </div>

        <div className="mt-1 text-[10px] text-blue-600 font-medium flex items-center justify-end">
          <span>คลิกดูประวัติ</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            ผังสายเลือด 3 รุ่น (Pedigree Family Tree)
          </h3>
          <p className="text-xs text-slate-500">
            โครงสร้างการถ่ายทอดพันธุกรรมย้อนหลัง 3 รุ่น รับรองสายพันธุ์แท้ 100% จากฟาร์ม
          </p>
        </div>
        <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
          รหัสอ้างอิง: {gamecock.code}
        </span>
      </div>

      {/* Generation Hierarchy Tree */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Column 1: Parents (รุ่นที่ 1: พ่อ - แม่) */}
        <div className="space-y-4">
          <div className="text-center font-bold text-xs text-slate-600 uppercase tracking-wider bg-slate-100 py-1 rounded-lg">
            รุ่นพ่อ-แม่ (Generation 1)
          </div>

          <div className="space-y-4">
            {renderCard(pedigree.father, 'พ่อ (Sire)', 'MALE', 'L1')}
            {renderCard(pedigree.mother, 'แม่ (Dam)', 'FEMALE', 'L1')}
          </div>
        </div>

        {/* Column 2: Grandparents (รุ่นที่ 2: ปู่-ย่า, ตา-ยาย) */}
        <div className="md:col-span-2 space-y-4">
          <div className="text-center font-bold text-xs text-slate-600 uppercase tracking-wider bg-slate-100 py-1 rounded-lg">
            รุ่นปู่ย่า - ตายาย (Generation 2)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* ฝั่งพ่อ */}
            <div className="space-y-2 p-2.5 bg-blue-50/30 rounded-xl border border-blue-100">
              <span className="text-[11px] font-bold text-blue-800 block">สายเลือดฝั่งพ่อ (Sire Side)</span>
              {renderCard(pedigree.paternalGrandSire, 'ปู่ (Paternal Grandsire)', 'MALE', 'L2')}
              {renderCard(pedigree.paternalGrandDam, 'ย่า (Paternal Granddam)', 'FEMALE', 'L2')}
            </div>

            {/* ฝั่งแม่ */}
            <div className="space-y-2 p-2.5 bg-rose-50/30 rounded-xl border border-rose-100">
              <span className="text-[11px] font-bold text-rose-800 block">สายเลือดฝั่งแม่ (Dam Side)</span>
              {renderCard(pedigree.maternalGrandSire, 'ตา (Maternal Grandsire)', 'MALE', 'L2')}
              {renderCard(pedigree.maternalGrandDam, 'ยาย (Maternal Granddam)', 'FEMALE', 'L2')}
            </div>
          </div>
        </div>
      </div>

      {/* Node Profile Modal with Video Embed */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveProfile(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="relative h-44 bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProfile.imageUrl}
                alt={activeProfile.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex items-end p-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider mb-1 inline-block">
                    {activeProfile.code} • {activeProfile.role}
                  </span>
                  <h3 className="text-xl font-bold text-white">{activeProfile.name}</h3>
                  <p className="text-xs text-slate-300">{activeProfile.breed}</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">สถิติไฟต์ชนะ</span>
                  <span className="text-base font-bold text-amber-700">
                    {activeProfile.wins ? `${activeProfile.wins} ไฟต์` : 'สายแม่พันธุ์ส่งต่อพันธุกรรม'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">ค่าตัว/เงินรางวัล</span>
                  <span className="text-base font-bold text-emerald-600">
                    {activeProfile.earnings || 'สายเลือดหลักฟาร์ม'}
                  </span>
                </div>
              </div>

              {activeProfile.note && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block mb-1">จุดเด่นและการจ่ายลูก:</span>
                  {activeProfile.note}
                </div>
              )}

              {/* Video Embed Section */}
              {activeProfile.videoUrl && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-red-600" /> คลิปการชน & เตะเป้าโชว์เบอร์แข้ง
                  </h4>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <iframe
                      src={activeProfile.videoUrl}
                      title={activeProfile.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => setActiveProfile(null)}
                className="w-full py-2.5 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

