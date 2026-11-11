'use client';

import React, { useState } from 'react';
import { PedigreeNode, Gamecock } from '../types';
import {
  Play,
  Award,
  ShieldCheck,
  ChevronRight,
  X,
  Dna,
  GitFork,
  LayoutGrid,
  Info,
  CheckCircle2
} from 'lucide-react';

interface PedigreeTreeProps {
  gamecock: Gamecock;
}

export const PedigreeTree: React.FC<PedigreeTreeProps> = ({ gamecock }) => {
  const [activeProfile, setActiveProfile] = useState<PedigreeNode | null>(null);
  const [viewMode, setViewMode] = useState<'TREE' | 'LIST'>('TREE');
  const { pedigree } = gamecock;

  // Render an ancestor node card
  const renderNode = (
    node: PedigreeNode,
    label: string,
    gender: 'MALE' | 'FEMALE',
    generationLabel: string,
    percentage: string
  ) => {
    const isMale = gender === 'MALE';
    return (
      <div
        onClick={() => setActiveProfile(node)}
        className={`group relative p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-lg hover:scale-[1.02] w-full max-w-[230px] sm:max-w-[250px] ${
          isMale
            ? 'bg-blue-50/80 hover:bg-blue-50 border-blue-200 hover:border-blue-400'
            : 'bg-rose-50/80 hover:bg-rose-50 border-rose-200 hover:border-rose-400'
        }`}
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span
            className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
              isMale ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            <span>{isMale ? '♂' : '♀'}</span>
            <span>{label}</span>
          </span>

          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-slate-500 bg-white/80 px-1.5 py-0.5 rounded-md border border-slate-200/60">
              {percentage}
            </span>
            {node.videoUrl && (
              <span className="flex items-center gap-0.5 text-[9px] font-black text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-md animate-pulse">
                <Play className="w-2 h-2 fill-rose-600" /> คลิป
              </span>
            )}
          </div>
        </div>

        {/* Avatar & Info */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.imageUrl}
              alt={node.name}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 shadow-xs group-hover:scale-105 transition-transform ${
                isMale ? 'border-blue-400' : 'border-rose-400'
              }`}
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white ${
                isMale ? 'bg-blue-600' : 'bg-rose-600'
              }`}
            >
              {isMale ? 'M' : 'F'}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-slate-900 truncate group-hover:text-amber-700 transition-colors">
              {node.name}
            </h4>
            <p className="text-[10px] text-slate-600 truncate font-medium">{node.breed}</p>
            <p className="text-[9px] font-bold text-slate-400 font-mono">{node.code}</p>
          </div>
        </div>

        {/* Win/Award summary */}
        <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[9px] sm:text-[10px]">
          {node.wins !== undefined && node.wins > 0 ? (
            <span className="text-amber-700 font-bold flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-500" /> ชนะ {node.wins} ไฟต์
            </span>
          ) : (
            <span className="text-slate-500 font-medium">แม่พันธุ์หลัก</span>
          )}
          <span className="text-blue-600 font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
            ดูประวัติ <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    );
  };

  // Render the current subject gamecock node
  const renderSubjectNode = () => {
    return (
      <div className="relative p-3.5 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-400 shadow-md w-full max-w-[240px] sm:max-w-[260px] ring-4 ring-amber-400/20">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider flex items-center gap-1 shadow-xs">
            🐓 ไก่ชนตัวนี้ (Subject)
          </span>
          <span className="text-[9px] font-black bg-white text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
            เลือดผสม 100%
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gamecock.imageUrl}
              alt={gamecock.name}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-amber-500 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
              ✓
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
              {gamecock.name}
            </h4>
            <p className="text-[10px] text-amber-800 font-bold truncate">{gamecock.breed}</p>
            <p className="text-[10px] text-slate-500 font-mono font-bold">{gamecock.code}</p>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-amber-200/80 flex items-center justify-between text-[10px]">
          <span className="font-bold text-slate-700">
            {gamecock.weightKg} กก. • {gamecock.ageMonths} เดือน
          </span>
          <span className="font-black text-amber-800 font-mono">
            ฿{gamecock.price.toLocaleString()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Dna className="w-5 h-5 text-amber-600" />
              ผังสายเลือด 3 รุ่น (Pedigree Lineage Tree)
            </h3>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 hidden sm:inline">
              สายเลือดแท้ 100%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            สืบย้อนรอยพันธุกรรมและเบอร์แข้งผ่านเส้นโยงสายพ่อและสายแม่ (คลิกที่การ์ดเพื่อดูประวัติและคลิปเตะเป้า)
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            onClick={() => setViewMode('TREE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'TREE'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-amber-600" />
            <span>ผังเส้นโยง (Tree)</span>
          </button>
          <button
            onClick={() => setViewMode('LIST')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'LIST'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-sky-600" />
            <span>รายการการ์ด (Cards)</span>
          </button>
        </div>
      </div>

      {/* 2. Generation Level Indicator */}
      <div className="grid grid-cols-3 text-center text-xs font-bold border border-slate-100 bg-slate-50/80 rounded-xl p-2 text-slate-600">
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>รุ่นปัจจุบัน (Target)</span>
        </div>
        <div className="flex items-center justify-center gap-1 border-x border-slate-200">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>รุ่นพ่อ-แม่ (50%)</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <span>รุ่นปู่ย่า-ตายาย (25%)</span>
        </div>
      </div>

      {/* 3. MODE A: VISUAL BRACKET TREE WITH CONNECTING LINES */}
      {viewMode === 'TREE' && (
        <div className="space-y-2">
          {/* Mobile swipe hint */}
          <div className="md:hidden flex items-center justify-between text-[11px] text-slate-500 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/60">
            <span className="flex items-center gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-amber-600" /> สไลด์เลื่อนซ้าย-ขวา เพื่อดูผังเส้นโยงเต็มหน้าจอ
            </span>
            <span className="font-bold text-amber-700">← ปัดดูผัง →</span>
          </div>

          <div className="overflow-x-auto pb-4 pt-2 no-scrollbar border border-slate-100 rounded-2xl bg-gradient-to-r from-slate-50/40 via-white to-slate-50/40">
            <div className="min-w-[820px] p-4 flex items-center justify-between gap-0">
              {/* COL 1: Current Gamecock (Target) */}
              <div className="flex flex-col items-center justify-center z-10">
                {renderSubjectNode()}
              </div>

              {/* CONNECTOR 1: Subject to Parents */}
              <div className="w-16 h-[340px] relative flex items-center justify-center shrink-0">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 64 340"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Branch to Father (Top) */}
                  <path
                    d="M 0 170 C 32 170 32 85 64 85"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Branch to Mother (Bottom) */}
                  <path
                    d="M 0 170 C 32 170 32 255 64 255"
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Node Pin Points */}
                  <circle cx="0" cy="170" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="64" cy="85" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="64" cy="255" r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
              </div>

              {/* COL 2: Parents (Father top, Mother bottom) */}
              <div className="flex flex-col justify-between h-[360px] z-10 py-2">
                {/* Father Node */}
                <div className="flex items-center">
                  {renderNode(pedigree.father, 'พ่อ (Sire)', 'MALE', 'รุ่นที่ 1', '50%')}
                </div>

                {/* Mother Node */}
                <div className="flex items-center">
                  {renderNode(pedigree.mother, 'แม่ (Dam)', 'FEMALE', 'รุ่นที่ 1', '50%')}
                </div>
              </div>

              {/* CONNECTOR 2: Parents to Grandparents */}
              <div className="w-16 h-[380px] relative flex items-center justify-center shrink-0">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 64 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Father to Paternal Grandsire (Top-Top) */}
                  <path
                    d="M 0 95 C 32 95 32 45 64 45"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Father to Paternal Granddam (Top-Bottom) */}
                  <path
                    d="M 0 95 C 32 95 32 145 64 145"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Mother to Maternal Grandsire (Bottom-Top) */}
                  <path
                    d="M 0 285 C 32 285 32 235 64 235"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Mother to Maternal Granddam (Bottom-Bottom) */}
                  <path
                    d="M 0 285 C 32 285 32 335 64 335"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Node Pin Points */}
                  <circle cx="0" cy="95" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="285" r="3.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="64" cy="45" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="64" cy="145" r="3.5" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="64" cy="235" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="64" cy="335" r="3.5" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
              </div>

              {/* COL 3: Grandparents (4 nodes) */}
              <div className="flex flex-col justify-between h-[400px] z-10 py-1 space-y-2">
                {/* 1. ปู่ */}
                <div>
                  {renderNode(
                    pedigree.paternalGrandSire,
                    'ปู่ (PGS)',
                    'MALE',
                    'รุ่นที่ 2',
                    '25%'
                  )}
                </div>

                {/* 2. ย่า */}
                <div>
                  {renderNode(
                    pedigree.paternalGrandDam,
                    'ย่า (PGD)',
                    'FEMALE',
                    'รุ่นที่ 2',
                    '25%'
                  )}
                </div>

                {/* 3. ตา */}
                <div>
                  {renderNode(
                    pedigree.maternalGrandSire,
                    'ตา (MGS)',
                    'MALE',
                    'รุ่นที่ 2',
                    '25%'
                  )}
                </div>

                {/* 4. ยาย */}
                <div>
                  {renderNode(
                    pedigree.maternalGrandDam,
                    'ยาย (MGD)',
                    'FEMALE',
                    'รุ่นที่ 2',
                    '25%'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODE B: CARD BREAKDOWN LIST */}
      {viewMode === 'LIST' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Sire Branch (ฝั่งพ่อ 50%) */}
          <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200">
              <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                สายเลือดฝั่งพ่อ (Sire Side - 50%)
              </span>
              <span className="text-[10px] font-bold bg-blue-200/60 text-blue-800 px-2 py-0.5 rounded-full">
                จ่ายเบอร์แข้งและความเร็ว
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500">พ่อพันธุ์หลัก:</div>
              {renderNode(pedigree.father, 'พ่อ (Sire)', 'MALE', 'รุ่นที่ 1', '50%')}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-blue-100">
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-500">ปู่:</div>
                {renderNode(pedigree.paternalGrandSire, 'ปู่ (PGS)', 'MALE', 'รุ่นที่ 2', '25%')}
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-500">ย่า:</div>
                {renderNode(pedigree.paternalGrandDam, 'ย่า (PGD)', 'FEMALE', 'รุ่นที่ 2', '25%')}
              </div>
            </div>
          </div>

          {/* Dam Branch (ฝั่งแม่ 50%) */}
          <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-200/80 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rose-200">
              <span className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                สายเลือดฝั่งแม่ (Dam Side - 50%)
              </span>
              <span className="text-[10px] font-bold bg-rose-200/60 text-rose-800 px-2 py-0.5 rounded-full">
                จ่ายโครงสร้างและจิตใจ
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500">แม่พันธุ์หลัก:</div>
              {renderNode(pedigree.mother, 'แม่ (Dam)', 'FEMALE', 'รุ่นที่ 1', '50%')}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-rose-100">
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-500">ตา:</div>
                {renderNode(pedigree.maternalGrandSire, 'ตา (MGS)', 'MALE', 'รุ่นที่ 2', '25%')}
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-500">ยาย:</div>
                {renderNode(pedigree.maternalGrandDam, 'ยาย (MGD)', 'FEMALE', 'รุ่นที่ 2', '25%')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Node Profile Modal with Sparring Video Embed */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveProfile(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header Image */}
            <div className="relative h-48 sm:h-52 bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProfile.imageUrl}
                alt={activeProfile.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent flex items-end p-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider">
                      {activeProfile.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                      {activeProfile.role}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">{activeProfile.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{activeProfile.breed}</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">สถิติไฟต์ชนะ</span>
                  <span className="text-sm sm:text-base font-black text-amber-700">
                    {activeProfile.wins ? `${activeProfile.wins} ไฟต์ติดมัดจำ` : 'แม่พันธุ์คัดจ่ายลูก'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">ค่าตัว / เงินรางวัล</span>
                  <span className="text-sm sm:text-base font-black text-emerald-600">
                    {activeProfile.earnings || 'สายเลือดหลักประจำฟาร์ม'}
                  </span>
                </div>
              </div>

              {activeProfile.note && (
                <div className="p-3.5 bg-amber-50 border border-amber-200/90 rounded-2xl text-xs text-amber-950 leading-relaxed">
                  <span className="font-black block mb-1 text-amber-800">
                    พันธุกรรม & จุดเด่นการจ่ายลูก:
                  </span>
                  {activeProfile.note}
                </div>
              )}

              {/* Video Embed */}
              {activeProfile.videoUrl && (
                <div>
                  <h4 className="text-xs font-black text-slate-900 mb-2 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" /> คลิปการชน & เตะเป้าโชว์เบอร์แข้ง
                  </h4>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
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
                className="w-full py-2.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
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
