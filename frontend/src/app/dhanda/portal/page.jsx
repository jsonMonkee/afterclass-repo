'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, Plus, Sparkles, MessageSquare, TrendingUp, LogOut, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import Footer from '../../../components/Footer';

export default function DhandaSellerPortal() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeGigs, setActiveGigs] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [portalError, setPortalError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadPortal() {
      try {
        const sessionResponse = await fetch('/api/auth/session', { cache: 'no-store' });
        const session = await sessionResponse.json();
        if (!session.authenticated || session.user?.role !== 'dhanda_vendor') {
          router.push('/login?role=dhanda_vendor');
          return;
        }
        const response = await fetch('/api/dhanda/portal', { cache: 'no-store' });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || 'Could not load the vendor portal.');
        if (cancelled) return;
        setUser({ ...session.user, businessName: data.business.business_name, email: data.business.owner_email });
        setActiveGigs((data.listings || []).map(item => ({
          id: item.id,
          title: item.title,
          price: `₹${item.price}`,
          orders: item.completed_orders || 0,
          status: item.status.toUpperCase(),
          escrowProtected: item.escrow_shield
        })));
        setPromotions(data.promotions || []);
        setLoading(false);
      } catch (error) {
        if (cancelled) return;
        setPortalError(error.message || 'Could not load the vendor portal.');
        setLoading(false);
      }
    }
    loadPortal();
    return () => { cancelled = true; };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('afterclass_auth_token');
    localStorage.removeItem('afterclass_auth_user');
    fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
      router.push('/login');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center font-arc-mono text-sm font-bold text-black">
        Loading Dhanda Seller Portal...
      </div>
    );
  }

  if (portalError) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000000]">
          <p className="font-arc-mono text-sm font-bold text-[#E11D48]">{portalError}</p>
          <Link href="/dhanda" className="inline-block mt-4 font-arc-mono text-xs font-black underline">Return to Dhanda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF5] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* Top Header */}
      <header className="bg-black text-white px-6 sm:px-12 py-5 border-b-[3px] border-black flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏪</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-arc-display text-xl sm:text-2xl font-black text-white">
                Dhanda Seller Workbench
              </h1>
              <span className="bg-[#FEF08A] text-black font-arc-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                VERIFIED PROMOTER
              </span>
            </div>
            <p className="font-arc-mono text-xs text-white/60">
              {user.businessName || 'Campus Student Business'} • {user.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dhanda"
            className="hidden sm:inline-flex items-center gap-1.5 font-arc-mono text-xs text-white/80 hover:text-white px-3 py-1.5 rounded-lg border border-white/20"
          >
            <span>Live Marketplace</span>
            <ExternalLink size={12} />
          </Link>
          <button
            onClick={handleLogout}
            className="bg-[#E11D48] hover:bg-white hover:text-black text-white px-4 py-2 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 md:p-12 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border-[2.5px] border-black p-5 shadow-[4px_4px_0px_#000000]">
            <span className="font-arc-mono text-xs text-black/50 uppercase block mb-1">Published Listings</span>
            <div className="font-bungee text-4xl text-[#E11D48]">{activeGigs.length}</div>
            <span className="font-arc-mono text-[11px] text-emerald-700 font-bold">Synced from your business account</span>
          </div>

          <div className="bg-white rounded-2xl border-[2.5px] border-black p-5 shadow-[4px_4px_0px_#000000]">
            <span className="font-arc-mono text-xs text-black/50 uppercase block mb-1">Promotion Slots</span>
            <div className="font-arc-display text-xl font-black text-black">{promotions.filter(promo => ['active','scheduled'].includes(promo.status)).length} active or scheduled</div>
            <span className="font-arc-mono text-[11px] text-[#E11D48] font-bold">Paid and launch offers</span>
          </div>

          <div className="bg-white rounded-2xl border-[2.5px] border-black p-5 shadow-[4px_4px_0px_#000000]">
            <span className="font-arc-mono text-xs text-black/50 uppercase block mb-1">Verified Owner</span>
            <div className="font-arc-display text-lg font-black text-black break-all">{user.email}</div>
            <span className="font-arc-mono text-[11px] text-emerald-700 font-bold">Email verified</span>
          </div>
        </div>

        <section className="bg-white rounded-3xl border-[2.5px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
          <div className="mb-5 pb-4 border-b border-black/10">
            <span className="font-arc-mono text-xs font-black uppercase text-[#E11D48] tracking-wider block mb-1">PROMOTION SCHEDULE</span>
            <h2 className="font-arc-display text-2xl font-black text-black">Your Sponsored Spots</h2>
          </div>
          {promotions.length === 0 ? (
            <p className="font-arc-mono text-xs text-black/55">No promotions booked yet. Eligible launch-month businesses will see their free spot here.</p>
          ) : (
            <div className="space-y-3">
              {promotions.map(promo => (
                <div key={promo.id} className="bg-[#FFFDF5] border-2 border-black/15 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-arc-display text-base font-black text-black">{promo.tier}</div>
                    <div className="font-arc-mono text-[11px] text-black/60">{promo.category ? `${promo.category} · ` : ''}{promo.is_launch_bonus ? 'Launch month free promotion' : `₹${(promo.amount_paise / 100).toFixed(0)} paid promotion`}</div>
                    <div className="font-arc-mono text-[10px] text-black/50 mt-1">{new Date(promo.starts_at).toLocaleDateString('en-IN')} – {new Date(promo.ends_at).toLocaleDateString('en-IN')}</div>
                  </div>
                  <span className={`font-arc-mono text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border ${promo.status === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : promo.status === 'scheduled' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-black/70 border-black/20'}`}>{promo.status.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Active Gigs Table */}
        <div className="bg-white rounded-3xl border-[2.5px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
            <div>
              <span className="font-arc-mono text-xs font-black uppercase text-[#E11D48] tracking-wider block mb-1">
                INVENTORY & SERVICES
              </span>
              <h2 className="font-arc-display text-2xl font-black text-black">
                Your Published Dhanda Gigs
              </h2>
            </div>

            <Link
              href="/dhanda"
              className="bg-[#E11D48] hover:bg-black text-white px-5 py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase shadow-[2px_2px_0px_#000000] flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Add New Service</span>
            </Link>
          </div>

          <div className="space-y-4">
            {activeGigs.map(gig => (
              <div 
                key={gig.id}
                className="bg-[#FFFDF5] border-2 border-black p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-100 text-emerald-800 font-arc-mono text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-emerald-300">
                      {gig.status}
                    </span>
                    <span className="font-arc-mono text-[10px] text-black/50">
                      Escrow Shield Active
                    </span>
                  </div>
                  <h4 className="font-arc-display text-base font-black text-black">
                    {gig.title}
                  </h4>
                  <span className="font-arc-mono text-xs text-black/60">
                    Base Price: <strong className="text-black">{gig.price}</strong> • {gig.orders} completed deliveries
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-black text-white font-arc-mono text-xs font-bold px-3 py-1.5 rounded-xl">
                    Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
