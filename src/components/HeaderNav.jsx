'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function HeaderNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Events' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/dhanda', label: 'Dhanda', iconMoney: true },
    { href: '/opportunities', label: 'Opportunities', comingSoon: true },
    { href: '/notices', label: 'Notices' },
    { href: '/developers', label: 'Developers' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="relative z-30 max-w-[80rem] w-full mx-auto px-6 sm:px-12 pt-6 pb-4">
      <div className="flex items-center justify-between">
        {/* Brand wordmark with "for amity" in small font */}
        <Link href="/" className="flex items-baseline gap-1.5 group transition-transform hover:scale-[1.02]">
          <span className="text-white font-arc-display text-3xl font-extrabold tracking-tight">
            afterclass
          </span>
          <span className="text-white/80 font-arc-mono text-xs font-semibold tracking-wider uppercase">
            for amity
          </span>
        </Link>

        {/* Clean text links directly on transparent background with active indicator */}
        <div className="hidden md:flex items-center gap-8 text-white text-xs font-medium tracking-wide font-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-all duration-200 hover:text-white/80 flex items-center gap-2 ${
                  isActive ? 'text-white' : 'text-white/90'
                }`}
              >
                <span className={isActive ? 'underline underline-offset-8 decoration-2 font-black text-white flex items-center gap-1.5' : 'flex items-center gap-1.5'}>
                  {link.iconMoney && <span className="text-sm">💸</span>}
                  <span>{link.label}</span>
                </span>
                {link.comingSoon && (
                  <span className="font-righteous font-normal text-[11px] uppercase tracking-wider bg-[#FEF08A] text-[#881337] px-2 py-0.5 rounded-md shadow-sm transform -rotate-3 hover:rotate-0 transition-transform no-underline select-none">
                    COMING SOON
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="hidden sm:inline-flex bg-white text-[#881337] hover:bg-[#FFFDF5] text-[11px] font-arc-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
          >
            JOIN COMMUNITY
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Small Popup Dialog Box */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Small floating dialog card anchored right below the hamburger icon */}
          <div className="md:hidden absolute right-6 top-16 z-50 w-56 bg-[#881337] border-2 border-white/20 rounded-2xl p-3 shadow-2xl animate-nav-pop flex flex-col gap-1.5">
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/10 px-2">
              <span className="font-arc-mono text-[10px] font-bold text-white/70 uppercase tracking-wider">
                NAVIGATION
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-white p-0.5 rounded-md"
              >
                <X size={14} />
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-arc-mono font-bold transition-colors ${
                    isActive ? 'bg-white text-[#881337]' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.iconMoney && <span className="text-xs">💸</span>}
                    <span>{link.label}</span>
                  </span>
                  {link.comingSoon && (
                    <span className="font-righteous text-[9px] uppercase bg-[#FEF08A] text-[#881337] px-1.5 py-0.5 rounded ml-1">
                      SOON
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-1.5 mt-1 border-t border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-white text-[#881337] font-arc-mono text-[11px] font-bold py-2 rounded-xl uppercase tracking-wider shadow-sm"
              >
                JOIN COMMUNITY
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
