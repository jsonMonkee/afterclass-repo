'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Tag, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight,
  Gift
} from 'lucide-react';
import { studentPerks, perkCategories } from '../../data/studentPerksData';

export default function StudentPerksSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activePerkModal, setActivePerkModal] = useState(null);

  const filteredPerks = studentPerks.filter(perk => {
    const matchesCat = selectedCategory === 'All' || perk.category === selectedCategory;
    const matchesQuery = !search || 
      perk.title.toLowerCase().includes(search.toLowerCase()) ||
      perk.provider.toLowerCase().includes(search.toLowerCase()) ||
      perk.description.toLowerCase().includes(search.toLowerCase()) ||
      perk.highlights.some(h => h.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div id="resourceify-section" className="scroll-mt-24">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FEF08A] text-black px-3.5 py-1 rounded-full font-arc-mono text-xs font-black uppercase tracking-wider mb-2 border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Gift size={13} className="text-[#E11D48]" />
            <span>RESOURCIFY PERKS ENGINE</span>
          </div>
          <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
            Claim Free Software & Discounts with Your Student ID.
          </h2>
          <p className="font-sans text-sm text-[#52525B] font-medium mt-1">
            Scraped & verified for Amity University Kolkata students. Save over ₹2,00,000/yr using your college ID or @amity.edu email.
          </p>
        </div>

        {/* Live Scraper Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-3.5 py-1.5 rounded-xl font-arc-mono text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Resourceify Scraper: 12 Active Verified Perks</span>
        </div>
      </div>

      {/* Controls: Search + Categories */}
      <div className="bg-white p-4 rounded-2xl border-[2.5px] border-black shadow-[4px_4px_0px_#000000] mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
            <input 
              type="text"
              placeholder="Search GitHub, Spotify, Apple, Notion, AWS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black placeholder:text-black/40 focus:outline-none"
            />
          </div>

          <span className="font-arc-mono text-xs text-black/50 self-end md:self-auto">
            Showing {filteredPerks.length} Perks
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10">
          {perkCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-arc-mono text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E11D48] text-white shadow-[2px_2px_0px_#000000]'
                  : 'bg-white border border-black/15 text-black/70 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPerks.map(perk => (
          <div 
            key={perk.id}
            className="bg-white rounded-2xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-arc-mono text-[10px] font-black uppercase tracking-wider bg-[#FFFDF5] text-black px-2.5 py-1 rounded-md border border-black/20">
                  {perk.category}
                </span>

                <span className="font-arc-mono text-[10px] font-black bg-[#E11D48] text-white px-2.5 py-1 rounded-md uppercase tracking-wider shadow-[1px_1px_0px_#000000]">
                  {perk.badge}
                </span>
              </div>

              {/* Title & Provider */}
              <h3 className="font-arc-display text-xl font-black text-black group-hover:text-[#E11D48] transition-colors leading-snug mb-1">
                {perk.title}
              </h3>
              <span className="font-arc-mono text-xs text-[#E11D48] font-bold block mb-3">
                by {perk.provider}
              </span>

              {/* Savings Box */}
              <div className="bg-[#FFFDF5] border border-black/15 p-3 rounded-xl mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-arc-mono text-[11px] font-bold text-black/60">Value:</span>
                  <span className="font-arc-mono text-xs font-black text-emerald-700">{perk.discount}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-arc-mono text-[11px] font-bold text-black/60">Estimated Savings:</span>
                  <span className="font-arc-mono text-xs font-bold text-[#E11D48]">{perk.savingsEstimate}</span>
                </div>
              </div>

              <p className="font-sans text-xs text-[#52525B] font-medium leading-relaxed mb-4">
                {perk.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-1.5 mb-5">
                {perk.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 font-sans text-xs text-black/80 font-medium">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setActivePerkModal(perk)}
                className="inline-flex items-center gap-1.5 font-arc-mono text-xs font-bold text-black hover:text-[#E11D48] transition-colors cursor-pointer"
              >
                <HelpCircle size={13} />
                <span>How to Claim</span>
              </button>

              <a
                href={perk.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-black text-white hover:bg-[#E11D48] px-4 py-2 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#000000] cursor-pointer"
              >
                <span>Claim Perk</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* How to Claim Modal */}
      {activePerkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF5] max-w-lg w-full rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setActivePerkModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black text-white font-arc-mono text-xs flex items-center justify-center hover:bg-[#E11D48] transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-block bg-[#FEF08A] text-black border border-black px-3 py-1 rounded-full font-arc-mono text-[10px] font-black uppercase tracking-wider mb-3">
              VERIFICATION GUIDE
            </div>

            <h3 className="font-arc-display text-2xl font-black text-black mb-1">
              How to Claim {activePerkModal.title}
            </h3>
            <p className="font-arc-mono text-xs text-[#E11D48] font-bold mb-4">
              Verification method: {activePerkModal.verificationMethod}
            </p>

            <div className="bg-white border-2 border-black/15 p-4 rounded-2xl mb-6 space-y-3">
              {activePerkModal.howToClaim.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-black text-white font-arc-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={activePerkModal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#E11D48] text-white hover:bg-black py-3 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider text-center transition-colors shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-2"
              >
                <span>Proceed to Provider Portal</span>
                <ExternalLink size={13} />
              </a>
              <button
                onClick={() => setActivePerkModal(null)}
                className="px-5 py-3 rounded-xl border-2 border-black font-arc-mono text-xs font-bold text-black hover:bg-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
