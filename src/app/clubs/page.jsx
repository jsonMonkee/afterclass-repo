'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ArrowUpRight,
  Sparkles,
  Compass
} from 'lucide-react';
import { campusClubs } from '../../data/amityData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';
import OptionWheel from '../../components/OptionWheel';
import ClubHeroDeck from '../../components/ClubHeroDeck';
import PhoneClubCard from '../../components/PhoneClubCard';

export default function ClubsPage() {
  const { followedClubs, toggleFollow, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wheelSelectedClub, setWheelSelectedClub] = useState(campusClubs[0]);

  const categories = [
    'All', 
    'Coding and technology', 
    'Music', 
    'Entrepreneurship', 
    'Dance and performing arts', 
    'Photography and media', 
    'Social impact and volunteering'
  ];

  const clubNames = campusClubs.map(c => c.name);

  // Dynamic aesthetic themes per club type
  const getClubTheme = (club) => {
    switch (club.id) {
      case 'cadence': // Music: Vibrant purple/violet
        return {
          bgClass: 'bg-[#FAF5FF] border-purple-200/80 shadow-[0_30px_70px_rgba(147,51,234,0.12)]',
          flowBlob: 'radial-gradient(circle at 85% 15%, rgba(192, 132, 252, 0.4) 0%, rgba(243, 232, 255, 0.2) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#7E22CE] via-[#9333EA] to-[#A855F7] shadow-lg shadow-purple-500/35',
          pillBg: 'bg-[#F3E8FF] text-[#7E22CE] border border-purple-200',
          boxBg: 'bg-white/80 border border-purple-200/70',
          btnBg: 'bg-[#9333EA] hover:bg-[#7E22CE] text-white shadow-lg shadow-purple-500/30'
        };
      case 'rotaract': // Environmental / Social Impact: Fresh vibrant green
        return {
          bgClass: 'bg-[#F0FDF4] border-emerald-200/80 shadow-[0_30px_70px_rgba(16,185,129,0.12)]',
          flowBlob: 'radial-gradient(circle at 85% 15%, rgba(110, 231, 183, 0.45) 0%, rgba(209, 250, 229, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#059669] via-[#10B981] to-[#34D399] shadow-lg shadow-emerald-500/35',
          pillBg: 'bg-[#DCFCE7] text-[#15803D] border border-emerald-200',
          boxBg: 'bg-white/80 border border-emerald-200/70',
          btnBg: 'bg-[#059669] hover:bg-[#047857] text-white shadow-lg shadow-emerald-500/30'
        };
      case 'dramatics': // Events / Theatre: Funky red & magenta
        return {
          bgClass: 'bg-[#FFF1F2] border-rose-200/80 shadow-[0_30px_70px_rgba(225,29,72,0.14)]',
          flowBlob: 'radial-gradient(circle at 85% 15%, rgba(251, 113, 133, 0.45) 0%, rgba(244, 63, 94, 0.2) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#E11D48] via-[#F43F5E] to-[#FB7185] shadow-lg shadow-rose-500/35',
          pillBg: 'bg-[#FFE4E6] text-[#BE123C] border border-rose-200',
          boxBg: 'bg-white/80 border border-rose-200/70',
          btnBg: 'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-lg shadow-rose-500/30'
        };
      case 'e-cell': // Startup / Business: Sunset orange/amber
        return {
          bgClass: 'bg-[#FFF7ED] border-orange-200/80 shadow-[0_30px_70px_rgba(234,88,12,0.12)]',
          flowBlob: 'radial-gradient(circle at 85% 15%, rgba(251, 146, 60, 0.4) 0%, rgba(254, 215, 170, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#EA580C] to-[#FB923C] shadow-lg shadow-orange-500/35',
          pillBg: 'bg-[#FFEDD5] text-[#C2410C] border border-orange-200',
          boxBg: 'bg-white/80 border border-orange-200/70',
          btnBg: 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-lg shadow-orange-500/30'
        };
      case 'lenscrafters': // Media & Photography: Electric indigo/cyan
        return {
          bgClass: 'bg-[#F0F9FF] border-sky-200/80 shadow-[0_30px_70px_rgba(2,132,199,0.12)]',
          flowBlob: 'radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.4) 0%, rgba(186, 230, 253, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#0284C7] to-[#38BDF8] shadow-lg shadow-sky-500/35',
          pillBg: 'bg-[#E0F2FE] text-[#0369A1] border border-sky-200',
          boxBg: 'bg-white/80 border border-sky-200/70',
          btnBg: 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-lg shadow-sky-500/30'
        };
      default: // Turing & Coding: Electric royal blue & indigo
        return {
          bgClass: 'bg-[#EEF2FF] border-indigo-200/80 shadow-[0_30px_70px_rgba(79,70,229,0.12)]',
          flowBlob: 'radial-gradient(circle at 85% 15%, rgba(129, 140, 248, 0.4) 0%, rgba(224, 231, 255, 0.25) 60%, transparent 80%)',
          iconBg: 'bg-gradient-to-br from-[#4338CA] via-[#4F46E5] to-[#6366F1] shadow-lg shadow-indigo-500/35',
          pillBg: 'bg-[#E0E7FF] text-[#3730A3] border border-indigo-200',
          boxBg: 'bg-white/80 border border-indigo-200/70',
          btnBg: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg shadow-indigo-500/30'
        };
    }
  };

  const handleWheelChange = (index) => {
    if (campusClubs[index]) {
      setWheelSelectedClub(campusClubs[index]);
    }
  };

  const filteredClubs = campusClubs.filter(club => {
    const matchesCat = selectedCategory === 'All' || club.category === selectedCategory;
    const matchesQuery = !searchQuery || 
                         club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         club.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.openRoles.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        {/* Blended Clubs Hero Background Image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/clubs-hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-bottom opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#E11D48] via-[#E11D48]/40 to-[#E11D48]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto pt-2 pb-2 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-3.5 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-2 border border-white/15">
            <Users size={13} />
            <span>CAMPUS SOCIETIES & DIRECTORY</span>
          </div>

          <h1 className="font-arc-display text-white text-2xl sm:text-4xl md:text-[44px] leading-[1.08] max-w-3xl mb-2">
            “Find your club beyond the classroom.”
          </h1>

          <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed mb-2">
            Coding, music ya drama — apni pasand ki society dhoondo. Auditions, recruitment, aur direct registrations ek hi jagah.
          </p>

          {/* Interactive 3D Fanned Club Deck */}
          <div className="w-full flex items-center justify-center overflow-visible">
            <ClubHeroDeck clubs={campusClubs} />
          </div>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. INTERACTIVE OPTION WHEEL SECTION */}
      <section className="bg-[#FFFDF5] text-[#000000] py-16 px-6 sm:px-12 relative overflow-hidden border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center gap-2 text-xs font-arc-mono font-bold text-[#E11D48] uppercase tracking-widest mb-3">
            <Compass size={14} className="text-[#E11D48]" />
            <span>INTERACTIVE CLUB NAVIGATOR</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Kinetic OptionWheel (Open, unconfined, aligned to left edge) */}
            <div className="lg:col-span-7 h-[360px] relative overflow-hidden flex items-center">
              <div className="absolute top-2 left-0 z-10 pointer-events-none">
                <span className="font-arc-mono text-[10.5px] uppercase tracking-wider text-black/45">
                  Scroll or drag to navigate societies ↓
                </span>
              </div>

              <OptionWheel
                items={clubNames}
                defaultSelected={0}
                textColor="rgba(0, 0, 0, 0.28)"
                activeColor="#000000"
                side="left"
                fontSize={2.1}
                spacing={1.35}
                curve={0.85}
                tilt={6}
                blur={1.8}
                fade={0.3}
                smoothing={180}
                inset={0}
                loop={true}
                draggable={true}
                onChange={handleWheelChange}
              />

              {/* Center pointer accent line */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-l from-[#E11D48] to-transparent pointer-events-none"></div>
            </div>

            {/* Right 5 cols: Live Selected Club Preview Card (Matching Comic/Zine Layered Style) */}
            {(() => {
              const theme = getClubTheme(wheelSelectedClub);
              return (
                <div className="lg:col-span-5 relative pt-5 pb-3 px-2 font-arc-display select-none group">
                  {/* Layered Tilted Backing Cards */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-3 top-6 bottom-3 bg-[#881337] rounded-[24px] -rotate-[2.2deg] -translate-x-1 translate-y-1 pointer-events-none transition-transform duration-300 group-hover:-rotate-[3.2deg]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-3 top-6 bottom-3 bg-[#E11D48] rounded-[24px] rotate-[1.6deg] translate-y-2 pointer-events-none transition-transform duration-300 group-hover:rotate-[2.4deg]"
                  />

                  <div className="relative bg-[#FFFDF5] rounded-[24px] border-[2.5px] border-[#881337] p-6 sm:p-7 shadow-[4px_4px_0px_#881337] flex flex-col justify-between min-h-[370px] transition-transform duration-300 group-hover:-translate-y-1 overflow-visible">
                    {/* Decorative Background Accents */}
                    <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none">
                      <div className="absolute -top-8 -right-8 w-44 h-44 bg-[#FFE4E6]/70 rounded-full" />
                    </div>

                    <div className="relative z-10">
                      {/* Top Row: Pop-Out Logo Sticker + Category Pill */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="relative -mt-11 -ml-2 -rotate-[4deg] shrink-0">
                          <div className="bg-white p-1.5 rounded-[20px] border-[2.5px] border-[#881337] shadow-[4px_4px_0px_#881337]">
                            <div className={`w-16 h-16 rounded-[14px] ${theme.iconBg} text-white text-3xl flex items-center justify-center overflow-hidden`}>
                              {wheelSelectedClub.logo ? (
                                <img src={wheelSelectedClub.logo} alt={wheelSelectedClub.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="drop-shadow-sm">{wheelSelectedClub.avatar}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="bg-[#FEF08A] text-[#881337] font-arc-mono text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-[#881337] shadow-[3px_3px_0px_#881337]">
                          {wheelSelectedClub.category}
                        </span>
                      </div>

                      {/* Club Title & Underline */}
                      <h3 className="font-black text-2xl sm:text-[26px] text-[#140508] mb-1.5 leading-tight tracking-tight">
                        {wheelSelectedClub.name}
                      </h3>
                      <div className="w-24 h-1 bg-[#E11D48] rounded-full mb-3 opacity-85" />
                      
                      {/* Tagline */}
                      <p className="font-sans text-xs sm:text-[13.5px] text-[#475569] font-semibold leading-relaxed mb-5">
                        {wheelSelectedClub.tagline}
                      </p>

                      {/* Currently Recruiting Pill Box */}
                      <div className="bg-white border-2 border-[#881337] rounded-[22px] px-4 py-3 shadow-[3px_3px_0px_#881337] flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
                          <Sparkles size={17} className="stroke-[2.4]" />
                        </div>
                        <div className="w-px h-8 bg-[#881337]/15 shrink-0" />
                        <div className="min-w-0 text-left flex-1">
                          <span className="block font-arc-mono text-[10px] font-black uppercase tracking-wider text-[#E11D48]">
                            CURRENTLY RECRUITING:
                          </span>
                          <span className="block font-sans text-xs sm:text-[13px] font-bold text-[#140508] leading-snug">
                            {wheelSelectedClub.openRoles}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Active Members & Explore Club CTA */}
                    <div className="relative z-10 pt-1 flex items-center justify-between gap-3">
                      <span className="font-sans text-xs sm:text-[13px] text-[#881337] font-bold flex items-center gap-1.5">
                        <Users size={15} className="text-[#E11D48]" />
                        <span>{wheelSelectedClub.membersCount} Active Members</span>
                      </span>
                      
                      <Link
                        href={`#${wheelSelectedClub.id}`}
                        onClick={(e) => {
                          const target = document.getElementById(wheelSelectedClub.id);
                          if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-2.5 rounded-xl border-2 border-[#881337] shadow-[4px_4px_0px_#881337] hover:translate-x-[2px] hover:translate-y-[2px] text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <span>EXPLORE CLUB</span>
                        <ArrowUpRight size={14} className="stroke-[2.8]" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* 3. MAIN DIRECTORY */}
      <div className="bg-[#FFFDF5] flex-1 py-16 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-black/10">
            <div>
              <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-2">
                VERIFIED COLLECTIVES
              </span>
              <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
                Student-led clubs directory.
              </h2>
            </div>

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

          {/* Clubs Grid: Wider 2-column on desktop / spacious card layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredClubs.map(club => {
              const isFollowed = followedClubs.has(club.id);

              return (
                <PhoneClubCard 
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
