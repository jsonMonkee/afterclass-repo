'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  ArrowUpRight
} from 'lucide-react';
import { opportunities } from '../../data/amityData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';

export default function OpportunitiesPage() {
  const { savedItems, toggleSave, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Internships', 'Campus ambassador roles', 'Auditions', 'Competitions and hackathons'];

  const filteredOpps = opportunities.filter(op => {
    const matchesCat = selectedCategory === 'All' || op.category === selectedCategory;
    const matchesQuery = !searchQuery || 
                         op.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         op.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         op.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-8 pb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Briefcase size={13} />
            <span>CAREER & AUDITIONS</span>
          </div>

          <h1 className="font-arc-display text-white text-4xl sm:text-6xl md:text-[68px] leading-[1.08] max-w-3xl mb-6">
            “Make your market on demand skills off campus with us.”
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Real hackathons, curated off-campus gigs, aur direct opportunities jo actually kaam aati hain. No corporate fluff.
          </p>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. MAIN OPPORTUNITIES LIST (SHOWING COMING SOON TEXT ON WHITE/CREAM PART) */}
      <div className="bg-[#FFFDF5] flex-1 py-24 px-6 sm:px-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center py-12 px-8 bg-white rounded-3xl border-[3px] border-[#000000] shadow-[8px_8px_0px_0px_#000000]">
          
          <div className="inline-block bg-[#FEF08A] border-2 border-[#000000] px-4 py-1.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider text-[#000000] mb-6 shadow-[2px_2px_0px_0px_#000000]">
            ⚡ CAREER & AUDITIONS CALLOUTS
          </div>

          <h2 className="font-bungee text-4xl sm:text-6xl text-[#E11D48] tracking-wider uppercase mb-6 leading-none">
            COMING SOON
          </h2>

          <p className="font-arc-display font-extrabold text-lg sm:text-xl text-[#000000] mb-4">
            Amity Placement Cell ki cheezein sirf limited logon ke liye hoti hain, sabke liye nahi — jaise wo advertise karte hain.<br className="hidden sm:block" />
            Your bhaiyas are here to curate the real hackathons and open opportunities for everyone.
          </p>

          <p className="font-arc-mono text-xs text-[#71717A] max-w-md mx-auto leading-relaxed">
            Stay tuned kyunki Afterclass nahi kiya to kya kiya.
          </p>

          <div className="mt-8 flex justify-center">
            <Link 
              href="/notices"
              className="inline-flex items-center gap-2 font-arc-mono text-xs font-black uppercase tracking-wider bg-[#000000] text-white px-6 py-3.5 rounded-xl border-2 border-[#000000] hover:bg-[#E11D48] transition-colors shadow-[4px_4px_0px_0px_#E11D48]"
            >
              <span>View Official Notices</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
