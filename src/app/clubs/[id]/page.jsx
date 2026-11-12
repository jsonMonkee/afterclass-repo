'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft,
  Users,
  Instagram,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { campusClubs, campusEvents } from '../../../data/amityData';
import { useApp } from '../../../context/AppContext';
import Footer from '../../../components/Footer';

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { followedClubs, toggleFollow } = useApp();

  const clubId = params?.id;
  const club = campusClubs.find(c => c.id === clubId) || campusClubs[0];
  const isFollowed = followedClubs.has(club.id);

  const clubEvents = campusEvents.filter(e => e.clubId === club.id || e.club.toLowerCase().includes(club.name.toLowerCase().split(' ')[0]));

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* Red Top Bar with Back Button */}
      <section className="arc-grain-red text-white pt-6 pb-14 px-6 sm:px-12 relative">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 font-arc-mono text-xs font-bold text-white/90 hover:text-white hover:underline cursor-pointer uppercase tracking-wider bg-[#881337] px-4 py-2 rounded-xl border border-white/15"
          >
            <ArrowLeft size={14} />
            <span>← Back to Clubs Directory</span>
          </button>

          <span className="font-arc-mono text-xs uppercase tracking-wider text-white/80">
            {club.category}
          </span>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* Main Content Area on Warm Cream */}
      <div className="bg-[#FFFDF5] flex-1 py-14 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Club Header Card */}
          <div className="bg-white border-2 border-black/5 rounded-3xl p-8 sm:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-black/10">
              
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-[#FFE4E6] text-4xl flex items-center justify-center border border-[#E11D48]/20 shrink-0">
                  {club.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-arc-display font-extrabold text-2xl sm:text-3xl text-[#000000]">
                      {club.name}
                    </h1>
                    <ShieldCheck size={20} className="text-[#E11D48]" />
                  </div>
                  <span className="font-arc-mono text-xs text-[#71717A] block">
                    {club.category} · Amity University Kolkata
                  </span>
                </div>
              </div>

              <button 
                onClick={(e) => toggleFollow(club.id, e)}
                className={`px-6 py-3 rounded-2xl font-arc-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isFollowed
                    ? 'bg-[#881337] text-white shadow-sm'
                    : 'bg-[#E11D48] hover:bg-[#881337] text-white shadow'
                }`}
              >
                {isFollowed ? '✓ Following Club' : '+ Follow Updates'}
              </button>

            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-black/5">
                <span className="text-[10px] font-arc-mono uppercase text-[#71717A] block mb-1">ACTIVE MEMBERS</span>
                <span className="font-arc-display font-bold text-lg text-[#000000]">{club.membersCount} Students</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-black/5">
                <span className="text-[10px] font-arc-mono uppercase text-[#71717A] block mb-1">PRESIDENT / LEAD</span>
                <span className="font-arc-display font-bold text-lg text-[#000000] truncate block">{club.lead}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-black/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-arc-mono uppercase text-[#71717A] block mb-1">INSTAGRAM</span>
                <span className="font-arc-mono font-bold text-xs text-[#E11D48] truncate block">{club.instagram}</span>
              </div>
            </div>

            {/* Recruitment Info */}
            <div className="mt-8 p-6 rounded-2xl bg-[#FFF1F2] border border-[#E11D48]/20">
              <div className="flex items-center gap-2 mb-2 font-arc-mono text-xs font-bold text-[#881337] uppercase tracking-wider">
                <Sparkles size={15} />
                <span>Open Auditions & Team Roles</span>
              </div>
              <p className="font-arc-mono text-sm text-[#000000] font-semibold">
                {club.openRoles}
              </p>
            </div>
          </div>

          {/* Club Scheduled Events */}
          <div>
            <h2 className="font-arc-display text-2xl font-bold text-[#000000] mb-6">
              Events by {club.name}
            </h2>

            {clubEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {clubEvents.map(event => (
                  <Link 
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="bg-white p-6 rounded-2xl border border-black/10 hover:border-[#E11D48] hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="bg-[#881337] text-white font-arc-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3 inline-block">
                        {event.badge}
                      </span>
                      <h3 className="font-arc-display font-bold text-lg text-[#000000] group-hover:text-[#E11D48] transition-colors mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xs text-[#71717A] line-clamp-2 mb-4 font-body">
                        {event.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-arc-mono">
                      <span className="text-[#000000] font-bold">{event.date}</span>
                      <span className="text-[#E11D48] font-bold inline-flex items-center gap-1">
                        View Event <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-black/10 text-center text-xs font-arc-mono text-[#71717A]">
                No public sessions scheduled this week. Check back soon!
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
