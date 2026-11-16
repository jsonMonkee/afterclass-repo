'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Users } from 'lucide-react';

export default function ClubHeroDeck({ clubs = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!clubs || clubs.length < 3) return null;

  // 3 featured clubs configured with:
  // 1. Sky Blue Card (Left, Tech/Turing)
  // 2. Pure White Card with soft subtle accents (Center, Music/Cadence)
  // 3. White & Red Mixture Card (Right, Startup/E-Cell)
  const deckClubs = [
    {
      ...clubs[0],
      badge: 'TECH',
      badgeIcon: '💻',
      theme: 'sky-blue',
      bgClass: 'bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#075985] text-white border border-sky-300/40 shadow-[0_30px_60px_rgba(2,132,199,0.45)]',
      iconBg: 'bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] shadow-lg shadow-sky-400/40',
      pillBg: 'bg-white/20 text-white border border-white/25',
      boxBg: 'bg-[#034D75]/60 border border-sky-300/25',
      btnBg: 'bg-[#38BDF8] hover:bg-[#0284C7] text-[#082F49] font-black shadow-lg shadow-sky-400/35',
      blobColor: 'radial-gradient(circle at 85% 15%, rgba(125, 211, 252, 0.45) 0%, rgba(3, 105, 161, 0.2) 60%, transparent 80%)'
    },
    {
      ...clubs[1],
      badge: 'MUSIC',
      badgeIcon: '🎵',
      theme: 'white',
      bgClass: 'bg-white text-[#0F172A] shadow-[0_35px_80px_rgba(0,0,0,0.35)] border border-black/5',
      iconBg: 'bg-gradient-to-br from-[#4338CA] via-[#6366F1] to-[#8B5CF6] shadow-xl shadow-indigo-500/40',
      pillBg: 'bg-[#EEF2FF] text-[#4338CA] border border-indigo-200/80',
      boxBg: 'bg-[#F8FAFC] border border-slate-200/80',
      btnBg: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xl shadow-blue-600/35',
      blobColor: 'radial-gradient(circle at 85% 15%, rgba(165, 180, 252, 0.45) 0%, rgba(224, 231, 255, 0.2) 60%, transparent 80%)'
    },
    {
      ...clubs[2],
      badge: 'STARTUP',
      badgeIcon: '🚀',
      theme: 'white-red-mix',
      bgClass: 'bg-[#FFF5F6] text-[#881337] border-2 border-[#FECDD3] shadow-[0_30px_60px_rgba(225,29,72,0.25)]',
      iconBg: 'bg-gradient-to-tr from-[#E11D48] to-[#FB7185] shadow-lg shadow-rose-500/35 text-white',
      pillBg: 'bg-white text-[#E11D48] border border-rose-300 shadow-xs',
      boxBg: 'bg-white border border-rose-200/80',
      btnBg: 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-lg shadow-rose-500/35',
      blobColor: 'radial-gradient(circle at 85% 15%, rgba(254, 205, 211, 0.6) 0%, rgba(255, 241, 242, 0.3) 60%, transparent 80%)'
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[460px] sm:h-[490px] flex items-center justify-center my-2 overflow-visible select-none px-4">
      <div className="relative w-full h-full flex items-center justify-center">
        {deckClubs.map((club, idx) => {
          const isCenter = idx === 1;
          const isLeft = idx === 0;
          const isRight = idx === 2;
          const isHovered = hoveredIdx === idx;

          const zIndex = isHovered ? 40 : isCenter ? 30 : 10;

          return (
            <div
              key={club.id || idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`absolute w-[300px] sm:w-[370px] md:w-[410px] rounded-[38px] p-6 sm:p-7 text-left transition-all duration-500 ease-out cursor-pointer font-arc-display ${club.bgClass}`}
              style={{
                transform: isHovered
                  ? `translate3d(${isLeft ? 'clamp(-130px, -18vw, -60px)' : isRight ? 'clamp(60px, 18vw, 130px)' : '0px'}, -14px, 0px) rotate(0deg) scale(1.04)`
                  : isCenter
                  ? 'translate3d(0px, -4px, 0px) rotate(0deg) scale(1)'
                  : isLeft
                  ? 'translate3d(clamp(-130px, -16vw, -65px), 14px, 0px) rotate(-6.5deg) scale(0.92)'
                  : 'translate3d(clamp(65px, 16vw, 130px), 14px, 0px) rotate(6.5deg) scale(0.92)',
                transformOrigin: 'bottom center',
                zIndex: zIndex
              }}
            >
              {/* Decorative top-right organic flow blob backdrop */}
              <div 
                className="absolute top-0 right-0 w-48 h-40 rounded-tr-[38px] rounded-bl-[110px] pointer-events-none"
                style={{ background: club.blobColor }}
              />

              {/* Top Row: App-like squircle icon & Category Pill */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                {/* 3D App Squircle Icon */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] ${club.iconBg} flex items-center justify-center text-white text-3xl sm:text-4xl shadow-inner relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/25 pointer-events-none" />
                  <span className="relative z-10 drop-shadow-sm">{club.avatar}</span>
                </div>

                {/* Category Pill with Icon */}
                <span className={`font-arc-display text-xs font-extrabold uppercase tracking-wider ${club.pillBg} px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs`}>
                  <span>{club.badgeIcon}</span>
                  <span>{club.badge}</span>
                </span>
              </div>

              {/* Club Title */}
              <h3 className="font-extrabold text-2xl sm:text-[26px] mb-1.5 leading-tight tracking-tight">
                {club.name}
              </h3>

              {/* Tagline */}
              <p className="font-sans text-xs sm:text-[13.5px] opacity-75 font-medium leading-relaxed mb-5 line-clamp-1 sm:line-clamp-none">
                {club.tagline}
              </p>

              {/* Currently Recruiting Card Box */}
              <div className={`${club.boxBg} rounded-2xl p-4 mb-6 shadow-xs`}>
                <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-[11px] uppercase tracking-wider mb-1">
                  <Zap size={13} className="fill-amber-400 stroke-amber-500" />
                  <span>CURRENTLY RECRUITING:</span>
                </div>
                <p className="font-sans text-xs sm:text-[13px] font-bold leading-snug line-clamp-2 sm:line-clamp-none opacity-90">
                  {club.openRoles}
                </p>
              </div>

              {/* Bottom Row: Active Members & Explore Club Pill */}
              <div className="flex items-center justify-between pt-1 relative z-10">
                <span className="text-xs sm:text-[13px] font-bold opacity-80 flex items-center gap-1.5 font-sans">
                  <Users size={15} className="opacity-70" />
                  <span>{club.membersCount} Active Members</span>
                </span>

                <Link
                  href={`#${club.id}`}
                  onClick={(e) => {
                    const target = document.getElementById(club.id);
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`inline-flex items-center gap-2 ${club.btnBg} px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all duration-200 active:scale-95`}
                >
                  <span>EXPLORE CLUB</span>
                  <ArrowRight size={14} className="stroke-[2.8]" />
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
