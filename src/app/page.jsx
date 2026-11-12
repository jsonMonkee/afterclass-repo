'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import BounceCards from '../components/BounceCards';

export default function HomePage() {
  const testimonialsList = [
    {
      quote: "Bhai Chrome se way more powerful hai. Campus clubs manage karne ke liye this is insane.",
      handle: "@BEEBOMCO"
    },
    {
      quote: "WhatsApp groups ka saara chaos khatam ho gaya. Amity life me there’s no going back.",
      handle: "@KATELAURIELEE"
    },
    {
      quote: "Arc lives up to the campus hype. Super intuitive, playful aur ekdum fresh vibe.",
      handle: "@FIVEBOIII"
    },
    {
      quote: "Bina Afterclass ke campus fests aur auditions track karna sach me miserable tha yaar.",
      handle: "@MARKFISHMAN_XYZ"
    }
  ];

  const campusImages = [
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=600&fit=crop&q=80'
  ];

  return (
    <div className="bg-[#E11D48] min-h-screen relative flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO CONTENT AREA */}
      <div className="relative arc-grain-red flex flex-col overflow-hidden pb-16">
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-20 text-center flex flex-col items-center">
          
          {/* Organic Red Corner Blob with Bell Icon in the top-right of the hero */}
          <div className="absolute right-0 top-0 sm:top-2 pointer-events-none select-none z-10">
            <svg 
              className="w-32 h-24 sm:w-44 sm:h-32 text-[#881337] drop-shadow-md" 
              viewBox="0 0 160 110" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Organic inverted scoop corner blob matching reference */}
              <path 
                d="M 160 0 L 70 0 C 45 0, 35 15, 30 25 C 24 38, 5 40, 2 55 C -2 74, 18 90, 45 88 C 75 85, 95 105, 120 108 C 145 110, 160 95, 160 70 Z" 
                fill="#881337" 
                fillOpacity="0.9"
              />
              {/* Subtle inner stroke highlight */}
              <path 
                d="M 160 2 L 70 2 C 46 2, 36 16, 31 26 C 25 39, 6 41, 4 55 C 0 72, 19 88, 45 86 C 74 83, 94 103, 119 106 C 144 108, 158 94, 158 70 Z" 
                stroke="rgba(255, 255, 255, 0.2)" 
                strokeWidth="1.5"
                fill="none"
              />
              {/* Notification Bell Icon */}
              <g transform="translate(118, 30) scale(1.15)">
                <path 
                  d="M9 17A2 2 0 0 1 5 17M13 13V8A6 6 0 0 0 1 8V13L0 15H14L13 13Z" 
                  fill="white" 
                  stroke="white" 
                  strokeWidth="0.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle cx="11.5" cy="4.5" r="2.5" fill="#FEF08A" stroke="#881337" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Hinglish + English Display Quote */}
          <h1 className="font-arc-display text-white text-4xl sm:text-6xl md:text-[68px] leading-[1.08] max-w-3xl mb-6">
            “No more missed fests or 100 group notifications.”
          </h1>

          {/* Subtitle */}
          <p className="text-white/95 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8">
            Ab dead WhatsApp links aur missed fests ka jhanjhat khatam. Discover clubs, hackathons, auditions aur direct campus updates, tidy by default and always fun.
          </p>

          {/* Hero Actions: Instagram Handle Pill + Join the Community Button */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <a
              href="https://instagram.com/afterclass.amity"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#881337] text-white hover:bg-[#881337]/90 text-[11px] font-arc-mono font-bold uppercase tracking-wider px-5 py-3 rounded-xl border border-white/20 shadow-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>@afterclass.amity</span>
            </a>
            
            <Link
              href="/events"
              className="bg-white text-[#881337] hover:bg-[#FFFDF5] text-[11px] font-arc-mono font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-semibold"
            >
              <span>JOIN THE COMMUNITY</span>
              <span>→</span>
            </Link>
          </div>

          {/* BounceCards Fan */}
          <div className="w-full flex items-center justify-center py-4 overflow-visible">
            <BounceCards
              images={campusImages}
              containerWidth={540}
              containerHeight={320}
              cardSize={210}
              spread={95}
              rotation={12}
              arc={-15}
              pushDistance={150}
              hoverScale={1.08}
              bounciness={0.65}
              animationDelay={0.3}
              animationStagger={0.07}
              borderWidth={5}
              borderColor="#FFFDF5"
              radius={24}
              shadow
              enableHover
            />
          </div>

        </div>

        {/* Scalloped teeth dividing into cream band */}
        <div className="scallop-bottom-cream"></div>
      </div>

      {/* 2. SKY BLUE SOCIAL-PROOF & CAMPUS LOVE BAND WITH WHITE & RED MIXTURE */}
      <section className="bg-gradient-to-b from-[#E0F2FE] via-[#BAE6FD] to-[#E0F2FE] text-[#000000] py-24 sm:py-32 px-6 sm:px-12 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[85rem] mx-auto text-center relative z-10">
          
          <div className="flex items-center justify-center gap-6 mb-16">
            <svg className="w-8 h-8 text-[#E11D48] filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <svg className="w-8 h-8 text-[#E11D48] filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <svg className="w-8 h-8 text-[#E11D48] filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18l8-14 8 14"/>
              <path d="M6.5 13.5h11"/>
              <circle cx="18" cy="8" r="2"/>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center items-stretch">
            {testimonialsList.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/90 backdrop-blur-md rounded-[28px] p-7 border-2 border-white shadow-[0_15px_35px_rgba(2,132,199,0.12)] flex flex-col items-center justify-between min-h-[220px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <h3 className="font-arc-display text-xl sm:text-2xl text-[#E11D48] leading-snug tracking-tight font-extrabold max-w-xs mb-8 group-hover:text-[#BE123C] transition-colors">
                  {item.quote}
                </h3>

                <div className="inline-block bg-[#FFF1F2] border border-[#FECDD3] rounded-full px-4 py-1.5 transition-transform group-hover:scale-105 shadow-xs">
                  <span className="font-arc-mono text-[10.5px] font-bold text-[#E11D48] tracking-wider uppercase">
                    {item.handle}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. SOLID RED CONVERSION FOOTER */}
      <Footer />

    </div>
  );
}
