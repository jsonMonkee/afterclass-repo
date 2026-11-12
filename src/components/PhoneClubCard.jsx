'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Users, ArrowUpRight } from 'lucide-react';

export default function PhoneClubCard({ club }) {
  // Dynamic aesthetic themes per club type matching the clean iOS squircle card design
  const getCardTheme = () => {
    switch (club.id) {
      case 'dramatics':
        return {
          bgClass: 'bg-[#FFF5F6] border-rose-200/80 shadow-[0_20px_50px_rgba(225,29,72,0.12)]',
          blobBg: 'radial-gradient(circle at 85% 15%, rgba(251, 113, 133, 0.45) 0%, rgba(254, 205, 211, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#E11D48] via-[#F43F5E] to-[#FB7185] shadow-lg shadow-rose-500/35',
          pillBg: 'bg-[#FFE4E6] text-[#BE123C] border border-rose-200',
          boxBg: 'bg-white/90 border border-rose-200/70',
          btnBg: 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-lg shadow-rose-500/30'
        };
      case 'cadence':
        return {
          bgClass: 'bg-[#FAF5FF] border-purple-200/80 shadow-[0_20px_50px_rgba(147,51,234,0.12)]',
          blobBg: 'radial-gradient(circle at 85% 15%, rgba(192, 132, 252, 0.4) 0%, rgba(243, 232, 255, 0.2) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#7E22CE] via-[#9333EA] to-[#A855F7] shadow-lg shadow-purple-500/35',
          pillBg: 'bg-[#F3E8FF] text-[#7E22CE] border border-purple-200',
          boxBg: 'bg-white/90 border border-purple-200/70',
          btnBg: 'bg-[#9333EA] hover:bg-[#7E22CE] text-white shadow-lg shadow-purple-500/30'
        };
      case 'rotaract':
        return {
          bgClass: 'bg-[#F0FDF4] border-emerald-200/80 shadow-[0_20px_50px_rgba(16,185,129,0.12)]',
          blobBg: 'radial-gradient(circle at 85% 15%, rgba(110, 231, 183, 0.45) 0%, rgba(209, 250, 229, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#059669] via-[#10B981] to-[#34D399] shadow-lg shadow-emerald-500/35',
          pillBg: 'bg-[#DCFCE7] text-[#15803D] border border-emerald-200',
          boxBg: 'bg-white/90 border border-emerald-200/70',
          btnBg: 'bg-[#059669] hover:bg-[#047857] text-white shadow-lg shadow-emerald-500/30'
        };
      case 'e-cell':
        return {
          bgClass: 'bg-[#FFF7ED] border-orange-200/80 shadow-[0_20px_50px_rgba(234,88,12,0.12)]',
          blobBg: 'radial-gradient(circle at 85% 15%, rgba(251, 146, 60, 0.4) 0%, rgba(254, 215, 170, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#EA580C] to-[#FB923C] shadow-lg shadow-orange-500/35',
          pillBg: 'bg-[#FFEDD5] text-[#C2410C] border border-orange-200',
          boxBg: 'bg-white/90 border border-orange-200/70',
          btnBg: 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-lg shadow-orange-500/30'
        };
      case 'lenscrafters':
        return {
          bgClass: 'bg-[#F0F9FF] border-sky-200/80 shadow-[0_20px_50px_rgba(2,132,199,0.12)]',
          blobBg: 'radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.4) 0%, rgba(186, 230, 253, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#0284C7] to-[#38BDF8] shadow-lg shadow-sky-500/35',
          pillBg: 'bg-[#E0F2FE] text-[#0369A1] border border-sky-200',
          boxBg: 'bg-white/90 border border-sky-200/70',
          btnBg: 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-lg shadow-sky-500/30'
        };
      default:
        return {
          bgClass: 'bg-[#EEF2FF] border-indigo-200/80 shadow-[0_20px_50px_rgba(79,70,229,0.12)]',
          blobBg: 'radial-gradient(circle at 85% 15%, rgba(129, 140, 248, 0.4) 0%, rgba(224, 231, 255, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#4338CA] via-[#4F46E5] to-[#6366F1] shadow-lg shadow-indigo-500/35',
          pillBg: 'bg-[#E0E7FF] text-[#3730A3] border border-indigo-200',
          boxBg: 'bg-white/90 border border-indigo-200/70',
          btnBg: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg shadow-indigo-500/30'
        };
    }
  };

  const theme = getCardTheme();

  return (
    <div className={`relative w-full rounded-[38px] p-6 sm:p-7 border ${theme.bgClass} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden group select-none`}>
      
      {/* Soft gradient ambient bloom at top-right */}
      <div 
        className="absolute top-0 right-0 w-52 h-44 rounded-tr-[38px] rounded-bl-[120px] pointer-events-none"
        style={{ background: theme.blobBg }}
      />

      <div className="relative z-10">
        {/* Top Row: 3D Squircle Icon + Category Pill */}
        <div className="flex items-center justify-between mb-5">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] ${theme.iconBg} text-white text-3xl flex items-center justify-center overflow-hidden relative shadow-md`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/25 pointer-events-none" />
            <span className="relative z-10 drop-shadow-sm">{club.avatar}</span>
          </div>

          <span className={`font-arc-display text-[11px] sm:text-xs font-extrabold uppercase tracking-wider ${theme.pillBg} px-3.5 sm:px-4 py-1.5 rounded-full shadow-xs`}>
            {club.category}
          </span>
        </div>

        {/* Club Title */}
        <h3 className="font-extrabold text-xl sm:text-[23px] text-[#0F172A] mb-1.5 leading-snug tracking-tight group-hover:text-[#E11D48] transition-colors">
          {club.name}
        </h3>
        
        {/* Tagline */}
        <p className="font-sans text-xs sm:text-[13px] text-[#475569] font-medium leading-relaxed mb-5">
          {club.tagline}
        </p>

        {/* Currently Recruiting Box */}
        <div className={`p-4 rounded-2xl ${theme.boxBg} shadow-xs mb-5`}>
          <span className="text-[10.5px] font-extrabold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider mb-1">
            <Sparkles size={12} className="fill-amber-400 stroke-amber-500" />
            <span>CURRENTLY RECRUITING:</span>
          </span>
          <span className="text-xs sm:text-[12.5px] font-sans text-[#1E293B] font-bold block leading-snug">
            {club.openRoles || 'Executive members, Outreach, Media team'}
          </span>
        </div>
      </div>

      {/* Bottom Row: Active Members & Explore Club Pill */}
      <div className="relative z-10 pt-3 border-t border-black/5 flex items-center justify-between">
        <span className="font-sans text-xs sm:text-[13px] text-[#64748B] font-bold flex items-center gap-1.5">
          <Users size={15} className="opacity-70" />
          <span>{club.membersCount} Active Members</span>
        </span>
        
        <Link
          href={`/clubs/${club.id}`}
          className={`inline-flex items-center gap-1.5 ${theme.btnBg} px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wide transition-all duration-200 active:scale-95 cursor-pointer`}
        >
          <span>EXPLORE CLUB</span>
          <ArrowUpRight size={14} className="stroke-[2.8]" />
        </Link>
      </div>
    </div>
  );
}
