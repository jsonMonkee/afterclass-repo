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
      className="relative w-full max-w-[400px] mx-auto p-4 sm:p-5 pb-6 sm:pb-7 flex flex-col justify-between font-arc-display select-none transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* 0. DOODLE FRAME SVG BACKGROUND & BORDER (Tailored Portrait 400x580 Doodle TV/Pillow Silhouette) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_16px_36px_rgba(225,29,72,0.14)]"
        viewBox="0 0 400 580"
        preserveAspectRatio="none"
      >
        {/* Outer Hand-Drawn Doodle Stroke (#E11D48 Crimson, natural ~12px stroke) */}
        <path 
          d="M 38,28 C 100,14 200,8 362,26 C 382,28 392,42 394,76 C 398,180 398,400 394,504 C 392,538 380,550 362,554 C 280,568 215,572 130,566 C 70,562 44,558 38,550 C 18,542 8,526 6,492 C 2,390 2,190 6,88 C 8,46 18,32 38,28 Z" 
          fill="#E11D48"
        />
        {/* Inner Card Fill (Clean White) */}
        <path 
          d="M 46,38 C 104,25 200,20 354,36 C 372,38 380,50 382,82 C 386,180 386,400 382,496 C 380,528 370,538 354,542 C 276,555 215,559 134,554 C 78,550 52,546 46,538 C 28,530 20,516 18,484 C 14,386 14,196 18,96 C 20,58 28,42 46,38 Z" 
          fill="#FFFFFF"
        />
        {/* Organic Hand-Drawn White Highlight Ribbon along bottom & right inner edge */}
        <path 
          d="M 374,90 C 378,190 378,400 374,488 C 372,518 364,528 350,532 C 274,544 215,548 138,543 C 84,540 60,536 54,530 C 48,525 44,522 52,525 C 76,532 140,538 215,538 C 290,538 344,532 358,522 C 368,514 372,498 373,476 C 375,390 375,190 370,95 Z" 
          fill="#FFFDF5"
          opacity="0.95"
        />
      </svg>

      {/* 1. TOP COVER BANNER IMAGE (Shifted down with pt-4 sm:pt-5) */}
      <div className="relative aspect-[16/10] w-full z-10 p-1 pt-4 sm:pt-5">
        <div className="relative w-full h-full rounded-[44px] sm:rounded-[50px] overflow-hidden shadow-inner">
          <img 
            src={business.image} 
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          
          {/* Badge */}
          {business.badge && (
            <div className="absolute top-2.5 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/20">
              {business.badge}
            </div>
          )}

          {/* Share button */}
          <div className="absolute top-2.5 right-3">
            <button 
              onClick={handleShare}
              aria-label="Share business link"
              className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#E11D48] hover:bg-white shadow-sm cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              {copied ? <Check size={14} className="text-emerald-600 stroke-[2.5]" /> : <Share2 size={14} className="stroke-[2.2]" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE & LOWER CONTENT: Centralized Logo (Enlarged), Startup Name, Handles & Action */}
      <div className="relative z-10 flex flex-col items-center text-center mt-1 px-2 pb-1">
        
        {/* Centralized Circular DP: Shifted significantly higher up (-mt-15 sm:-mt-17) */}
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-[4px] border-white ring-2 ring-[#E11D48] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] overflow-hidden flex items-center justify-center -mt-15 sm:-mt-17 mb-2.5 z-20 transition-transform duration-300 hover:scale-105">
          {business.logo ? (
            <img 
              src={business.logo} 
              alt={business.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl sm:text-4xl">{business.icon || '💼'}</span>
          )}
        </div>

        {/* Category & Badge */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-arc-mono text-[10px] font-bold text-[#E11D48] uppercase tracking-wider bg-[#FFF1F2] px-2 py-0.5 rounded-full border border-[#FFE4E6]">
            {business.category}
          </span>
          {business.priceRange && (
            <span className="font-sans text-[10px] font-extrabold text-[#475569] bg-slate-100 px-2 py-0.5 rounded-full">
              {business.priceRange}
            </span>
          )}
        </div>

        {/* Startup Name */}
        <h3 className="font-extrabold text-xl sm:text-[22px] text-[#000000] leading-snug truncate max-w-full hover:text-[#E11D48] transition-colors mb-0.5">
          {business.name}
        </h3>

        {/* Founder Line */}
        <p className="text-[#EA580C] text-xs font-bold flex items-center justify-center gap-1 mb-2 truncate max-w-full">
          <span>🚀</span>
          <span>By {business.founder}</span>
        </p>

        {/* Tagline / Brief Description */}
        <p className="font-sans text-xs text-[#475569] font-medium leading-relaxed mb-4 line-clamp-2 px-1 max-w-sm">
          {business.tagline}
        </p>

        {/* 3. BOTTOM ACTION BAR: Red "Explore" Pill Button (Cleanly nested inside the card boundaries) */}
        <div className="w-full">
          <button 
            onClick={() => setShowExploreModal(true)}
            className="w-full bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white font-extrabold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all group cursor-pointer"
          >
            <span>Explore</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#E11D48] flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={11} className="stroke-[3]" />
            </span>
          </button>
        </div>

      </div>

      {/* ================= 4. EXPLORE MODAL POP-UP (Red Card + White Text Portrait Format) ================= */}
      {showExploreModal && mounted && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowExploreModal(false)}
        >
          <div 
            className="w-full max-w-[390px] sm:max-w-[420px] bg-[#E11D48] text-white rounded-[36px] shadow-2xl shadow-black/60 relative border border-white/20 overflow-hidden animate-nav-pop my-auto max-h-[92vh] overflow-y-auto flex flex-col arc-grain-red"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setShowExploreModal(false)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-colors border border-white/20 shadow-md"
              aria-label="Close"
            >
              <X size={17} className="stroke-[2.5]" />
            </button>

            {/* 1. TOP 16:9 COVER BACKGROUND IMAGE WITH RED & WHITE SCALLOP PATTERN */}
            <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden bg-slate-900">
              <img 
                src={business.image} 
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

              {/* Category Badge on Cover */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#FEF08A] px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#FEF08A]" />
                  <span>{business.category}</span>
                </span>
              </div>

              {/* Red & White Scallop Ribbon at Banner End */}
              <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col">
                {/* Crisp White Scallop Line */}
                <div 
                  className="w-full h-2.5 bg-repeat-x"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 10' fill='%23FFFFFF'%3E%3Cpath d='M0 10 C 6 0, 18 0, 24 10 Z'/%3E%3C/svg%3E")`,
                    backgroundSize: '20px 10px'
                  }}
                />
                {/* Crimson Red Scallop Teeth blending into the card body */}
                <div 
                  className="w-full h-3 bg-repeat-x -mt-0.5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' fill='%23E11D48'%3E%3Cpath d='M0 12 C 6 0, 18 0, 24 12 Z'/%3E%3C/svg%3E")`,
                    backgroundSize: '24px 12px'
                  }}
                />
              </div>
            </div>

            {/* 2. OVERLAPPING CIRCULAR LOGO AVATAR (Shifted high above banner end) */}
            <div className="-mt-22 relative z-20 flex flex-col items-center px-4">
              
              {/* Note Bubble above Avatar */}
              <div className="bg-[#FFFDF5] text-[#881337] text-[11px] font-black px-3.5 py-1 rounded-full mb-1.5 shadow-lg border border-white/40 flex items-center gap-1.5">
                <span>{business.icon || '🚀'}</span>
                <span>{business.badge || 'VERIFIED VENTURE'}</span>
              </div>

              {/* Circular Avatar */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[4px] border-[#E11D48] overflow-hidden bg-white shadow-2xl">
                <img 
                  src={business.logo || business.image} 
                  alt={`${business.name} Logo`} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3. CENTERED RED CARD WHITE TEXT PROFILE DETAILS */}
              <h3 className="font-arc-display font-black text-2xl sm:text-[26px] text-white text-center leading-tight mt-3 mb-1">
                {business.name}
              </h3>

              {/* Founder & Business Type Subtitle */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-white/90 mb-2 text-center">
                <span>By <strong className="text-white font-extrabold">{business.founder}</strong></span>
                <span className="text-white/40">·</span>
                <span className="text-[#FEF08A] font-bold bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                  {business.businessType || 'Tech Startup'}
                </span>
              </div>

              {/* Price Range Pill */}
              <div className="text-[11px] font-bold text-white/95 bg-black/20 border border-white/15 px-3 py-0.5 rounded-full mb-3">
                Starting from <span className="text-[#FEF08A] font-extrabold">{business.priceRange}</span>
              </div>

              {/* Bio / Tagline in Crisp White */}
              <p className="font-sans text-xs sm:text-[13px] text-white/90 font-medium text-center leading-relaxed px-3 mb-5 max-w-sm">
                {business.tagline}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/20 mb-4" />

              {/* 4. SQUARE-SHAPED INSTAGRAM & SOCIAL CARDS */}
              <div className="w-full pb-7">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                    Direct Contact & Socials
                  </span>
                  <span className="text-[10px] font-semibold text-white/60">
                    Tap to connect
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  
                  {/* 1. Square Instagram Card */}
                  {business.instagram && (
                    <a 
                      href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative aspect-square bg-white hover:bg-slate-50 text-black rounded-2xl p-2.5 sm:p-3 shadow-lg shadow-black/20 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-200 flex flex-col justify-between items-center text-center group cursor-pointer border border-white"
                      title={`Open ${business.instagram} on Instagram`}
                    >
                      <span className="absolute top-2 right-2 text-slate-300 group-hover:text-[#E11D48] transition-colors text-xs font-bold leading-none">
                        ↗
                      </span>

                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] flex items-center justify-center text-white shadow-sm mt-0.5">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>

                      <div className="w-full">
                        <span className="block font-arc-display font-black text-xs text-black group-hover:text-[#E11D48] transition-colors leading-tight">
                          Instagram
                        </span>
                        <span className="block font-sans text-[10.5px] font-semibold text-[#E11D48] truncate max-w-full mt-0.5">
                          {business.instagram}
                        </span>
                      </div>
                    </a>
                  )}

                  {/* 2. Square WhatsApp Card */}
                  {business.phone && (
                    <a 
                      href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20${encodeURIComponent(business.name)}%20on%20Afterclass%20Dhanda.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative aspect-square bg-white hover:bg-slate-50 text-black rounded-2xl p-2.5 sm:p-3 shadow-lg shadow-black/20 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-200 flex flex-col justify-between items-center text-center group cursor-pointer border border-white"
                      title="Chat on WhatsApp"
                    >
                      <span className="absolute top-2 right-2 text-slate-300 group-hover:text-emerald-600 transition-colors text-xs font-bold leading-none">
                        ↗
                      </span>

                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm mt-0.5">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                        </svg>
                      </div>

                      <div className="w-full">
                        <span className="block font-arc-display font-black text-xs text-black group-hover:text-emerald-600 transition-colors leading-tight">
                          WhatsApp
                        </span>
                        <span className="block font-sans text-[10.5px] font-semibold text-emerald-600 truncate max-w-full mt-0.5">
                          Direct Chat
                        </span>
                      </div>
                    </a>
                  )}

                  {/* 3. Square Phone Call Card */}
                  {business.phone && (
                    <a 
                      href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                      className="relative aspect-square bg-white hover:bg-slate-50 text-black rounded-2xl p-2.5 sm:p-3 shadow-lg shadow-black/20 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-200 flex flex-col justify-between items-center text-center group cursor-pointer border border-white"
                      title={`Call ${business.phone}`}
                    >
                      <span className="absolute top-2 right-2 text-slate-300 group-hover:text-[#E11D48] transition-colors text-xs font-bold leading-none">
                        ↗
                      </span>

                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#FEF08A] shadow-sm mt-0.5">
                        <Phone size={17} />
                      </div>

                      <div className="w-full">
                        <span className="block font-arc-display font-black text-xs text-black group-hover:text-[#E11D48] transition-colors leading-tight">
                          Call Line
                        </span>
                        <span className="block font-sans text-[10.5px] font-semibold text-slate-500 truncate max-w-full mt-0.5">
                          {business.phone}
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
