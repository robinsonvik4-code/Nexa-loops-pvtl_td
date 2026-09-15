import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { mapServiceToLeadOption } from '../data/leadFormOptions';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavClick?: (href: string, label?: string) => void;
  onServiceClick?: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services & Capabilities', path: '/services' },
    { label: 'Portfolio & Reels Lab', path: '/portfolio' },
    { label: 'About Studio & Gear', path: '/about' },
    { label: 'Contact & Custom Quote', path: '/contact' },
  ];

  const topServices = [
    'Social Media Management',
    'Reels / Video Shorts',
    'Product Photography',
    'Website Development',
    'Brand Shoots',
    'Digital Advertising',
  ];

  const handleServiceClick = (service: string) => {
    navigate('/contact', {
      state: {
        service: mapServiceToLeadOption(service),
        message: `I'm interested in discussing ${service} for my brand.`
      }
    });
  };

  return (
    <footer id="main-footer" className="relative bg-[#03050D] text-gray-400 border-t border-white/10 pt-16 pb-24 md:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 flex flex-col text-left">
            <Link to="/" className="inline-block mb-4">
              <Logo showTagline={true} size="lg" />
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mt-3">
              Nexa Loops is a full-service creative technology agency helping brands turn attention into loyal customers through cinematic content, vertical reels, and high-performance websites.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="https://instagram.com/nexaloops"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-gray-300 hover:text-pink-400 transition-all flex items-center justify-center"
                aria-label="Nexa Loops Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com/@nexaloops"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 text-gray-300 hover:text-rose-400 transition-all flex items-center justify-center"
                aria-label="Nexa Loops YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-300 hover:text-blue-400 transition-all flex items-center justify-center"
                aria-label="Nexa Loops LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 transition-all flex items-center justify-center"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Pages Quick Links */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Disciplines */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {topServices.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleServiceClick(service)}
                    className="hover:text-purple-300 transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Studio Contact */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Studio Details
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-gray-400 text-[11px]">Direct / WhatsApp:</div>
                  <a href={`tel:${COMPANY_CONTACT.rawPhone}`} className="text-white hover:text-cyan-300 font-semibold">
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-gray-400 text-[11px]">Email Inquiries:</div>
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-white hover:text-pink-300 font-medium break-all">
                    {COMPANY_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-gray-400 text-[11px]">Studio HQ:</div>
                  <div className="text-gray-300 leading-snug">
                    {COMPANY_CONTACT.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-gray-300">Nexa Loops</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="text-[#00F0FF]">INNOVATE. CONNECT. ELEVATE.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
