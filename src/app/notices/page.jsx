'use client';

import React from 'react';
import { Bell, ShieldCheck, Calendar, Stamp } from 'lucide-react';
import { notices } from '../../data/amityData';
import Footer from '../../components/Footer';

export default function NoticesPage() {
  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. Header Banner */}
      <section className="arc-grain-red text-white pt-8 pb-16 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-3.5 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Bell size={13} />
            <span>OFFICIAL CAMPUS GAZETTE</span>
          </div>
          <h1 className="font-arc-display text-white text-3xl sm:text-5xl md:text-6xl mb-4 leading-tight">
            “Authorized notices from the Amity community.”
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Koi botla admin nahi hai, sab students manage kar rahe hain updates. Directly from students, for students — verified circulars and urgent campus buzz.
          </p>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. Main Content Area: Full-Width 2-Column Editorial Grid */}
      <div className="bg-[#FFFDF5] flex-1 py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-8">
            <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider flex items-center gap-2">
              <Stamp size={14} />
              <span>OFFICIAL POSTAL DISPATCHES · 2026</span>
            </span>
            <span className="font-arc-mono text-xs text-[#71717A]">
              {notices.length} Active Circulars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {notices.map((notice, idx) => {
              const isLeftCol = idx % 2 === 0;
              const vectorVariant = idx % 3;

              return (
                <div
                  key={notice.id}
                  className={`relative bg-white rounded-[28px] border-2 ${
                    isLeftCol
                      ? 'border-[#E11D48]/25 md:-rotate-[0.6deg]'
                      : 'border-[#881337]/20 md:rotate-[0.6deg] md:translate-y-2'
                  } hover:rotate-0 hover:translate-y-0 hover:border-[#E11D48] p-6 sm:p-7 shadow-[0_12px_30px_rgba(225,29,72,0.08)] hover:shadow-[0_18px_40px_rgba(225,29,72,0.16)] transition-all duration-300 group font-arc-display overflow-hidden flex flex-col justify-between`}
                >
                  {/* Playful Vector Graphics (Laptop, Bag, Hat) */}
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 sm:w-28 sm:h-28 opacity-[0.12] group-hover:opacity-25 transition-opacity pointer-events-none text-[#E11D48]">
                    {vectorVariant === 0 && (
                      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="10" y="14" width="44" height="28" rx="3" fill="#FEF08A" fillOpacity="0.4" />
                        <path d="M4 46h56l-4 6H8l-4-6z" fill="currentColor" fillOpacity="0.2" />
                        <path d="M22 28h20M26 22h12" />
                      </svg>
                    )}
                    {vectorVariant === 1 && (
                      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 20V14a12 12 0 0 1 24 0v6" />
                        <rect x="14" y="20" width="36" height="34" rx="8" fill="#FEF08A" fillOpacity="0.4" />
                        <rect x="20" y="34" width="24" height="14" rx="3" fill="currentColor" fillOpacity="0.15" />
                        <path d="M26 27h12" />
                      </svg>
                    )}
                    {vectorVariant === 2 && (
                      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="32" cy="42" rx="26" ry="7" fill="#FEF08A" fillOpacity="0.45" />
                        <path d="M18 40c0-12 6-22 14-22s14 10 14 22" fill="currentColor" fillOpacity="0.15" />
                        <path d="M18 34c8 3 20 3 28 0" stroke="#881337" />
                      </svg>
                    )}
                  </div>

                  <div>
                    {/* Top Row: Stamp Postal Markings & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#E11D48] text-white text-[10.5px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                          ★ {notice.badge}
                        </span>

                        {notice.pinned && (
                          <span className="bg-[#FEF08A] text-[#881337] text-[10.5px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#FACC15]">
                            PINNED
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#881337] font-bold bg-[#FFF1F2] px-3 py-1 rounded-full border border-[#FFE4E6]">
                        <Calendar size={13} className="text-[#E11D48]" />
                        <span>{notice.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-black text-xl sm:text-[22px] text-[#000000] mb-2.5 leading-snug group-hover:text-[#E11D48] transition-colors relative z-10">
                      {notice.title}
                    </h2>

                    {/* Content excerpt */}
                    <p className="font-sans text-sm text-[#4B5563] leading-relaxed mb-5 font-medium relative z-10">
                      {notice.content}
                    </p>
                  </div>

                  {/* Bottom Strip */}
                  <div className="pt-3.5 border-t border-dashed border-black/10 flex items-center justify-between text-xs relative z-10">
                    <div className="flex items-center gap-2 text-[#881337] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#FFE4E6] flex items-center justify-center text-[#E11D48]">
                        <ShieldCheck size={13} />
                      </span>
                      <span>POSTED BY: Deepak Kalal</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
