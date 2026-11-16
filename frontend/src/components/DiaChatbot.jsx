'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  RotateCcw,
  Calculator,
  Utensils,
  PhoneCall,
  MessageSquare,
  Gift,
  HelpCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "🧮 Bunk calculator chalao",
  "🎯 Auditions kab aur kahan hain?",
  "🍕 Canteen mein kya accha hai?",
  "🎁 Free student software kaise milega?"
];

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hey! Main Choto Bantu 2.0 hoon — tumhara Amity Kolkata campus companion 🍌 Main sirf baatein nahi karta; attendance calculate kar sakta hoon, auditions dhoond sakta hoon, aur canteen ke budget hacks bata sakta hoon!",
    time: "Just now"
  }
];

export default function DiaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState('chat'); // 'chat' | 'calculator' | 'canteen' | 'helpline'
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Attendance Calculator State
  const [totalClasses, setTotalClasses] = useState(48);
  const [attendedClasses, setAttendedClasses] = useState(38);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTool === 'chat') {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping, activeTool]);

  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    window.addEventListener('open-dia-chatbot', handleTrigger);
    return () => window.removeEventListener('open-dia-chatbot', handleTrigger);
  }, []);

  const calculateAttendance = (total, attended) => {
    const t = Number(total);
    const a = Number(attended);
    if (!t || t <= 0 || a < 0 || a > t) return null;

    const percentage = ((a / t) * 100).toFixed(1);
    
    // Formula for safe bunks: (a - 0.75 * t) / 0.75
    // Formula for required classes: ceil((0.75 * t - a) / 0.25)
    let safeBunks = 0;
    let neededClasses = 0;

    if (percentage >= 75) {
      safeBunks = Math.floor((a - 0.75 * t) / 0.75);
    } else {
      neededClasses = Math.ceil((0.75 * t - a) / 0.25);
    }

    return { percentage, safeBunks, neededClasses };
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    if (query.toLowerCase().includes('calculator') || query.toLowerCase().includes('bunk') || query.toLowerCase().includes('attendance')) {
      setActiveTool('calculator');
    }

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "";
      const lower = query.toLowerCase();

      if (lower.includes('bunk') || lower.includes('attendance') || lower.includes('calculator')) {
        botReply = "Maine tumhare liye Attendance Bunk Calculator open kar diya hai! Upar tab mein 'Attendance' check karo aur calculate karo ki 75% maintain karne ke liye kitni classes skip kar sakte ho.";
      } else if (lower.includes('audition') || lower.includes('fest') || lower.includes('cadence')) {
        botReply = "🎯 Active Auditions This Week:\n• Cadence Dance Club: Friday 4:30 PM @ Main Auditorium\n• NatyaRang Dramatics: Saturday 2:00 PM @ Amphitheatre Steps\n• Amity Turing Club Core Recruitment: Online via Discord & Lab 402!";
      } else if (lower.includes('canteen') || lower.includes('food') || lower.includes('kadambagachhi')) {
        botReply = "🍕 Campus Food Recommendations:\n• Ground Floor Mess: Masala Dosa + Filter Coffee (₹60)\n• Amiphoria Kiosk: Cold Coffee & Brownie\n• Outside Gate 2 (Kadambagachhi Tapri): Double egg roll + ginger tea (₹45)";
      } else if (lower.includes('perk') || lower.includes('discount') || lower.includes('github') || lower.includes('spotify')) {
        botReply = "🎁 Resourceify Perks Live on Afterclass!\nTum apne Amity Student ID se GitHub Student Developer Pack (worth $200k+), Spotify Premium 50% off (₹59/mo), aur Notion Plus 100% Free claim kar sakte ho. Check out the Opportunities tab!";
      } else if (lower.includes('dhanda') || lower.includes('assignment') || lower.includes('cake')) {
        botReply = "💼 Afterclass Dhanda is live!\nStudent freelancers LaTeX assignments likh rahe hain, bento cakes bake kar rahe hain, aur convocation portraits shoot kar rahe hain. Har transaction Afterclass Escrow Shield se protected hai!";
      } else {
        botReply = `Got it! "${query}" ke related Amity Kolkata notices, club leads, aur campus updates verify kar liye. Aur kuch jaanna hai?`;
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
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const calcResult = calculateAttendance(totalClasses, attendedClasses);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 select-none">
      
      {/* CHAT WINDOW */}
      {isOpen && (
        <div 
          className="mb-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#FFFDF5] rounded-[32px] border-[2.5px] border-black shadow-[8px_8px_0px_#000000] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#E11D48] via-[#881337] to-[#E11D48] text-white p-4 shrink-0 border-b-2 border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🍌</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-arc-display font-black text-base text-white">
                      Choto Bantu
                    </span>
                    <span className="bg-[#FEF08A] text-[#881337] text-[10px] font-arc-mono font-black px-1.5 py-0.5 rounded-full uppercase">
                      AI 2.0
                    </span>
                  </div>
                  <p className="text-[10.5px] font-arc-mono text-white/80">
                    Amity Kolkata Smart Companion
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMessages(INITIAL_MESSAGES);
                    setActiveTool('chat');
                  }}
                  title="Reset conversation"
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Smart Utility Toolbar Tabs */}
            <div className="flex items-center gap-1 mt-3 pt-2 border-t border-white/20 overflow-x-auto pb-0.5">
              <button
                onClick={() => setActiveTool('chat')}
                className={`px-3 py-1 rounded-full font-arc-mono text-[10.5px] font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
                  activeTool === 'chat' ? 'bg-[#FFFDF5] text-black shadow-xs' : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <MessageSquare size={11} />
                <span>Chat</span>
              </button>

              <button
                onClick={() => setActiveTool('calculator')}
                className={`px-3 py-1 rounded-full font-arc-mono text-[10.5px] font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
                  activeTool === 'calculator' ? 'bg-[#FEF08A] text-black shadow-xs' : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <Calculator size={11} />
                <span>Attendance Bunker</span>
              </button>

              <button
                onClick={() => setActiveTool('canteen')}
                className={`px-3 py-1 rounded-full font-arc-mono text-[10.5px] font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
                  activeTool === 'canteen' ? 'bg-[#FFFDF5] text-black shadow-xs' : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <Utensils size={11} />
                <span>Canteen Radar</span>
              </button>

              <button
                onClick={() => setActiveTool('helpline')}
                className={`px-3 py-1 rounded-full font-arc-mono text-[10.5px] font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
                  activeTool === 'helpline' ? 'bg-[#FFFDF5] text-black shadow-xs' : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <PhoneCall size={11} />
                <span>Dialer</span>
              </button>
            </div>
          </div>

          {/* TOOL 1: ATTENDANCE BUNK CALCULATOR */}
          {activeTool === 'calculator' && (
            <div className="flex-1 p-5 overflow-y-auto bg-[#FFFDF5] flex flex-col justify-between">
              <div>
                <div className="bg-[#FEF08A] text-black border border-black p-3 rounded-2xl mb-4 font-arc-mono text-xs font-black uppercase">
                  ⚡ 75% AMITY ATTENDANCE BUNK CALCULATOR
                </div>

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
                      Total Classes Conducted: {totalClasses}
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="120" 
                      value={totalClasses}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTotalClasses(val);
                        if (attendedClasses > val) setAttendedClasses(val);
                      }}
                      className="w-full accent-[#E11D48] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
                      Classes You Attended: {attendedClasses}
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max={totalClasses} 
                      value={attendedClasses}
                      onChange={(e) => setAttendedClasses(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                    />
                  </div>
                </div>

                {/* Result Display */}
                {calcResult && (
                  <div className="bg-white rounded-2xl border-2 border-black p-4 shadow-[3px_3px_0px_#000000] text-center">
                    <span className="font-arc-mono text-[10px] text-black/50 uppercase block">Current Attendance</span>
                    <div className="font-bungee text-4xl text-[#E11D48] mb-2">
                      {calcResult.percentage}%
                    </div>

                    {Number(calcResult.percentage) >= 75 ? (
                      <div className="bg-emerald-50 border border-emerald-400 text-emerald-900 p-3 rounded-xl font-arc-mono text-xs font-bold leading-relaxed">
                        🎉 Safe zone! Tum next <strong>{calcResult.safeBunks} classes</strong> safely bunk kar sakte ho without falling below 75%.
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-400 text-[#E11D48] p-3 rounded-xl font-arc-mono text-xs font-bold leading-relaxed">
                        🚨 Attendance shortage! Tumhe agle <strong>{calcResult.neededClasses} consecutive classes</strong> attend karni padengi bina kisi bunk ke to reach 75%.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveTool('chat')}
                className="w-full mt-4 bg-black text-white hover:bg-[#E11D48] py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors"
              >
                Back to Campus Chat
              </button>
            </div>
          )}

          {/* TOOL 2: CANTEEN RADAR */}
          {activeTool === 'canteen' && (
            <div className="flex-1 p-5 overflow-y-auto bg-[#FFFDF5] space-y-3">
              <div className="bg-white border-2 border-black p-3.5 rounded-2xl shadow-[2px_2px_0px_#000000]">
                <h4 className="font-arc-display text-sm font-black text-black">Ground Floor Central Mess</h4>
                <p className="font-arc-mono text-[11px] text-emerald-700 font-bold mb-1">Open: 8:30 AM - 7:30 PM</p>
                <p className="font-sans text-xs text-black/70">Best budget food: Masala Dosa (₹45), Veg Thali (₹70), Cold Coffee (₹35).</p>
              </div>

              <div className="bg-white border-2 border-black p-3.5 rounded-2xl shadow-[2px_2px_0px_#000000]">
                <h4 className="font-arc-display text-sm font-black text-black">Amiphoria Coffee & Bake Kiosk</h4>
                <p className="font-arc-mono text-[11px] text-[#E11D48] font-bold mb-1">Open: 9:00 AM - 6:00 PM</p>
                <p className="font-sans text-xs text-black/70">Fudgy brownies, chicken patties, and hot mocha before 9:15 AM lecture cut-off.</p>
              </div>

              <div className="bg-white border-2 border-black p-3.5 rounded-2xl shadow-[2px_2px_0px_#000000]">
                <h4 className="font-arc-display text-sm font-black text-black">Gate 2 Kadambagachhi Tapri</h4>
                <p className="font-arc-mono text-[11px] text-amber-700 font-bold mb-1">Outside Gate 2 • 7:00 AM - 9:00 PM</p>
                <p className="font-sans text-xs text-black/70">Campus favorite: Double egg roll (₹45), cheese maggi (₹40), and kadak ginger tea (₹10).</p>
              </div>

              <button
                onClick={() => setActiveTool('chat')}
                className="w-full bg-black text-white hover:bg-[#E11D48] py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors"
              >
                Back to Campus Chat
              </button>
            </div>
          )}

          {/* TOOL 3: HELPLINE & DIALER */}
          {activeTool === 'helpline' && (
            <div className="flex-1 p-5 overflow-y-auto bg-[#FFFDF5] space-y-3">
              <div className="bg-white border-2 border-black p-3.5 rounded-2xl shadow-[2px_2px_0px_#000000]">
                <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Campus Security & Main Gate</span>
                <span className="font-arc-mono text-sm font-black text-black">033-7102-0300</span>
              </div>
              <div className="bg-white border-2 border-black p-3.5 rounded-2xl shadow-[2px_2px_0px_#000000]">
                <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Campus Medical Room & First Aid</span>
                <span className="font-arc-mono text-sm font-black text-[#E11D48]">033-7102-0315</span>
              </div>
              <div className="bg-white border-2 border-black p-3.5 rounded-2xl shadow-[2px_2px_0px_#000000]">
                <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Proctorial Board / Anti-Ragging</span>
                <span className="font-arc-mono text-sm font-black text-black">1800-180-5522 (Toll Free)</span>
              </div>

              <button
                onClick={() => setActiveTool('chat')}
                className="w-full bg-black text-white hover:bg-[#E11D48] py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors"
              >
                Back to Campus Chat
              </button>
            </div>
          )}

          {/* TOOL 4: STANDARD CHAT FEED */}
          {activeTool === 'chat' && (
            <>
              {/* Messages Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 relative">
                {messages.map((msg, index) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div 
                      key={index}
                      className={`flex items-end gap-2 relative z-10 ${isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      {isBot && (
                        <span className="text-xl shrink-0 mb-1">🍌</span>
                      )}

                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-sans leading-relaxed shadow-xs ${
                          isBot 
                            ? 'bg-white text-black border-2 border-black/15' 
                            : 'bg-[#E11D48] text-white font-medium'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span 
                          className={`block text-[9px] font-arc-mono mt-1 ${
                            isBot ? 'text-black/40' : 'text-white/70'
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🍌</span>
                    <div className="bg-white border border-black/20 rounded-2xl px-4 py-2 text-xs font-arc-mono text-black/60 animate-pulse">
                      Bantu is thinking...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              <div className="px-3 py-2 bg-white/70 border-t border-black/10 flex items-center gap-1.5 overflow-x-auto shrink-0">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-[#FFFDF5] border border-black/20 text-black font-arc-mono text-[10.5px] font-bold hover:bg-[#E11D48] hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-white border-t-2 border-black flex items-center gap-2 shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask Bantu about fests, attendance, canteen..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim()}
                  className="w-10 h-10 rounded-xl bg-[#E11D48] hover:bg-black text-white flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer shadow-[2px_2px_0px_#000000]"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}

        </div>
      )}

      {/* FLOATING BANANA TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-[#FFFDF5] text-black border-[2.5px] border-black px-4 py-3 rounded-full shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#E11D48] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
          <span className="text-2xl animate-bounce">🍌</span>
          <div className="text-left hidden sm:block">
            <span className="font-arc-display font-black text-xs block leading-none text-black">
              Ask Bantu 2.0
            </span>
            <span className="font-arc-mono text-[10px] text-[#E11D48] font-bold">
              Bunk Calc & Canteen
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      )}

    </div>
  );
}
