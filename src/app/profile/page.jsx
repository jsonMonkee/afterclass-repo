'use client';

import React, { useState } from 'react';
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
  Instagram,
  ArrowRight
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
    const validCodes = ['BANTU2026', 'AMITYCLUB', 'DHANDA69', 'WYRCAN'];
    if (!validCodes.includes(formData.secretCode.trim().toUpperCase())) {
      setStatusMsg({ 
        type: 'error', 
        text: 'Access Denied! Sirf verified Club Leaders aur Dhanda / Startup Founders profile create kar sakte hain. Invalid secret code.' 
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
            <div className="bg-white rounded-[32px] p-8 border-2 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center text-2xl mb-6 shadow-sm border border-[#FECDD3]">
                  👑
                </div>
                <div className="inline-block bg-[#FFE4E6] text-[#881337] text-[11px] font-arc-mono font-bold px-3 py-1 rounded-full uppercase mb-3">
                  Tier 1: Club Leadership
                </div>
                <h3 className="font-arc-display text-2xl font-black text-[#000000] mb-3">
                  Campus Society Presidents & Leads
                </h3>
                <p className="font-sans text-sm text-[#475569] leading-relaxed mb-6 font-medium">
                  Turing, Cadence, E-Cell, NatyaRang, Rotaract ya kisi bhi officially verified Amity Kolkata society ke leads. Auditions post karo aur core recruitment manage karo.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-arc-mono font-bold text-[#E11D48]">
                <span>REQUIRES VERIFIED AMITY LEAD CODE</span>
                <span>★ 100% EXCLUSIVE</span>
              </div>
            </div>

            {/* Box 2: Dhanda / Startup Founders */}
            <div className="bg-white rounded-[32px] p-8 border-2 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] text-[#881337] flex items-center justify-center text-2xl mb-6 shadow-sm border border-[#FACC15]">
                  🚀
                </div>
                <div className="inline-block bg-[#FEF08A] text-[#881337] text-[11px] font-arc-mono font-bold px-3 py-1 rounded-full uppercase mb-3">
                  Tier 2: Dhanda / Startups
                </div>
                <h3 className="font-arc-display text-2xl font-black text-[#000000] mb-3">
                  Student Founders & Freelance Agencies
                </h3>
                <p className="font-sans text-sm text-[#475569] leading-relaxed mb-6 font-medium">
                  Hostel mein chal raha tiffin business, photography studio, campus streetwear brand, software agency (like wyrcan.io), ya tech startup. Hire talent & get clients.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-arc-mono font-bold text-[#881337]">
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

      {/* 3. POPUP MODAL DIALOGUE BOX */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-xl bg-[#FFFDF5] rounded-[36px] border-[3px] border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-8 z-10 my-8 overflow-hidden animate-nav-pop">
            
            {/* Top Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-arc-mono font-bold text-[#E11D48] uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>RESTRICTED ONBOARDING</span>
              </div>
              <h3 className="font-arc-display font-black text-2xl sm:text-3xl text-black leading-tight">
                Create Verified Profile
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#475569] mt-1 font-medium">
                Select your status below. Verification secret code is required.
              </p>
            </div>

            {/* Role Switcher Tab: Club Leader vs Dhanda Owner */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-black/5 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setProfileType('club')}
                className={`py-3 rounded-xl font-arc-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                className={`py-3 rounded-xl font-arc-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  profileType === 'dhanda'
                    ? 'bg-[#000000] text-white shadow-sm'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                <span>🚀</span>
                <span>Dhanda Owner</span>
              </button>
            </div>

            {/* Status Messages */}
            {statusMsg && (
              <div className={`p-4 rounded-2xl mb-5 flex items-start gap-3 text-xs sm:text-sm font-bold ${
                statusMsg.type === 'error'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {statusMsg.type === 'error' ? <AlertCircle size={18} className="shrink-0" /> : <CheckCircle2 size={18} className="shrink-0" />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-arc-mono text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joydeep Das"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:border-[#E11D48] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-arc-mono text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                    {profileType === 'club' ? 'Club Designation *' : 'Founder Role *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={profileType === 'club' ? "e.g. President / Tech Head" : "e.g. Co-Founder / Lead"}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:border-[#E11D48] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-arc-mono text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                  {profileType === 'club' ? 'Society / Club Name *' : 'Dhanda / Venture Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={profileType === 'club' ? "e.g. Turing Tech Club" : "e.g. Wyrcan Studio / Campus Munchies"}
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-white border-2 border-black/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:border-[#E11D48] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-arc-mono text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                    Official WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:border-[#E11D48] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-arc-mono text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    placeholder="@venture_or_club"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full bg-white border-2 border-black/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:border-[#E11D48] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-arc-mono text-[11px] font-bold text-black uppercase tracking-wider mb-1">
                  Brief Pitch / Work Description
                </label>
                <textarea
                  rows="2"
                  placeholder={profileType === 'club' ? "What does this club organize?" : "What service or product does your dhanda provide?"}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border-2 border-black/20 rounded-xl p-3 text-xs sm:text-sm font-medium focus:border-[#E11D48] outline-none resize-none"
                />
              </div>

              {/* Secret Verification Code Input */}
              <div className="bg-[#FEF08A]/60 p-4 rounded-2xl border-2 border-dashed border-black/20">
                <label className="block font-arc-mono text-[11px] font-black text-black uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock size={12} />
                    <span>Secret Verification Passcode *</span>
                  </span>
                  <span className="text-[10px] text-[#881337] lowercase">hint: BANTU2026 or WYRCAN</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter secret code from student council"
                  value={formData.secretCode}
                  onChange={(e) => setFormData({ ...formData, secretCode: e.target.value })}
                  className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2 text-xs sm:text-sm font-arc-mono font-bold uppercase tracking-wider focus:border-[#E11D48] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl font-arc-mono text-xs font-bold uppercase tracking-wider text-black/70 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-[#E11D48] hover:bg-[#881337] text-white font-arc-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] border-2 border-black active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
                >
                  Verify & Register Profile →
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
