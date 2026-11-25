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

const AVATAR_PATTERNS = [
  // 1. Diagonal Crimson & Gold Doodle Stripes
  {
    background: 'repeating-linear-gradient(45deg, #E11D48 0px, #E11D48 6px, #FEF08A 6px, #FEF08A 12px)'
  },
  // 2. Conic Sunburst (Zomato / Food warm vibe)
  {
    background: 'repeating-conic-gradient(from 0deg, #E11D48 0deg 20deg, #FB923C 20deg 40deg, #FEF08A 40deg 60deg)'
  },
  // 3. Electric Violet & Cyan Gradient
  {
    background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 50%, #06B6D4 100%)'
  },
  // 4. Checker / Dotted Conic (Black & Cream)
  {
    background: 'repeating-conic-gradient(from 15deg, #0F172A 0deg 15deg, #FEF08A 15deg 30deg)'
  },
  // 5. Sunset Rose & Amber
  {
    background: 'linear-gradient(45deg, #F59E0B 0%, #E11D48 50%, #881337 100%)'
  },
  // 6. Fresh Emerald & Citrus Swirl (Swiggy / Herbal vibe)
  {
    background: 'repeating-conic-gradient(from 0deg, #10B981 0deg 24deg, #FEF08A 24deg 48deg, #FB923C 48deg 72deg)'
  }
];

export default function DhandaCard({ business }) {
  const [copied, setCopied] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const idNum = parseInt(String(business?.id || '').replace(/\D/g, ''), 10);
  const patternIndex = Number.isFinite(idNum) && idNum > 0
    ? (idNum - 1) % AVATAR_PATTERNS.length
    : 0;
  const avatarPatternStyle = AVATAR_PATTERNS[patternIndex];

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
      className="relative w-full max-w-[350px] sm:max-w-[360px] mx-auto px-4 pt-4 pb-8 sm:px-5 sm:pt-5 sm:pb-9 flex flex-col justify-between font-arc-display select-none transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* 0. DOODLE FRAME SVG BACKGROUND & BORDER (Faint dark-reddish neo-brutalist shadow) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[5px_5px_0px_rgba(136,19,55,0.45)]"
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

      {/* SVG ClipPath for Cover Image matching the Outer Doodle Frame */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="doodle-banner-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.11,0.06 C 0.30,0.01 0.56,0.00 0.89,0.05 C 0.96,0.06 0.99,0.14 0.99,0.28 C 1.00,0.48 1.00,0.68 0.99,0.82 C 0.98,0.92 0.94,0.97 0.86,0.98 C 0.65,1.00 0.35,1.00 0.14,0.98 C 0.06,0.97 0.02,0.92 0.01,0.82 C 0.00,0.68 0.00,0.48 0.01,0.28 C 0.01,0.14 0.04,0.07 0.11,0.06 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 1. TOP COVER BANNER IMAGE (Organic doodle silhouette matching the whole card) */}
      <div className="relative aspect-[16/10] w-full z-10 pt-2">
        <div
          className="relative w-full h-full overflow-hidden shadow-inner"
          style={{ clipPath: 'url(#doodle-banner-clip)' }}
        >
          <img 
            src={business.image} 
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

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
        
        {/* Centralized Circular DP: Unique patterned ring per card */}
        <div
          style={avatarPatternStyle}
          className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full p-[4.5px] shadow-[0_10px_24px_rgba(0,0,0,0.2)] -mt-14 sm:-mt-16 mb-2.5 z-20 transition-transform duration-300 hover:scale-105"
        >
          <div className="w-full h-full rounded-full border-[3px] border-white bg-white overflow-hidden flex items-center justify-center">
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
        </div>

        {/* Category & Badge (Clean soft pills) */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-arc-mono text-[10px] font-bold text-[#E11D48] uppercase tracking-wider bg-[#FFF1F2] px-2.5 py-0.5 rounded-full border border-[#FFE4E6]">
            {business.category}
          </span>
          {business.priceRange && (
            <span className="font-sans text-[10px] font-extrabold text-[#475569] bg-slate-100 px-2.5 py-0.5 rounded-full">
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
        <p className="font-sans text-xs text-[#475569] font-medium leading-relaxed mb-4 line-clamp-2 px-2 max-w-[300px]">
          {business.tagline}
        </p>

        {/* 3. BOTTOM ACTION BAR: Dark-Reddish Neo-Brutalist "Explore" Button */}
        <div className="w-full flex justify-center pt-0.5 pb-1">
          <button 
            onClick={() => setShowExploreModal(true)}
            className="w-full max-w-[230px] bg-[#E11D48] hover:bg-[#BE123C] text-white font-arc-display font-extrabold text-sm tracking-wide py-2.5 px-6 rounded-2xl border-2 border-[#881337] shadow-[4px_4px_0px_#881337] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#881337] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center transition-all duration-150 cursor-pointer select-none"
          >
            Explore
          </button>
        </div>

      </div>

      {/* ================= 4. EXPLORE MODAL POP-UP (Comic/Zine Layered Neo-Brutalist Style) ================= */}
      {showExploreModal && mounted && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowExploreModal(false)}
        >
          <div 
            className="relative w-full max-w-[420px] md:max-w-[900px] my-auto animate-nav-pop select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tilted Layered Comic Backing Cards */}
            <div className="absolute inset-0 rounded-[28px] bg-[#881337] border-[2.5px] border-[#881337] -rotate-[2deg] translate-y-1.5 -translate-x-1 pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] bg-[#E11D48] border-[2.5px] border-[#881337] rotate-[1.2deg] translate-y-0.5 translate-x-1 pointer-events-none" />

            {/* Main Warm Cream Paper Modal Card */}
            <div className="relative w-full bg-[#FFFDF5] rounded-[28px] border-[2.5px] border-[#881337] shadow-[6px_6px_0px_#881337] p-6 sm:p-8 md:p-9 text-[#0F172A] flex flex-col md:flex-row gap-6 md:gap-8 items-center font-arc-display">
              {/* Top Close Button: Straddling halfway outside the top-right corner */}
              <button
                onClick={() => setShowExploreModal(false)}
                className="absolute -top-4 -right-4 z-30 w-11 h-11 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 border-[2.5px] border-[#881337] shadow-[3px_3px_0px_#881337]"
                aria-label="Close"
              >
                <X size={18} className="stroke-[2.8]" />
              </button>

              {/* LEFT COLUMN: Framed 4:5 Cover Photo + Overlapping Patterned Circular DP + Gold Pill */}
              <div className="relative z-10 w-full md:w-[38%] shrink-0 flex flex-col items-center justify-center">
                <div className="relative aspect-[4/5] w-full rounded-[22px] border-[2.5px] border-[#881337] shadow-[4px_4px_0px_#881337] overflow-hidden bg-white">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Patterned Circular DP overlapping cover */}
                <div
                  style={avatarPatternStyle}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[5px] border-[2.5px] border-[#881337] shadow-[3px_3px_0px_#881337] -mt-14 sm:-mt-16 mb-3 z-20"
                >
                  <div className="w-full h-full rounded-full border-[3px] border-white bg-white overflow-hidden flex items-center justify-center">
                    <img 
                      src={business.logo || business.image} 
                      alt={`${business.name} Logo`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Business Name / Brand Title under Logo */}
                <h3 className="font-righteous font-normal text-xl sm:text-2xl text-[#881337] leading-tight text-center tracking-tight px-2">
                  {business.name}
                </h3>
              </div>

              {/* RIGHT COLUMN: Comic Details & Direct Contact */}
              <div className="relative z-10 w-full md:w-[62%] bg-[#FFF5F6] border-2 border-[#881337] rounded-[24px] p-5 sm:p-6 shadow-[4px_4px_0px_#881337] flex flex-col items-center md:items-start text-center md:text-left">
                {/* Category & Domain Tags */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3.5 pr-4">
                  {business.category && (
                    <span className="font-arc-mono text-[11px] font-extrabold text-[#881337] uppercase tracking-wider bg-[#FEF08A] px-3 py-1 rounded-full border-2 border-[#881337] shadow-[2px_2px_0px_#881337]">
                      {business.category}
                    </span>
                  )}
                  {business.businessType && (
                    <span className="font-arc-mono text-[11px] font-extrabold text-[#E11D48] uppercase tracking-wider bg-white px-3 py-1 rounded-full border-2 border-[#881337] shadow-[2px_2px_0px_#881337]">
                      {business.businessType}
                    </span>
                  )}
                  {Array.isArray(business.tags) && business.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-arc-mono text-[11px] font-extrabold text-[#881337] uppercase tracking-wider bg-[#FFE4E6] px-3 py-1 rounded-full border-2 border-[#881337] shadow-[2px_2px_0px_#881337]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ABOUT THIS VENTURE Box */}
                <div className="w-full bg-white border-2 border-[#881337] rounded-2xl p-4 mb-4 text-left shadow-[3px_3px_0px_#881337]">
                  <span className="inline-block font-arc-mono text-[10px] font-extrabold uppercase tracking-widest text-[#881337] bg-[#FEF08A] px-2.5 py-0.5 rounded-md border border-[#881337] mb-2">
                    ABOUT THIS VENTURE
                  </span>
                  <p className="font-sans text-xs sm:text-[13.5px] text-[#0F172A] font-semibold leading-relaxed mb-1.5">
                    {business.description || business.tagline}
                  </p>
                  <p className="font-sans text-[11.5px] text-[#475569] leading-relaxed">
                    Student-run at Amity University Kolkata. Reach out directly via Instagram or WhatsApp for quick inquiries, custom orders, or campus meetups.
                  </p>
                </div>

                {/* Structured 2x2 Info Grid */}
                <div className="w-full grid grid-cols-2 gap-2.5 mb-4 text-left">
                  <div className="bg-[#FFFDF5] border-2 border-[#881337] rounded-xl p-2.5 flex items-start gap-2.5 shadow-[2px_2px_0px_#881337]">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE4E6] border border-[#881337] text-[#E11D48] flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} className="stroke-[2.4]" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">Founder</span>
                      <span className="block text-xs font-bold text-[#0F172A] truncate">{business.founder}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFFDF5] border-2 border-[#881337] rounded-xl p-2.5 flex items-start gap-2.5 shadow-[2px_2px_0px_#881337]">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE4E6] border border-[#881337] text-[#E11D48] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 size={14} className="stroke-[2.4]" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">Business Type</span>
                      <span className="block text-xs font-bold text-[#0F172A] truncate">{business.businessType || 'Tech Startup'}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFFDF5] border-2 border-[#881337] rounded-xl p-2.5 flex items-start gap-2.5 shadow-[2px_2px_0px_#881337]">
                    <div className="w-7 h-7 rounded-lg bg-[#FEF08A] border border-[#881337] text-[#881337] flex items-center justify-center shrink-0 mt-0.5">
                      <Tag size={14} className="stroke-[2.4]" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">Pricing</span>
                      <span className="block text-xs font-extrabold text-[#E11D48] truncate">{business.priceRange || 'Contact'}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFFDF5] border-2 border-[#881337] rounded-xl p-2.5 flex items-start gap-2.5 shadow-[2px_2px_0px_#881337]">
                    <div className="w-7 h-7 rounded-lg bg-[#FFE4E6] border border-[#881337] text-[#E11D48] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={14} className="stroke-[2.4]" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">Campus Hub</span>
                      <span className="block text-xs font-bold text-[#0F172A] truncate">Amity Kolkata</span>
                    </div>
                  </div>
                </div>

                {/* Clean Direct Contact & Socials (Neo-Brutalist Buttons) */}
                <div className="w-full">
                  <div className="flex flex-wrap gap-2.5">
                    {/* 1. Instagram */}
                    {business.instagram && (
                      <a 
                        href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] flex items-center gap-2.5 bg-white hover:bg-[#FFF1F2] text-[#0F172A] rounded-2xl px-3 py-2.5 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#881337] transition-all group cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] border border-[#881337] flex items-center justify-center text-white shrink-0">
                          <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div className="min-w-0 text-left">
                          <span className="block font-arc-mono text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">Instagram</span>
                          <span className="block font-sans text-xs font-extrabold text-[#E11D48] truncate">{business.instagram}</span>
                        </div>
                      </a>
                    )}

                    {/* 2. WhatsApp */}
                    {business.phone && (
                      <a 
                        href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20${encodeURIComponent(business.name)}%20on%20Afterclass%20Dhanda.`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[125px] flex items-center gap-2.5 bg-white hover:bg-emerald-50 text-[#0F172A] rounded-2xl px-3 py-2.5 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#881337] transition-all group cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#25D366] border border-[#881337] flex items-center justify-center text-white shrink-0">
                          <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                          </svg>
                        </div>
                        <div className="min-w-0 text-left">
                          <span className="block font-arc-mono text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">WhatsApp</span>
                          <span className="block font-sans text-xs font-extrabold text-emerald-700">Chat</span>
                        </div>
                      </a>
                    )}

                    {/* 3. Phone Call */}
                    {business.phone && (
                      <a 
                        href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                        className="flex-1 min-w-[140px] flex items-center gap-2.5 bg-white hover:bg-[#FEF08A]/40 text-[#0F172A] rounded-2xl px-3 py-2.5 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#881337] transition-all group cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#881337] border border-[#881337] flex items-center justify-center text-[#FEF08A] shrink-0">
                          <Phone size={16} />
                        </div>
                        <div className="min-w-0 text-left">
                          <span className="block font-arc-mono text-[9.5px] font-bold uppercase tracking-wider text-[#881337]/70">Call</span>
                          <span className="block font-sans text-xs font-extrabold text-[#0F172A] truncate">{business.phone}</span>
                        </div>
                      </a>
                    )}
                  </div>
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
