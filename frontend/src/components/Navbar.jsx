'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* 1. ANNOUNCEMENT BAR (Arc Spec: deep-indigo #1A1A8C, white text, 0.75rem vertical padding, wavy/scalloped bottom edge) */}
      <div className="arc-grain-indigo text-white px-4 py-3 relative">
        <div className="max-w-[75rem] mx-auto flex items-center justify-center text-center font-nav text-sm">
          <Link 
            href="/events" 
            className="group inline-flex items-center gap-2 text-white hover:text-[#FFFEF0] transition-colors"
          >
            <span>AmiFIESTA 2026 Inter-College battle of bands is now live for all Amity students</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            {/* Arc Dia product icon counterpart */}
            <span className="w-5 h-5 rounded-full bg-white/20 inline-flex items-center justify-center text-[10px] ml-1">
              ✦
            </span>
          </Link>
        </div>
      </div>
      {/* Scalloped divider */}
      <div className="arc-scallop-indigo -mt-1"></div>

      {/* 2. NAVIGATION BAR (Arc Spec: Transparent or matching over textured electric-blue, space-between, logo left, links center-left, button right) */}
      <nav className="arc-grain-electric text-white px-4 sm:px-8 py-4 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-[75rem] mx-auto flex items-center justify-between">
          
          {/* Logo Mark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Arc-style geometric mark */}
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-4 h-4 rounded bg-[#3B3BFF] flex items-center justify-center font-black text-white text-[10px]">
                A
              </div>
            </div>
            <span className="font-hero-display text-2xl tracking-tighter text-white">
              Afterclass.
            </span>
          </Link>

          {/* Text Links (Max, Mobile, Developers, Students, Blog -> Events, Clubs, Opportunities, Notices, Developers) */}
          <div className="hidden md:flex items-center gap-8 font-nav text-sm text-white">
            <Link 
              href="/events" 
              className={`hover:text-white/80 transition-colors ${pathname === '/events' ? 'underline underline-offset-8 font-medium' : ''}`}
            >
              Events
            </Link>
            <Link 
              href="/clubs" 
              className={`hover:text-white/80 transition-colors ${pathname === '/clubs' ? 'underline underline-offset-8 font-medium' : ''}`}
            >
              Clubs
            </Link>
            <Link 
              href="/opportunities" 
              className={`hover:text-white/80 transition-colors ${pathname === '/opportunities' ? 'underline underline-offset-8 font-medium' : ''}`}
            >
              Opportunities
            </Link>
            <Link 
              href="/notices" 
              className={`hover:text-white/80 transition-colors ${pathname === '/notices' ? 'underline underline-offset-8 font-medium' : ''}`}
            >
              Notices
            </Link>
            <Link 
              href="/developers" 
              className={`hover:text-white/80 transition-colors ${pathname === '/developers' ? 'underline underline-offset-8 font-medium' : ''}`}
            >
              Developers
            </Link>
          </div>

          {/* Download Button (Arc Spec: White fill, electric-blue text, label typography, 0.75rem border radius, 0.75rem vert, 1.5rem horiz) */}
          <div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-white text-[#3B3BFF] hover:bg-[#FFFEF0] font-label uppercase px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              {/* Windows grid / platform prefix icon */}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 2.25L6.5 1.3V7.5H0V2.25ZM0 8.5H6.5V14.7L0 13.75V8.5ZM7.5 1.15L16 0V7.5H7.5V1.15ZM7.5 8.5H16V16L7.5 14.85V8.5Z"/>
              </svg>
              <span>Download for Campus</span>
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}
