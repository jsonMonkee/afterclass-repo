'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* 2. Main Footer Body: Solid Electric Red Canvas */}
      <footer className="arc-grain-red text-white pt-16 sm:pt-28 pb-20 sm:pb-24 px-6 sm:px-16 lg:px-24 relative">
        <div className="max-w-[88rem] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12 sm:gap-16 lg:gap-24">
          
          {/* Left Navigation Matrix: PRODUCT, RESOURCES, FOLLOW */}
          <div className="flex flex-wrap sm:flex-nowrap items-start gap-10 sm:gap-20 lg:gap-28 w-full md:w-auto justify-between sm:justify-start">
            
            {/* Column 1: COMMUNITY */}
            <div>
              <h4 className="font-arc-mono text-xs sm:text-[13px] font-black text-white uppercase tracking-[0.22em] mb-6">
                COMMUNITY
              </h4>
              <ul className="space-y-3.5 font-sans text-sm sm:text-[15.5px] text-white/90 font-semibold">
                <li>
                  <Link href="/" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/clubs" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link href="/dhanda" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Dhanda 💸
                  </Link>
                </li>
                <li>
                  <Link href="/notices" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: RESOURCES */}
            <div>
              <h4 className="font-arc-mono text-xs sm:text-[13px] font-black text-white uppercase tracking-[0.22em] mb-6">
                RESOURCES
              </h4>
              <ul className="space-y-3.5 font-sans text-sm sm:text-[15.5px] text-white/90 font-semibold">
                <li>
                  <Link href="/clubs" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/notices" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/developers" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: FOLLOW */}
            <div>
              <h4 className="font-arc-mono text-xs sm:text-[13px] font-black text-white uppercase tracking-[0.22em] mb-6">
                FOLLOW
              </h4>
              <div className="flex items-center gap-6 text-white pt-1">
                {/* X Icon */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="X"
                  className="hover:text-white hover:scale-115 transition-transform"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram Icon */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="hover:text-white hover:scale-115 transition-transform"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>

                {/* YouTube Icon */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="hover:text-white hover:scale-115 transition-transform"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Brand Section (orbit style bold lowercase typography + MADE WITH CARE) */}
          <div className="flex flex-col items-start md:items-end w-full md:w-auto pt-6 md:pt-0">
            <Link href="/" className="group mb-1.5 block">
              <span className="font-arc-display text-6xl sm:text-7xl lg:text-[96px] text-white font-extrabold tracking-tight hover:opacity-95 transition-opacity leading-none">
                afterclass
              </span>
            </Link>

            <a 
              href="https://wyrcan.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-arc-mono text-sm sm:text-base font-bold text-white/90 hover:text-white transition-colors mb-4 tracking-wider flex items-center gap-1.5"
            >
              <span>by wyrcan.io</span>
              <span className="text-xs opacity-75">↗</span>
            </a>

            <div className="w-full pt-1 flex justify-start md:justify-end">
              <span className="font-arc-mono text-xs sm:text-[13px] font-black uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                MADE WITH <span className="text-[#F43F5E]">♥</span> FOR AMITY BY AMITIANS
              </span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
