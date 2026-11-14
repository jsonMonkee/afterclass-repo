'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Users, Briefcase, FileText, User, Sparkles, Coins } from 'lucide-react';

export default function MobileBottomBar({ onOpenAi }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Events', icon: Calendar },
    { href: '/clubs', label: 'Clubs', icon: Users },
    { href: '/dhanda', label: 'Dhanda', icon: Coins },
    { href: '/opportunities', label: 'Work', icon: Briefcase, comingSoon: true },
    { href: '/notices', label: 'Notices', icon: FileText },
    { href: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-5 inset-x-0 z-40 flex items-center justify-center px-4 pointer-events-none">
      <div className="flex items-center gap-2.5 pointer-events-auto">
        
        {/* Main Pill Navbar */}
        <div className="bg-[#FFFDF5] border-2 border-black rounded-full px-2 py-1.5 shadow-[4px_4px_0px_#000000] flex items-center gap-1 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center px-3.5 py-1.5 rounded-full transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'text-black/75 hover:text-black hover:bg-black/5'
                }`}
              >
                <Icon size={18} className="stroke-[2.2]" />
                <span className="font-arc-mono text-[9.5px] font-bold tracking-tight uppercase mt-0.5">
                  {item.label}
                </span>

                {item.comingSoon && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FEF08A] border border-black"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Circular Action Button (like the black audio/sparkle circle in the screenshot) */}
        <button
          onClick={onOpenAi}
          aria-label="Open AI Assistant"
          className="w-13 h-13 rounded-full bg-black text-[#FEF08A] flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_#000000] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          {/* Audio waveforms + Sparkle icon matching reference */}
          <div className="flex items-center gap-0.5 group-hover:scale-110 transition-transform">
            <span className="w-1 h-3.5 bg-[#FFFDF5] rounded-full animate-pulse"></span>
            <span className="w-1 h-5 bg-[#FEF08A] rounded-full"></span>
            <span className="w-1 h-2.5 bg-[#FFFDF5] rounded-full animate-pulse"></span>
            <Sparkles size={11} className="text-[#FEF08A] ml-0.5 fill-[#FEF08A]" />
          </div>
        </button>

      </div>
    </div>
  );
}

