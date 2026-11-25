'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Share2, Check, X, Calendar, Users } from 'lucide-react';

const EVENT_THEMES = [
  // 1. Red-colored card
  {
    dark: '#881337',
    accent: '#E11D48',
    accentHover: '#BE123C',
    pillBg: '#FEF08A',
    pillText: '#881337',
    softBlob: 'rgba(255, 228, 230, 0.75)',
    iconBg: '#FFF1F2'
  },
  // 2. Pink theme
  {
    dark: '#831843',
    accent: '#EC4899',
    accentHover: '#DB2777',
    pillBg: '#FCE7F3',
    pillText: '#831843',
    softBlob: 'rgba(251, 207, 232, 0.75)',
    iconBg: '#FDF2F8'
  },
  // 3. Sky blue theme
  {
    dark: '#0C4A6E',
    accent: '#0284C7',
    accentHover: '#0369A1',
    pillBg: '#E0F2FE',
    pillText: '#0C4A6E',
    softBlob: 'rgba(186, 230, 253, 0.75)',
    iconBg: '#F0F9FF'
  },
  // 4. Emerald theme
  {
    dark: '#064E3B',
    accent: '#059669',
    accentHover: '#047857',
    pillBg: '#D1FAE5',
    pillText: '#064E3B',
    softBlob: 'rgba(209, 250, 229, 0.75)',
    iconBg: '#ECFDF5'
  }
];

export default function SocialEventCard({ event }) {
  const [copied, setCopied] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const idNum = parseInt(String(event?.id || '').replace(/\D/g, ''), 10);
  const themeIdx = Number.isFinite(idNum) && idNum > 0
    ? (idNum - 1) % EVENT_THEMES.length
    : String(event?.title || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % EVENT_THEMES.length;
  const t = EVENT_THEMES[themeIdx];

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/events/${event.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  // Helper to extract day, month, and time
  // e.g. "Fri, Nov 20, 2026", "4:00 PM - 10:00 PM"
  const parseDate = (dateStr) => {
    if (!dateStr) return { day: '20', month: 'NOV' };
    const parts = dateStr.replace(',', '').split(' ');
    // Look for number and month name
    let day = '20';
    let month = 'NOV';
    for (const part of parts) {
      if (!isNaN(parseInt(part)) && parseInt(part) < 32) {
        day = part;
      } else if (part.length >= 3 && isNaN(parseInt(part)) && !part.includes('202')) {
        month = part.toUpperCase().slice(0, 4);
      }
    }
    return { day, month };
  };

  const parseTime = (timeStr) => {
    return '4 PM';
  };

  const { day, month } = parseDate(event.date);
  const startTime = parseTime(event.time);

  return (
    <div className="relative w-full max-w-[420px] mx-auto pt-5 pb-3 px-2 font-arc-display select-none group">
      
      {/* Layered Tilted Backing Cards */}
      <div
        aria-hidden="true"
        style={{ backgroundColor: t.dark }}
        className="absolute inset-x-3 top-6 bottom-3 rounded-[24px] -rotate-[2.5deg] -translate-x-1.5 translate-y-1 pointer-events-none transition-transform duration-300 group-hover:-rotate-[3.5deg]"
      />
      <div
        aria-hidden="true"
        style={{ backgroundColor: t.accent }}
        className="absolute inset-x-3 top-6 bottom-3 rounded-[24px] rotate-[1.8deg] translate-y-2 pointer-events-none transition-transform duration-300 group-hover:rotate-[2.5deg]"
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
              borderColor: t.dark,
              boxShadow: `4px 4px 0px ${t.dark}`
            }}
          >
            {/* Subtle Decorative Background Accents */}
            <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none">
              <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ backgroundColor: t.softBlob }} />
              <div
                className="absolute bottom-0 left-0 w-14 h-10 opacity-20"
                style={{
                  backgroundImage:
                    `linear-gradient(45deg, ${t.accent} 25%, transparent 25%), linear-gradient(-45deg, ${t.accent} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${t.accent} 75%), linear-gradient(-45deg, transparent 75%, ${t.accent} 75%)`,
                  backgroundSize: '12px 12px',
                  backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0'
                }}
              />
            </div>

            {/* Top Row: Pop-Out Date Squircle + Category Pill + Share */}
            <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
              {/* Pop-out Tilted Sticker Date Box */}
              <div className="relative -mt-10 -ml-2 -rotate-[4deg] shrink-0">
                <svg className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none" style={{ color: t.accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                  <path d="M12 2v5M4 6l4 3M2 14h5" />
                </svg>
                <div
                  className="bg-white p-1.5 rounded-[20px] border-[2.5px]"
                  style={{ borderColor: t.dark, boxShadow: `4px 4px 0px ${t.dark}` }}
                >
                  <div
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-[14px] text-white flex flex-col items-center justify-center overflow-hidden relative"
                    style={{ backgroundColor: t.accent }}
                  >
                    <span className="text-2xl font-black leading-none text-[#FEF08A]">{day}</span>
                    <span className="text-[10px] font-arc-mono font-bold tracking-widest uppercase mt-0.5 text-white">{month}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <span
                  className="font-arc-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 truncate max-w-[170px]"
                  style={{
                    backgroundColor: t.pillBg,
                    color: t.pillText,
                    borderColor: t.dark,
                    boxShadow: `3px 3px 0px ${t.dark}`
                  }}
                >
                  {event.badge || event.category || 'CAMPUS EVENT'}
                </span>

                <button 
                  onClick={handleShare}
                  aria-label="Share event link"
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border-2 flex items-center justify-center cursor-pointer transition-transform active:scale-90 shrink-0"
                  style={{ borderColor: t.dark, color: t.dark, boxShadow: `2px 2px 0px ${t.dark}` }}
                >
                  {copied ? <Check size={14} className="text-emerald-600 stroke-[2.8]" /> : <Share2 size={14} className="stroke-[2.4]" />}
                </button>
              </div>
            </div>

            {/* Title & Brush Underline */}
            <div className="relative z-10 mb-2">
              <h3 className="font-black text-2xl sm:text-[26px] text-[#140508] leading-[1.12] tracking-tight transition-colors line-clamp-2">
                {event.title}
              </h3>
              <div className="w-24 h-1 rounded-full mt-1.5 opacity-85" style={{ backgroundColor: t.accent }} />
            </div>

            {/* Organiser / Tagline */}
            <p className="relative z-10 font-sans text-xs sm:text-[13px] text-[#475569] font-semibold leading-snug mb-4 line-clamp-2">
              {event.description || `Organised by ${event.club} · Amity University Kolkata`}
            </p>

            {/* Pill Info Box (Full Schedule & Full Location visible without cutoff) */}
            <div
              className="relative z-10 bg-white border-2 rounded-[22px] px-4 py-3 flex items-center gap-3 mb-5"
              style={{ borderColor: t.dark, boxShadow: `3px 3px 0px ${t.dark}` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: t.iconBg, color: t.accent }}
              >
                <Calendar size={18} className="stroke-[2.4]" />
              </div>
              <div className="w-px h-9 bg-black/10 shrink-0" />
              <div className="min-w-0 text-left flex-1">
                <span className="block font-arc-mono text-[10px] font-black uppercase tracking-wider" style={{ color: t.accent }}>
                  EVENT SCHEDULE:
                </span>
                <span className="block font-sans text-xs font-bold text-[#140508] leading-snug">
                  {event.date} · {startTime}
                </span>
                {event.venue && (
                  <span className="block font-sans text-[11.5px] font-semibold text-[#475569] leading-snug mt-0.5">
                    📍 {event.venue}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Row: Club Organiser + CTA Button */}
            <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
              <div className="min-w-0">
                <span className="text-xs font-bold flex items-center gap-1.5 font-sans truncate" style={{ color: t.dark }}>
                  <Users size={15} style={{ color: t.accent }} className="shrink-0" />
                  <span className="truncate">{event.club}</span>
                </span>
                <div className="w-20 h-0.5 rounded-full mt-1 opacity-60" style={{ backgroundColor: t.accent }} />
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWhatsAppModal(true);
                }}
                style={{
                  backgroundColor: t.accent,
                  borderColor: t.dark,
                  boxShadow: `4px 4px 0px ${t.dark}`
                }}
                className="shrink-0 text-white font-arc-display font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border-2 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>JOIN EVENT</span>
                <ArrowUpRight size={14} className="stroke-[2.8]" />
              </button>
            </div>
          </div>

          {/* BACK FACE (Description + Full Schedule & Location, No Title) */}
          <div
            className={`absolute inset-0 bg-[#FFFDF5] rounded-[24px] border-[2.5px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-opacity duration-150 ${isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderColor: t.dark,
              boxShadow: `4px 4px 0px ${t.dark}`
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-arc-mono text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border-2"
                  style={{ backgroundColor: t.pillBg, color: t.pillText, borderColor: t.dark }}
                >
                  ABOUT THIS EVENT
                </span>
                <span className="font-arc-mono text-[10px] font-bold opacity-60 uppercase" style={{ color: t.dark }}>
                  Tap to flip back ↺
                </span>
              </div>

              <p className="font-sans text-xs sm:text-[13.5px] text-[#140508] font-medium leading-relaxed mb-4">
                {event.description || `Join ${event.club} for an exciting campus session at Amity University Kolkata.`}
              </p>
            </div>

            <div className="space-y-3">
              <div
                className="bg-white border-2 rounded-2xl px-4 py-3"
                style={{ borderColor: t.dark, boxShadow: `3px 3px 0px ${t.dark}` }}
              >
                <span className="block font-arc-mono text-[10px] font-black uppercase tracking-wider mb-0.5" style={{ color: t.accent }}>
                  SCHEDULE & LOCATION
                </span>
                <span className="block font-sans text-xs font-bold text-[#140508]">
                  {event.date} · {event.time || startTime}
                </span>
                {event.venue && (
                  <span className="block font-sans text-xs font-semibold text-[#475569] mt-0.5">
                    📍 {event.venue}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold truncate font-sans" style={{ color: t.dark }}>
                  🎉 {event.club}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowWhatsAppModal(true);
                  }}
                  style={{
                    backgroundColor: t.accent,
                    borderColor: t.dark,
                    boxShadow: `3px 3px 0px ${t.dark}`
                  }}
                  className="shrink-0 text-white font-arc-display font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl border-2 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>JOIN EVENT</span>
                  <ArrowUpRight size={14} className="stroke-[2.8]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal Pop-up */}
      {showWhatsAppModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowWhatsAppModal(false)}
        >
          <div 
            className="w-full max-w-[380px] bg-white rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative border border-rose-200/80 flex flex-col items-center text-center font-arc-display animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF1F2] hover:bg-[#E11D48] text-[#E11D48] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            {/* WhatsApp Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(37,211,102,0.3)] mb-3.5 mt-1">
              <svg 
                className="w-8 h-8 fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.21 8.21 0 0 1-1.26-4.47c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
              </svg>
            </div>

            <span className="font-arc-mono text-[10px] font-bold uppercase tracking-widest text-[#E11D48] bg-[#FFF1F2] px-3 py-0.5 rounded-full border border-[#FFE4E6] mb-2">
              Event WhatsApp Group
            </span>

            <h4 className="font-extrabold text-xl text-[#0F172A] leading-snug mb-1">
              {event.title}
            </h4>

            <p className="font-sans text-xs text-[#64748B] font-medium mb-5">
              {event.date}{event.venue ? ` · ${event.venue}` : ''}
            </p>

            {/* Join WhatsApp Button */}
            <a 
              href={event.whatsappGroup || `https://wa.me/?text=${encodeURIComponent(`Hi! I'd like to join the WhatsApp group for ${event.title} on Afterclass.`)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white font-extrabold text-sm py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 transition-all cursor-pointer"
            >
              <span>Join WhatsApp Group</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

