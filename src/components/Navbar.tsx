import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  MoreVertical,
  Home,
  Layers,
  Film,
  Sparkles,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onStartProjectClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProjectClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/', icon: Home, badge: 'Main' },
    { label: 'Services', path: '/services', icon: Layers, badge: '15 Disciplines' },
    { label: 'Portfolio & Reels', path: '/portfolio', icon: Film, badge: 'Reels Lab' },
    { label: 'About', path: '/about', icon: Sparkles, badge: 'Studio Gear' },
    { label: 'Contact & Quote', path: '/contact', icon: MessageSquare, badge: 'Enquire' },
  ];

  const handleCtaClick = () => {
    if (onStartProjectClick) {
      onStartProjectClick();
    } else {
      navigate('/contact');
    }
  };

  return (
    <>
      {/* Primary Fixed Navigation Bar */}
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050814]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5'
            : 'bg-[#050814]/60 backdrop-blur-md py-4 sm:py-5 border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              aria-label="Nexa Loops Home"
            >
              <Logo showTagline={false} size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Desktop Action: CTA Button & Phone */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${COMPANY_CONTACT.rawPhone}`}
                className="p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/5 border border-white/5 transition-all text-xs flex items-center gap-1.5"
                title="Call Nexa Loops"
                aria-label="Call Nexa Loops"
              >
                <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="hidden xl:inline text-[11px] font-medium text-gray-300">+91 75999 93336</span>
              </a>

              <button
                id="header-start-project-button"
                onClick={handleCtaClick}
                className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] animate-pulse-slow opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#070B1E] text-xs font-bold uppercase tracking-wider text-white group-hover:bg-[#070B1E]/90 transition-colors">
                  Start a Project
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>

            {/* Mobile Header Actions (WhatsApp + 3-Dot / Hamburger Toggle) */}
            <div className="flex items-center gap-2 md:hidden">
              {/* WhatsApp Quick Icon */}
              <a
                href={getWhatsAppUrl('Hi Nexa Loops, I would like to discuss a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Direct WhatsApp Chat"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              {/* Mobile Menu Toggle Button (Both 3-dot & 3-line friendly) */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.08] active:bg-white/[0.15] border border-white/15 text-white active:scale-95 transition-all shadow-sm"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <>
                    <X className="w-5 h-5 text-pink-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-200">Close</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-4 h-4 text-[#00F0FF]" />
                    <MoreVertical className="w-3.5 h-3.5 text-purple-400 -ml-1" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-200">Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Modal / Drawer
          CRITICAL: Rendered OUTSIDE of <header> so backdrop-filter in <header> doesn't trap or collapse the fixed overlay!
      */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          className="fixed inset-0 z-[100] bg-[#050814] flex flex-col md:hidden overflow-hidden animate-fadeIn"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-[#070B1E]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center focus:outline-none"
            >
              <Logo showTagline={false} size="sm" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${COMPANY_CONTACT.rawPhone}`}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>

              <button
                id="mobile-menu-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-white active:scale-95 transition-all"
                aria-label="Close navigation menu"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Close</span>
                <X className="w-4 h-4 text-pink-400" />
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
            {/* Header label */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 font-semibold">
                NAVIGATE SECTIONS
              </span>
              <span className="text-[10px] font-semibold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full border border-[#00F0FF]/20">
                5 Pages Available
              </span>
            </div>

            {/* Nav Links Cards */}
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-purple-600/10 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)] text-white'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-purple-500/25 text-purple-300 border border-purple-400/40'
                            : 'bg-white/[0.05] text-gray-400 border border-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold tracking-wide flex items-center gap-2">
                          <span>{link.label}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                          )}
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium">
                          {link.badge}
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-pink-400 translate-x-0.5 -translate-y-0.5' : 'text-gray-500'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Quick Consultation CTA in Drawer */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(168,85,247,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Start a Project / Get Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Connect Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={getWhatsAppUrl('Hi Nexa Loops, I want to talk on WhatsApp regarding a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex flex-col items-center justify-center gap-1 text-center active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="text-xs font-bold">WhatsApp Chat</span>
                <span className="text-[10px] text-emerald-300/80">&lt;15m Response</span>
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.rawPhone}`}
                className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex flex-col items-center justify-center gap-1 text-center active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span className="text-xs font-bold">Direct Call</span>
                <span className="text-[10px] text-cyan-300/80">{COMPANY_CONTACT.phone}</span>
              </a>
            </div>

            {/* Studio Info Footnote */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left text-xs text-gray-400 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Dauhrra Mafi, Aligarh (UP)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mon–Sat: 9:30 AM – 8:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#00F0FF]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pan-India On-Location Production Units</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

