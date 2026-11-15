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
      className="relative w-full max-w-[420px] mx-auto p-4 sm:p-5 flex flex-col justify-between font-arc-display select-none transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* 0. DOODLE FRAME SVG BACKGROUND & BORDER (Smooth Organic Doodle Pillow/TV Silhouette) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_16px_36px_rgba(225,29,72,0.14)]"
        viewBox="0 0 442 314"
        preserveAspectRatio="none"
      >
        {/* Outer Hand-Drawn Doodle Stroke (#E11D48 Crimson, smooth organic bezier) */}
        <path 
          d="M 40,14 C 130,2 250,0 360,6 C 395,8 420,16 432,38 C 442,56 441,120 441,180 C 441,230 436,260 424,282 C 412,302 385,308 340,312 C 260,316 140,310 70,298 C 35,292 18,278 8,252 C -2,226 0,150 1,110 C 2,65 10,28 40,14 Z" 
          fill="#E11D48"
        />
        {/* Inner Card Fill (Clean White, smooth organic bezier) */}
        <path 
          d="M 48,24 C 135,14 250,12 355,18 C 388,20 410,26 422,46 C 430,62 431,120 431,180 C 431,228 426,252 414,272 C 404,288 378,296 335,298 C 260,302 145,296 78,286 C 45,280 30,268 20,244 C 11,220 12,150 13,115 C 14,72 22,36 48,24 Z" 
          fill="#FFFFFF"
        />
        {/* Organic Hand-Drawn White Highlight Ribbon along bottom & right inner edge */}
        <path 
          d="M 416,56 C 424,100 424,180 422,230 C 420,255 414,270 404,282 C 388,294 340,298 250,298 C 160,296 85,288 44,278 C 36,276 30,270 38,274 C 70,285 150,294 240,296 C 330,296 375,292 392,280 C 406,268 412,248 414,222 C 416,170 416,100 410,60 Z" 
          fill="#FFFDF5"
          opacity="0.95"
        />
      </svg>

      {/* SVG ClipPath Definition for the Smooth Doodle Image Frame */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="doodle-img-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.1086 0.0764 C 0.3054 0.0446 0.5656 0.0382 0.8032 0.0573 C 0.8778 0.0637 0.9276 0.0828 0.9548 0.1465 C 0.9729 0.1975 0.9751 0.3822 0.9751 0.5732 C 0.9751 0.7261 0.9638 0.8025 0.9367 0.8662 C 0.9140 0.9172 0.8552 0.9427 0.7579 0.9490 C 0.5882 0.9618 0.3281 0.9427 0.1765 0.9108 C 0.1018 0.8917 0.0679 0.8535 0.0452 0.7771 C 0.0249 0.7006 0.0271 0.4777 0.0294 0.3662 C 0.0317 0.2293 0.0498 0.1146 0.1086 0.0764 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 1. TOP IMAGE (Smooth Organic Doodle Contour) */}
      <div className="relative aspect-[16/10] w-full z-10 p-1">
        {/* Doodle Image Container clipped to smooth organic doodle silhouette */}
        <div 
          className="relative w-full h-full overflow-hidden"
          style={{ clipPath: 'url(#doodle-img-clip)' }}
        >
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

        {/* Doodle Stroke & Inset Highlight Overlay over image */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 442 314"
          preserveAspectRatio="none"
        >
          {/* Subtle dark-tint doodle border around image */}
          <path 
            d="M 40,14 C 130,2 250,0 360,6 C 395,8 420,16 432,38 C 442,56 441,120 441,180 C 441,230 436,260 424,282 C 412,302 385,308 340,312 C 260,316 140,310 70,298 C 35,292 18,278 8,252 C -2,226 0,150 1,110 C 2,65 10,28 40,14 Z" 
            fill="none"
            stroke="#000000"
            strokeWidth="5"
            opacity="0.10"
          />
        </svg>
      </div>

      {/* 2. MIDDLE & LOWER CONTENT: Centralized Logo (Enlarged), Startup Name, Handles & Action */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 px-2">
        
        {/* Centralized Circular Logo (Enlarged and shifted higher over the cover image) */}
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-[3.5px] border-[#E11D48] bg-white shadow-xl overflow-hidden flex items-center justify-center -mt-14 sm:-mt-16 mb-2 z-20">
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
        <p className="font-sans text-xs text-[#475569] font-medium leading-relaxed mb-3 line-clamp-2 px-1 max-w-sm">
          {business.tagline}
        </p>

        {/* 2 Buttons With Handle: WhatsApp + Instagram */}
        <div className="w-full grid grid-cols-2 gap-2 mb-3">
          
          {/* 1. WhatsApp Button with Handle/Number */}
          {business.phone ? (
            <a 
              href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20${encodeURIComponent(business.name)}%20on%20Afterclass%20Dhanda.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 active:scale-95 border border-[#25D366]/30 text-[#128C7E] transition-all cursor-pointer group/wa min-w-0"
              title="Chat on WhatsApp"
            >
              <div className="w-5 h-5 rounded-lg bg-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[10px] font-bold leading-tight text-[#128C7E]">WhatsApp</span>
                <span className="text-[9.5px] font-semibold text-slate-600 truncate leading-tight">
                  {business.phone}
                </span>
              </div>
            </a>
          ) : (
            <div className="py-2 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-center text-[10px] font-bold flex items-center justify-center">
              No WhatsApp
            </div>
          )}

          {/* 2. Instagram Button with Handle */}
          {business.instagram ? (
            <a 
              href={`https://instagram.com/${business.instagram.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#FD5949]/10 to-[#D6249F]/10 hover:from-[#FD5949]/20 hover:to-[#D6249F]/20 active:scale-95 border border-[#D6249F]/30 text-[#C13584] transition-all cursor-pointer group/ig min-w-0"
              title={`Open ${business.instagram} on Instagram`}
            >
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[10px] font-bold leading-tight text-[#C13584]">Instagram</span>
                <span className="text-[9.5px] font-semibold text-slate-600 truncate leading-tight">
                  {business.instagram}
                </span>
              </div>
            </a>
          ) : (
            <div className="py-2 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-center text-[10px] font-bold flex items-center justify-center">
              No Instagram
            </div>
          )}

        </div>

        {/* 3. BOTTOM ACTION BAR: Red "Explore" Pill Button */}
        <div className="w-full">
          <button 
            onClick={() => setShowExploreModal(true)}
            className="w-full bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white font-extrabold text-sm py-2 px-4 rounded-full flex items-center justify-center gap-2.5 shadow-md transition-all group cursor-pointer"
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
