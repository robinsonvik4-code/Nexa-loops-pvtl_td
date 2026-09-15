import React from 'react';
import { CreativeLeadEngine } from './CreativeLeadEngine';
import { ArrowRight, Sparkles, MessageSquare, Play, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../data/mockData';

interface HeroProps {
  onStartProjectClick: () => void;
  onExploreWorkClick: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProjectClick,
  onExploreWorkClick,
  onSelectService
}) => {
  const trustLabels = [
    'Reels & Shorts',
    'Product Shoots',
    'Web Development',
    'Digital Marketing',
    'Creative Production'
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:py-32 overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Background Light Pools */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#3B82F6]/15 via-[#8B5CF6]/20 to-[#EC4899]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#A855F7]/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Small Label Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md w-fit mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-gray-200">
                PAN-INDIA CREATIVE & PRODUCTION STUDIO
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Space_Grotesk',sans-serif] leading-[1.08] text-white">
              IDEAS THAT MOVE.
              <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-[#C084FC]">
                BRANDS THAT{' '}
              </span>
              <span className="bg-gradient-to-r from-[#A855F7] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                GROW.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl">
              Nexa Loops brings high-retention commercial reels, 4K product shoots, website architecture, and performance advertising together for ambitious brands across India.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA */}
              <button
                id="hero-primary-cta"
                onClick={onStartProjectClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-white overflow-hidden shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] transition-transform duration-300 group-hover:scale-105" />
                <span className="relative flex items-center gap-2">
                  START A PROJECT
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-secondary-cta"
                onClick={onExploreWorkClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-gray-200 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/25 transition-all"
              >
                EXPLORE OUR WORK
              </button>

              {/* WhatsApp Quick Action */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all text-xs font-semibold"
                title="Instant Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden xl:inline">WhatsApp Fast Track</span>
              </a>
            </div>

            {/* Small Trust / Service Labels */}
            <div className="mt-12 pt-8 border-t border-white/[0.08]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
                Core Production Disciplines
              </div>
              <div className="flex flex-wrap gap-2">
                {trustLabels.map((label, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectService(label)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 bg-white/[0.03] border border-white/[0.08] hover:border-purple-400/50 hover:text-white hover:bg-purple-500/10 transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Column: Creative Lead Engine */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-4 lg:mt-0">
            <CreativeLeadEngine onNodeSelect={onSelectService} />
          </div>
        </div>
      </div>
    </section>
  );
};
