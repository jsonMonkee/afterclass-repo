'use client';

import React, { useState } from 'react';
import { ArrowRight, Share2, Check, X, Building2, ExternalLink } from 'lucide-react';

export default function DhandaCard({ business }) {
  const [copied, setCopied] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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
        
        {/* Left Stacked Company Icon Badge (replaces date) */}
        <div className="w-[72px] shrink-0 flex flex-col items-center">
          {/* Crimson Icon Box */}
          <div className="w-full bg-[#E11D48] text-white rounded-2xl py-2.5 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl leading-none">{business.icon || '💼'}</span>
            <span className="text-[9.5px] font-bold tracking-wider mt-1 uppercase text-white/90">VENTURE</span>
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
          onClick={() => setShowContactModal(true)}
          className="w-full bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white font-extrabold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-3 shadow-md transition-all group cursor-pointer"
        >
          <span>Explore</span>
          <span className="w-6 h-6 rounded-full bg-white text-[#E11D48] flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={13} className="stroke-[3]" />
          </span>
        </button>
      </div>

      {/* Contact / Explore Modal Pop-up */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="w-full max-w-[380px] bg-white rounded-[32px] p-7 shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative border-2 border-black flex flex-col items-center text-center font-arc-display animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            {/* Business Icon Badge */}
            <div className="w-20 h-20 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center text-3xl shadow-sm mb-4 mt-1 border border-[#FECDD3]">
              {business.icon || '⚡'}
            </div>

            <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider mb-1">
              {business.category}
            </span>

            <h4 className="font-black text-2xl text-black mb-1">
              {business.name}
            </h4>

            <p className="text-xs text-[#64748B] font-bold mb-4">
              Founded by {business.founder}
            </p>

            <p className="font-sans text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6 font-medium">
              {business.tagline}
            </p>

            <div className="w-full space-y-2.5">
              {/* WhatsApp direct contact */}
              {business.whatsapp && (
                <a 
                  href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20your%20venture%20on%20Afterclass%20Dhanda.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-extrabold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Connect on WhatsApp</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {/* Instagram link */}
              {business.instagram && (
                <a 
                  href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-extrabold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Follow {business.instagram}</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
