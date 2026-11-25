'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_THEMES = [
  {
    badge: 'TECH',
    badgeIcon: '💻',
    dark: '#0C4A6E',
    accent: '#0284C7',
    pillBg: '#E0F2FE',
    pillText: '#0C4A6E',
    softBlob: 'rgba(186, 230, 253, 0.75)',
    iconBg: '#F0F9FF'
  },
  {
    badge: 'MUSIC',
    badgeIcon: '🎵',
    dark: '#881337',
    accent: '#E11D48',
    pillBg: '#FEF08A',
    pillText: '#881337',
    softBlob: 'rgba(255, 228, 230, 0.75)',
    iconBg: '#FFF1F2'
  },
  {
    badge: 'STARTUP',
    badgeIcon: '🚀',
    dark: '#4C1D95',
    accent: '#7C3AED',
    pillBg: '#EDE9FE',
    pillText: '#4C1D95',
    softBlob: 'rgba(237, 233, 254, 0.75)',
    iconBg: '#F5F3FF'
  }
];

export default function ClubHeroDeck({ clubs = [] }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const dragStartX = useRef(null);

  if (!clubs || clubs.length < 3) return null;

  const deckClubs = clubs.slice(0, 3).map((club, i) => ({
    ...club,
    ...CARD_THEMES[i % CARD_THEMES.length]
  }));

  const total = deckClubs.length;

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (diff > 45) handlePrev();
    else if (diff < -45) handleNext();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center my-0 select-none px-4">
      {/* Interactive 3D Card Stack */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-full h-[370px] sm:h-[395px] flex items-center justify-center overflow-visible touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {deckClubs.map((club, idx) => {
          // Relative position: 0 = center/active, -1 (or 2) = left, 1 (or -2) = right
          const rel = (idx - activeIndex + total) % total;
          const isCenter = rel === 0;
          const isLeft = rel === total - 1;
          const isRight = rel === 1;

          const transformStyle = isCenter
            ? 'translate3d(0px, -6px, 0px) rotate(0deg) scale(1)'
            : isLeft
            ? 'translate3d(clamp(-140px, -17vw, -55px), 16px, 0px) rotate(-6.5deg) scale(0.9)'
            : 'translate3d(clamp(55px, 17vw, 140px), 16px, 0px) rotate(6.5deg) scale(0.9)';

          return (
            <div
              key={club.id || idx}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              className={`absolute w-[300px] sm:w-[370px] md:w-[410px] bg-[#FFFDF5] rounded-[24px] border-[2.5px] p-5 sm:p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] font-arc-display ${
                isCenter ? 'cursor-default' : 'cursor-pointer opacity-95 hover:opacity-100'
              }`}
              style={{
                transform: transformStyle,
                transformOrigin: 'bottom center',
                zIndex: isCenter ? 30 : isRight ? 20 : 10,
                borderColor: club.dark,
                boxShadow: `5px 5px 0px ${club.dark}`
              }}
            >
              {/* Decorative Background Accents */}
              <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none">
                <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ backgroundColor: club.softBlob }} />
                <div
                  className="absolute bottom-0 left-0 w-14 h-10 opacity-20"
                  style={{
                    backgroundImage:
                      `linear-gradient(45deg, ${club.accent} 25%, transparent 25%), linear-gradient(-45deg, ${club.accent} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${club.accent} 75%), linear-gradient(-45deg, transparent 75%, ${club.accent} 75%)`,
                    backgroundSize: '12px 12px',
                    backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0'
                  }}
                />
              </div>

              {/* Top Row: Pop-out Squircle Icon & Category Pill */}
              <div className="flex items-start justify-between mb-3 relative z-10">
                <div className="relative -mt-9 -ml-2 -rotate-[4deg] shrink-0">
                  <div
                    className="bg-white p-1.5 rounded-[20px] border-[2.5px]"
                    style={{ borderColor: club.dark, boxShadow: `4px 4px 0px ${club.dark}` }}
                  >
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] flex items-center justify-center text-white text-3xl sm:text-4xl relative overflow-hidden"
                      style={{ backgroundColor: club.accent }}
                    >
                      <span className="relative z-10 drop-shadow-sm">{club.avatar}</span>
                    </div>
                  </div>
                </div>

                <span
                  className="font-arc-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 flex items-center gap-1.5"
                  style={{
                    backgroundColor: club.pillBg,
                    color: club.pillText,
                    borderColor: club.dark,
                    boxShadow: `3px 3px 0px ${club.dark}`
                  }}
                >
                  <span>{club.badgeIcon}</span>
                  <span>{club.badge}</span>
                </span>
              </div>

              {/* Club Title & Underline */}
              <div className="relative z-10 mb-2">
                <h3 className="font-black text-2xl sm:text-[26px] text-[#140508] leading-tight tracking-tight">
                  {club.name}
                </h3>
                <div className="w-24 h-1 rounded-full mt-1.5 opacity-85" style={{ backgroundColor: club.accent }} />
              </div>

              {/* Tagline */}
              <p className="relative z-10 font-sans text-xs sm:text-[13px] text-[#475569] font-semibold leading-relaxed mb-4 line-clamp-2">
                {club.tagline}
              </p>

              {/* Currently Recruiting Card Box */}
              <div
                className="relative z-10 bg-white border-2 rounded-[22px] px-4 py-3 mb-5 flex items-center gap-3"
                style={{ borderColor: club.dark, boxShadow: `3px 3px 0px ${club.dark}` }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: club.iconBg, color: club.accent }}
                >
                  <Zap size={16} className="stroke-[2.4]" />
                </div>
                <div className="w-px h-7 bg-black/10 shrink-0" />
                <div className="min-w-0 text-left flex-1">
                  <span className="block font-arc-mono text-[10px] font-black uppercase tracking-wider" style={{ color: club.accent }}>
                    CURRENTLY RECRUITING:
                  </span>
                  <p className="font-sans text-xs font-bold leading-snug line-clamp-1 text-[#140508]">
                    {club.openRoles}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Active Members & Explore Club Pill */}
              <div className="flex items-center justify-between pt-1 relative z-10">
                <span className="text-xs sm:text-[13px] font-bold flex items-center gap-1.5 font-sans" style={{ color: club.dark }}>
                  <Users size={15} style={{ color: club.accent }} />
                  <span>{club.membersCount} Active Members</span>
                </span>

                <Link
                  href={`#${club.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const target = document.getElementById(club.id);
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    backgroundColor: club.accent,
                    borderColor: club.dark,
                    boxShadow: `4px 4px 0px ${club.dark}`
                  }}
                  className="inline-flex items-center gap-1.5 text-white px-4 sm:px-5 py-2.5 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]"
                >
                  <span>EXPLORE CLUB</span>
                  <ArrowRight size={14} className="stroke-[2.8]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls: Prev / Dots / Next */}
      <div className="flex items-center gap-3 mt-2 z-30">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous club card"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center transition-all active:scale-90 cursor-pointer backdrop-blur-sm"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/15 backdrop-blur-sm">
          {deckClubs.map((club, idx) => (
            <button
              key={club.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${club.name}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'w-6 bg-[#FEF08A]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next club card"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center transition-all active:scale-90 cursor-pointer backdrop-blur-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
