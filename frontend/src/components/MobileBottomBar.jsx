'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Users, Briefcase, FileText, Sparkles, Store } from 'lucide-react';

export default function MobileBottomBar({ onOpenAi }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/clubs', label: 'Clubs', icon: Users },
    { href: '/opportunities', label: 'Perks', icon: Briefcase },
    { href: '/dhanda', label: 'Dhanda', icon: Store },
    { href: '/notices', label: 'Notices', icon: FileText }
  ];

  return (
    <div className="md:hidden fixed bottom-4 inset-x-0 z-40 flex items-center justify-center px-2 pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        
        {/* Main Pill Navbar */}
        <div className="bg-[#FFFDF5] border-[2.5px] border-black rounded-full px-2 py-1 shadow-[4px_4px_0px_#000000] flex items-center gap-0.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center px-2.5 py-1.5 rounded-full transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-[#E11D48] text-white shadow-xs'
                    : 'text-black/75 hover:text-black hover:bg-black/5'
                }`}
              >
                <Icon size={17} className="stroke-[2.2]" />
                <span className="font-arc-mono text-[9px] font-bold tracking-tight uppercase mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Circular Action Button */}
        <button
          onClick={onOpenAi}
          aria-label="Open Bantu AI"
          className="w-12 h-12 rounded-full bg-black text-[#FEF08A] flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_#000000] hover:scale-105 active:scale-95 transition-all cursor-pointer group shrink-0"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">🍌</span>
        </button>

      </div>
    </div>
  );
}
