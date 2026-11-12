'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Share2, Check, X } from 'lucide-react';

export default function SocialEventCard({ event }) {
  const [copied, setCopied] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

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
    <div className="w-full max-w-[420px] mx-auto bg-white rounded-[32px] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-black/10 flex flex-col justify-between font-arc-display select-none transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* 1. TOP IMAGE */}
      <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Subtle Badge */}
        {event.badge && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/20">
            {event.badge}
          </div>
        )}
        {/* Share button (replaces wishlist/bookmark) */}
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleShare}
            aria-label="Share event link"
            className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#E11D48] hover:bg-white shadow-sm cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            {copied ? <Check size={14} className="text-emerald-600 stroke-[2.5]" /> : <Share2 size={14} className="stroke-[2.2]" />}
          </button>
        </div>
      </div>

      {/* 2. MIDDLE CONTENT: Left Date Pill + Right Details */}
      <div className="flex items-center gap-4 mt-4 mb-3 px-1">
        
        {/* Left Stacked Date Badge */}
        <div className="w-[72px] shrink-0 flex flex-col items-center">
          {/* Red Date Box */}
          <div className="w-full bg-[#E11D48] text-white rounded-2xl py-2 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl font-black leading-none">{day}</span>
            <span className="text-[10.5px] font-bold tracking-wider mt-0.5 uppercase">{month}</span>
          </div>
          {/* Soft Red Time Pill */}
          <div className="w-full bg-[#FFF1F2] text-[#E11D48] text-[11px] font-extrabold py-1 rounded-xl text-center mt-1 border border-[#FFE4E6]">
            {startTime}
          </div>
        </div>

        {/* Right Event Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Title */}
          <Link href={`/events/${event.id}`}>
            <h3 className="font-extrabold text-[18px] text-[#000000] leading-snug line-clamp-2 hover:text-[#E11D48] transition-colors">
              {event.title}
            </h3>
          </Link>

          {/* Organiser line with party popper / badge */}
          <p className="text-[#EA580C] text-xs font-bold flex items-center gap-1.5 mt-1.5 truncate">
            <span>🎉</span>
            <span className="truncate">Organised by {event.club}</span>
          </p>
        </div>

      </div>

      {/* 3. BOTTOM ACTION BAR: Red Join Pill Button */}
      <div className="pt-2 px-1">
        <button 
          onClick={() => setShowWhatsAppModal(true)}
          className="w-full bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white font-extrabold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-3 shadow-md transition-all group cursor-pointer"
        >
          <span>Join</span>
          <span className="w-6 h-6 rounded-full bg-white text-[#E11D48] flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={13} className="stroke-[3]" />
          </span>
        </button>
      </div>

      {/* WhatsApp Modal Pop-up */}
      {showWhatsAppModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowWhatsAppModal(false)}
        >
          <div 
            className="w-full max-w-[360px] bg-white rounded-[32px] p-7 shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative border-2 border-black flex flex-col items-center text-center font-arc-display animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            {/* WhatsApp Green Icon */}
            <div className="w-20 h-20 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_12px_28px_rgba(37,211,102,0.38)] mb-6 mt-1">
              <svg 
                className="w-11 h-11 fill-current drop-shadow-xs" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.21 8.21 0 0 1-1.26-4.47c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
              </svg>
            </div>

            {/* Join WhatsApp Button */}
            <a 
              href="https://chat.whatsapp.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-extrabold text-base py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/30 transition-all cursor-pointer"
            >
              <span>Join WhatsApp</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

