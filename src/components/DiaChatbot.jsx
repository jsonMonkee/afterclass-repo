'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  RotateCcw,
  Star,
  Trophy,
  Utensils,
  Ticket
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  { text: "Auditions kab aur kahan hain?", icon: Star },
  { text: "Best coding club kaunsa hai?", icon: Trophy },
  { text: "Major Arterial Rd campus canteen menu", icon: Utensils },
  { text: "AmiFIESTA passes kaise milenge?", icon: Ticket }
];

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hey! Main Choto Bantu hoon — tumhara Amity campus AI companion 🍌 Ask me anything about fests, clubs, canteen food, ya exams!",
    time: "Just now"
  }
];

export default function DiaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    window.addEventListener('open-dia-chatbot', handleTrigger);
    return () => window.removeEventListener('open-dia-chatbot', handleTrigger);
  }, []);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Contextual intelligent responses with Hinglish vibe
    setTimeout(() => {
      let botReply = "";
      const lower = query.toLowerCase();

      if (lower.includes('fest') || lower.includes('amifiesta')) {
        botReply = "AmiFIESTA 2026 is pinned for 28 March at the Central Lawn! Passes are free for registered students. RSVP tab me jaakar slot book kar lo!";
      } else if (lower.includes('audition') || lower.includes('cadence')) {
        botReply = "Cadence Dance Club auditions Friday 4:30 PM Auditorium 2 me hain! Western aur Bollywood semi-classical routines allowed hain.";
      } else if (lower.includes('club') || lower.includes('coding') || lower.includes('turing')) {
        botReply = "Amity Turing & Open Source Collective top active tech club hai! Weekly hack nights aur DevRel workshops hote hain.";
      } else if (lower.includes('canteen') || lower.includes('food') || lower.includes('cafeteria')) {
        botReply = "Cafeteria steps pe roll corner aur CCD outlet open hai till 7:30 PM. Pav bhaji & cold coffee are student favorites!";
      } else if (lower.includes('exam') || lower.includes('notice') || lower.includes('attendance')) {
        botReply = "75% attendance criteria strict hai boss! Controller of Examination ne mid-term notices pin kiye hain Official Gazette section me.";
      } else {
        botReply = `Got it! "${query}" ke related campus notices aur club leads check kar liye. Aur kuch verify karna hai regarding Amity Kolkata?`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 select-none">
      
      {/* 1. CHAT WINDOW POPUP (Playful Campus Magazine & Sticker Card Design) */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[410px] h-[560px] max-h-[82vh] relative animate-nav-pop overflow-visible">
          {/* Crimson Offset Backing Layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#E11D48] rounded-[34px] translate-y-1.5 -translate-x-1 rotate-[-1.5deg] shadow-[0_25px_60px_rgba(0,0,0,0.45)] pointer-events-none"
          />

          {/* Main Cream/Blush Paper Card with Organic Wavy Paper-Cut SVG Silhouette */}
          <div className="relative w-full h-full flex flex-col overflow-visible">
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
              viewBox="0 0 410 560"
              preserveAspectRatio="none"
            >
              <path
                d="M 34,14 C 120,4 290,6 378,16 C 398,18 404,34 402,70 C 397,140 407,230 404,320 C 401,400 407,470 400,520 C 397,542 384,548 362,550 C 260,556 140,554 38,548 C 16,546 8,534 8,508 C 8,430 2,330 8,240 C 13,160 4,90 10,42 C 12,22 20,16 34,14 Z"
                fill="#FFF6F2"
                stroke="#FECDD3"
                strokeWidth="2"
              />
            </svg>
            
            {/* Decorative Background Doodles (Soft pink wave + dashed paper plane + sparkle) */}
            <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
              <div className="absolute -bottom-10 -left-10 w-64 h-44 bg-[#FECDD3]/45 rounded-full blur-xs" />
              <svg className="absolute top-[52%] right-4 w-16 h-16 text-[#E11D48]/25" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3">
                <path d="M6 52 C 20 48, 30 34, 48 16" />
                <path d="M48 16 L 34 20 L 44 30 Z" fill="currentColor" fillOpacity="0.25" strokeDasharray="none" />
              </svg>
              <Sparkles size={18} className="absolute bottom-36 left-10 text-[#FACC15]/70 fill-[#FACC15]/50" />
            </div>

            {/* Floating Top-Right Close & Reset Buttons */}
            <div className="absolute -top-3 -right-2.5 z-40 flex items-center gap-1.5">
              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="w-8 h-8 rounded-full bg-white hover:bg-[#FEF08A] text-[#881337] shadow-md border border-rose-100 flex items-center justify-center transition-all cursor-pointer active:scale-90"
              >
                <RotateCcw size={14} className="stroke-[2.4]" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#FFF1F2] text-[#0F172A] shadow-lg border border-rose-100 flex items-center justify-center transition-all cursor-pointer active:scale-90"
              >
                <X size={18} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Tilted Crimson Header Sticker */}
            <div className="relative z-30 -mt-4 mx-3 sm:mx-4 mr-14 -rotate-[1.5deg] bg-gradient-to-r from-[#E11D48] via-[#D41840] to-[#BE123C] text-white rounded-2xl px-3.5 py-2.5 shadow-[0_10px_25px_rgba(225,29,72,0.35)] border border-white/20 flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 relative shrink-0 -my-1">
                <Image 
                  src="/dia-banana.png" 
                  alt="Choto Bantu AI" 
                  width={44} 
                  height={44}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-arc-display font-black text-base sm:text-lg tracking-tight text-white leading-none">
                    Choto Bantu
                  </span>
                </div>
                <p className="text-[11px] font-sans font-medium text-white/85 mt-0.5 truncate">
                  Amity Kolkata Companion
                </p>
              </div>
            </div>

            {/* Announcement Ticker + Yellow TODAY Sticky Note */}
            <div className="relative z-20 px-4 pt-3.5 pb-2 flex items-center justify-between gap-2 shrink-0">
              <div className="flex-1 min-w-0 bg-white/75 border border-[#E11D48]/30 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-2xs">
                <Calendar size={13} className="text-[#E11D48] shrink-0" />
                <span className="text-[11px] font-sans font-bold text-[#881337] truncate">
                  Campus live: 3 fests & auditions active
                </span>
              </div>
              <span className="shrink-0 bg-[#FDE047] text-[#881337] font-arc-mono font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm rotate-[3deg] border border-[#FACC15]">
                TODAY
              </span>
            </div>

            {/* Messages Feed (Magazine / Sticker Cards) */}
            <div className="flex-1 px-4 py-2 overflow-y-auto space-y-3.5 relative z-20">
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div 
                    key={index}
                    className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-9 h-9 rounded-full bg-[#FFE4E6] border border-[#FECDD3] p-1 shrink-0 mt-1 shadow-xs">
                        <Image 
                          src="/dia-banana.png" 
                          alt="Choto Bantu" 
                          width={32} 
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div 
                      className={`max-w-[82%] rounded-[22px] px-4 py-3 text-xs sm:text-[13px] font-sans leading-relaxed ${
                        isBot 
                          ? 'bg-white/95 text-[#1E293B] border border-rose-100/80 shadow-[0_8px_24px_rgba(225,29,72,0.08)]' 
                          : 'bg-[#E11D48] text-white font-medium shadow-[0_6px_16px_rgba(225,29,72,0.25)]'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span 
                        className={`block text-[10px] font-sans mt-1.5 ${
                          isBot ? 'text-slate-400' : 'text-white/75'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FFE4E6] p-1 shrink-0">
                    <Image 
                      src="/dia-banana.png" 
                      alt="Choto Bantu" 
                      width={28} 
                      height={28}
                      className="w-full h-full object-contain animate-bounce"
                    />
                  </div>
                  <div className="bg-white/95 px-4 py-2.5 rounded-[20px] border border-rose-100 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse delay-150"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse delay-300"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick-Question Sticker Cards */}
            <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar relative z-20 shrink-0">
              {SUGGESTED_QUESTIONS.map((q, i) => {
                const IconComp = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(q.text)}
                    className="shrink-0 bg-[#FFE4E6]/90 hover:bg-[#FECDD3] text-[#881337] border border-[#FDA4AF]/40 px-3 py-2 rounded-2xl text-[11px] font-sans font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    <IconComp size={13} className="text-[#E11D48] shrink-0 fill-[#E11D48]/15" />
                    <span className="max-w-[145px] truncate">{q.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Bar with Decorative Megaphone */}
            <div className="px-4 pb-4 pt-1.5 relative z-20 shrink-0">
              {/* Cute Megaphone Sticker peeking bottom-left */}
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute -left-4 bottom-2 w-9 h-9 rounded-full bg-[#E11D48] text-white items-center justify-center shadow-md -rotate-12 border-2 border-white pointer-events-none z-30"
              >
                <span className="text-base leading-none">📣</span>
              </div>

              <div className="bg-white border-[1.5px] border-[#E11D48]/40 focus-within:border-[#E11D48] rounded-full p-1.5 pl-3.5 flex items-center gap-2 shadow-sm">
                <Sparkles size={14} className="text-[#E11D48] shrink-0" />
                <input 
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Poocho Choto Bantu se kuch bhi..."
                  className="flex-1 bg-transparent text-xs text-[#0F172A] placeholder:text-slate-400 outline-none min-w-0"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim()}
                  aria-label="Send message"
                  className="bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-40 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. FLOATING TRIGGER BUTTON (Bare pixel banana icon - desktop / hidden on mobile if navbar action is present, or positioned above bottom bar) */}
      <div className="hidden sm:flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Choto Bantu AI Chatbot"
          className="relative group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        >
          {/* Bare Banana Icon - No circle container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_15px_25px_rgba(225,29,72,0.45)] transition-all">
            <Image 
              src="/dia-banana.png" 
              alt="Choto Bantu Banana" 
              width={80} 
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {/* Tiny Yellow notification indicator dot */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FEF08A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FACC15] border border-[#881337]"></span>
          </span>
        </button>

      </div>

    </div>
  );
}

