'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { 
  Store, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  MessageSquare, 
  PlusCircle, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Megaphone,
  ArrowUpRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { dhandaListings, dhandaCategories, sponsoredBanners, promotionPricing } from '../../data/dhandaData';
import { uploadImage } from '../../lib/uploadImage';
import Footer from '../../components/Footer';

export default function DhandaPage() {
  const [listings, setListings] = useState(dhandaListings);
  const [banners, setBanners] = useState(sponsoredBanners);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [escrowOnly, setEscrowOnly] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Modals
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [activeOrderModal, setActiveOrderModal] = useState(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newSeller, setNewSeller] = useState('');
  const [newSemester, setNewSemester] = useState('CSE 3rd Year');
  const [newCategory, setNewCategory] = useState('Assignments & Notes');
  const [newPrice, setNewPrice] = useState('');
  const [newTurnaround, setNewTurnaround] = useState('24 Hours');
  const [newDesc, setNewDesc] = useState('');
  const [newListingImage, setNewListingImage] = useState('');
  const [listingImageUploading, setListingImageUploading] = useState(false);
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState('');

  // Promo form states
  const [promoBusiness, setPromoBusiness] = useState('');
  const [promoOwner, setPromoOwner] = useState('');
  const [promoOwnerEmail, setPromoOwnerEmail] = useState('');
  const [promoWhatsapp, setPromoWhatsapp] = useState('');
  const [promoTagline, setPromoTagline] = useState('');
  const [promoTier, setPromoTier] = useState('Homepage Main Banner');
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoSuccessMessage, setPromoSuccessMessage] = useState('');
  const [promoStep, setPromoStep] = useState('register');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoCategory, setPromoCategory] = useState('Bakes & Treats');
  const [promoImage, setPromoImage] = useState('');
  const [promoImageUploading, setPromoImageUploading] = useState(false);

  useEffect(() => {
    fetch('/api/dhanda')
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data?.success && Array.isArray(data.data)) setListings(data.data); })
      .catch(() => {});
    fetch('/api/dhanda/promotions')
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data?.success && Array.isArray(data.banners)) setBanners(data.banners); })
      .catch(() => {});
  }, []);

  const filteredListings = listings.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesEscrow = !escrowOnly || item.escrowShield;
    const matchesSearch = !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesEscrow && matchesSearch;
  });

  const handlePostDhanda = async (e) => {
    e.preventDefault();
    if (!newTitle || !newSeller || !newPrice) return;
    setPostError('');
    try {
      const response = await fetch('/api/dhanda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          seller: newSeller,
          semester: newSemester,
          category: newCategory,
          price: Number(newPrice),
          priceUnit: 'per service/assignment',
          turnaround: newTurnaround,
          description: newDesc,
          contactNumber: newWhatsapp,
          imageUrl: newListingImage,
          tags: [newCategory, 'Amity Student']
        })
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Could not publish the listing.');
      setListings(current => [result.data, ...current]);
      setPostSuccess(true);
      setTimeout(() => {
        setPostSuccess(false);
        setIsPostModalOpen(false);
        setNewTitle('');
        setNewSeller('');
        setNewPrice('');
        setNewDesc('');
      }, 1200);
    } catch (error) {
      setPostError(error.message || 'Could not publish the listing.');
    }
  };

  const handleListingImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPostError('');
    setListingImageUploading(true);
    try {
      const imageUrl = await uploadImage(file, 'dhanda');
      setNewListingImage(imageUrl);
    } catch (error) {
      setPostError(error.message || 'Image upload failed. Verify your business account and try again.');
    } finally {
      setListingImageUploading(false);
      event.target.value = '';
    }
  };

  const handleBookPromo = async (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoLoading(true);
    try {
      const response = await fetch('/api/dhanda/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: promoBusiness,
          ownerName: promoOwner,
          ownerEmail: promoOwnerEmail,
          whatsapp: promoWhatsapp,
          tagline: promoTagline,
          tier: promoTier,
          category: promoCategory
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Could not start business registration.');
      setPromoStep('verify');
      setPromoSuccessMessage(data.message);
    } catch (error) {
      setPromoError(error.message || 'Could not start business registration.');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleVerifyPromo = async (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoLoading(true);
    try {
      const response = await fetch('/api/dhanda/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: promoOwnerEmail, token: promoCode })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Email verification failed.');
      localStorage.setItem('afterclass_auth_user', JSON.stringify(data.user));
      if (data.launchBonus) {
        const rewardMonth = new Date(data.launchBonus.startsAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
        setPromoSuccessMessage(`Your email is verified. Your ${data.launchBonus.tier || promoTier} promotion is scheduled free for ${rewardMonth}.`);
        setPromoSuccess(true);
        setPromoStep('success');
      } else {
        setPromoStep('paid');
        setPromoSuccessMessage('Your business is registered and email verified. Choose a paid weekly promotion below.');
      }
    } catch (error) {
      setPromoError(error.message || 'Email verification failed.');
    } finally {
      setPromoLoading(false);
    }
  };

  const handlePayPromotion = async () => {
    setPromoError('');
    setPromoLoading(true);
    try {
      const response = await fetch('/api/dhanda/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: promoTier, category: promoCategory, tagline: promoTagline, imageUrl: promoImage })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Could not start payment.');
      if (!window.Razorpay) throw new Error('Checkout is still loading. Please try again in a moment.');
      const checkout = new window.Razorpay({
        key: data.checkout.keyId,
        amount: data.checkout.amount,
        currency: data.checkout.currency,
        order_id: data.checkout.orderId,
        name: 'Afterclass Dhanda',
        description: `${promoTier} · 7 days`,
        prefill: { name: data.checkout.ownerName, email: data.checkout.ownerEmail, contact: data.checkout.whatsapp },
        theme: { color: '#E11D48' },
        handler: async payment => {
          const verifyResponse = await fetch('/api/dhanda/promotions/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
          });
          const verification = await verifyResponse.json();
          if (!verifyResponse.ok || !verification.success) {
            setPromoError(verification.error || 'Payment confirmation is still pending. Refresh in a moment.');
            return;
          }
          setPromoSuccessMessage('Payment verified. Your sponsored promotion is live for seven days.');
          setPromoSuccess(true);
          setPromoStep('success');
        }
      });
      checkout.open();
    } catch (error) {
      setPromoError(error.message || 'Could not start payment.');
    } finally {
      setPromoLoading(false);
    }
  };

  const handlePromoImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPromoError('');
    setPromoImageUploading(true);
    try {
      const imageUrl = await uploadImage(file, 'dhanda');
      const response = await fetch('/api/dhanda/businesses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Could not save the image to your business profile.');
      setPromoImage(imageUrl);
    } catch (error) {
      setPromoError(error.message || 'Image upload failed.');
    } finally {
      setPromoImageUploading(false);
      event.target.value = '';
    }
  };

  const currentBanner = banners[activeBannerIndex] || banners[0] || sponsoredBanners[0];

  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. HERO SECTION */}
      <section className="arc-grain-red text-white pb-14 relative overflow-hidden">
        <div className="max-w-5xl mx-auto pt-8 pb-10 text-center flex flex-col items-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-4 py-1.5 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Store size={13} />
            <span>CAMPUS STUDENT COMMERCE & FREELANCE</span>
          </div>

          <h1 className="font-arc-display text-white text-4xl sm:text-6xl md:text-[68px] leading-[1.08] max-w-4xl mb-6">
            “Amity students ka apna freelance commons — Afterclass Dhanda.”
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Write assignments, bake custom cakes, build capstone apps, or book convocation photographers. Direct campus leads with zero corporate commission and full Escrow Shield protection.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-[#FFFDF5] text-black hover:bg-[#FEF08A] font-arc-mono text-xs font-black uppercase px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle size={14} className="text-[#E11D48]" />
              <span>List Your Dhanda (Free)</span>
            </button>

            <button
              onClick={() => setIsPromoModalOpen(true)}
              className="bg-black text-white hover:bg-white hover:text-black font-arc-mono text-xs font-black uppercase px-6 py-3 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer flex items-center gap-2"
            >
              <Megaphone size={14} className="text-amber-400" />
              <span>Promote Your Business (₹299/wk)</span>
            </button>

            <Link
              href="/login?role=dhanda_vendor"
              className="bg-[#881337] text-white hover:bg-white hover:text-black font-arc-mono text-xs font-black uppercase px-5 py-3 rounded-full border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Seller Login</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. SPONSORED SPOTLIGHT BANNER CAROUSEL */}
      <section className="bg-[#FFFDF5] pt-10 pb-12 px-4 sm:px-8 md:px-12 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-arc-mono text-xs font-black text-[#E11D48] uppercase tracking-wider">
              <Sparkles size={14} className="text-[#E11D48]" />
              <span>SPONSORED CAMPUS SPOTLIGHT (₹299/WEEK PROMOTIONS)</span>
            </div>

            <div className="flex items-center gap-1">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBannerIndex(idx)}
                  className={`w-6 h-2 rounded-full transition-all cursor-pointer ${
                    activeBannerIndex === idx ? 'bg-[#E11D48] w-8' : 'bg-black/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Banner Card */}
          <div className="bg-black text-white rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <div className="md:col-span-8 z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-[#FEF08A] text-black font-arc-mono text-[10px] font-black uppercase px-3 py-1 rounded-md border border-black shadow-[1px_1px_0px_#000000]">
                  {currentBanner.badge}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 font-arc-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-emerald-500/30">
                  Verified Amity Student Seller
                </span>
              </div>

              <h3 className="font-arc-display text-2xl sm:text-4xl font-black text-white leading-tight mb-2">
                {currentBanner.businessName}
              </h3>
              <p className="font-arc-mono text-xs text-[#E11D48] font-bold mb-3">
                Run by {currentBanner.owner}
              </p>
              <p className="font-sans text-sm text-white/80 leading-relaxed max-w-xl mb-6">
                {currentBanner.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${currentBanner.whatsapp}?text=Hi%20${encodeURIComponent(currentBanner.owner)},%20I%20saw%20your%20business%20on%20Afterclass%20Dhanda!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E11D48] hover:bg-white hover:text-black text-white font-arc-mono text-xs font-black uppercase px-6 py-3 rounded-xl shadow-[3px_3px_0px_#FFFFFF] transition-all flex items-center gap-2"
                >
                  <MessageSquare size={14} />
                  <span>{currentBanner.ctaText}</span>
                </a>

                <div className="font-arc-mono text-xs text-white/70">
                  Use Code: <span className="text-[#FEF08A] font-bold">{currentBanner.discountCode}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 z-10">
              <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-white/20 relative shadow-xl">
                <img 
                  src={currentBanner.image} 
                  alt={currentBanner.businessName}
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E11D48]/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* 3. ESCROW SHIELD & DISINTERMEDIATION REVENUE EXPLAINER */}
      <section className="bg-[#FFFDF5] py-8 px-4 sm:px-8 md:px-12 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-arc-display text-base font-black text-black">
                  Afterclass Shield — Zero-Scam Student Guarantee
                </h4>
                <p className="font-sans text-xs text-[#52525B]">
                  Funds are held in platform escrow until work is delivered and approved. Off-platform deals carry zero protection against ghosting or incomplete lab files.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setEscrowOnly(!escrowOnly)}
                className={`px-4 py-2 rounded-xl font-arc-mono text-xs font-black transition-all cursor-pointer ${
                  escrowOnly 
                    ? 'bg-emerald-600 text-white shadow-[2px_2px_0px_#000000]' 
                    : 'bg-[#FFFDF5] border border-black/20 text-black hover:border-black'
                }`}
              >
                {escrowOnly ? '✓ Escrow Shield Only Active' : 'Filter Escrow Shield Protected'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN DHANDA MARKETPLACE LISTINGS */}
      <div className="bg-[#FFFDF5] flex-1 py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Controls: Search + Categories */}
          <div className="bg-white p-5 rounded-2xl border-[2.5px] border-black shadow-[5px_5px_0px_#000000] mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="relative w-full md:w-96">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  placeholder="Search assignments, cakes, portraits, code, notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black placeholder:text-black/40 focus:outline-none"
                />
              </div>

              <span className="font-arc-mono text-xs text-black/50 self-end md:self-auto">
                Showing {filteredListings.length} Campus Gigs
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10">
              {dhandaCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-arc-mono text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-black text-white shadow-[2px_2px_0px_#E11D48]'
                      : 'bg-white border border-black/15 text-black hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-[2.5px] border-black p-6 shadow-[5px_5px_0px_#000000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000000] transition-all duration-200 group"
              >
                <div>
                  {/* Top Row: Category + Badge */}
                  {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-2xl mb-4 border border-black/15" />}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-arc-mono text-[10px] font-black uppercase tracking-wider bg-[#FFFDF5] text-black px-2.5 py-1 rounded-md border border-black/20">
                      {item.category}
                    </span>

                    <span className="font-arc-mono text-[10px] font-black bg-[#E11D48] text-white px-2.5 py-1 rounded-md uppercase shadow-[1px_1px_0px_#000000]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Seller */}
                  <h3 className="font-arc-display text-xl font-black text-black group-hover:text-[#E11D48] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 font-arc-mono text-xs text-black/60 font-bold mb-3">
                    <span>by {item.seller}</span>
                    <span className="text-black/30">•</span>
                    <span className="text-[#E11D48]">{item.semester}</span>
                    {item.verifiedAmityEmail && (
                      <span className="text-emerald-600 font-black" title="Verified Amity Student">✓</span>
                    )}
                  </div>

                  {/* Pricing Strip */}
                  <div className="bg-[#FFFDF5] border border-black/20 p-3.5 rounded-2xl mb-4 flex items-center justify-between">
                    <div>
                      <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Pricing</span>
                      <div className="font-arc-mono text-base font-black text-black">
                        ₹{item.price} <span className="text-xs font-normal text-black/60">{item.priceUnit}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-arc-mono text-[10px] uppercase text-black/50 block">Turnaround</span>
                      <span className="font-arc-mono text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                        <Clock size={11} />
                        <span>{item.turnaround}</span>
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#52525B] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="font-arc-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFFDF5] text-black border border-black/15">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Order Actions */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 font-arc-mono text-xs text-black font-bold">
                    <Star size={13} className="fill-amber-400 stroke-amber-500" />
                    <span>{item.rating}</span>
                    <span className="text-black/40">({item.reviewsCount})</span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${item.contactNumber}?text=Hi%20${encodeURIComponent(item.seller)},%20I%20saw%20your%20listing%20"${encodeURIComponent(item.title)}"%20on%20Afterclass%20Dhanda.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black hover:bg-[#E11D48] text-white px-3.5 py-2 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#000000] flex items-center gap-1.5"
                    >
                      <MessageSquare size={12} />
                      <span>Chat</span>
                    </a>

                    <button
                      onClick={() => setActiveOrderModal(item)}
                      className="bg-[#E11D48] hover:bg-black text-white px-3.5 py-2 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck size={13} />
                      <span>Escrow</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 5. POST A DHANDA MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF5] max-w-lg w-full rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black text-white font-arc-mono text-xs flex items-center justify-center hover:bg-[#E11D48] transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-block bg-[#FEF08A] text-black border border-black px-3 py-1 rounded-full font-arc-mono text-[10px] font-black uppercase tracking-wider mb-3">
              CAMPUS LISTING FORM
            </div>

            <h3 className="font-arc-display text-2xl font-black text-black mb-1">
              List Your Service on Dhanda
            </h3>
            <p className="font-arc-mono text-xs text-[#E11D48] font-bold mb-4">
              100% Free listing for Amity University Kolkata students
            </p>

            {postSuccess ? (
              <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-900 p-6 rounded-2xl text-center font-arc-mono text-sm font-bold">
                ✓ Listing published successfully under Afterclass Shield!
              </div>
            ) : (
              <>
              {postError && <div className="bg-rose-100 border-2 border-rose-400 text-rose-800 p-3 rounded-xl font-arc-mono text-xs font-bold mb-4">{postError}<button type="button" onClick={() => { setIsPostModalOpen(false); setIsPromoModalOpen(true); }} className="block mt-2 underline">Register your business first</button></div>}
              <form onSubmit={handlePostDhanda} className="space-y-4">
                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                    Service / Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LaTeX assignment writing or Custom bento cakes"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs sm:text-sm text-black focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul S."
                      value={newSeller}
                      onChange={(e) => setNewSeller(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                      Semester & Branch
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CSE 3rd Year"
                      value={newSemester}
                      onChange={(e) => setNewSemester(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                    >
                      {dhandaCategories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 350"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                    WhatsApp Number (for leads)
                  </label>
                  <input
                    type="text"
                    placeholder="919830000000"
                    value={newWhatsapp}
                    onChange={(e) => setNewWhatsapp(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                    Description & Sample Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe turnaround, handwriting quality, cake flavors, or coding tech stack..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">Product / Service Photo</label>
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleListingImageUpload} disabled={listingImageUploading} className="w-full p-3 rounded-xl bg-white border-2 border-black/20 font-sans text-xs text-black" />
                  <p className="font-arc-mono text-[10px] text-black/50 mt-1">Register and verify your business before uploading. JPG, PNG, or WebP · up to 10 MB.</p>
                  {listingImageUploading && <p className="font-arc-mono text-xs text-[#E11D48] mt-1">Uploading image…</p>}
                  {newListingImage && <img src={newListingImage} alt="Listing image preview" className="mt-3 h-32 w-full rounded-xl object-cover border border-black/15" />}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E11D48] hover:bg-black text-white py-3 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[3px_3px_0px_#000000] cursor-pointer"
                >
                  Publish Dhanda Listing
                </button>
              </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* 6. PROMOTE YOUR BUSINESS MODAL */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
          <div className="bg-[#FFFDF5] max-w-xl w-full rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsPromoModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black text-white font-arc-mono text-xs flex items-center justify-center hover:bg-[#E11D48] transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-block bg-[#FEF08A] text-black border border-black px-3 py-1 rounded-full font-arc-mono text-[10px] font-black uppercase tracking-wider mb-3">
              CAMPUS AD MONETIZATION
            </div>

            <h3 className="font-arc-display text-2xl font-black text-black mb-1">
              Promote Your Dhanda Across Amity
            </h3>
            <p className="font-arc-mono text-xs text-[#E11D48] font-bold mb-4">
              Register during the launch month and get one full month of your selected promotion tier free next month.
            </p>

            {(promoStep === 'register' || promoStep === 'verify') && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {promotionPricing.map(tier => (
                  <button
                    type="button"
                    key={tier.tier}
                    onClick={() => setPromoTier(tier.tier)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                      promoTier === tier.tier
                        ? 'bg-white border-black shadow-[3px_3px_0px_#E11D48]'
                        : 'bg-white/60 border-black/15 hover:border-black'
                    }`}
                  >
                    <span className="font-arc-display text-xs font-black text-black block mb-1">{tier.tier}</span>
                    <div className="font-bungee text-2xl text-[#E11D48] mb-1">{tier.price}</div>
                    <span className="font-arc-mono text-[10px] text-black/60 block">{tier.impressions}</span>
                  </button>
                ))}
              </div>
            )}

            {promoError && <div className="bg-rose-100 border-2 border-rose-400 text-rose-800 p-3 rounded-xl font-arc-mono text-xs font-bold mb-4">{promoError}</div>}

            {promoStep === 'register' && (
              <form onSubmit={handleBookPromo} className="space-y-4">
                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ByteBite Midnight Kitchen"
                    value={promoBusiness}
                    onChange={(e) => setPromoBusiness(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                      Student Founder Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya S."
                      value={promoOwner}
                      onChange={(e) => setPromoOwner(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="919830000000"
                      value={promoWhatsapp}
                      onChange={(e) => setPromoWhatsapp(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">Owner Email *</label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={promoOwnerEmail}
                    onChange={(e) => setPromoOwnerEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">
                    Tagline / Offer Line
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fresh brownies delivered to hostel gate in 20 mins"
                    value={promoTagline}
                    onChange={(e) => setPromoTagline(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 focus:border-black font-sans text-xs text-black focus:outline-none"
                  />
                </div>

                {promoTier === 'Category Spotlight' && (
                  <div>
                    <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">Promotion Category *</label>
                    <select value={promoCategory} onChange={(e) => setPromoCategory(e.target.value)} className="w-full p-2.5 rounded-xl bg-white border-2 border-black/20 font-sans text-xs text-black">
                      {dhandaCategories.filter(category => category !== 'All').map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={promoLoading}
                  className="w-full bg-black hover:bg-[#E11D48] disabled:opacity-60 text-white py-3 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[3px_3px_0px_#000000] cursor-pointer"
                >
                  {promoLoading ? 'Sending verification code…' : 'Register business & verify email'}
                </button>
              </form>
            )}

            {promoStep === 'verify' && (
              <form onSubmit={handleVerifyPromo} className="space-y-4">
                <p className="font-arc-mono text-xs text-black/70">{promoSuccessMessage || `Enter the email code sent to ${promoOwnerEmail}.`}</p>
                <input type="text" inputMode="numeric" autoComplete="one-time-code" required maxLength={10} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Email verification code" className="w-full p-3 rounded-xl bg-white border-2 border-black/20 font-arc-mono text-sm text-black" />
                <button type="submit" disabled={promoLoading} className="w-full bg-black hover:bg-[#E11D48] disabled:opacity-60 text-white py-3 rounded-xl font-arc-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000000]">
                  {promoLoading ? 'Verifying…' : 'Verify email & claim offer'}
                </button>
                <button type="button" onClick={() => { setPromoStep('register'); setPromoCode(''); }} className="w-full text-black/60 font-arc-mono text-[10px] underline">Change registration details</button>
              </form>
            )}

            {(promoStep === 'paid' || promoStep === 'success') && (
              <div className="space-y-4">
                <div className={`${promoStep === 'success' ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-black/20 text-black'} border-2 p-5 rounded-2xl font-arc-mono text-xs font-bold`}>
                  {promoSuccessMessage}
                </div>
                <div>
                  <label className="font-arc-mono text-[11px] font-black uppercase text-black block mb-1">Business / Promotion Image</label>
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePromoImageUpload} disabled={promoImageUploading} className="w-full p-3 rounded-xl bg-white border-2 border-black/20 font-sans text-xs text-black" />
                  <p className="font-arc-mono text-[10px] text-black/50 mt-1">JPG, PNG, or WebP · up to 10 MB</p>
                  {promoImageUploading && <p className="font-arc-mono text-xs text-[#E11D48] mt-1">Uploading image…</p>}
                  {promoImage && <img src={promoImage} alt="Business promotion preview" className="mt-3 h-32 w-full rounded-xl object-cover border border-black/15" />}
                </div>
                {promoStep === 'paid' && (
                  <button type="button" onClick={handlePayPromotion} disabled={promoLoading} className="w-full bg-[#E11D48] hover:bg-black disabled:opacity-60 text-white py-3 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000000]">
                    {promoLoading ? 'Preparing secure checkout…' : `Pay ${promoTier === 'Homepage Main Banner' ? '₹299' : '₹149'} for 7 days`}
                  </button>
                )}
                {promoStep === 'success' && <button type="button" onClick={() => setIsPromoModalOpen(false)} className="w-full bg-black text-white py-3 rounded-xl font-arc-mono text-xs font-black uppercase">Done</button>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. ESCROW BOOKING ORDER MODAL */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF5] max-w-md w-full rounded-3xl border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveOrderModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black text-white font-arc-mono text-xs flex items-center justify-center hover:bg-[#E11D48] transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-arc-mono text-[10px] font-black uppercase tracking-wider mb-3">
              ESCROW SHIELD CHECKOUT
            </div>

            <h3 className="font-arc-display text-2xl font-black text-black mb-1">
              Order {activeOrderModal.title}
            </h3>
            <p className="font-arc-mono text-xs text-[#E11D48] font-bold mb-4">
              Seller: {activeOrderModal.seller} (Verified Student)
            </p>

            <div className="bg-white border-2 border-black/20 p-4 rounded-2xl mb-5 space-y-2">
              <div className="flex justify-between font-arc-mono text-xs">
                <span className="text-black/60">Service Amount:</span>
                <span className="font-bold text-black">₹{activeOrderModal.price}</span>
              </div>
              <div className="flex justify-between font-arc-mono text-xs">
                <span className="text-black/60">Afterclass Escrow Fee:</span>
                <span className="font-bold text-emerald-600">₹0 (Free Pilot)</span>
              </div>
              <div className="pt-2 border-t border-black/10 flex justify-between font-arc-mono text-sm font-black">
                <span>Total Escrow Deposit:</span>
                <span className="text-[#E11D48]">₹{activeOrderModal.price}</span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#52525B] leading-relaxed mb-6">
              Your deposit is locked safely in Afterclass Escrow. Payout is released to {activeOrderModal.seller} only after you inspect and accept the completed work.
            </p>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${activeOrderModal.contactNumber}?text=Hi%20${encodeURIComponent(activeOrderModal.seller)},%20I%20want%20to%20book%20"${encodeURIComponent(activeOrderModal.title)}"%20using%20Afterclass%20Escrow%20Shield.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-black text-white py-3 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider text-center transition-colors shadow-[2px_2px_0px_#000000]"
              >
                Proceed with Shield
              </a>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="px-4 py-3 rounded-xl border-2 border-black font-arc-mono text-xs font-bold text-black hover:bg-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
