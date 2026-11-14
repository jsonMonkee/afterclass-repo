'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  User, 
  Crown, 
  Briefcase, 
  Lock, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';
import Footer from '../../components/Footer';

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileType, setProfileType] = useState('club'); // 'club' | 'dhanda'
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    organization: '',
    whatsapp: '',
    instagram: '',
    category: 'Cultural',
    description: '',
    secretCode: ''
  });
  const [statusMsg, setStatusMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.organization || !formData.secretCode) {
      setStatusMsg({ type: 'error', text: 'Saare required fields aur verification code bharo pehle!' });
      return;
    }

    // Verification check for Club Leader vs Dhanda Owner
    const validCodes = ['BANTU2026', 'AMITYCLUB', 'DHANDA69', 'WYRCAN', 'JETHALAL', 'JETHALAL.DAS'];
    if (!validCodes.includes(formData.secretCode.trim().toUpperCase())) {
      setStatusMsg({ 
        type: 'error', 
        text: 'Access Denied! Invalid passcode. For getting the passcode you need to send a message on @jethalal.das Instagram handle.' 
      });
      return;
    }

    setStatusMsg({ 
      type: 'success', 
      text: `Badhai ho ${formData.name}! ${profileType === 'club' ? 'Club Leader' : 'Dhanda Owner'} profile submission receive ho gaya hai. Team verify karke 2 ghante mein live karegi.` 
    });

    setTimeout(() => {
      setIsModalOpen(false);
      setStatusMsg(null);
      setFormData({
        name: '',
        role: '',
        organization: '',
        whatsapp: '',
        instagram: '',
        category: 'Cultural',
        description: '',
        secretCode: ''
      });
    }, 2800);
  };

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-8 pb-12 text-center flex flex-col items-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Crown size={13} className="text-[#FEF08A]" />
            <span>EXCLUSIVE LEADERSHIP & FOUNDER REGISTRY</span>
          </div>

          <h1 className="font-arc-display text-white text-3xl sm:text-5xl md:text-[60px] leading-[1.08] max-w-3xl mb-6 font-black">
            “Sirf Leaders aur Dhanda Owners ke liye.”
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed mb-8">
            Regular crowd ke liye feed open hai. Profile creation sirf verified Amity Club Heads aur campus startup/dhanda owners ke liye reserved hai.
          </p>

          {/* Trigger Button to Open Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 bg-[#FFFDF5] text-[#881337] hover:bg-[#FEF08A] font-arc-display font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <User size={18} className="stroke-[2.5]" />
            <span>CREATE OFFICIAL PROFILE</span>
            <span className="w-6 h-6 rounded-full bg-[#881337] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform text-xs">
              →
            </span>
          </button>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. EXPLANATION / ACCESS RULES CARDS */}
      <div className="bg-[#FFFDF5] flex-1 py-16 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-2">
              STRICT GATEKEEPING · ZERO SPAM
            </span>
            <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
              Kisko profile banane ki azaadi hai?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Box 1: Club Leaders */}
            <div className="bg-white rounded-[28px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center text-2xl mb-6 shadow-xs border border-[#FECDD3]">
                  👑
                </div>
                <div className="inline-block bg-[#FFE4E6] text-[#881337] text-[11px] font-sans font-bold px-3 py-1 rounded-full uppercase mb-3">
                  Tier 1: Club Leadership
                </div>
                <h3 className="font-arc-display text-2xl font-black text-[#000000] mb-3">
                  Campus Society Presidents & Leads
                </h3>
                <p className="font-sans text-sm text-[#475569] leading-relaxed mb-6 font-medium">
                  Turing, Cadence, E-Cell, NatyaRang, Rotaract ya kisi bhi officially verified Amity Kolkata society ke leads. Auditions post karo aur core recruitment manage karo.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-sans font-bold text-[#E11D48]">
                <span>REQUIRES VERIFIED AMITY LEAD CODE</span>
                <span>★ 100% EXCLUSIVE</span>
              </div>
            </div>

            {/* Box 2: Dhanda / Startup Founders */}
            <div className="bg-white rounded-[28px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] text-[#881337] flex items-center justify-center text-2xl mb-6 shadow-xs border border-[#FACC15]">
                  🚀
                </div>
                <div className="inline-block bg-[#FEF08A] text-[#881337] text-[11px] font-sans font-bold px-3 py-1 rounded-full uppercase mb-3">
                  Tier 2: Dhanda / Startups
                </div>
                <h3 className="font-arc-display text-2xl font-black text-[#000000] mb-3">
                  Student Founders & Freelance Agencies
                </h3>
                <p className="font-sans text-sm text-[#475569] leading-relaxed mb-6 font-medium">
                  Hostel mein chal raha tiffin business, photography studio, campus streetwear brand, software agency (like wyrcan.io), ya tech startup. Hire talent & get clients.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-sans font-bold text-[#881337]">
                <span>REQUIRES ACTIVE VENTURE PROOF</span>
                <span>⚡ ZERO BROKERS</span>
              </div>
            </div>

          </div>

          {/* Quick Info Box */}
          <div className="bg-[#FFF1F2] border-2 border-dashed border-[#E11D48]/40 rounded-3xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <Lock size={24} className="text-[#E11D48] mx-auto mb-3" />
            <h4 className="font-arc-display font-black text-lg text-[#000000] mb-2">
              Normal students ke liye kya hai?
            </h4>
            <p className="font-sans text-sm text-[#475569] leading-relaxed">
              Normal Amitians ko account banane ka koi jhanjhat nahi hai. Saare events, club applications, gazette notices aur Choto Bantu AI bina kisi login ya registration ke 100% free accessible hain!
            </p>
          </div>

        </div>
      </div>

      {/* 3. SPLIT POPUP MODAL DIALOGUE BOX (Left Pixelated Art + Right Centralized Form) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          
          {/* Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Dialog Container: 2-Column Split */}
          <div className="relative w-full max-w-4xl bg-[#FFFDF5] rounded-[32px] sm:rounded-[36px] border border-slate-200/80 shadow-2xl shadow-black/25 z-10 my-6 overflow-hidden animate-nav-pop grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] overflow-y-auto lg:overflow-visible">
            
            {/* Top Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/5 hover:bg-black/15 flex items-center justify-center text-black transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* ================= LEFT COLUMN: Pixelated / Minecraft-style Image Placeholder ================= */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#E11D48] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200/60">
              
              {/* Subtle grid mesh overlay */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Decorative soft glowing elements */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#FEF08A]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Left Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#FEF08A] px-3 py-1 rounded-full border border-white/15 shadow-sm">
                  PIXEL VAULT · 8-BIT
                </span>
                <span className="font-sans text-[11px] text-white/80 font-semibold uppercase">
                  VERIFIED ONLY
                </span>
              </div>

              {/* Center: Pixelated Banana Mascot & Placeholder Frame */}
              <div className="relative z-10 my-8 flex flex-col items-center text-center">
                
                {/* Modern Soft Frame */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-xl flex flex-col items-center justify-center">
                  
                  {/* Subtle inner pixel pattern */}
                  <div 
                    className="absolute inset-2 opacity-10 pointer-events-none rounded-2xl"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)',
                      backgroundSize: '12px 12px'
                    }}
                  />

                  {/* Pixelated Mascot Image (rendering crisp pixels) */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 relative mb-2">
                    <Image 
                      src="/dia-banana.png" 
                      alt="Choto Bantu 8-bit" 
                      width={128} 
                      height={128}
                      className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)] [image-rendering:pixelated]"
                    />
                  </div>

                  <span className="font-sans text-[11px] font-extrabold uppercase text-[#881337] tracking-wider bg-[#FEF08A] px-3 py-0.5 rounded-full shadow-xs">
                    CHOTO BANTU #001
                  </span>
                </div>

                <p className="font-sans text-xs text-white/90 mt-4 max-w-xs font-medium leading-relaxed">
                  Only verified club bhaiyas & dhanda founders receive this badge on campus.
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="relative z-10 pt-2 border-t border-white/20 flex items-center justify-between text-white/85 font-sans text-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={14} className="text-[#FEF08A]" />
                  <span>Amity Kolkata Registry</span>
                </span>
                <span className="font-bold text-white tracking-wide">2026 EDITION</span>
              </div>

            </div>

            {/* ================= RIGHT COLUMN: Centralized Content & Profile Form ================= */}
            <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-center items-center text-center">
              
              {/* Centralized AFTERCLASS Wordmark Mention */}
              <div className="w-full flex flex-col items-center mb-4">
                <span className="font-sans text-[11px] font-bold text-[#E11D48] uppercase tracking-[0.2em] mb-1">
                  OFFICIAL ONBOARDING
                </span>
                
                {/* Centralized Brand Mention */}
                <h2 className="font-arc-display text-4xl sm:text-5xl font-black text-black tracking-tight leading-none">
                  afterclass
                </h2>
                
                <span className="font-sans text-xs font-semibold text-black/60 uppercase tracking-widest mt-1">
                  for amity university kolkata
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#475569] max-w-md font-medium leading-relaxed mb-6">
                Fill your venture or club details. Access is strictly gated through student council verification passcode.
              </p>

              {/* Centralized Role Switcher: Club Leader vs Dhanda Owner */}
              <div className="w-full max-w-md grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl mb-5 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setProfileType('club')}
                  className={`py-2.5 rounded-xl font-arc-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    profileType === 'club'
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'text-black/70 hover:text-black'
                  }`}
                >
                  <span>👑</span>
                  <span>Club Leader</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProfileType('dhanda')}
                  className={`py-2.5 rounded-xl font-arc-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    profileType === 'dhanda'
                      ? 'bg-[#000000] text-white shadow-sm'
                      : 'text-black/70 hover:text-black'
                  }`}
                >
                  <span>🚀</span>
                  <span>Dhanda Owner</span>
                </button>
              </div>

              {/* Status Message Prompt */}
              {statusMsg && (
                <div className={`w-full max-w-md p-3.5 rounded-2xl mb-4 flex items-start gap-2.5 text-left text-xs sm:text-sm font-bold ${
                  statusMsg.type === 'error'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {statusMsg.type === 'error' ? <AlertCircle size={17} className="shrink-0 mt-0.5" /> : <CheckCircle2 size={17} className="shrink-0 mt-0.5" />}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              {/* Form with Clean Centralized Width */}
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3.5 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs font-bold text-black mb-1">
                      Your Full Name <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Joydeep Das"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-bold text-black mb-1">
                      {profileType === 'club' ? 'Club Designation' : 'Founder Role'} <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={profileType === 'club' ? "e.g. President" : "e.g. Founder"}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs font-bold text-black mb-1">
                    {profileType === 'club' ? 'Society / Club Name' : 'Dhanda / Venture Name'} <span className="text-[#E11D48]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={profileType === 'club' ? "e.g. Turing Tech Club" : "e.g. Wyrcan Studio"}
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10 outline-none transition-all shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs font-bold text-black mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-bold text-black mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      placeholder="@venture_or_club"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Secret Passcode Box with Dedicated Square-Shaped Instagram Card */}
                <div className="bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs">
                  
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="font-arc-display font-black text-xs sm:text-sm text-black flex items-center gap-1.5 tracking-tight">
                      <Lock size={15} className="text-[#E11D48] stroke-[2.5]" />
                      <span>Council Verification Passcode</span>
                      <span className="text-[#E11D48]">*</span>
                    </label>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-black/70 bg-white px-2.5 py-0.5 rounded-full border border-black/10 shadow-2xs">
                      Verified Only
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    
                    {/* Square-Shaped Instagram Handle Card */}
                    <a
                      href="https://instagram.com/jethalal.das"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-[130px] sm:h-[130px] aspect-square shrink-0 bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] p-[1.5px] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all group flex flex-col cursor-pointer"
                      title="DM @jethalal.das for Passcode"
                    >
                      <div className="w-full h-full bg-[#FFFDF5] group-hover:bg-white rounded-[14px] p-2.5 flex flex-col justify-between items-center text-center">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-xs">
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div>
                          <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#64748B]">Instagram DM</span>
                          <span className="font-arc-display font-black text-xs text-black group-hover:text-[#E11D48] leading-tight block truncate">
                            @jethalal.das
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-white bg-black group-hover:bg-[#E11D48] px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors shadow-xs">
                          <span>DM for Code</span>
                          <span>↗</span>
                        </span>
                      </div>
                    </a>

                    {/* Passcode Input Field & Description */}
                    <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                      <div>
                        <label className="block font-sans text-xs font-bold text-black mb-1">
                          Passcode Key:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter passcode from @jethalal.das"
                          value={formData.secretCode}
                          onChange={(e) => setFormData({ ...formData, secretCode: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium text-black placeholder:text-slate-400 focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/15 outline-none shadow-2xs transition-all"
                        />
                      </div>

                      <p className="font-sans text-xs text-[#475569] font-medium leading-relaxed">
                        For getting the passcode, you need to send a message on <a href="https://instagram.com/jethalal.das" target="_blank" rel="noopener noreferrer" className="font-bold text-[#E11D48] hover:underline">@jethalal.das</a> Instagram handle.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-arc-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#E11D48]/25 hover:shadow-xl hover:shadow-[#E11D48]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all text-center"
                  >
                    Verify & Create Profile →
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
