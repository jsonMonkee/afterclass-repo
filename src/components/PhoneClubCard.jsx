'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Users, ArrowUpRight, X, Check } from 'lucide-react';

const CLUB_PALETTES = [
  { dark: '#881337', accent: '#E11D48', pillBg: '#FEF08A', pillText: '#881337', softBlob: 'rgba(255, 228, 230, 0.75)', iconBg: '#FFF1F2' },
  { dark: '#1E1B4B', accent: '#4F46E5', pillBg: '#E0E7FF', pillText: '#1E1B4B', softBlob: 'rgba(224, 231, 255, 0.75)', iconBg: '#EEF2FF' },
  { dark: '#064E3B', accent: '#059669', pillBg: '#D1FAE5', pillText: '#064E3B', softBlob: 'rgba(209, 250, 229, 0.75)', iconBg: '#ECFDF5' },
  { dark: '#7C2D12', accent: '#EA580C', pillBg: '#FFEDD5', pillText: '#7C2D12', softBlob: 'rgba(255, 237, 213, 0.75)', iconBg: '#FFF7ED' },
  { dark: '#4C1D95', accent: '#7C3AED', pillBg: '#EDE9FE', pillText: '#4C1D95', softBlob: 'rgba(237, 233, 254, 0.75)', iconBg: '#F5F3FF' },
  { dark: '#134E4A', accent: '#0D9488', pillBg: '#CCFBF1', pillText: '#134E4A', softBlob: 'rgba(204, 251, 241, 0.75)', iconBg: '#F0FDFA' }
];

export default function PhoneClubCard({ club, isFollowed, onToggleFollow }) {
  const [showModal, setShowModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hash = String(club?.id || club?.name || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const p = CLUB_PALETTES[hash % CLUB_PALETTES.length];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);
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
  const clubBgImage =
    club.image ||
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="relative w-full pt-5 pb-3 px-1 font-arc-display select-none group">
      
      {/* Layered Tilted Backing Cards */}
      <div
        aria-hidden="true"
        style={{ backgroundColor: p.dark }}
        className="absolute inset-x-2 top-6 bottom-3 rounded-[24px] -rotate-[2.2deg] -translate-x-1 translate-y-1 pointer-events-none transition-transform duration-300 group-hover:-rotate-[3.2deg]"
      />
      <div
        aria-hidden="true"
        style={{ backgroundColor: p.accent }}
        className="absolute inset-x-2 top-6 bottom-3 rounded-[24px] rotate-[1.6deg] translate-y-2 pointer-events-none transition-transform duration-300 group-hover:rotate-[2.4deg]"
      />

      {/* 3D Flip Container (Click once to flip) */}
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="relative cursor-pointer transition-transform duration-300 group-hover:-translate-y-1"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* FRONT FACE */}
          <div
            className={`relative bg-[#FFFDF5] rounded-[24px] border-[2.5px] p-5 sm:p-6 flex flex-col justify-between overflow-visible transition-opacity duration-150 ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              borderColor: p.dark,
              boxShadow: `4px 4px 0px ${p.dark}`
            }}
          >
        {/* Subtle Decorative Background Accents */}
        <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none">
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ backgroundColor: p.softBlob }} />
          <div
            className="absolute bottom-0 left-0 w-14 h-10 opacity-20"
            style={{
              backgroundImage:
                `linear-gradient(45deg, ${p.accent} 25%, transparent 25%), linear-gradient(-45deg, ${p.accent} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${p.accent} 75%), linear-gradient(-45deg, transparent 75%, ${p.accent} 75%)`,
              backgroundSize: '12px 12px',
              backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0'
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Top Row: Pop-Out Club Logo Sticker + Category Pill */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="relative -mt-10 -ml-2 -rotate-[4deg] shrink-0">
              <svg className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none" style={{ color: p.accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <path d="M12 2v5M4 6l4 3M2 14h5" />
              </svg>
              <div
                className="bg-white p-1.5 rounded-[20px] border-[2.5px]"
                style={{ borderColor: p.dark, boxShadow: `4px 4px 0px ${p.dark}` }}
              >
                <div
                  className="w-15 h-15 sm:w-16 sm:h-16 rounded-[14px] text-white text-3xl flex items-center justify-center overflow-hidden relative"
                  style={{ backgroundColor: p.accent }}
                >
                  {club.logo ? (
                    <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="drop-shadow-sm">{club.avatar}</span>
                  )}
                </div>
              </div>
            </div>

            <span
              className="font-arc-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 truncate max-w-[175px]"
              style={{
                backgroundColor: p.pillBg,
                color: p.pillText,
                borderColor: p.dark,
                boxShadow: `3px 3px 0px ${p.dark}`
              }}
            >
              {club.category}
            </span>
          </div>

          {/* Club Title & Brush Underline */}
          <div className="mb-2">
            <h3 className="font-black text-xl sm:text-[24px] text-[#140508] leading-[1.15] tracking-tight line-clamp-2">
              {club.name}
            </h3>
            <div className="w-24 h-1 rounded-full mt-1.5 opacity-85" style={{ backgroundColor: p.accent }} />
          </div>
          
          {/* Tagline */}
          <p className="font-sans text-xs sm:text-[13px] text-[#475569] font-semibold leading-snug mb-4 line-clamp-2">
            {club.tagline}
          </p>

          {/* Currently Recruiting Pill Box */}
          <div
            className="bg-white border-2 rounded-[22px] px-4 py-3 flex items-center gap-3 mb-5"
            style={{ borderColor: p.dark, boxShadow: `3px 3px 0px ${p.dark}` }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: p.iconBg, color: p.accent }}
            >
              <Sparkles size={17} className="stroke-[2.4]" />
            </div>
            <div className="w-px h-8 bg-black/10 shrink-0" />
            <div className="min-w-0 text-left flex-1">
              <span className="block font-arc-mono text-[10px] font-black uppercase tracking-wider" style={{ color: p.accent }}>
                CURRENTLY RECRUITING:
              </span>
              <span className="block font-sans text-xs font-bold text-[#140508] leading-snug line-clamp-2">
                {club.openRoles || 'Executive members, Outreach, Media team'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Active Members & Explore Club CTA */}
        <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
          <div className="min-w-0">
            <span className="text-xs font-bold flex items-center gap-1.5 font-sans truncate" style={{ color: p.dark }}>
              <Users size={15} style={{ color: p.accent }} className="shrink-0" />
              <span className="truncate">{club.membersCount} Active Members</span>
            </span>
            <div className="w-20 h-0.5 rounded-full mt-1 opacity-60" style={{ backgroundColor: p.accent }} />
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            style={{
              backgroundColor: p.accent,
              borderColor: p.dark,
              boxShadow: `4px 4px 0px ${p.dark}`
            }}
            className="shrink-0 text-white font-arc-display font-black text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl border-2 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>EXPLORE CLUB</span>
            <ArrowUpRight size={14} className="stroke-[2.8]" />
          </button>
        </div>
      </div>

          {/* BACK FACE (Club Details + Recruiting & Members) */}
          <div
            className={`absolute inset-0 bg-[#FFFDF5] rounded-[24px] border-[2.5px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-opacity duration-150 ${isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderColor: p.dark,
              boxShadow: `4px 4px 0px ${p.dark}`
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-arc-mono text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border-2"
                  style={{ backgroundColor: p.pillBg, color: p.pillText, borderColor: p.dark }}
                >
                  ABOUT THIS CLUB
                </span>
                <span className="font-arc-mono text-[10px] font-bold opacity-60 uppercase" style={{ color: p.dark }}>
                  Tap to flip back ↺
                </span>
              </div>

              <p className="font-sans text-xs sm:text-[13.5px] text-[#140508] font-medium leading-relaxed mb-4 line-clamp-4">
                {club.description || club.tagline || `Join ${club.name} at Amity University Kolkata for campus activities, workshops, and community meetups.`}
              </p>
            </div>

            <div className="space-y-3">
              <div
                className="bg-white border-2 rounded-2xl px-4 py-3"
                style={{ borderColor: p.dark, boxShadow: `3px 3px 0px ${p.dark}` }}
              >
                <span className="block font-arc-mono text-[10px] font-black uppercase tracking-wider mb-0.5" style={{ color: p.accent }}>
                  OPEN ROLES & COMMUNITY
                </span>
                <span className="block font-sans text-xs font-bold text-[#140508] line-clamp-2">
                  {club.openRoles || 'Executive members, Outreach, Media team'}
                </span>
                <span className="block font-sans text-xs font-semibold text-[#475569] mt-0.5">
                  👥 {club.membersCount} Active Members · {club.category}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold truncate font-sans" style={{ color: p.dark }}>
                  ✨ {club.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                  style={{
                    backgroundColor: p.accent,
                    borderColor: p.dark,
                    boxShadow: `4px 4px 0px ${p.dark}`
                  }}
                  className="shrink-0 text-white font-arc-display font-black text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl border-2 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>EXPLORE CLUB</span>
                  <ArrowUpRight size={14} className="stroke-[2.8]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Club Explore Pop-Up Dialog */}
      {showModal && mounted && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-[440px] bg-white rounded-[32px] p-6 sm:p-7 shadow-2xl border-2 border-[#E11D48]/20 text-[#0F172A] font-arc-display my-auto animate-nav-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFF1F2] hover:bg-[#E11D48] text-[#E11D48] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={17} className="stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-4 mb-5 pr-8">
              <div className={`w-16 h-16 rounded-[20px] ${theme.iconBg} text-white text-3xl flex items-center justify-center overflow-hidden shrink-0 shadow-md`}>
                {club.logo ? (
                  <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{club.avatar}</span>
                )}
              </div>
              <div>
                <span className={`inline-block font-arc-mono text-[10px] font-bold uppercase tracking-wider ${theme.pillBg} px-2.5 py-0.5 rounded-full mb-1`}>
                  {club.category}
                </span>
                <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A] leading-tight">
                  {club.name}
                </h3>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
              {club.tagline}
            </p>

            <div className="bg-[#FFFDF5] border border-rose-100 rounded-2xl p-4 mb-5">
              <span className="text-[10.5px] font-extrabold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider mb-1">
                <Sparkles size={12} className="fill-amber-400 stroke-amber-500" />
                <span>CURRENTLY RECRUITING:</span>
              </span>
              <p className="font-sans text-xs sm:text-[13px] font-bold text-[#1E293B]">
                {club.openRoles || 'Executive members, Outreach, Media team'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/10">
              <span className="font-sans text-xs font-bold text-[#64748B] flex items-center gap-1.5">
                <Users size={15} />
                <span>{club.membersCount} Active Members</span>
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={club.whatsappGroup || `https://wa.me/?text=${encodeURIComponent(`Hi! I'd like to join the ${club.name} WhatsApp group on Afterclass.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                  </svg>
                  <span>Join WhatsApp Group</span>
                </a>

                {onToggleFollow && (
                  <button
                    type="button"
                    onClick={() => onToggleFollow(club.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                      isFollowed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E11D48] hover:bg-[#BE123C] text-white'
                    }`}
                  >
                    {isFollowed && <Check size={14} className="stroke-[2.8]" />}
                    <span>{isFollowed ? 'Following' : 'Follow'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
