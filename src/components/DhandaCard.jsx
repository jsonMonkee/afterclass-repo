'use client';

import React, { useState } from 'react';
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

      {/* ================= 4. EXPLORE MODAL POP-UP (Left 9:16 Visual with Circular Logo + Right Details) ================= */}
      {showExploreModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowExploreModal(false)}
        >
          <div 
            className="w-full max-w-3xl bg-[#FFFDF5] rounded-[36px] sm:rounded-[44px] shadow-[12px_12px_0px_#000000] relative border-[3px] border-black grid grid-cols-1 md:grid-cols-12 overflow-hidden animate-nav-pop my-6 max-h-[92vh] overflow-y-auto md:overflow-visible"
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
            <div className="md:col-span-5 relative w-full aspect-[9/16] min-h-[320px] md:min-h-[460px] overflow-hidden bg-black border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between p-6">
              
              {/* Background 9:16 Cover Image */}
              <img 
                src={business.image} 
                alt={business.name}
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />

              {/* Dark Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50 pointer-events-none" />

              {/* Top Badge Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-arc-mono text-[10px] font-black uppercase tracking-wider bg-[#E11D48] text-white px-3 py-1 rounded-full shadow-sm">
                  {business.badge || 'VERIFIED'}
                </span>
                <span className="font-arc-mono text-[10px] text-white/80 uppercase">
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

                <div className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/25">
                  <span className="text-base leading-none">{business.icon}</span>
                  <span className="font-arc-mono text-[11px] font-black text-white uppercase tracking-wider">
                    {business.name}
                  </span>
                </div>
              </div>

              {/* Bottom Details Overlay on Image */}
              <div className="relative z-10 pt-2 border-t border-white/20 flex items-center justify-between text-white/90 font-arc-mono text-[10.5px]">
                <span>Amity Student Dhanda</span>
                <span className="font-bold text-[#FEF08A]">{business.priceRange}</span>
              </div>

            </div>

            {/* ------------ RIGHT SIDE: Detailed Content (Company, Founder, Business Type, Socials) ------------ */}
            <div className="md:col-span-7 p-6 sm:p-9 flex flex-col justify-between font-sans text-left">
              
              <div>
                {/* 1. Category Pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-arc-mono font-bold text-[#E11D48] uppercase tracking-wider mb-2">
                  <Sparkles size={13} />
                  <span>{business.category}</span>
                </div>

                {/* 2. Company Name */}
                <h3 className="font-arc-display font-black text-3xl sm:text-4xl text-black leading-tight mb-2">
                  {business.name}
                </h3>

                {/* Tagline */}
                <p className="font-sans text-xs sm:text-sm text-[#475569] font-medium leading-relaxed mb-6">
                  {business.tagline}
                </p>

                {/* 3. Key Business Metadata Grid (Founder & Business Type) */}
                <div className="space-y-3 mb-6 bg-white p-4 rounded-2xl border-2 border-black/10 shadow-xs">
                  
                  {/* Founder */}
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <span className="font-arc-mono text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                      <User size={14} className="text-[#E11D48]" />
                      <span>Founder:</span>
                    </span>
                    <span className="font-arc-display font-black text-sm text-black">
                      {business.founder}
                    </span>
                  </div>

                  {/* Business Type */}
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="font-arc-mono text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                      <Tag size={14} className="text-[#EA580C]" />
                      <span>Business Type:</span>
                    </span>
                    <span className="inline-block bg-[#FFF1F2] text-[#E11D48] text-xs font-arc-mono font-black px-2.5 py-0.5 rounded-full border border-[#FECDD3]">
                      {business.businessType || 'Startup / Personal Business'}
                    </span>
                  </div>

                </div>
              </div>

              {/* 4. Social & Contact Handles (Only Links, Phone, Instagram) */}
              <div>
                <span className="block font-arc-mono text-[11px] font-black uppercase tracking-wider text-black mb-3">
                  Direct Contact & Social Handles:
                </span>

                <div className="space-y-2.5">
                  
                  {/* Instagram ID Handle Link */}
                  {business.instagram && (
                    <a 
                      href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-95 text-white font-arc-display font-black text-xs sm:text-sm py-3 px-5 rounded-2xl flex items-center justify-between shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>📸</span>
                        <span>Instagram: {business.instagram}</span>
                      </span>
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {/* Phone / WhatsApp */}
                  {business.phone && (
                    <a 
                      href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                      className="w-full bg-[#000000] hover:bg-[#1E293B] text-white font-arc-display font-black text-xs sm:text-sm py-3 px-5 rounded-2xl flex items-center justify-between shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Phone size={15} className="text-[#FEF08A]" />
                        <span>Phone: {business.phone}</span>
                      </span>
                      <span className="text-[11px] font-arc-mono text-[#FEF08A] uppercase">CALL NOW</span>
                    </a>
                  )}

                  {/* WhatsApp Direct Chat Link */}
                  {business.phone && (
                    <a 
                      href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}?text=Hey!%20Saw%20${encodeURIComponent(business.name)}%20on%20Afterclass%20Dhanda.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-arc-display font-black text-xs sm:text-sm py-3 px-5 rounded-2xl flex items-center justify-between shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>💬</span>
                        <span>WhatsApp Chat</span>
                      </span>
                      <ExternalLink size={15} />
                    </a>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
