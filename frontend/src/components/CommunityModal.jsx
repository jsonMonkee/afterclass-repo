'use client';

import React from 'react';
import { MessageSquare, Send, Users, ExternalLink, ShieldCheck } from 'lucide-react';
import { campuses, DEFAULT_CAMPUS_ID } from '../config/campuses';

export default function CommunityModal({ isOpen, onClose, campusId = DEFAULT_CAMPUS_ID }) {
  if (!isOpen) return null;

  const campus = campuses[campusId] || campuses[DEFAULT_CAMPUS_ID];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF5] max-w-lg w-full rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black text-white font-arc-mono text-xs flex items-center justify-center hover:bg-[#E11D48] transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="inline-block bg-[#FEF08A] text-black border border-black px-3 py-1 rounded-full font-arc-mono text-[10px] font-black uppercase tracking-wider mb-3">
          OFFICIAL STUDENT COMMONS
        </div>

        <h3 className="font-arc-display text-2xl sm:text-3xl font-black text-black mb-1">
          Join {campus.shortName} Community
        </h3>
        <p className="font-sans text-xs text-[#52525B] leading-relaxed mb-6">
          Zero spammed forwards. Verified fest alerts, hackathon team formations, and unmoderated peer support run by students, for students.
        </p>

        <div className="space-y-3 mb-6">
          {/* WhatsApp */}
          <a
            href={campus.communities.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between hover:bg-emerald-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <h4 className="font-arc-display text-sm font-black text-black group-hover:text-emerald-700">
                  Official WhatsApp Broadcast
                </h4>
                <span className="font-arc-mono text-[11px] text-black/60">
                  Instant circulars & urgent fest updates
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-black/50 group-hover:text-black" />
          </a>

          {/* Discord */}
          <a
            href={campus.communities.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between hover:bg-indigo-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              <div>
                <h4 className="font-arc-display text-sm font-black text-black group-hover:text-indigo-700">
                  Afterclass Discord Lounge
                </h4>
                <span className="font-arc-mono text-[11px] text-black/60">
                  Code help, gaming voice rooms & hack prep
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-black/50 group-hover:text-black" />
          </a>

          {/* Telegram */}
          <a
            href={campus.communities.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between hover:bg-sky-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✈️</span>
              <div>
                <h4 className="font-arc-display text-sm font-black text-black group-hover:text-sky-700">
                  Telegram Peer Channel
                </h4>
                <span className="font-arc-mono text-[11px] text-black/60">
                  Notes sharing, PYQ discussions & student chat
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-black/50 group-hover:text-black" />
          </a>
        </div>

        <div className="bg-[#FFFDF5] border border-black/15 p-3 rounded-xl flex items-center gap-2 font-sans text-xs text-black/70">
          <ShieldCheck size={16} className="text-[#E11D48] shrink-0" />
          <span>Keeps our platform fast, memory-leak free, and 100% free to host!</span>
        </div>

      </div>
    </div>
  );
}
