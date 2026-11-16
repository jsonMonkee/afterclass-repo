'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, Wand2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { resumeTailorRoles, sampleTailoredBullets } from '../../data/resumeTailorData';

export default function ResumeTailorModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState(resumeTailorRoles[0]);
  const [customBullet, setCustomBullet] = useState(sampleTailoredBullets.raw);
  const [enhancedBullet, setEnhancedBullet] = useState(sampleTailoredBullets.tailored);
  const [isEnhancing, setIsEnhancing] = useState(false);

  if (!isOpen) return null;

  const handleEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setEnhancedBullet(
        `Engineered scalable microservices architecture using Next.js & ${selectedRole.keywordsRequired[0]}, driving 40% reduction in API response times across 2,500+ active student sessions with 99.9% uptime.`
      );
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FFFDF5] max-w-4xl w-full max-h-[90vh] rounded-3xl border-[3px] border-black shadow-[10px_10px_0px_#000000] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between border-b-[3px] border-black shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-arc-display text-xl sm:text-2xl font-black tracking-tight text-white">
                  Afterclass Resume Tailor
                </h3>
                <span className="bg-[#E11D48] text-white px-2.5 py-0.5 rounded-full font-arc-mono text-[10px] font-black uppercase">
                  Internal Product
                </span>
              </div>
              <p className="font-arc-mono text-xs text-white/60">
                AI-powered ATS keyword matcher & quantified bullet enhancer
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E11D48] text-white font-arc-mono text-sm flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Target Role Selector */}
          <div>
            <span className="font-arc-mono text-xs font-black uppercase text-black tracking-wider block mb-2">
              Select Your Target Job Profile
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {resumeTailorRoles.map(role => (
                <button
                  key={role.role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    selectedRole.role === role.role 
                      ? 'bg-white border-black shadow-[3px_3px_0px_#E11D48]' 
                      : 'bg-white/60 border-black/15 hover:border-black'
                  }`}
                >
                  <span className="font-arc-display text-sm font-black text-black block mb-1">
                    {role.role}
                  </span>
                  <span className="font-arc-mono text-[11px] font-bold text-emerald-700">
                    Target ATS Score: {role.targetScore}/100
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ATS Score Simulation Card */}
          <div className="bg-white rounded-2xl border-[2.5px] border-black p-5 shadow-[4px_4px_0px_#000000] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-black/15 pb-4 md:pb-0 md:pr-4">
              <span className="font-arc-mono text-xs text-black/50 uppercase block mb-1">Estimated ATS Score</span>
              <div className="font-bungee text-5xl text-[#E11D48] leading-none mb-2">
                {selectedRole.targetScore - 8}
                <span className="text-xl text-black/40 font-arc-mono">/100</span>
              </div>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-arc-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Needs 3 Core Keywords
              </span>
            </div>

            <div className="md:col-span-8">
              <span className="font-arc-mono text-xs font-black uppercase text-black block mb-2">
                High-Impact ATS Keywords for {selectedRole.role}
              </span>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedRole.keywordsRequired.map((k, i) => (
                  <span 
                    key={i} 
                    className="font-arc-mono text-xs font-bold px-3 py-1 rounded-lg border border-black/20 bg-[#FFFDF5] text-black"
                  >
                    ✓ {k}
                  </span>
                ))}
              </div>
              <p className="font-sans text-xs text-black/60 italic">
                Tip: {selectedRole.tips}
              </p>
            </div>
          </div>

          {/* Quantified Bullet Enhancer Workbench */}
          <div className="bg-white rounded-2xl border-[2.5px] border-black p-6 shadow-[4px_4px_0px_#000000]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-arc-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                <Wand2 size={13} className="text-[#E11D48]" />
                <span>AI Bullet Point Quantifier & ATS Rewriter</span>
              </span>
              <span className="font-arc-mono text-[10px] text-black/50">XYZ Framework (Accomplished [X], measured by [Y], doing [Z])</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Input: Raw Bullet */}
              <div className="flex flex-col">
                <span className="font-arc-mono text-[11px] font-bold text-black/60 mb-1">
                  Your Current Resume Bullet:
                </span>
                <textarea
                  value={customBullet}
                  onChange={(e) => setCustomBullet(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-sans text-xs sm:text-sm text-black focus:outline-none resize-none"
                  placeholder="Paste your resume bullet point..."
                />
              </div>

              {/* Output: AI Tailored Bullet */}
              <div className="flex flex-col">
                <span className="font-arc-mono text-[11px] font-bold text-[#E11D48] mb-1">
                  Tailored High-Impact ATS Result:
                </span>
                <div className="flex-1 p-3 rounded-xl bg-emerald-50/70 border-2 border-emerald-500/50 font-sans text-xs sm:text-sm text-emerald-950 leading-relaxed flex items-center">
                  {isEnhancing ? (
                    <span className="font-arc-mono text-xs text-emerald-700 animate-pulse flex items-center gap-2">
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Optimizing with ATS metrics...</span>
                    </span>
                  ) : (
                    enhancedBullet
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="bg-[#E11D48] hover:bg-black text-white px-6 py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={13} />
                <span>Quantify & Tailor Bullet</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FFFDF5] border-t-2 border-black/15 px-6 py-4 flex items-center justify-between">
          <span className="font-arc-mono text-xs text-black/60">
            Full PDF parser and multi-resume dashboard launching in Afterclass v2.1.
          </span>
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-xl font-arc-mono text-xs font-bold uppercase hover:bg-[#E11D48] transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
}
