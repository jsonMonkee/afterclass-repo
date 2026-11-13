'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Gift, 
  FileText, 
  Trophy, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import Footer from '../../components/Footer';
import StudentPerksSection from '../../components/opportunities/StudentPerksSection';
import JobHunterModal from '../../components/opportunities/JobHunterModal';
import ResumeTailorModal from '../../components/opportunities/ResumeTailorModal';
import HackathonsSection from '../../components/opportunities/HackathonsSection';

export default function OpportunitiesPage() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto pt-8 pb-12 text-center flex flex-col items-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Briefcase size={13} />
            <span>STUDENT COMMONS & CAREER ARSENAL</span>
          </div>

          <h1 className="font-arc-display text-white text-4xl sm:text-6xl md:text-[68px] leading-[1.08] max-w-4xl mb-6">
            “Make your market on demand skills off campus with us.”
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Student ID perks, internal job hunters, AI resume tailoring, aur Unstop hackathons. No gatekeeping, no corporate fluff — everything built for Amity Kolkata students.
          </p>

          {/* Quick jump pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('resourceify-section')}
              className="bg-[#FFFDF5] text-black hover:bg-[#FEF08A] font-arc-mono text-xs font-black uppercase px-5 py-2.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Gift size={13} className="text-[#E11D48]" />
              <span>Student ID Perks</span>
            </button>
            <button
              onClick={() => setIsJobModalOpen(true)}
              className="bg-black text-white hover:bg-white hover:text-black font-arc-mono text-xs font-black uppercase px-5 py-2.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap size={13} className="text-amber-400" />
              <span>Open Job Hunter</span>
            </button>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="bg-black text-white hover:bg-white hover:text-black font-arc-mono text-xs font-black uppercase px-5 py-2.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText size={13} className="text-cyan-400" />
              <span>Resume Tailor</span>
            </button>
            <button
              onClick={() => scrollToSection('hackathons-section')}
              className="bg-[#FFFDF5] text-black hover:bg-[#FEF08A] font-arc-mono text-xs font-black uppercase px-5 py-2.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trophy size={13} className="text-[#E11D48]" />
              <span>Unstop Hackathons</span>
            </button>
          </div>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. THE 4 CORE SPOTLIGHT CARDS */}
      <section className="bg-[#FFFDF5] pt-12 pb-16 px-4 sm:px-8 md:px-12 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8">
            <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-1">
              THE AFTERCLASS OPPORTUNITY QUAD
            </span>
            <h2 className="font-arc-display text-3xl sm:text-4xl text-black font-black tracking-tight">
              Four unfair advantages for your student career.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: RESOURCIFY */}
            <div 
              onClick={() => scrollToSection('resourceify-section')}
              className="bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[7px_7px_0px_#E11D48] transition-all duration-200 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FEF08A] border-2 border-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#000000]">
                  🎁
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-arc-mono text-[10px] font-black uppercase bg-[#E11D48] text-white px-2 py-0.5 rounded-sm">
                    LIVE SCRAPER
                  </span>
                  <span className="font-arc-mono text-[10px] font-bold text-black/50">
                    12 Deals
                  </span>
                </div>
                <h3 className="font-arc-display text-xl font-black text-black group-hover:text-[#E11D48] transition-colors mb-2">
                  Resourceify
                </h3>
                <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                  Redeem free developer packs, Figma Pro, Spotify, and Apple education discounts with your student ID card.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 mt-6 flex items-center justify-between font-arc-mono text-xs font-black text-[#E11D48]">
                <span>Browse Student Perks</span>
                <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </div>
            </div>

            {/* CARD 2: JOB HUNTER */}
            <div 
              onClick={() => setIsJobModalOpen(true)}
              className="bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000000] transition-all duration-200 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] border-2 border-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#000000]">
                  ⚡
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-arc-mono text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded-sm">
                    INTERNAL PRODUCT
                  </span>
                  <span className="font-arc-mono text-[10px] font-bold text-emerald-700">
                    Curated Gigs
                  </span>
                </div>
                <h3 className="font-arc-display text-xl font-black text-black group-hover:text-[#E11D48] transition-colors mb-2">
                  Job Hunter
                </h3>
                <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                  High-signal frontend, AI/ML, and design internships offering real stipends and flexible university hours.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 mt-6 flex items-center justify-between font-arc-mono text-xs font-black text-black">
                <span>Launch Job Portal</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* CARD 3: RESUME TAILOR */}
            <div 
              onClick={() => setIsResumeModalOpen(true)}
              className="bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000000] transition-all duration-200 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E0E7FF] border-2 border-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#000000]">
                  📄
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-arc-mono text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded-sm">
                    INTERNAL PRODUCT
                  </span>
                  <span className="font-arc-mono text-[10px] font-bold text-indigo-700">
                    ATS Workbench
                  </span>
                </div>
                <h3 className="font-arc-display text-xl font-black text-black group-hover:text-[#E11D48] transition-colors mb-2">
                  Resume Tailor
                </h3>
                <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                  AI-driven ATS score simulator and bullet rewriter to pass recruiter automated filters on the first attempt.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 mt-6 flex items-center justify-between font-arc-mono text-xs font-black text-black">
                <span>Open Workbench</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* CARD 4: HACKATHONS */}
            <div 
              onClick={() => scrollToSection('hackathons-section')}
              className="bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[7px_7px_0px_#E11D48] transition-all duration-200 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFE4E6] border-2 border-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#000000]">
                  🏆
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-arc-mono text-[10px] font-black uppercase bg-[#E11D48] text-white px-2 py-0.5 rounded-sm">
                    AGGREGATOR
                  </span>
                  <span className="font-arc-mono text-[10px] font-bold text-[#E11D48]">
                    Unstop & Devfolio
                  </span>
                </div>
                <h3 className="font-arc-display text-xl font-black text-black group-hover:text-[#E11D48] transition-colors mb-2">
                  Hackathons Radar
                </h3>
                <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                  Collegiate hackathons offering cash pools up to ₹15 Lakhs, Pre-Placement Interviews (PPIs), and swags.
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 mt-6 flex items-center justify-between font-arc-mono text-xs font-black text-[#E11D48]">
                <span>Explore Hackathons</span>
                <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DETAILED SECTIONS */}
      <div className="bg-[#FFFDF5] flex-1 py-16 px-4 sm:px-8 md:px-12 space-y-24">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* SECTION A: RESOURCIFY STUDENT ID PERKS */}
          <StudentPerksSection />

          {/* SECTION B: UNSTOP & DEVFOLIO HACKATHONS */}
          <HackathonsSection />

        </div>
      </div>

      {/* 4. MODALS FOR INTERNAL PRODUCTS */}
      <JobHunterModal 
        isOpen={isJobModalOpen} 
        onClose={() => setIsJobModalOpen(false)} 
      />

      <ResumeTailorModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />

      <Footer />
    </div>
  );
}
