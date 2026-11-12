'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Bookmark, 
  ArrowLeft,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { campusEvents } from '../../../data/amityData';
import { useApp } from '../../../context/AppContext';
import Footer from '../../../components/Footer';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { savedItems, toggleSave } = useApp();

  const eventId = params?.id;
  const event = campusEvents.find(e => e.id === eventId) || campusEvents[0];
  const isSaved = savedItems.has(event.id);

  const handleRegister = () => {
    alert(`Registration Confirmed for ${event.title}! Your digital student QR ticket has been synced to your Amity profile.`);
  };

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* Red Top Bar with Back Button */}
      <section className="arc-grain-red text-white pt-6 pb-14 px-6 sm:px-12 relative">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 font-arc-mono text-xs font-bold text-white/90 hover:text-white hover:underline cursor-pointer uppercase tracking-wider bg-[#881337] px-4 py-2 rounded-xl border border-white/15"
          >
            <ArrowLeft size={14} />
            <span>← Back to Calendar</span>
          </button>

          <span className="font-arc-mono text-xs uppercase tracking-wider text-white/80">
            {event.badge}
          </span>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* Main Content Card on Warm Cream */}
      <div className="bg-[#FFFDF5] flex-1 py-14 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white border-2 border-black/5 rounded-3xl overflow-hidden shadow-xl mb-12">
            
            {/* Visual Cover */}
            <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#881337] text-white font-arc-mono text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                {event.badge}
              </div>
              <div className="absolute top-4 right-4">
                <button 
                  onClick={(e) => toggleSave(event.id, e)}
                  className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#E11D48] hover:bg-white shadow cursor-pointer transition-transform hover:scale-110"
                >
                  <Bookmark size={17} className={isSaved ? "fill-[#E11D48]" : ""} />
                </button>
              </div>
            </div>

            {/* Event Info */}
            <div className="p-8 sm:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-arc-mono font-bold text-[#E11D48] uppercase tracking-wider">
                  <CheckCircle size={15} />
                  <span>Organized by {event.club}</span>
                </div>
                <span className="font-arc-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ● {event.status}
                </span>
              </div>

              <h1 className="font-arc-display font-extrabold text-3xl sm:text-5xl text-[#000000] tracking-tight leading-tight mb-6">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FFFDF5] border border-black/5 mb-8 font-arc-mono text-xs">
                <div className="flex items-center gap-3 text-[#000000]">
                  <Calendar size={18} className="text-[#E11D48]" />
                  <div>
                    <span className="block font-bold">{event.date}</span>
                    <span className="text-[#71717A] text-[11px]">{event.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#000000]">
                  <MapPin size={18} className="text-[#E11D48]" />
                  <div>
                    <span className="block font-bold">{event.venue}</span>
                    <span className="text-[#71717A] text-[11px]">Amity University Kolkata</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none text-[#71717A] text-sm sm:text-base leading-relaxed space-y-4 font-body mb-10">
                <p>{event.description}</p>
                <p>
                  Entry is restricted to verified Amity students, faculty, and authorized guest passes. Please display your student ID card or Afterclass digital pass at the entrance gate.
                </p>
              </div>

              {/* Action Strip */}
              <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-arc-mono text-[#71717A]">
                  <Sparkles size={15} className="text-[#E11D48]" />
                  <span>Instant student confirmation pass</span>
                </div>

                <button 
                  onClick={handleRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#881337] text-white px-8 py-4 rounded-2xl font-arc-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Confirm Registration & Get QR Pass →
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
