'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowRight, 
  Share2, 
  Check, 
  X, 
  Building2, 
  Phone, 
  ExternalLink,
  Sparkles,
  User,
  Tag
} from 'lucide-react';

export default function DhandaCard({ business }) {
  const [copied, setCopied] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scrolling when Explore modal is open
  useEffect(() => {
    if (showExploreModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showExploreModal]);

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/dhanda#${business.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      id={business.id}
      className="w-full max-w-[420px] mx-auto bg-white rounded-[32px] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-black/10 flex flex-col justify-between font-arc-display select-none transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      
      {/* 1. TOP IMAGE */}
      <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Badge */}
        {business.badge && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/20">
            {business.badge}
          </div>
        )}

        {/* Share button */}
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleShare}
            aria-label="Share business link"
            className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#E11D48] hover:bg-white shadow-sm cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            {copied ? <Check size={14} className="text-emerald-600 stroke-[2.5]" /> : <Share2 size={14} className="stroke-[2.2]" />}
          </button>
        </div>
      </div>

      {/* 2. MIDDLE CONTENT: Left Icon/Company Box + Right Details */}
      <div className="flex items-center gap-4 mt-4 mb-3 px-1">
        
        {/* Left Stacked Company Icon Badge */}
        <div className="w-[72px] shrink-0 flex flex-col items-center">
          {/* Crimson Icon Box */}
          <div className="w-full bg-[#E11D48] text-white rounded-2xl py-2.5 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl leading-none">{business.icon || '💼'}</span>
            <span className="text-[9px] font-bold tracking-wider mt-1 uppercase text-white/90">VENTURE</span>
          </div>
          {/* Soft Price Pill */}
          <div className="w-full bg-[#FFF1F2] text-[#E11D48] text-[10px] font-extrabold py-1 rounded-xl text-center mt-1 border border-[#FFE4E6] truncate px-1">
            {business.priceRange || 'FREE'}
          </div>
        </div>

        {/* Right Business Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Category Tag */}
          <span className="font-arc-mono text-[10.5px] font-bold text-[#E11D48] uppercase tracking-wider mb-0.5">
            {business.category}
          </span>

          {/* Company Name */}
          <h3 className="font-extrabold text-[19px] text-[#000000] leading-snug truncate hover:text-[#E11D48] transition-colors">
            {business.name}
          </h3>

          {/* Founder line */}
          <p className="text-[#EA580C] text-xs font-bold flex items-center gap-1.5 mt-1 truncate">
            <span>🚀</span>
            <span className="truncate">By {business.founder}</span>
          </p>
        </div>

      </div>

      {/* Tagline / Brief Description */}
      <p className="font-sans text-xs text-[#475569] font-medium leading-relaxed px-1 mb-3 line-clamp-2">
        {business.tagline}
      </p>

      {/* 3. BOTTOM ACTION BAR: Red "Explore" Pill Button */}
      <div className="pt-2 px-1">
        <button 
          onClick={() => setShowExploreModal(true)}
          className="w-full bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white font-extrabold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-3 shadow-md transition-all group cursor-pointer"
        >
          <span>Explore</span>
          <span className="w-6 h-6 rounded-full bg-white text-[#E11D48] flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={13} className="stroke-[3]" />
          </span>
        </button>
      </div>

      {/* ================= 4. EXPLORE MODAL POP-UP (Portrait Social Profile Format) ================= */}
      {showExploreModal && mounted && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowExploreModal(false)}
        >
          <div 
            className="w-full max-w-[390px] sm:max-w-[420px] bg-[#16171B] text-white rounded-[36px] shadow-2xl shadow-black/80 relative border border-white/10 overflow-hidden animate-nav-pop my-auto max-h-[92vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setShowExploreModal(false)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-colors border border-white/15"
              aria-label="Close"
            >
              <X size={17} className="stroke-[2.5]" />
            </button>

            {/* 1. TOP COVER BACKGROUND IMAGE */}
            <div className="relative w-full h-44 sm:h-48 shrink-0 overflow-hidden bg-black">
              <img 
                src={business.image} 
                alt={business.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16171B] via-black/30 to-black/50 pointer-events-none" />

              {/* Category Badge on Cover */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#FEF08A] px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#FEF08A]" />
                  <span>{business.category}</span>
                </span>
              </div>
            </div>

            {/* 2. OVERLAPPING CIRCULAR LOGO AVATAR & NOTE BUBBLE */}
            <div className="-mt-16 relative z-20 flex flex-col items-center px-4">
              
              {/* Note Bubble above Avatar (like the reference profile) */}
              <div className="bg-black/80 backdrop-blur-md border border-white/20 text-[#FEF08A] text-[11px] font-bold px-3.5 py-1 rounded-full mb-1.5 shadow-lg flex items-center gap-1.5">
                <span>{business.icon || '🚀'}</span>
                <span>{business.badge || 'VERIFIED VENTURE'}</span>
              </div>

              {/* Circular Avatar */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[4px] border-[#16171B] overflow-hidden bg-white shadow-2xl">
                <img 
                  src={business.logo || business.image} 
                  alt={`${business.name} Logo`} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3. CENTERED PROFILE DETAILS */}
              <h3 className="font-arc-display font-black text-2xl sm:text-[26px] text-white text-center leading-tight mt-3 mb-1">
                {business.name}
              </h3>

              {/* Founder & Business Type Subtitle */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/75 mb-2 text-center">
                <span>By <strong className="text-white font-bold">{business.founder}</strong></span>
                <span className="text-white/30">·</span>
                <span className="text-[#FEF08A] font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                  {business.businessType || 'Tech Startup'}
                </span>
              </div>

              {/* Price Range Pill */}
              <div className="text-[11px] font-bold text-white/80 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full mb-3">
                Starting from <span className="text-[#FEF08A] font-extrabold">{business.priceRange}</span>
              </div>

              {/* Bio / Tagline */}
              <p className="font-sans text-xs sm:text-[13px] text-slate-300 font-normal text-center leading-relaxed px-3 mb-5 max-w-sm">
                {business.tagline}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-4" />

              {/* 4. SQUARE-SHAPED INSTAGRAM & SOCIAL CARDS */}
              <div className="w-full pb-6">
                <span className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
                  Direct Contact & Social Handles
                </span>

                <div className="grid grid-cols-3 gap-2.5">
                  
                  {/* Square Instagram Card */}
                  {business.instagram && (
                    <a 
                      href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="aspect-square bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] p-[1.5px] rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all group flex flex-col cursor-pointer"
                      title={`Open ${business.instagram} on Instagram`}
                    >
                      <div className="w-full h-full bg-[#202126] group-hover:bg-[#282930] rounded-[14px] p-2.5 flex flex-col justify-between items-center text-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-xs">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <span className="font-sans font-bold text-[10.5px] text-white truncate max-w-full px-1">
                          {business.instagram}
                        </span>
                        <span className="text-[9px] font-bold text-white/90 bg-white/10 group-hover:bg-[#E11D48] px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                          Open ↗
                        </span>
                      </div>
                    </a>
                  )}

                  {/* Square WhatsApp Card */}
                  {business.phone && (
                    <a 
                      href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20${encodeURIComponent(business.name)}%20on%20Afterclass%20Dhanda.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="aspect-square bg-emerald-500 p-[1.5px] rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all group flex flex-col cursor-pointer"
                      title="Chat on WhatsApp"
                    >
                      <div className="w-full h-full bg-[#202126] group-hover:bg-[#282930] rounded-[14px] p-2.5 flex flex-col justify-between items-center text-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                          </svg>
                        </div>
                        <span className="font-sans font-bold text-[10.5px] text-white">
                          WhatsApp
                        </span>
                        <span className="text-[9px] font-bold text-white/90 bg-white/10 group-hover:bg-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                          Chat ↗
                        </span>
                      </div>
                    </a>
                  )}

                  {/* Square Phone Call Card */}
                  {business.phone && (
                    <a 
                      href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                      className="aspect-square bg-white/20 p-[1.5px] rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all group flex flex-col cursor-pointer"
                      title={`Call ${business.phone}`}
                    >
                      <div className="w-full h-full bg-[#202126] group-hover:bg-[#282930] rounded-[14px] p-2.5 flex flex-col justify-between items-center text-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/15 flex items-center justify-center text-[#FEF08A] shadow-xs">
                          <Phone size={14} />
                        </div>
                        <span className="font-sans font-bold text-[10.5px] text-white">
                          Phone
                        </span>
                        <span className="text-[9px] font-bold text-white/90 bg-white/10 group-hover:bg-[#E11D48] px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                          Call ↗
                        </span>
                      </div>
                    </a>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
