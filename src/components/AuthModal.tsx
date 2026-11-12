'use client';

import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, UserCheck, Shield, Sparkles, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'LOGIN' | 'REGISTER';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'LOGIN'
}) => {
  const { setRole, currentMember, loginAsMember, registerMember } = useFarm();
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>(defaultMode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('089-555-8899');
  const [email, setEmail] = useState('member@cyberfarm.com');
  const [farmName, setFarmName] = useState('ซุ้ม ส.มงคลชัย');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'REGISTER') {
      registerMember({
        name: name || 'สมาชิกฟาร์มคนโปรด',
        phone: phone || '089-555-8899',
        email: email || 'member@cyberfarm.com',
        farmName: farmName || 'ซุ้มไก่ชน ส.พัฒนา'
      });
    } else {
      loginAsMember({
        phone: phone || '089-555-8899',
        email: email || 'member@cyberfarm.com'
      });
    }
    setRole('MEMBER');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-amber-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold mb-2">
            <UserCheck className="w-3 h-3 text-emerald-400" /> ระบบสมาชิกฟาร์ม (Member Portal)
          </div>
          <h3 className="text-lg sm:text-xl font-black">
            {mode === 'LOGIN' ? 'เข้าสู่ระบบสมาชิก' : 'ลงทะเบียนสมาชิกใหม่'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            รับสิทธิพิเศษส่วนลด 5%, สั่งจองไข่เชื้อล่วงหน้า และบันทึกประวัติคำสั่งซื้อ
          </p>
        </div>

        {/* Member Privilege Highlights */}
        <div className="bg-emerald-50/70 p-3 sm:p-3.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-1.5 font-bold">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>สิทธิประโยชน์ Member:</span>
          </div>
          <span className="text-[11px] bg-emerald-200/60 font-black px-2 py-0.5 rounded-full text-emerald-800">
            ลดทันที 5% ทุกออเดอร์
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {mode === 'REGISTER' && (
            <>
              <div>
                <label className="font-bold text-slate-700 block mb-1">ชื่อ-นามสกุล / ชื่อในวงการ:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="เช่น เสี่ยวัฒน์ ชลบุรี"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ชื่อซุ้ม / ชื่อฟาร์ม (ถ้ามี):</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={e => setFarmName(e.target.value)}
                  placeholder="เช่น ซุ้ม ส.มงคลชัย"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>
            </>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> เบอร์โทรศัพท์ (สำหรับรับ OTP / เข้าสู่ระบบ):
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> อีเมล:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="yourname@domain.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{mode === 'LOGIN' ? 'เข้าสู่ระบบในฐานะ Member' : 'ยืนยันสมัครสมาชิก (รับส่วนลด 5%)'}</span>
            </button>
          </div>

          {/* Toggle Login / Register */}
          <div className="text-center pt-2 border-t border-slate-100">
            {mode === 'LOGIN' ? (
              <p className="text-slate-500 text-[11px]">
                ยังไม่มีบัญชีสมาชิก?{' '}
                <button
                  type="button"
                  onClick={() => setMode('REGISTER')}
                  className="font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                >
                  สมัครสมาชิกใหม่ที่นี่
                </button>
              </p>
            ) : (
              <p className="text-slate-500 text-[11px]">
                มีบัญชีสมาชิกอยู่แล้ว?{' '}
                <button
                  type="button"
                  onClick={() => setMode('LOGIN')}
                  className="font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                >
                  เข้าสู่ระบบเลย
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

