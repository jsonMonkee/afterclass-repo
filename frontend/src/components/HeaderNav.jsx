'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Users, Store, ExternalLink } from 'lucide-react';
import CommunityModal from './CommunityModal';

export default function HeaderNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const navLinks = [
    { href: '/events', label: 'Events' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/opportunities', label: 'Opportunities' },
    { href: '/dhanda', label: 'Dhanda', badge: 'NEW' },
    { href: '/notices', label: 'Notices' },
    { href: '/developers', label: 'Developers' },
  ];

  return (
    <>
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
          <div className="hidden md:flex items-center gap-7 text-white text-xs font-medium tracking-wide font-nav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition-all duration-200 hover:text-white/80 flex items-center gap-1.5 ${
                    isActive ? 'text-white' : 'text-white/90'
                  }`}
                >
                  <span className={isActive ? 'underline underline-offset-8 decoration-2 font-black text-white' : ''}>
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className="font-arc-mono font-black text-[9px] uppercase tracking-wider bg-[#FEF08A] text-[#881337] px-1.5 py-0.5 rounded-sm shadow-xs select-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setIsCommunityOpen(true)}
              className="hidden sm:inline-flex bg-white text-[#881337] hover:bg-[#FFFDF5] text-[11px] font-arc-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
            >
              COMMUNITY
            </button>

            <Link
              href="/login"
              className="hidden sm:inline-flex border border-white/30 text-white hover:bg-white hover:text-black text-[11px] font-arc-mono font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all"
            >
              PORTAL
            </Link>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
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

            {/* Small floating dialog card */}
            <div className="md:hidden absolute right-6 top-16 z-50 w-60 bg-[#881337] border-2 border-white/20 rounded-2xl p-3 shadow-2xl animate-nav-pop flex flex-col gap-1.5">
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

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs font-arc-mono font-bold transition-colors flex items-center justify-between ${
                    pathname === link.href ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-[#FEF08A] text-black px-1.5 py-0.5 rounded-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-2 border-t border-white/10 mt-1 flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCommunityOpen(true);
                  }}
                  className="w-full text-center py-2 bg-white text-[#881337] rounded-xl font-arc-mono text-xs font-bold uppercase"
                >
                  Join Community
                </button>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 border border-white/20 text-white rounded-xl font-arc-mono text-xs font-bold uppercase"
                >
                  Admin / Seller Portal
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Community Channels Modal */}
      <CommunityModal 
        isOpen={isCommunityOpen} 
        onClose={() => setIsCommunityOpen(false)} 
      />
    </>
  );
}
