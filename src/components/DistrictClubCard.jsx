'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck,
  ExternalLink,
  Flame
} from 'lucide-react';

export default function DistrictClubCard({ club, isFollowed, onToggleFollow }) {
  // Custom accent styles per society personality
  const getSocietySticker = () => {
    switch (club.id) {
      case 'turing-club':
        return {
          bannerBg: 'bg-[#EEF2FF]',
          accentText: 'text-[#4338CA]',
          borderHover: 'hover:shadow-[7px_7px_0px_#4338CA]',
          tag: 'TECH COLLECTIVE'
        };
      case 'cadence':
        return {
          bannerBg: 'bg-[#FAF5FF]',
          accentText: 'text-[#7E22CE]',
          borderHover: 'hover:shadow-[7px_7px_0px_#7E22CE]',
          tag: 'MUSIC SOCIETY'
        };
      case 'dramatics':
        return {
          bannerBg: 'bg-[#FFF1F2]',
          accentText: 'text-[#E11D48]',
          borderHover: 'hover:shadow-[7px_7px_0px_#E11D48]',
          tag: 'THEATRE COLLECTIVE'
        };
      case 'e-cell':
        return {
          bannerBg: 'bg-[#FFF7ED]',
          accentText: 'text-[#EA580C]',
          borderHover: 'hover:shadow-[7px_7px_0px_#EA580C]',
          tag: 'STARTUP & E-CELL'
        };
      case 'lenscrafters':
        return {
          bannerBg: 'bg-[#F0F9FF]',
          accentText: 'text-[#0284C7]',
          borderHover: 'hover:shadow-[7px_7px_0px_#0284C7]',
          tag: 'MEDIA & CAMERA'
        };
      default:
        return {
          bannerBg: 'bg-[#F0FDF4]',
          accentText: 'text-[#059669]',
          borderHover: 'hover:shadow-[7px_7px_0px_#059669]',
          tag: 'STUDENT COLLECTIVE'
        };
    }
  };

  const style = getSocietySticker();

  return (
    <div className={`bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 ${style.borderHover} transition-all duration-200 group select-none`}>
      
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-12 h-12 rounded-2xl bg-[#FFFDF5] border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000000]">
              {club.avatar}
            </span>
            <div>
              <span className="font-arc-mono text-[10px] font-black uppercase text-black/50 block">
                {style.tag}
              </span>
              <div className="flex items-center gap-1 font-arc-mono text-xs font-bold text-black">
                <ShieldCheck size={12} className="text-[#E11D48]" />
                <span>Verified Council</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => onToggleFollow && onToggleFollow(club.id, e)}
            className={`w-9 h-9 rounded-full border-2 border-black flex items-center justify-center transition-all cursor-pointer ${
              isFollowed ? 'bg-[#E11D48] text-white shadow-[2px_2px_0px_#000000]' : 'bg-white hover:bg-black hover:text-white'
            }`}
            title={isFollowed ? 'Following Club' : 'Follow Club'}
          >
            {isFollowed ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
          </button>
        </div>

        {/* Club Name & Tagline */}
        <h3 className="font-arc-display text-2xl font-black text-black group-hover:text-[#E11D48] transition-colors leading-tight mb-1.5">
          {club.name}
        </h3>

        <p className="font-sans text-xs sm:text-[13px] text-[#52525B] font-medium leading-relaxed mb-4">
          {club.tagline}
        </p>

        {/* Dynamic Recruitment Ribbon */}
        <div className="bg-[#FFFDF5] border-2 border-black/20 p-3.5 rounded-2xl mb-5">
          <div className="flex items-center gap-1.5 font-arc-mono text-[10px] font-black uppercase tracking-wider text-[#E11D48] mb-1">
            <Flame size={12} className="fill-[#E11D48]" />
            <span>NOW RECRUITING & AUDITIONING:</span>
          </div>
          <span className="font-sans text-xs font-bold text-black block leading-snug">
            {club.openRoles}
          </span>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="pt-4 border-t border-black/10 flex items-center justify-between">
        <span className="font-arc-mono text-xs text-black/60 font-bold flex items-center gap-1.5">
          <Users size={14} className="text-black/50" />
          <span>{club.membersCount} Members</span>
        </span>

        <Link
          href={`/clubs/${club.id}`}
          className="inline-flex items-center gap-1.5 bg-black hover:bg-[#E11D48] text-white px-5 py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#000000] cursor-pointer"
        >
          <span>Explore Society</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>

    </div>
  );
}
