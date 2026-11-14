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

      {/* ================= 4. EXPLORE MODAL POP-UP (Portaled directly to document.body for true screen centering) ================= */}
      {showExploreModal && mounted && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowExploreModal(false)}
        >
          <div 
            className="w-full max-w-4xl bg-[#FFFDF5] rounded-[32px] sm:rounded-[36px] shadow-2xl shadow-black/50 relative border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 overflow-hidden animate-nav-pop my-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setShowExploreModal(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-black flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={17} className="stroke-[2.5]" />
            </button>

            {/* ------------ LEFT SIDE: 9:16 Aspect Image Poster with Circular Logo ------------ */}
            <div className="md:col-span-5 relative w-full min-h-[340px] md:min-h-[480px] overflow-hidden bg-black border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col justify-between p-6">
              
              {/* Background 9:16 Cover Image */}
              <img 
                src={business.image} 
                alt={business.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              {/* Dark Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none" />

              {/* Top Badge Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider bg-[#E11D48] text-white px-3 py-1 rounded-full shadow-sm">
                  {business.badge || 'VERIFIED'}
                </span>
                <span className="font-sans text-[10px] text-white/80 font-semibold uppercase">
                  9:16 SHOWCASE
                </span>
              </div>

              {/* Center: Prominent Circular Logo Image */}
              <div className="relative z-10 flex flex-col items-center text-center my-auto">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-[0_12px_30px_rgba(0,0,0,0.5)] overflow-hidden bg-white mb-3">
                  <img 
                    src={business.logo || business.image} 
                    alt={`${business.name} Logo`} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="inline-flex items-center gap-2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 shadow-sm">
                  <span className="text-base leading-none">{business.icon}</span>
                  <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                    {business.name}
                  </span>
                </div>
              </div>

              {/* Bottom Details Overlay on Image */}
              <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between text-white/90 font-sans text-xs">
                <span className="font-medium">Amity Student Dhanda</span>
                <span className="font-bold text-[#FEF08A]">{business.priceRange}</span>
              </div>

            </div>

            {/* ------------ RIGHT SIDE: Detailed Content (Company, Founder, Business Type, Socials) ------------ */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between font-sans text-left space-y-5 bg-[#FFFDF5]">
              
              <div>
                {/* 1. Category Pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#E11D48] uppercase tracking-wider mb-2">
                  <Sparkles size={13} />
                  <span>{business.category}</span>
                </div>

                {/* 2. Company Name */}
                <h3 className="font-arc-display font-black text-2xl sm:text-3xl md:text-4xl text-black leading-tight mb-2">
                  {business.name}
                </h3>

                {/* Tagline */}
                <p className="font-sans text-xs sm:text-sm text-[#475569] font-medium leading-relaxed mb-5">
                  {business.tagline}
                </p>

                {/* 3. Key Business Metadata Grid (Founder & Business Type) */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                  
                  {/* Founder */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#E11D48] flex items-center justify-center shrink-0">
                      <User size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Founder(s)</span>
                      <span className="font-arc-display font-black text-sm text-black leading-snug">
                        {business.founder}
                      </span>
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Tag size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Type</span>
                      <span className="inline-block bg-[#FFF1F2] text-[#E11D48] text-xs font-sans font-bold px-2.5 py-0.5 rounded-full border border-[#FECDD3] mt-0.5">
                        {business.businessType || 'Startup / Personal Business'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 4. Social & Contact Handles: Modular Square-Shaped Cards */}
              <div>
                <h4 className="font-arc-display font-black text-xs uppercase tracking-wider text-black mb-3">
                  Direct Contact & Social Handles:
                </h4>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  
                  {/* 1. Square-Shaped Instagram Handle Card */}
                  {business.instagram && (
                    <a 
                      href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="aspect-square bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] p-[1.5px] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col cursor-pointer"
                      title={`Open ${business.instagram} on Instagram`}
                    >
                      <div className="w-full h-full bg-[#FFFDF5] group-hover:bg-white rounded-[14px] p-2.5 sm:p-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-xs">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-white bg-black/80 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider group-hover:bg-[#E11D48] transition-colors shadow-2xs">
                            Open ↗
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">Instagram</span>
                          <span className="font-arc-display font-black text-xs sm:text-sm text-black group-hover:text-[#E11D48] truncate block">
                            {business.instagram}
                          </span>
                        </div>
                      </div>
                    </a>
                  )}

                  {/* 2. Square-Shaped WhatsApp Direct Chat Card */}
                  {business.phone && (
                    <a 
                      href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20${encodeURIComponent(business.name)}%20on%20Afterclass%20Dhanda.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="aspect-square bg-emerald-500 p-[1.5px] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col cursor-pointer"
                      title="Chat on WhatsApp"
                    >
                      <div className="w-full h-full bg-[#FFFDF5] group-hover:bg-white rounded-[14px] p-2.5 sm:p-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" viewBox="0 0 24 24">
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-white bg-black/80 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider group-hover:bg-emerald-600 transition-colors shadow-2xs">
                            Chat ↗
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">WhatsApp</span>
                          <span className="font-arc-display font-black text-xs sm:text-sm text-black group-hover:text-emerald-600 truncate block">
                            Direct Chat
                          </span>
                        </div>
                      </div>
                    </a>
                  )}

                  {/* 3. Square-Shaped Phone Call Card */}
                  {business.phone && (
                    <a 
                      href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                      className="aspect-square bg-slate-900 p-[1.5px] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col cursor-pointer"
                      title={`Call ${business.phone}`}
                    >
                      <div className="w-full h-full bg-[#FFFDF5] group-hover:bg-white rounded-[14px] p-2.5 sm:p-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 flex items-center justify-center text-[#FEF08A] shadow-xs">
                            <Phone size={14} />
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-white bg-black/80 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider group-hover:bg-[#E11D48] transition-colors shadow-2xs">
                            Call ↗
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</span>
                          <span className="font-arc-display font-black text-xs sm:text-sm text-black group-hover:text-[#E11D48] truncate block">
                            {business.phone}
                          </span>
                        </div>
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
