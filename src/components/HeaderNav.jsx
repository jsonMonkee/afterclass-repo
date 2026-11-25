'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ArrowUpRight } from 'lucide-react';

export default function HeaderNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (communityModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [communityModalOpen]);

  const navLinks = [
    { href: '/', label: 'Events' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/dhanda', label: 'Dhanda', iconMoney: true },
    { href: '/opportunities', label: 'Opportunities', comingSoon: true },
    { href: '/notices', label: 'Notices' },
    { href: '/developers', label: 'Developers' },
  ];

  return (
    <nav className="relative z-30 max-w-[80rem] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-5 sm:pt-6 pb-4">
      <div className="flex items-center justify-between gap-3">
        {/* Brand wordmark with "for amity" in small font */}
        <Link href="/" className="flex items-baseline gap-1.5 group transition-transform hover:scale-[1.02] shrink-0">
          <span className="text-white font-arc-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            afterclass
          </span>
          <span className="text-white/80 font-arc-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            for amity
          </span>
        </Link>

        {/* PC UI (lg+): Clean text links directly on transparent background with active indicator */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-white text-xs font-medium tracking-wide font-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-all duration-200 hover:text-white/80 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-white/90'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.iconMoney && <span className="text-sm select-none no-underline inline-block">💸</span>}
                  <span className={isActive ? 'underline underline-offset-8 decoration-2 font-black text-white' : ''}>
                    {link.label}
                  </span>
                </span>
                {link.comingSoon && (
                  <span className="hidden xl:inline-block font-righteous font-normal text-[10px] uppercase tracking-wider bg-[#FEF08A] text-[#881337] px-2 py-0.5 rounded-md shadow-sm transform -rotate-3 hover:rotate-0 transition-transform no-underline select-none whitespace-nowrap">
                    COMING SOON
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Action & Profile Icon & Phone/Tablet Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setCommunityModalOpen(true)}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 bg-white text-[#881337] hover:bg-[#FFFDF5] text-[11px] font-arc-mono font-bold uppercase tracking-wider px-4 lg:px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
          >
            JOIN COMMUNITY
          </button>

          {/* Profile Icon Link - Rightmost */}
          <Link
            href="/profile"
            aria-label="Profile Dashboard"
            title="Leader & Founder Profile"
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
              pathname === '/profile'
                ? 'bg-white text-[#E11D48] shadow-md scale-105'
                : 'bg-white/15 text-white hover:bg-white/25 hover:text-white border border-white/20'
            }`}
          >
            <User size={17} className="stroke-[2.5]" />
          </Link>

          {/* Phone & Tablet hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Phone & Tablet Popup Dialog Box */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Small floating dialog card anchored right below the hamburger icon */}
          <div className="lg:hidden absolute right-4 sm:right-8 top-16 z-50 w-56 bg-[#881337] border-2 border-white/20 rounded-2xl p-3 shadow-2xl animate-nav-pop flex flex-col gap-1.5">
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommunityModalOpen(true);
                }}
                className="w-full block text-center bg-white text-[#881337] font-arc-mono text-[11px] font-bold py-2 rounded-xl uppercase tracking-wider shadow-sm cursor-pointer"
              >
                JOIN COMMUNITY
              </button>
            </div>
          </div>
        </>
      )}

      {/* Community Socials Dialog Box */}
      {communityModalOpen && mounted && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setCommunityModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[440px] my-auto animate-nav-pop select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tilted Layered Comic Backing Cards */}
            <div className="absolute inset-0 rounded-[28px] bg-[#881337] border-[2.5px] border-[#881337] -rotate-[2.2deg] translate-y-1.5 -translate-x-1 pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] bg-[#E11D48] border-[2.5px] border-[#881337] rotate-[1.4deg] translate-y-0.5 translate-x-1 pointer-events-none" />

            {/* Main Warm Cream Paper Dialog */}
            <div className="relative bg-[#FFFDF5] rounded-[28px] border-[2.5px] border-[#881337] shadow-[6px_6px_0px_#881337] p-6 sm:p-7 text-[#0F172A] font-arc-display">
              <button
                type="button"
                onClick={() => setCommunityModalOpen(false)}
                aria-label="Close"
                className="absolute -top-4 -right-4 z-30 w-10 h-10 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 border-[2.5px] border-[#881337] shadow-[3px_3px_0px_#881337]"
              >
                <X size={17} className="stroke-[2.8]" />
              </button>

              <div className="mb-5">
                <span className="inline-block font-arc-mono text-[10px] font-extrabold uppercase tracking-widest text-[#881337] bg-[#FEF08A] px-3 py-1 rounded-full border-2 border-[#881337] shadow-[2px_2px_0px_#881337] mb-2.5">
                  AFTERCLASS COMMUNITY
                </span>
                <h3 className="font-righteous font-normal text-2xl sm:text-[28px] text-[#881337] leading-tight">
                  Connect with Amity Kolkata
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#475569] font-medium mt-1">
                  Join our campus channels for live event drops, club updates, and student discussions.
                </p>
              </div>

              <div className="space-y-2.5">
                {/* 1. WhatsApp */}
                <a
                  href="https://chat.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-white hover:bg-emerald-50 rounded-2xl px-4 py-3 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] border border-[#881337] flex items-center justify-center text-white shrink-0">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-sm font-extrabold text-[#0F172A]">WhatsApp</span>
                      <span className="block font-arc-mono text-[10px] font-bold text-[#475569] uppercase">Campus Group Chat</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[#881337] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* 2. Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-white hover:bg-[#FFF1F2] rounded-2xl px-4 py-3 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FD5949] via-[#D6249F] to-[#285AEB] border border-[#881337] flex items-center justify-center text-white shrink-0">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-sm font-extrabold text-[#0F172A]">Instagram</span>
                      <span className="block font-arc-mono text-[10px] font-bold text-[#475569] uppercase">Reels & Campus Highlights</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[#881337] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* 3. X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-white hover:bg-slate-50 rounded-2xl px-4 py-3 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#881337] flex items-center justify-center text-white shrink-0">
                      <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-sm font-extrabold text-[#0F172A]">X (Twitter)</span>
                      <span className="block font-arc-mono text-[10px] font-bold text-[#475569] uppercase">Updates & Announcements</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[#881337] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* 4. LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-white hover:bg-sky-50 rounded-2xl px-4 py-3 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2] border border-[#881337] flex items-center justify-center text-white shrink-0">
                      <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-sm font-extrabold text-[#0F172A]">LinkedIn</span>
                      <span className="block font-arc-mono text-[10px] font-bold text-[#475569] uppercase">Student Network & Careers</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[#881337] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* 5. Reddit */}
                <a
                  href="https://reddit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-white hover:bg-orange-50 rounded-2xl px-4 py-3 border-2 border-[#881337] shadow-[3px_3px_0px_#881337] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#881337] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FF4500] border border-[#881337] flex items-center justify-center text-white shrink-0">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-sans text-sm font-extrabold text-[#0F172A]">Reddit</span>
                      <span className="block font-arc-mono text-[10px] font-bold text-[#475569] uppercase">Campus Threads & Q&A</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[#881337] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
