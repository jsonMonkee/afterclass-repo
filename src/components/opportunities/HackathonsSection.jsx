'use client';

import React, { useState } from 'react';
import { Trophy, Calendar, Users, ExternalLink, Flame, Search, CheckCircle } from 'lucide-react';
import { hackathonsList, hackathonTags } from '../../data/hackathonsData';

export default function HackathonsSection() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = hackathonsList.filter(h => {
    const matchesTag = selectedTag === 'All' || h.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
    const matchesSearch = !search ||
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.organizer.toLowerCase().includes(search.toLowerCase()) ||
      h.description.toLowerCase().includes(search.toLowerCase()) ||
      h.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div id="hackathons-section" className="scroll-mt-24">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E11D48] text-white px-3.5 py-1 rounded-full font-arc-mono text-xs font-black uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000000]">
            <Trophy size={13} />
            <span>UNSTOP & DEVFOLIO AGGREGATOR</span>
          </div>
          <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
            Collegiate Hackathons & Coding Sprints.
          </h2>
          <p className="font-sans text-sm text-[#52525B] font-medium mt-1">
            Real hackathons that actually matter on your resume. PPI offers, cash bounties, and inter-college rivalries.
          </p>
        </div>

        {/* Live Aggregator Status */}
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-300 text-[#E11D48] px-3.5 py-1.5 rounded-xl font-arc-mono text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping"></span>
          <span>5 Active Hackathons Live</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border-[2.5px] border-black shadow-[4px_4px_0px_#000000] mb-8">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-3">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search Unstop, Devfolio, Flipkart, MLH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black placeholder:text-black/40 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {hackathonTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full font-arc-mono text-[11px] font-bold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-black text-white shadow-[2px_2px_0px_#E11D48]'
                    : 'bg-white border border-black/15 text-black hover:border-black'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(hack => (
          <div
            key={hack.id}
            className="bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-arc-mono text-[10px] font-black uppercase tracking-wider bg-black text-white px-3 py-1 rounded-md">
                  {hack.platform}
                </span>

                <div className="flex items-center gap-1.5 font-arc-mono text-[10px] font-black bg-rose-100 text-[#E11D48] px-2.5 py-1 rounded-md border border-rose-300">
                  <Flame size={12} className="fill-[#E11D48]" />
                  <span>{hack.daysLeft} DAYS LEFT</span>
                </div>
              </div>

              {/* Title & Organizer */}
              <h3 className="font-arc-display text-xl sm:text-2xl font-black text-black group-hover:text-[#E11D48] transition-colors leading-snug mb-1">
                {hack.title}
              </h3>
              <span className="font-arc-mono text-xs text-black/60 font-bold block mb-4">
                Organized by {hack.organizer}
              </span>

              {/* Metric Box */}
              <div className="bg-[#FFFDF5] border border-black/20 p-3.5 rounded-2xl mb-4 grid grid-cols-2 gap-2">
                <div>
                  <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Prize Pool</span>
                  <span className="font-arc-mono text-xs sm:text-sm font-black text-[#E11D48]">{hack.prizePool}</span>
                </div>
                <div>
                  <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Format & Team</span>
                  <span className="font-arc-mono text-xs font-bold text-black">{hack.mode.split(' ')[0]} • {hack.teamSize}</span>
                </div>
              </div>

              <p className="font-sans text-xs text-[#52525B] leading-relaxed mb-4">
                {hack.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {hack.tags.map((t, i) => (
                  <span key={i} className="font-arc-mono text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFFDF5] text-black border border-black/15">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="font-arc-mono text-[11px] text-black/60 font-medium">
                Deadline: {hack.deadline}
              </span>

              <a
                href={hack.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#E11D48] text-white hover:bg-black px-5 py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#000000] cursor-pointer"
              >
                <span>Register on {hack.platform}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
