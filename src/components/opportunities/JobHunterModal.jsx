'use client';

import React, { useState } from 'react';
import { Briefcase, Building, MapPin, IndianRupee, Clock, CheckCircle, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { internalJobs } from '../../data/jobPortalData';

export default function JobHunterModal({ isOpen, onClose }) {
  const [selectedJob, setSelectedJob] = useState(internalJobs[0]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [filterType, setFilterType] = useState('All');

  if (!isOpen) return null;

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set(prev).add(jobId));
  };

  const filtered = internalJobs.filter(j => 
    filterType === 'All' || j.type.toLowerCase().includes(filterType.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FFFDF5] max-w-5xl w-full h-[88vh] rounded-3xl border-[3px] border-black shadow-[10px_10px_0px_#000000] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between border-b-[3px] border-black shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-arc-display text-xl sm:text-2xl font-black tracking-tight text-white">
                  Afterclass Job Hunter
                </h3>
                <span className="bg-[#E11D48] text-white px-2.5 py-0.5 rounded-full font-arc-mono text-[10px] font-black uppercase">
                  Internal Product
                </span>
              </div>
              <p className="font-arc-mono text-xs text-white/60">
                Curated high-signal internships & entry roles for Amity Kolkata students
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

        {/* Content Split Pane */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Job List */}
          <div className="md:col-span-5 border-r-[2.5px] border-black overflow-y-auto p-4 space-y-3 bg-[#FFFDF5]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
              <span className="font-arc-mono text-xs font-black text-black uppercase">
                Open Positions ({filtered.length})
              </span>
              <div className="flex gap-1">
                {['All', 'Internship', 'Research'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2.5 py-1 rounded-md font-arc-mono text-[10px] font-bold cursor-pointer ${
                      filterType === type ? 'bg-black text-white' : 'bg-white border border-black/20 text-black'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {filtered.map(job => {
              const isSelected = selectedJob?.id === job.id;
              const hasApplied = appliedJobs.has(job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-white border-black shadow-[4px_4px_0px_#E11D48]' 
                      : 'bg-white/70 border-black/15 hover:border-black'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xl">{job.companyLogo}</span>
                    <span className="font-arc-mono text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">
                      {job.stipend.split('/')[0]}
                    </span>
                  </div>

                  <h4 className="font-arc-display text-sm font-black text-black leading-snug mb-1">
                    {job.title}
                  </h4>
                  <span className="font-arc-mono text-xs text-[#E11D48] font-bold block mb-2">
                    {job.company}
                  </span>

                  <div className="flex items-center gap-3 text-[11px] font-sans text-black/60">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      <span>{job.location.split('/')[0]}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{job.duration.split(' ')[0]} mos</span>
                    </span>
                  </div>

                  {hasApplied && (
                    <div className="mt-2 text-emerald-700 font-arc-mono text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle size={11} />
                      <span>Application submitted</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Job Details View */}
          <div className="md:col-span-7 overflow-y-auto p-6 sm:p-8 bg-white flex flex-col justify-between">
            {selectedJob ? (
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-arc-mono text-xs font-black text-[#E11D48] uppercase tracking-wider block mb-1">
                      {selectedJob.company} • {selectedJob.type}
                    </span>
                    <h3 className="font-arc-display text-2xl sm:text-3xl font-black text-black leading-tight">
                      {selectedJob.title}
                    </h3>
                  </div>
                  <span className="text-4xl p-2 bg-[#FFFDF5] rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000000]">
                    {selectedJob.companyLogo}
                  </span>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 bg-[#FFFDF5] border-2 border-black/15 p-4 rounded-2xl mb-6">
                  <div>
                    <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Stipend</span>
                    <span className="font-arc-mono text-sm font-black text-emerald-700">{selectedJob.stipend}</span>
                  </div>
                  <div>
                    <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Location</span>
                    <span className="font-arc-mono text-xs font-bold text-black">{selectedJob.location}</span>
                  </div>
                  <div>
                    <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Target Batches</span>
                    <span className="font-arc-mono text-xs font-bold text-black">{selectedJob.batch}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-arc-mono text-xs font-black uppercase text-black tracking-wider mb-2">
                    Role Overview
                  </h4>
                  <p className="font-sans text-sm text-[#52525B] leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Required Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-arc-mono text-xs font-black uppercase text-black tracking-wider mb-2">
                    Required Tech Stack & Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((s, i) => (
                      <span key={i} className="bg-black text-white font-arc-mono text-xs px-3 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Perks */}
                <div className="mb-6">
                  <h4 className="font-arc-mono text-xs font-black uppercase text-black tracking-wider mb-2">
                    Why You Will Love It
                  </h4>
                  <div className="space-y-1.5">
                    {selectedJob.perks.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 font-sans text-xs sm:text-sm text-black/80 font-medium">
                        <Sparkles size={13} className="text-amber-500 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Bottom Apply Action Bar */}
            {selectedJob && (
              <div className="pt-6 border-t-[2.5px] border-black flex items-center justify-between gap-4 mt-6">
                <div>
                  <span className="font-arc-mono text-xs text-black/60 block">
                    {selectedJob.appliedCount} student applicants so far
                  </span>
                  <span className="font-arc-mono text-[11px] text-[#E11D48] font-bold">
                    Direct founder review
                  </span>
                </div>

                {appliedJobs.has(selectedJob.id) ? (
                  <button 
                    disabled
                    className="bg-emerald-600 text-white font-arc-mono text-xs font-black uppercase px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <CheckCircle size={14} />
                    <span>Applied Successfully</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    className="bg-[#E11D48] hover:bg-black text-white font-arc-mono text-xs font-black uppercase px-7 py-3 rounded-xl shadow-[3px_3px_0px_#000000] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>1-Click Apply with Amity Profile</span>
                    <ArrowUpRight size={14} />
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
