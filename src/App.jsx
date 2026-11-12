import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Distinct Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ClubsPage from './pages/ClubsPage';
import ClubDetailPage from './pages/ClubDetailPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import NoticesPage from './pages/NoticesPage';
import DevelopersPage from './pages/DevelopersPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#3B3BFF] text-[#000000] font-sans selection:bg-[#FFFEF0] selection:text-[#3B3BFF]">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/clubs" element={<ClubsPage />} />
              <Route path="/clubs/:clubId" element={<ClubDetailPage />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/developers" element={<DevelopersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
