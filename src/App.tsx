import React from 'react';
import {Admin} from './admin/Admin';
import {ContentProvider} from './admin/content';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { mapServiceToLeadOption } from './data/leadFormOptions';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyLeadFeatures } from './components/StickyLeadFeatures';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransitionProvider } from './components/PageTransitionOverlay';

// Dedicated Multi-Page Views
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function AppLayout() {
  const navigate = useNavigate();

  const handleQuickActionSelect = (serviceName: string) => {
    const matchedOption = mapServiceToLeadOption(serviceName);

    navigate('/contact', {
      state: {
        service: matchedOption,
        message: `I clicked on quick action for "${serviceName}". Please share pricing and availability.`
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050814] text-[#E2E8F0] relative selection:bg-[#8B5CF6]/30 selection:text-white flex flex-col justify-between">
      <ScrollToTop />

      {/* Top Fixed Glass Navigation */}
      <Navbar onStartProjectClick={() => navigate('/contact')} />

      {/* Main Multi-Page Routed View */}
      <main id="main-content" className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Sticky Global Conversion Tools */}
      <StickyLeadFeatures onQuickActionSelect={handleQuickActionSelect} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTransitionProvider>
        <Routes><Route path="/admin" element={<Admin />} /><Route path="*" element={<ContentProvider><AppLayout /></ContentProvider>} /></Routes>
      </PageTransitionProvider>
    </BrowserRouter>
  );
}
