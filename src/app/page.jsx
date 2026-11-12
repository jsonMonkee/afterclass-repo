'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { campusEvents } from '../data/amityData';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';
import BounceCards from '../components/BounceCards';
import SocialEventCard from '../components/SocialEventCard';

export default function HomePage() {
  const { savedItems, toggleSave, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cultural & Music', 'Coding & Tech', 'Music', 'Entrepreneurship'];

  const filteredEvents = campusEvents.filter(ev => {
    const matchesCat = selectedCategory === 'All' || ev.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery = !searchQuery || 
                         ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ev.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const eventPhotos = [
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop&q=80'
  ];

  const testimonialsList = [
    {
      quote: "Bhai official portal se 100x better hai. Campus clubs manage karne ke liye this is insane.",
      handle: "@BEEBOMCO"
    },
    {
      quote: "WhatsApp groups ka saara chaos khatam ho gaya. Amity life me there's no going back.",
      handle: "@KATELAURIELEE"
    },
    {
      quote: "Afterclass completely changes the campus vibe. Super intuitive, playful aur ekdum fresh experience.",
      handle: "@FIVEBOIII"
    },
    {
      quote: "Bina Afterclass ke campus fests aur auditions track karna sach me miserable tha yaar.",
      handle: "@MARKFISHMAN_XYZ"
    }
  ];

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto pt-8 pb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-3.5 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Flame size={13} />
            <span>CAMPUS FESTS & SESSIONS</span>
          </div>

          <h1 className="font-arc-display text-white text-3xl sm:text-5xl md:text-[62px] leading-[1.08] max-w-4xl mb-6">
            "No more missed fests <span className="whitespace-nowrap">or 100 group notifications."</span>
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed mb-8">
            Every competition, concert, tech sprint, aur open mic across Amity University Kolkata. RSVP passes directly through your student profile.
          </p>

          {/* Interactive BounceCards Fan for Events */}
          <div className="w-full flex items-center justify-center py-2 overflow-visible">
            <BounceCards
              images={eventPhotos}
              containerWidth={540}
              containerHeight={300}
              cardSize={200}
              spread={95}
              rotation={10}
              arc={-12}
              pushDistance={140}
              hoverScale={1.08}
              bounciness={0.65}
              borderColor="#FFFDF5"
              radius={24}
              shadow
              enableHover
            />
          </div>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. CAMPUS LOVE / TESTIMONIALS SECTION — Seamless white background, no cards, clean typography */}
      <section className="bg-[#FFFDF5] text-[#000000] pt-16 pb-12 px-6 sm:px-12 border-b border-black/10">
        <div className="max-w-[85rem] mx-auto text-center">
          
          <div className="flex items-center justify-center gap-6 mb-12">
            <svg className="w-6 h-6 text-[#E11D48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <svg className="w-6 h-6 text-[#E11D48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <svg className="w-6 h-6 text-[#E11D48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18l8-14 8 14"/>
              <path d="M6.5 13.5h11"/>
              <circle cx="18" cy="8" r="2"/>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center items-start">
            {testimonialsList.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-between min-h-[160px] group px-3"
              >
                <p className="font-arc-display text-lg sm:text-[21px] text-[#E11D48] leading-snug tracking-tight font-extrabold max-w-xs mb-6 group-hover:text-[#BE123C] transition-colors">
                  {item.quote}
                </p>

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

      {/* 3. EVENTS DIRECTORY ON WARM CREAM */}
      <div className="bg-[#FFFDF5] flex-1 py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header & Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-black/10">
            <div>
              <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider block mb-2">
                CAMPUS ARCHIVE · 2026
              </span>
              <h2 className="font-arc-display text-3xl sm:text-4xl text-[#000000] font-black tracking-tight">
                Upcoming campus calendar.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-arc-mono text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#E11D48] text-white shadow-sm'
                      : 'bg-white border border-black/10 text-[#71717A] hover:border-[#E11D48] hover:text-[#E11D48]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid: Social Cards matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <SocialEventCard 
                key={event.id}
                event={event}
                isSaved={savedItems.has(event.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
