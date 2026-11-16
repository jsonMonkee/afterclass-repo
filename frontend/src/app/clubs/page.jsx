'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  Compass,
  Search,
  Lock,
  Plus
} from 'lucide-react';
import { campusClubs } from '../../data/amityData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';
import ClubHeroDeck from '../../components/ClubHeroDeck';
import DistrictClubCard from '../../components/DistrictClubCard';
import { apiFetch } from '../../lib/api/client';

export default function ClubsPage() {
  const { followedClubs, toggleFollow, searchQuery } = useApp();
  const [clubs, setClubs] = useState(campusClubs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    apiFetch('/clubs')
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data?.success && Array.isArray(data.data) && data.data.length) setClubs(data.data); })
      .catch(() => {});
  }, []);

  const categories = [
    'All', 
    'Coding and technology', 
    'Music', 
    'Entrepreneurship', 
    'Dance and performing arts', 
    'Photography and media', 
    'Social impact and volunteering'
  ];

  const query = (localSearch || searchQuery || '').toLowerCase();

  const filteredClubs = clubs.filter(club => {
    const matchesCat = selectedCategory === 'All' || club.category === selectedCategory;
    const matchesQuery = !query || 
      club.name.toLowerCase().includes(query) || 
      club.tagline.toLowerCase().includes(query) ||
      club.openRoles.toLowerCase().includes(query) ||
      club.category.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto pt-8 pb-12 text-center flex flex-col items-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Users size={13} />
            <span>CAMPUS SOCIETIES & DIRECTORY</span>
          </div>

          <h1 className="font-arc-display text-white text-4xl sm:text-6xl md:text-[68px] leading-[1.08] max-w-4xl mb-6">
            “Find your society beyond the classroom.”
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Coding, music, theatre ya startups — apni pasand ki society dhoondo. Live recruitment callouts, audition dates, aur official council contacts ek hi jagah.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              href="/login?role=club_lead"
              className="bg-[#FFFDF5] text-black hover:bg-[#FEF08A] font-arc-mono text-xs font-black uppercase px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-2"
            >
              <Lock size={13} className="text-[#E11D48]" />
              <span>Club Leader Studio Login</span>
            </Link>

            <a
              href="#directory"
              className="bg-black text-white hover:bg-white hover:text-black font-arc-mono text-xs font-black uppercase px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore All Societies ({clubs.length})</span>
            </a>
          </div>

          {/* Fanned Deck Showcase */}
          <div className="w-full flex items-center justify-center py-2 overflow-visible">
            <ClubHeroDeck clubs={clubs} />
          </div>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. MAIN DIRECTORY SECTION (DISTRICT BRUTALIST UI) */}
      <div id="directory" className="bg-[#FFFDF5] flex-1 py-16 px-4 sm:px-8 md:px-12 scroll-mt-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Controls */}
          <div className="bg-white p-6 rounded-3xl border-[2.5px] border-black shadow-[5px_5px_0px_#000000] mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/10">
              <div>
                <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-1">
                  OFFICIAL & STUDENT COLLECTIVES
                </span>
                <h2 className="font-arc-display text-3xl sm:text-4xl text-black font-black tracking-tight">
                  Student Societies Directory.
                </h2>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  placeholder="Search clubs, tech stacks, open roles..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black placeholder:text-black/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-arc-mono text-xs font-black transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-black text-white shadow-[2px_2px_0px_#E11D48]'
                      : 'bg-[#FFFDF5] border border-black/15 text-black hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* District Club Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.map(club => {
              const isFollowed = followedClubs.has(club.id);

              return (
                <DistrictClubCard
                  key={club.id}
                  club={club}
                  isFollowed={isFollowed}
                  onToggleFollow={toggleFollow}
                />
              );
            })}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
