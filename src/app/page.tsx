'use client';

import React, { useState, useEffect } from 'react';
import { FarmProvider, useFarm } from '../context/FarmContext';
import { Header } from '../components/Header';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { GamecockCard } from '../components/GamecockCard';
import { FertilizedEggCard } from '../components/FertilizedEggCard';
import { SupplyCard } from '../components/SupplyCard';
import { DetailModal } from '../components/DetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { TrackingModal } from '../components/TrackingModal';
import { NotificationsModal } from '../components/NotificationsModal';
import { AdminKanban } from '../components/AdminKanban';
import { AdminInventory } from '../components/AdminInventory';
import { AdminAnalytics } from '../components/AdminAnalytics';
import { DemoSwitcherBar } from '../components/DemoSwitcherBar';
import { PortalModal } from '../components/PortalModal';
import { PortalLanding } from '../components/PortalLanding';
import { StoreHomeView } from '../components/StoreHomeView';
import {
  DeviceSimulatorBar,
  DeviceType,
  FrameStyle,
  ZoomLevel
} from '../components/DeviceSimulatorBar';
import { Gamecock, Order } from '../types';
import {
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Smartphone
} from 'lucide-react';

function FarmStoreContent() {
  const { role, setRole, gamecocks, eggs, equipment } = useFarm();

  const [activeNav, setActiveNav] = useState('HOME');
  const [selectedGamecock, setSelectedGamecock] = useState<Gamecock | null>(null);
  const [detailModalTab, setDetailModalTab] = useState<'OVERVIEW' | 'PEDIGREE' | 'VIDEO'>('OVERVIEW');

  // Demo Switcher State - Starts on PORTAL as requested
  const [viewMode, setViewMode] = useState<'PORTAL' | 'WEB' | 'MOBILE'>('PORTAL');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isIframeChild, setIsIframeChild] = useState(false);

  // Simulator Controls State
  const [simDevice, setSimDevice] = useState<DeviceType>('IPHONE');
  const [simFrame, setSimFrame] = useState<FrameStyle>('TITANIUM');
  const [simZoom, setSimZoom] = useState<ZoomLevel>(100);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [recentOrderSuccess, setRecentOrderSuccess] = useState<Order | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('ALL');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(70000);
  const [selectedStyle, setSelectedStyle] = useState('ALL');

  // Check if loaded inside iframe simulator
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.self !== window.top || window.location.search.includes('sim=1')) {
        setIsIframeChild(true);
        setViewMode('WEB');
      }
    }
  }, []);

  // Filtered Gamecocks
  const filteredCocks = gamecocks.filter(cock => {
    const matchSearch =
      cock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cock.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cock.fightingStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cock.breed.toLowerCase().includes(searchQuery.toLowerCase());

    const matchBreed =
      selectedBreed === 'ALL' || cock.breed.includes(selectedBreed);

    const matchTag =
      selectedTag === 'ALL' || cock.tags.includes(selectedTag);

    const matchStyle =
      selectedStyle === 'ALL' || cock.fightingStyle.includes(selectedStyle);

    const matchPrice = cock.price <= maxPrice;

    return matchSearch && matchBreed && matchTag && matchStyle && matchPrice;
  });

  const handleOrderSuccess = (order: Order) => {
    setRecentOrderSuccess(order);
    setIsTrackingOpen(true);
  };

  const handleSelectSystem = (system: 'WEB' | 'MOBILE' | 'BACKOFFICE' | 'TRACKING') => {
    if (system === 'WEB') {
      setRole('CUSTOMER');
      setViewMode('WEB');
      setActiveNav('HOME');
    } else if (system === 'MOBILE') {
      setRole('CUSTOMER');
      setViewMode('MOBILE');
      setActiveNav('HOME');
    } else if (system === 'BACKOFFICE') {
      setRole('ADMIN');
      setViewMode('WEB');
      setActiveNav('ADMIN_KANBAN');
    } else if (system === 'TRACKING') {
      setIsTrackingOpen(true);
    }
  };

  // Main Store UI Content
  const renderAppContent = () => (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-28 w-full overflow-x-hidden">
      <Header
        activeNav={activeNav}
        onSelectNav={nav => setActiveNav(nav)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotifOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Success Banner if recently ordered */}
        {recentOrderSuccess && (
          <div className="bg-emerald-500 text-white rounded-2xl p-3.5 sm:p-4 shadow-lg flex items-center justify-between gap-2 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm">
                  คำสั่งซื้อ #{recentOrderSuccess.orderNumber} สำเร็จ!
                </h4>
                <p className="text-[11px] sm:text-xs text-emerald-100 line-clamp-1 sm:line-clamp-none">
                  ระบบแยกบิลและส่งการแจ้งเตือนแล้ว สามารถติดตามตำแหน่งรถตู้สัตว์เลี้ยงได้ทันที
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="py-1 px-2.5 sm:py-1.5 sm:px-3 bg-white text-emerald-800 rounded-xl text-[11px] sm:text-xs font-bold hover:bg-emerald-50 transition-colors shrink-0"
            >
              ดูสถานะ
            </button>
          </div>
        )}

        {/* CUSTOMER STOREFRONT VIEW */}
        {role === 'CUSTOMER' && (
          <div className="space-y-4 sm:space-y-6">
            {/* 1. HOME / OVERVIEW VIEW (รวมทุกส่วนไว้หน้าเดียวเป็นหน้าแรก) */}
            {activeNav === 'HOME' && (
              <StoreHomeView
                gamecocks={gamecocks}
                eggs={eggs}
                equipment={equipment}
                onSelectNav={nav => setActiveNav(nav)}
                onViewGamecockDetails={(c, tab) => {
                  setSelectedGamecock(c);
                  setDetailModalTab(tab || 'OVERVIEW');
                }}
                onOpenTracking={() => setIsTrackingOpen(true)}
              />
            )}

            {/* Back to Home Shortcut Bar when inside category */}
            {activeNav !== 'HOME' && (
              <div className="flex items-center justify-between pb-1">
                <button
                  onClick={() => setActiveNav('HOME')}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-600 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <span>← กลับหน้าหลัก (Home)</span>
                </button>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <span>กำลังดูหมวด:</span>
                  <span className="text-amber-700 font-black">
                    {activeNav === 'LIVE_COCKS' && '🐓 ไก่ชนมีชีวิต'}
                    {activeNav === 'EGGS' && '🥚 ไข่เชื้อพร้อมเพาะ'}
                    {activeNav === 'SUPPLIES' && '💊 อุปกรณ์ & เวชภัณฑ์'}
                  </span>
                </div>
              </div>
            )}

            {/* Smart Search & Filter Section (TOR 3.4) */}
            {activeNav === 'LIVE_COCKS' && (
              <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาชื่อไก่, รหัส, สายพันธุ์ หรือลีลาชน..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
                    {/* Breed Filter */}
                    <select
                      value={selectedBreed}
                      onChange={e => setSelectedBreed(e.target.value)}
                      className="w-full sm:w-auto py-2 px-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 outline-none font-medium text-slate-700"
                    >
                      <option value="ALL">สายพันธุ์ทั้งหมด</option>
                      <option value="พม่า">สายพม่า (รำวง/สปีด)</option>
                      <option value="ป่าก๋อย">สายป่าก๋อย (กัดหลัง)</option>
                      <option value="เชิงไทย">สายเชิงไทย (ตราด)</option>
                    </select>

                    {/* Fighting Style Filter */}
                    <select
                      value={selectedStyle}
                      onChange={e => setSelectedStyle(e.target.value)}
                      className="w-full sm:w-auto py-2 px-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 outline-none font-medium text-slate-700"
                    >
                      <option value="ALL">เชิงชนทั้งหมด</option>
                      <option value="ม้าล่อ">ม้าล่อสปีด</option>
                      <option value="กัดหลัง">เชิงกัดหลัง</option>
                      <option value="กอดบน">กอดบนมัดคอ</option>
                    </select>
                  </div>
                </div>

                {/* Filter Chips & Price Slider */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs">
                  {/* Tag Chips */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                    <span className="text-slate-400 font-bold mr-1 shrink-0 text-[11px]">ป้าย:</span>
                    {['ALL', 'แชมป์เปี้ยน', 'ดาวรุ่ง', 'ไก่หนุ่มคัดผ่าน'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-2.5 py-0.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                          selectedTag === tag
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tag === 'ALL' ? 'ทั้งหมด' : tag}
                      </button>
                    ))}
                  </div>

                  {/* Price Slider */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 text-xs pt-1 sm:pt-0">
                    <span className="text-slate-500 text-[11px]">ราคาสูงสุด:</span>
                    <input
                      type="range"
                      min={10000}
                      max={70000}
                      step={5000}
                      value={maxPrice}
                      onChange={e => setMaxPrice(Number(e.target.value))}
                      className="accent-amber-500 cursor-pointer w-24 sm:w-28"
                    />
                    <span className="font-bold text-amber-700 font-mono text-[11px]">
                      ฿{maxPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: Live Gamecocks */}
            {activeNav === 'LIVE_COCKS' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                    🐓 ไก่ชนมีชีวิตพร้อมขาย ({filteredCocks.length} ตัว)
                  </h3>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    คลิกรูปเพื่อดูคลิปและผังสายเลือด
                  </span>
                </div>

                {filteredCocks.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                    ไม่พบไก่ชนที่ตรงกับเงื่อนไขการค้นหา ลองปรับตัวกรองใหม่อีกครั้ง
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {filteredCocks.map(cock => (
                      <GamecockCard
                        key={cock.id}
                        gamecock={cock}
                        onViewDetails={c => setSelectedGamecock(c)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Fertilized Eggs */}
            {activeNav === 'EGGS' && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                    🥚 ไข่เชื้อรับประกันคุณภาพ ({eggs.length} คู่ผสมเงินล้าน)
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    เลือกระดับราคา (1, 3, 5 ฟอง) โควตามีจำกัด พร้อมระบบรับประกัน
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {eggs.map(egg => (
                    <FertilizedEggCard key={egg.id} egg={egg} />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Supplies & Medical */}
            {activeNav === 'SUPPLIES' && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                    💊 เวชภัณฑ์ยารักษา & อุปกรณ์ฟาร์ม ({equipment.length} รายการ)
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    วัคซีน ยาบำรุง นวมซ้อม และอุปกรณ์เลี้ยงดูมาตรฐาน
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {equipment.map(item => (
                    <SupplyCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADMIN VIEW */}
        {role === 'ADMIN' && (
          <div className="space-y-4 sm:space-y-6">
            {activeNav === 'ADMIN_KANBAN' && <AdminKanban />}
            {activeNav === 'ADMIN_INVENTORY' && <AdminInventory />}
            {activeNav === 'ADMIN_ANALYTICS' && <AdminAnalytics />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-6 sm:py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="text-lg sm:text-xl">🐓</span>
              <span className="text-xs sm:text-sm">CYBER GAMECOCK FARM PLATFORM</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              ออกแบบและพัฒนาตามข้อกำหนดขอบเขตของงาน (TOR) ฉบับสมบูรณ์
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex flex-wrap justify-between items-center text-[9px] sm:text-[10px] text-slate-500">
            <span>© 2026 Cyber Farm. All rights reserved.</span>
            <span>Next.js App Router • Smart Split Cart • Pedigree Tree</span>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        activeNav={activeNav}
        onSelectNav={nav => setActiveNav(nav)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenNotifications={() => setIsNotifOpen(true)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
      {/* 1. PORTAL LANDING HUB (Main Welcome Screen) */}
      {viewMode === 'PORTAL' ? (
        <PortalLanding onSelectSystem={handleSelectSystem} />
      ) : viewMode === 'MOBILE' ? (
        /* 2. MOBILE SIMULATOR WRAPPER */
        <div className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 min-h-screen pb-24 bg-slate-50/50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Top Device Simulator Toolbar matching the user's reference */}
          <DeviceSimulatorBar
            device={simDevice}
            setDevice={setSimDevice}
            frame={simFrame}
            setFrame={setSimFrame}
            zoom={simZoom}
            setZoom={setSimZoom}
          />

          {/* Scalable Container */}
          <div
            className="flex items-center justify-center transition-all duration-300 origin-top"
            style={{
              transform: `scale(${simZoom / 100})`,
              width:
                simDevice === 'IPHONE'
                  ? '390px'
                  : simDevice === 'IPHONE_MAX'
                  ? '430px'
                  : simDevice === 'IPAD'
                  ? '768px'
                  : '100%',
              maxWidth: simDevice === 'FLUID' ? '1020px' : undefined
            }}
          >
            {/* Device Frame */}
            <div
              className={`relative flex flex-col overflow-hidden transition-all duration-300 w-full ${
                simFrame === 'TITANIUM'
                  ? 'bg-slate-900 rounded-[50px] p-2.5 shadow-2xl border-4 border-slate-700 ring-8 ring-slate-300/70'
                  : simFrame === 'FLAT'
                  ? 'bg-slate-800 rounded-[28px] p-2 shadow-xl border-2 border-slate-600'
                  : 'rounded-2xl shadow-xl border border-slate-200 bg-white'
              }`}
              style={{
                height:
                  simDevice === 'IPHONE'
                    ? '800px'
                    : simDevice === 'IPHONE_MAX'
                    ? '860px'
                    : simDevice === 'IPAD'
                    ? '880px'
                    : '82vh'
              }}
            >
              {/* Dynamic Island Notch (Only for Titanium Frame) */}
              {simFrame === 'TITANIUM' && simDevice !== 'FLUID' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              )}

              {/* Flat Camera Dot (For Flat Frame) */}
              {simFrame === 'FLAT' && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-30 pointer-events-none" />
              )}

              {/* Embedded Iframe gives real device width so CSS Media Queries trigger naturally */}
              <div
                className={`flex-1 bg-white overflow-hidden relative shadow-inner ${
                  simFrame === 'TITANIUM'
                    ? 'rounded-[40px]'
                    : simFrame === 'FLAT'
                    ? 'rounded-[20px]'
                    : 'rounded-xl'
                }`}
              >
                <iframe
                  src="/?sim=1"
                  title="Cyber Farm Mobile Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3. STANDARD WEB STOREFRONT & ADMIN VIEW */
        renderAppContent()
      )}

      {/* Floating Demo Switcher Dock Bar (Matches the User Image, Hidden inside iframe) */}
      {!isIframeChild && (
        <DemoSwitcherBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenPortal={() => setIsPortalOpen(true)}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
      )}

      {/* Portal Selection Hub Modal */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onSelectSystem={handleSelectSystem}
      />

      {/* Modals & Drawers */}
      <DetailModal
        gamecock={selectedGamecock}
        initialTab={detailModalTab}
        onClose={() => setSelectedGamecock(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrder={recentOrderSuccess}
      />

      <NotificationsModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <FarmProvider>
      <FarmStoreContent />
    </FarmProvider>
  );
}
