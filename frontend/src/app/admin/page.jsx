'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Terminal, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  LogOut, 
  ExternalLink,
  Store,
  Layers,
  Flame,
  AlertCircle
} from 'lucide-react';
import { campusClubs } from '../../data/amityData';
import { uploadImage } from '../../lib/uploadImage';
import { apiFetch } from '../../lib/api/client';
import Footer from '../../components/Footer';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState('club_studio');

  // Club Lead State
  const [myClub, setMyClub] = useState(null);
  const [openRoles, setOpenRoles] = useState('');
  const [recruitmentStatus, setRecruitmentStatus] = useState('RECRUITING NOW');
  const [tagline, setTagline] = useState('');
  const [clubImage, setClubImage] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Superadmin approvals state
  const [pendingClubs, setPendingClubs] = useState([
    { name: 'Amity AI & Robotics Guild', applicant: 'Rohit K. (ECE 3rd Year)', members: 45 },
    { name: 'Kolkata Campus Debate Society', applicant: 'Megha D. (Law 2nd Year)', members: 32 }
  ]);
  const [verifiedList, setVerifiedList] = useState(new Set());

  useEffect(() => {
    async function loadAdmin() {
    try {
      const sessionResponse = await fetch('/api/auth/session', { cache: 'no-store' });
      const session = await sessionResponse.json();
      if (!session.authenticated || !session.user) {
        router.push('/login');
        return;
      }

      const parsedUser = session.user;
      setUser(parsedUser);

      let clubs = campusClubs;
      try {
        const response = await apiFetch('/clubs', { cache: 'no-store' });
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length) clubs = result.data;
      } catch {}

      // Find club if club_lead
      if (parsedUser.clubId) {
        const found = clubs.find(c => c.id === parsedUser.clubId) || clubs[0];
        setMyClub(found);
        setOpenRoles(found.openRoles || 'Core Team Leads & Volunteers');
        setTagline(found.tagline || '');
        setClubImage(found.image || '');
      } else {
        setMyClub(clubs[0]);
        setOpenRoles(clubs[0].openRoles);
        setTagline(clubs[0].tagline);
        setClubImage(clubs[0].image || '');
      }

      if (parsedUser.role === 'superadmin') {
        setActiveTab('superadmin_hub');
      }

      setLoading(false);
    } catch (e) {
      router.push('/login');
    }
    }
    loadAdmin();
  }, [router]);

  const handleSaveClub = async (e) => {
    e.preventDefault();
    setSaveSuccess(false);
    setSaveError('');

    try {
      const res = await apiFetch('/clubs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clubId: myClub.id,
          openRoles,
          recruitmentStatus,
          tagline,
          image: clubImage
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMyClub(data.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(data.error || 'Failed to save');
      }
    } catch (err) {
      setSaveError('Network error while saving club profile.');
    }
  };

  const handleClubImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageError('');
    setImageUploading(true);
    try {
      const url = await uploadImage(file, 'club', { clubId: myClub?.id });
      setClubImage(url);
    } catch (error) {
      setImageError(error.message || 'Image upload failed.');
    } finally {
      setImageUploading(false);
      event.target.value = '';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('afterclass_auth_user');
    fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
      router.push('/login');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center font-arc-mono text-sm font-bold text-black">
        Loading Admin Studio...
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF5] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* Top Header Bar */}
      <header className="bg-black text-white px-6 sm:px-12 py-5 border-b-[3px] border-black flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-arc-display text-xl sm:text-2xl font-black text-white">
                Afterclass Admin Studio
              </h1>
              <span className="bg-[#E11D48] text-white font-arc-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {user.role}
              </span>
            </div>
            <p className="font-arc-mono text-xs text-white/60">
              Signed in as <span className="text-[#FEF08A]">{user.name}</span> ({user.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 font-arc-mono text-xs text-white/80 hover:text-white px-3 py-1.5 rounded-lg border border-white/20"
          >
            <span>Live Site</span>
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

      {/* Main Studio Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 md:p-12">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b-2 border-black/10 pb-4">
          <button
            onClick={() => setActiveTab('club_studio')}
            className={`px-5 py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'club_studio'
                ? 'bg-black text-white shadow-[2px_2px_0px_#E11D48]'
                : 'bg-white border border-black/20 text-black hover:border-black'
            }`}
          >
            Club Management Studio
          </button>

          {user.role === 'superadmin' && (
            <button
              onClick={() => setActiveTab('superadmin_hub')}
              className={`px-5 py-2.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'superadmin_hub'
                  ? 'bg-[#E11D48] text-white shadow-[2px_2px_0px_#000000]'
                  : 'bg-white border border-black/20 text-black hover:border-black'
              }`}
            >
              Superadmin Control Hub
            </button>
          )}
        </div>

        {/* TAB 1: CLUB STUDIO */}
        {activeTab === 'club_studio' && myClub && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Edit Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-[2.5px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-arc-mono text-xs font-black uppercase text-[#E11D48] tracking-wider">
                  CLUB LEAD WORKBENCH
                </span>
                <span className="bg-[#FEF08A] font-arc-mono text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border border-black">
                  {myClub.category}
                </span>
              </div>

              <h2 className="font-arc-display text-2xl sm:text-3xl font-black text-black mb-2">
                Manage {myClub.name}
              </h2>
              <p className="font-sans text-xs text-[#52525B] leading-relaxed mb-6">
                Keep recruitment roles and audition callouts fresh so students discover your society on the live directory.
              </p>

              {saveSuccess && (
                <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-900 p-4 rounded-2xl font-arc-mono text-xs font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Changes published to live campus directory!</span>
                </div>
              )}

              {saveError && (
                <div className="bg-rose-100 border-2 border-rose-400 text-[#E11D48] p-4 rounded-2xl font-arc-mono text-xs font-bold mb-4 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{saveError}</span>
                </div>
              )}

              <form onSubmit={handleSaveClub} className="space-y-4">
                <div>
                  <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
                    Recruitment Status Badge
                  </label>
                  <select
                    value={recruitmentStatus}
                    onChange={(e) => setRecruitmentStatus(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-arc-mono text-xs text-black focus:outline-none"
                  >
                    <option value="CORE RECRUITMENT LIVE">CORE RECRUITMENT LIVE</option>
                    <option value="AUDITIONS OPEN TODAY">AUDITIONS OPEN TODAY</option>
                    <option value="VOLUNTEERS NEEDED">VOLUNTEERS NEEDED</option>
                    <option value="MEMBERSHIP OPEN">MEMBERSHIP OPEN</option>
                    <option value="APPLICATIONS CLOSED">APPLICATIONS CLOSED</option>
                  </select>
                </div>

                <div>
                  <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
                    Currently Recruiting Callout (What roles are open?)
                  </label>
                  <input
                    type="text"
                    required
                    value={openRoles}
                    onChange={(e) => setOpenRoles(e.target.value)}
                    placeholder="e.g. Frontend Leads, Graphic Designers, Sponsorship Heads"
                    className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-sans text-xs sm:text-sm text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
                    Society Tagline / Punchline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Coding is cool, but building real shit is cooler."
                    className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 focus:border-black font-sans text-xs sm:text-sm text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-arc-mono text-xs font-black uppercase text-black block mb-1">
                    Club Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleClubImageUpload}
                    disabled={imageUploading}
                    className="w-full p-3 rounded-xl bg-[#FFFDF5] border-2 border-black/20 font-sans text-xs text-black"
                  />
                  <p className="font-arc-mono text-[10px] text-black/50 mt-1">JPG, PNG, or WebP · up to 10 MB. Uploads go to the Afterclass Supabase image bucket.</p>
                  {imageUploading && <p className="font-arc-mono text-xs text-[#E11D48] mt-1">Uploading image…</p>}
                  {imageError && <p className="font-arc-mono text-xs text-rose-700 mt-1">{imageError}</p>}
                  {clubImage && <img src={clubImage} alt="Club image preview" className="mt-3 h-28 w-full rounded-xl object-cover border border-black/15" />}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-black hover:bg-[#E11D48] text-white px-8 py-3.5 rounded-xl font-arc-mono text-xs font-black uppercase tracking-wider transition-colors shadow-[3px_3px_0px_#000000] cursor-pointer flex items-center gap-2"
                  >
                    <Save size={14} />
                    <span>Save & Update Live Directory</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right 5 cols: Live Preview Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border-[2.5px] border-black p-6 sm:p-7 shadow-[6px_6px_0px_#000000]">
              <span className="font-arc-mono text-xs font-black text-black/50 uppercase block mb-3">
                Live Directory Preview
              </span>

              <div className="border-2 border-black rounded-2xl p-5 bg-[#FFFDF5] shadow-[3px_3px_0px_#000000]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{myClub.avatar}</span>
                  <span className="bg-[#E11D48] text-white font-arc-mono text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                    {recruitmentStatus}
                  </span>
                </div>

                <h3 className="font-arc-display text-xl font-black text-black mb-1">
                  {myClub.name}
                </h3>
                <p className="font-sans text-xs text-black/60 mb-4 font-medium">
                  {tagline || myClub.tagline}
                </p>

                <div className="bg-white border border-black/20 p-3 rounded-xl mb-4">
                  <span className="font-arc-mono text-[10px] font-black uppercase text-amber-600 block mb-1">
                    CURRENTLY RECRUITING:
                  </span>
                  <span className="font-sans text-xs font-bold text-black">
                    {openRoles}
                  </span>
                </div>

                <div className="font-arc-mono text-xs text-black/60 flex items-center gap-1.5">
                  <Users size={13} />
                  <span>{myClub.membersCount} Active Members</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SUPERADMIN HUB */}
        {activeTab === 'superadmin_hub' && user.role === 'superadmin' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border-[2.5px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex items-center gap-2 font-arc-mono text-xs font-black text-[#E11D48] uppercase tracking-wider mb-2">
                <Terminal size={14} />
                <span>WYRCAN DEV OVERRIDE & PLATFORM MODERATION</span>
              </div>
              <h2 className="font-arc-display text-3xl font-black text-black mb-4">
                Platform Verification & Oversight Hub
              </h2>

              {/* Pending Approvals */}
              <div className="space-y-4">
                <span className="font-arc-mono text-xs font-black uppercase text-black block">
                  New Club Verification Requests ({pendingClubs.length})
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingClubs.map((club, idx) => (
                    <div key={idx} className="bg-[#FFFDF5] border-2 border-black p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <h4 className="font-arc-display text-sm font-black text-black">{club.name}</h4>
                        <span className="font-arc-mono text-[11px] text-black/60 block">Applicant: {club.applicant}</span>
                        <span className="font-arc-mono text-[10px] text-emerald-700 font-bold">{club.members} Founding Members</span>
                      </div>

                      {verifiedList.has(club.name) ? (
                        <span className="bg-emerald-600 text-white font-arc-mono text-xs font-black uppercase px-3 py-1.5 rounded-lg">
                          Verified ✓
                        </span>
                      ) : (
                        <button
                          onClick={() => setVerifiedList(new Set(verifiedList).add(club.name))}
                          className="bg-black hover:bg-[#E11D48] text-white font-arc-mono text-xs font-black uppercase px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          Verify Club
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad approvals */}
              <div className="pt-8 border-t border-black/10 mt-8">
                <span className="font-arc-mono text-xs font-black uppercase text-black block mb-3">
                  Active Sponsored Frontpage Banners ($299/wk)
                </span>
                <div className="bg-[#FFFDF5] border-2 border-black p-4 rounded-2xl font-arc-mono text-xs text-black">
                  • <strong>The Crumb Theory Bakery</strong> (Slot 1: Active until Nov 20, 2026)<br />
                  • <strong>Kolkata Campus Lens</strong> (Slot 2: Active until Nov 24, 2026)
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
