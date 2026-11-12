'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock,
  MapPin, 
  Bookmark, 
  CheckCircle, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { campusEvents } from '../../data/amityData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';
import BounceCards from '../../components/BounceCards';
import SocialEventCard from '../../components/SocialEventCard';

export default function EventsPage() {
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
            “No more missed fests <span className="whitespace-nowrap">or 100 group notifications.”</span>
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

      {/* 2. DIRECTORY ON WARM CREAM */}
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
