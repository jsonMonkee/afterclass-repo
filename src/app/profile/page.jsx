'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, Users, Trash2 } from 'lucide-react';
import { campusEvents, campusClubs } from '../../data/amityData';
import { useApp } from '../../context/AppContext';

export default function ProfilePage() {
  const { savedItems, toggleSave, followedClubs, toggleFollow } = useApp();

  const savedEventList = campusEvents.filter(e => savedItems.has(e.id));
  const followedClubList = campusClubs.filter(c => followedClubs.has(c.id));

  return (
    <div className="bg-[#FFFEF0] min-h-screen text-[#000000] py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white border-2 border-black/10 rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#3B3BFF] text-white flex items-center justify-center font-display font-black text-2xl">
              AK
            </div>
            <div>
              <h1 className="font-display font-black text-2xl text-[#000000]">
                Amity Student Dashboard
              </h1>
              <p className="text-xs font-mono-label text-[#6B6B8C]">
                Verified Enrollment · Major Arterial Rd, Newtown
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono-label text-xs">
            <div className="text-center bg-[#FFFEF0] px-4 py-2 rounded-xl border border-black/10">
              <span className="block font-bold text-lg text-[#3B3BFF]">{savedItems.size}</span>
              <span className="text-[10px] text-[#6B6B8C] uppercase">Saved</span>
            </div>
            <div className="text-center bg-[#FFFEF0] px-4 py-2 rounded-xl border border-black/10">
              <span className="block font-bold text-lg text-[#1A1A8C]">{followedClubs.size}</span>
              <span className="text-[10px] text-[#6B6B8C] uppercase">Followed</span>
            </div>
          </div>
        </div>

        {/* Saved Events */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-black text-2xl text-[#000000] flex items-center gap-2">
              <Bookmark size={20} className="text-[#3B3BFF]" />
              <span>Saved Events ({savedEventList.length})</span>
            </h2>
            <Link href="/events" className="text-xs font-mono-label text-[#3B3BFF] hover:underline">
              Explore More Events →
            </Link>
          </div>

          {savedEventList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedEventList.map(event => (
                <div 
                  key={event.id}
                  className="bg-white p-5 rounded-xl border border-black/10 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono-label text-[#3B3BFF] font-bold uppercase">{event.badge}</span>
                    <h3 className="font-display font-bold text-base text-[#000000]">{event.title}</h3>
                    <p className="text-xs font-mono-label text-[#6B6B8C]">{event.date} · {event.venue}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link 
                      href={`/events/${event.id}`}
                      className="bg-[#3B3BFF] text-white px-3 py-1.5 rounded-lg text-xs font-mono-label font-bold uppercase"
                    >
                      View
                    </Link>
                    <button 
                      onClick={(e) => toggleSave(event.id, e)}
                      className="text-[#6B6B8C] hover:text-rose-600 p-1.5 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-black/10 text-center text-xs font-mono-label text-[#6B6B8C]">
              No saved events yet. Browse events and bookmark what looks exciting!
            </div>
          )}
        </div>

        {/* Followed Clubs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-black text-2xl text-[#000000] flex items-center gap-2">
              <Users size={20} className="text-[#1A1A8C]" />
              <span>Followed Clubs ({followedClubList.length})</span>
            </h2>
            <Link href="/clubs" className="text-xs font-mono-label text-[#3B3BFF] hover:underline">
              Discover All Clubs →
            </Link>
          </div>

          {followedClubList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {followedClubList.map(club => (
                <div 
                  key={club.id}
                  className="bg-white p-5 rounded-xl border border-black/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">{club.avatar}</div>
                    <h3 className="font-display font-bold text-base text-[#000000]">{club.name}</h3>
                    <p className="text-xs text-[#6B6B8C] line-clamp-2 mt-1">{club.tagline}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between">
                    <Link href={`/clubs/${club.id}`} className="text-xs font-mono-label text-[#3B3BFF] font-bold">
                      Club Profile →
                    </Link>
                    <button 
                      onClick={(e) => toggleFollow(club.id, e)}
                      className="text-xs font-mono-label text-rose-600 hover:underline cursor-pointer"
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-black/10 text-center text-xs font-mono-label text-[#6B6B8C]">
              You are not following any societies yet. Follow Turing Club or Cadence to get started!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

