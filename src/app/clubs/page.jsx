'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  Compass
} from 'lucide-react';
import { campusClubs } from '../../data/amityData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';
import BounceCards from '../../components/BounceCards';
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

  const clubPhotos = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=600&fit=crop&q=80'
  ];

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-8 pb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-3.5 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Users size={13} />
            <span>CAMPUS SOCIETIES & DIRECTORY</span>
          </div>

          <h1 className="font-arc-display text-white text-4xl sm:text-6xl md:text-[68px] leading-[1.08] max-w-3xl mb-6">
            “Find your club beyond the classroom.”
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed mb-8">
            Coding, music ya drama — apni pasand ki society dhoondo. Auditions, recruitment, aur direct registrations ek hi jagah.
          </p>

          {/* Interactive 3D Fanned Club Deck */}
          <div className="w-full flex items-center justify-center py-2 overflow-visible">
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

            {/* Right 5 cols: Live Selected Club Preview Card (Dynamic theme per club) */}
            {(() => {
              const theme = getClubTheme(wheelSelectedClub);
              return (
                <div className={`lg:col-span-5 ${theme.bgClass} rounded-[38px] p-7 sm:p-8 border relative overflow-hidden flex flex-col justify-between min-h-[380px] font-arc-display transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}>
                  
                  {/* Top-right subtle soft gradient glow matching club color */}
                  <div 
                    className="absolute top-0 right-0 w-52 h-44 rounded-tr-[38px] rounded-bl-[120px] pointer-events-none"
                    style={{ background: theme.flowBlob }}
                  />

                  <div className="relative z-10">
                    {/* Top Row: 3D Squircle Icon + Category Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-16 h-16 rounded-[22px] ${theme.iconBg} text-white text-3xl flex items-center justify-center overflow-hidden relative shadow-md`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/25 pointer-events-none" />
                        <span className="relative z-10 drop-shadow-sm">{wheelSelectedClub.avatar}</span>
                      </div>

                      <span className={`font-arc-display text-xs font-extrabold uppercase tracking-wider ${theme.pillBg} px-4 py-1.5 rounded-full shadow-xs`}>
                        {wheelSelectedClub.category}
                      </span>
                    </div>

                    {/* Club Title */}
                    <h3 className="font-extrabold text-2xl sm:text-[26px] text-[#0F172A] mb-1.5 leading-tight tracking-tight">
                      {wheelSelectedClub.name}
                    </h3>
                    
                    {/* Tagline */}
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#475569] font-medium leading-relaxed mb-5">
                      {wheelSelectedClub.tagline}
                    </p>

                    {/* Currently Recruiting Box */}
                    <div className={`p-4 rounded-2xl ${theme.boxBg} shadow-xs mb-4`}>
                      <span className="text-[11px] font-extrabold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider mb-1">
                        <Sparkles size={12} className="fill-amber-400 stroke-amber-500" />
                        <span>CURRENTLY RECRUITING:</span>
                      </span>
                      <span className="text-xs sm:text-[13px] font-sans text-[#1E293B] font-bold block leading-snug">
                        {wheelSelectedClub.openRoles}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Active Members & Explore Club Pill */}
                  <div className="relative z-10 pt-2 border-t border-black/5 flex items-center justify-between">
                    <span className="font-sans text-xs sm:text-[13px] text-[#64748B] font-bold flex items-center gap-1.5">
                      <Users size={15} className="opacity-70" />
                      <span>{wheelSelectedClub.membersCount} Active Members</span>
                    </span>
                    
                    <Link
                      href={`/clubs/${wheelSelectedClub.id}`}
                      className={`inline-flex items-center gap-2 ${theme.btnBg} px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all duration-200 active:scale-95 cursor-pointer`}
                    >
                      <span>EXPLORE CLUB</span>
                      <ArrowUpRight size={14} className="stroke-[2.8]" />
                    </Link>
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
