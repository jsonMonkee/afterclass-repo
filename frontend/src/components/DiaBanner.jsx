'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DiaBanner() {
  return (
    <div className="relative z-20 my-3 sm:my-5 w-full">
      {/* Top scallop scoops */}
      <div className="arc-scallop-band-top"></div>

      {/* Deep crimson textured band */}
      <div className="arc-grain-crimson py-2.5 sm:py-3.5 px-3 sm:px-4 relative flex items-center justify-center overflow-visible">
        <Link 
          href="/"
          className="group flex items-center justify-center gap-2 sm:gap-3 text-white hover:text-[#FFFDF5] transition-colors max-w-full"
        >
          <span className="font-arc-display text-xs sm:text-base md:text-xl font-bold tracking-tight text-white drop-shadow-sm text-center leading-snug truncate sm:overflow-visible flex items-center gap-2 sm:gap-2.5">
            <span>Meet Choto Bantu, a new AI companion for Amity →</span>
            <Image 
              src="/dia-banana.png" 
              alt="Choto Bantu Banana" 
              width={24} 
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain inline-block transform group-hover:scale-110 group-hover:rotate-6 transition-transform drop-shadow-xs"
            />
          </span>
        </Link>
      </div>

      {/* Bottom scallop scoops */}
      <div className="arc-scallop-band-bottom"></div>
    </div>
  );
}

