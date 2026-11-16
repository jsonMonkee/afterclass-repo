'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Users, Store, Terminal, ArrowRight, Lock, UserCheck } from 'lucide-react';
import Footer from '../../components/Footer';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'club_lead';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [username, setUsername] = useState('club_turing');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const quickRoles = [
    {
      id: 'club_lead',
      label: 'Club Leader',
      user: 'club_turing',
      pass: 'password123',
      icon: Users,
      desc: 'Update society events, bio, and auditions'
    },
    {
      id: 'dhanda_vendor',
      label: 'Dhanda Promoter',
      user: 'vendor_ananya',
      pass: 'password123',
      icon: Store,
      desc: 'Manage your campus service listings & ads'
    },
    {
      id: 'superadmin',
      label: 'Superadmin / Dev',
      user: 'superadmin',
      pass: 'wyrcan_superadmin_2026',
      icon: Terminal,
      desc: 'Platform moderation, verification & overrides'
    }
  ];

  const handleSelectRole = (role) => {
    setSelectedRole(role.id);
    setUsername(role.user);
    setPassword(role.pass);
    setErrorMsg('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Authentication failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('afterclass_auth_user', JSON.stringify(data.user));

      if (data.user.role === 'dhanda_vendor') {
        router.push('/dhanda/portal');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000]">
      {/* Role Tabs */}
      <div className="mb-6">
        <span className="font-arc-mono text-xs font-black uppercase text-black/60 block mb-2">
          Select Your Portal Role (Quick Demo Fill)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {quickRoles.map(r => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRole(r)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_#E11D48]'
                    : 'bg-[#FFFDF5] border-black/15 text-black hover:border-black'
                }`}
              >
                <Icon size={16} className={isSelected ? 'text-[#FEF08A]' : 'text-black/60'} />
                <span className="font-arc-display text-xs font-black block mt-1">
                  {r.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-100 border-2 border-rose-400 text-[#E11D48] p-3 rounded-xl font-arc-mono text-xs font-bold mb-4">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
            Username / Identifier
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black focus:outline-none"
          />
        </div>

        <div>
          <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#E11D48] hover:bg-black text-white py-3.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[3px_3px_0px_#000000] cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <span>Sign In to {selectedRole === 'dhanda_vendor' ? 'Dhanda Portal' : 'Admin Studio'}</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      {/* Regular Student Notice */}
      <div className="mt-6 pt-4 border-t border-black/10 text-center">
        <p className="font-sans text-xs text-black/60">
          Just an Amity student looking for events or notes?{' '}
          <Link href="/" className="font-arc-mono text-xs font-black text-[#E11D48] hover:underline">
            Explore campus public feed →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* Top Banner */}
      <section className="arc-grain-red text-white pt-8 pb-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Lock size={13} />
            <span>COMMUNITY LEAD & ADMIN PORTAL</span>
          </div>
          <h1 className="font-arc-display text-white text-3xl sm:text-5xl font-black mb-3">
            Afterclass Portal Login
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/80 max-w-md mx-auto">
            Regular students do not need to sign in! This portal is strictly for verified club leaders, campus vendors, and platform engineers.
          </p>
        </div>
      </section>

      {/* Main Login Card wrapped in Suspense */}
      <div className="bg-[#FFFDF5] flex-1 py-12 px-4 sm:px-6 flex items-center justify-center">
        <Suspense fallback={
          <div className="font-arc-mono text-xs text-black font-bold p-8 bg-white rounded-3xl border-2 border-black">
            Loading authentication portal...
          </div>
        }>
          <LoginFormContent />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
