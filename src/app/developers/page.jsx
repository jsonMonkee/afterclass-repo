'use client';

import React from 'react';
import Footer from '../../components/Footer';
import ReflectiveCard from '../../components/ReflectiveCard';
import ScrollReveal from '../../components/ScrollReveal';

export default function DevelopersPage() {
  const developers = [
    {
      name: "Joydeep Das",
      role: "Lead Systems Architect & Core Developer",
      badge: "Architect",
      status: "Active",
      statusColor: "#22c55e",
      idLabel: "Dev ID",
      idValue: "AK-DEV-2026-01",
      theme: "dark",
      tint: "#ff4d6d",
      avatarSrc: "/dev-pug.jpg"
    },
    {
      name: "Abhirup Karmakar",
      role: "Full-Stack Engineer & Core Infrastructure",
      badge: "Core Dev",
      status: "Active",
      statusColor: "#22c55e",
      idLabel: "Dev ID",
      idValue: "AK-DEV-2026-02",
      theme: "dark",
      tint: "#ffffff",
      avatarSrc: "/dev-capybara.jpg"
    },
    {
      name: "Md Affan",
      role: "Systems & Interface Engineer",
      badge: "Core Dev",
      status: "Active",
      statusColor: "#22c55e",
      idLabel: "Dev ID",
      idValue: "AK-DEV-2026-03",
      theme: "dark",
      tint: "#ffd166",
      avatarSrc: "/dev-seal.jpg"
    }
  ];

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. Header Banner */}
      <section className="arc-grain-red text-white pt-8 pb-16 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#881337] border border-white/20 rounded-full px-4 py-1.5 font-arc-mono text-xs uppercase tracking-wider text-white mb-6">
            Hi,Lol
          </div>

          <h1 className="font-arc-display text-white text-4xl sm:text-6xl mb-6">
            Meet the bhaiyas who have been working out for this community
          </h1>

          <p className="font-body text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-4">
            Meet the engineers crafting Afterclass for Amity University Kolkata. Built with tactile WebGL shaders, real-time campus data sync, and high-energy Arc tokens.
          </p>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. Main Content Area */}
      <div className="bg-[#FFFDF5] flex-1 py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Subheading */}
          <div className="text-center mb-12">
            <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-2">
              FOUNDING COLLECTIVE
            </span>
            <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
              Engineering Leads
            </h2>
            <p className="font-arc-mono text-xs text-[#71717A] mt-2 max-w-md mx-auto">
              Interactive metallic cards with ray-traced glare, chromatic blur, and cursor tracking.
            </p>
          </div>

          {/* Interactive Reflective Cards Showcase */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-20">
            {developers.map((dev, idx) => (
              <div key={idx} className="flex justify-center transition-transform hover:scale-[1.02]">
                <ReflectiveCard
                  name={dev.name}
                  role={dev.role}
                  badge={dev.badge}
                  status={dev.status}
                  statusColor={dev.statusColor}
                  idLabel={dev.idLabel}
                  idValue={dev.idValue}
                  avatarSrc={dev.avatarSrc}
                  theme={dev.theme}
                  tint={dev.tint}
                  metalness={0.95}
                  roughness={0.25}
                  blurStrength={8}
                  shine={1.2}
                  glare={0.65}
                  enableTilt={true}
                  tiltStrength={14}
                  width={320}
                  height={400}
                  radius={24}
                />
              </div>
            ))}
          </div>

          {/* Community Philosophy with ScrollReveal Effect & Playful Doodles */}
          <div className="relative w-full max-w-6xl mx-auto my-28 py-16 px-4 sm:px-12 text-center overflow-visible select-none">
            
            {/* Doodle 1: Dotted paper airplane with looping flight path (Top Right) */}
            <div className="absolute -top-10 right-4 sm:right-12 pointer-events-none z-10 hidden sm:block animate-bounce duration-1000">
              <svg width="170" height="90" viewBox="0 0 170 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-6">
                {/* Dotted trail */}
                <path 
                  d="M10 75 C 40 85, 70 30, 110 55 C 130 65, 140 40, 150 25" 
                  stroke="#E11D48" 
                  strokeWidth="2.5" 
                  strokeDasharray="5 5" 
                  strokeLinecap="round" 
                />
                {/* Paper Airplane */}
                <g transform="translate(142, 10) rotate(-15) scale(0.9)">
                  <path d="M0 25 L35 0 L15 32 L10 24 Z" fill="#E11D48" />
                  <path d="M15 32 L20 20 L35 0 Z" fill="#BE123C" />
                </g>
              </svg>
            </div>

            {/* Doodle 2: Hand-drawn Swirly Arrow (Left Side pointing into text) */}
            <div className="absolute top-1/4 -left-2 sm:left-4 pointer-events-none z-10 hidden md:block">
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M15 15 C 35 5, 55 35, 30 55 C 15 65, 25 80, 70 70" 
                  stroke="#E11D48" 
                  strokeWidth="2.8" 
                  strokeLinecap="round" 
                />
                {/* Arrowhead */}
                <path 
                  d="M58 60 L73 70 L60 80" 
                  stroke="#E11D48" 
                  strokeWidth="2.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <span className="font-arc-mono text-[11px] font-bold text-[#E11D48] tracking-wider -rotate-12 block mt-1">
                read this! ✨
              </span>
            </div>

            {/* Doodle 3: Sparkling Stars (Top Left) */}
            <div className="absolute -top-4 left-8 sm:left-24 pointer-events-none z-10 text-2xl sm:text-3xl animate-pulse">
              ✨
            </div>

            {/* Doodle 4: Floating Banana Mascot Stamp (Right bottom) */}
            <div className="absolute bottom-2 -right-2 sm:right-6 pointer-events-none z-10 hidden sm:block transform rotate-12 hover:rotate-0 transition-transform">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-md rounded-2xl p-2.5 border-2 border-black/10 shadow-lg flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl">🍌</span>
                <span className="font-arc-mono text-[9px] font-black text-[#881337] uppercase tracking-wider mt-0.5">
                  BANTU VERIFIED
                </span>
              </div>
            </div>

            {/* Doodle 5: Curved Underline Squiggle (Bottom Left) */}
            <div className="absolute -bottom-6 left-12 sm:left-32 pointer-events-none z-10 hidden sm:block">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M5 15 Q 30 5, 60 15 T 115 15" 
                  stroke="#E11D48" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            {/* Doodle 6: Floating Emoji Cluster */}
            <div className="absolute top-2 right-1/4 pointer-events-none z-10 hidden lg:flex items-center gap-2 text-xl opacity-90">
              <span className="inline-block transform -rotate-12 animate-bounce">⚡</span>
              <span className="inline-block transform rotate-6">🚀</span>
            </div>

            {/* Main Header Tag */}
            <div className="inline-flex items-center gap-2 bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/25 px-4 py-1.5 rounded-full font-arc-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-6 shadow-xs">
              <span>⚡</span>
              <span>COMMUNITY MISSION · BY AMITIANS FOR AMITIANS</span>
              <span>⚡</span>
            </div>

            <ScrollReveal
              highlightColor="#E11D48"
              mode="scrub"
              splitBy="words"
              effect="rise"
              stagger={0.06}
              duration={0.8}
              smoothing={0.2}
              baseOpacity={0.12}
              baseRotation={3}
              baseOffset={18}
              enableBlur={true}
              blurStrength={6}
              containerClassName="w-full relative z-10"
              textClassName="font-arc-display text-3xl sm:text-5xl md:text-6xl text-[#000000] font-black leading-[1.25] tracking-tight"
            >
              Afterclass is built by students who refused to let campus life get buried in spam groups, missed fest deadlines, and silent placement cells. We code late into the night so every Amitian gets a home to discover, build, and lead.
            </ScrollReveal>

          </div>

          {/* Wyrcan.io Agency Callout Card */}
          <div className="max-w-4xl mx-auto my-16 px-4">
            <div className="bg-gradient-to-br from-[#1E222A] via-[#151820] to-[#0D0F14] text-white rounded-[36px] p-8 sm:p-12 border-2 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center text-center gap-6 group transition-all duration-300 hover:shadow-2xl hover:border-white/20">
              
              {/* Ambient gradient glow in top corner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E11D48]/20 via-[#38BDF8]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/10 text-[#38BDF8] border border-white/10 px-3.5 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider mb-4">
                  <span>🚀</span>
                  <span>PRODUCTION STUDIO</span>
                </div>

                <h3 className="font-arc-display text-2xl sm:text-4xl text-white font-black tracking-tight mb-3">
                  Built by the team <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-white to-[#E11D48]">wyrcan.io</span>
                </h3>

                <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-medium">
                  If you want websites or software like this, we are ready to help you out. From tactile high-energy campus web apps to full-stack systems.
                </p>
              </div>

              {/* Action Button Centered below text */}
              <div className="relative z-10 pt-2">
                <a
                  href="https://wyrcan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-[#FEF08A] font-arc-display font-black text-sm uppercase tracking-wide px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
                >
                  <span>LET’S TALK</span>
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform text-xs">
                    →
                  </span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
