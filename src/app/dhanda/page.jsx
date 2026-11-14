'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Coins, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Store,
  Layers,
  PlusCircle
} from 'lucide-react';
import { studentBusinesses } from '../../data/amityData';
import Footer from '../../components/Footer';
import DhandaCard from '../../components/DhandaCard';

export default function DhandaPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All', 
    'Software & Design', 
    'Food & Bakery', 
    'Photography & Film', 
    'Fashion & Merch', 
    'EdTech & Tutoring',
    'Beverages & Wellness'
  ];

  const filteredBusinesses = studentBusinesses.filter(biz => {
    const matchesCat = selectedCategory === 'All' || biz.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery = !searchQuery || 
                         biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         biz.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         biz.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-8 pb-12 text-center flex flex-col items-center px-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Coins size={14} className="text-[#FEF08A]" />
            <span>CAMPUS VENTURES & FREELANCERS</span>
          </div>

          {/* Headline */}
          <h1 className="font-arc-display text-white text-3xl sm:text-5xl md:text-[62px] leading-[1.08] max-w-4xl mb-6 font-black">
            “Student-Powered Businesses and Startups”
          </h1>

          {/* Subline */}
          <p className="text-white/95 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            This community is for the people who want to showcase their businesses or promote their work and it's absolutely free for a limited period of time.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/profile"
              className="bg-white text-[#881337] hover:bg-[#FFFDF5] text-xs font-arc-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <PlusCircle size={15} />
              <span>List Your Dhanda (Free)</span>
            </Link>

            <a
              href="#ventures"
              className="bg-[#881337] text-white hover:bg-[#881337]/90 text-xs font-arc-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border border-white/20 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Ventures</span>
              <span>↓</span>
            </a>
          </div>

        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. MAIN DIRECTORY OF STUDENT VENTURES ON WARM CREAM */}
      <div id="ventures" className="bg-[#FFFDF5] flex-1 py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header & Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-black/10">
            <div>
              <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Store size={14} />
                <span>VERIFIED STUDENT FOUNDERS · 2026</span>
              </span>
              <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
                Active campus ventures.
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-arc-mono text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'bg-white border border-black/10 text-[#71717A] hover:border-[#E11D48] hover:text-[#E11D48]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dhanda Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map(biz => (
              <DhandaCard 
                key={biz.id}
                business={biz}
              />
            ))}
          </div>

          {/* Promotion Callout Banner */}
          <div className="mt-20 bg-gradient-to-br from-[#1E222A] via-[#151820] to-[#0D0F14] text-white rounded-[36px] p-8 sm:p-12 border-2 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#FEF08A] border border-white/10 px-4 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider">
              <span>💰</span>
              <span>EARLY LAUNCH OFFER</span>
            </div>

            <h3 className="font-arc-display text-2xl sm:text-4xl text-white font-black tracking-tight max-w-2xl">
              Hostel se dhanda chalate ho? Put it on the map.
            </h3>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-medium max-w-xl">
              Graphic design, homemade cakes, fashion thrifting, coding projects ya campus photography — register your venture today for free before promotion slots fill up.
            </p>

            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-arc-display font-black text-sm uppercase tracking-wide px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>SUBMIT YOUR DHANDA PROFILE</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
