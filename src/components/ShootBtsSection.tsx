import React, { useState } from 'react';
import { BTS_DATA } from '../data/mockData';
import { BtsItem } from '../types';
import { Camera, Sliders, Users, Eye, Sparkles, ArrowRight } from 'lucide-react';

interface ShootBtsSectionProps {
  onBtsCtaClick: (planType: string) => void;
}

export const ShootBtsSection: React.FC<ShootBtsSectionProps> = ({ onBtsCtaClick }) => {
  const [selectedBts, setSelectedBts] = useState<BtsItem>(BTS_DATA[0]);

  return (
    <section id="bts" className="relative py-24 md:py-32 bg-[#050814] border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3 h-3" />
            <span>Production Transparency</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            BEHIND EVERY GREAT SHOT
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Professional multi-point studio lighting, calibrated monitors, and experienced direction ensure high-end commercial polish every time.
          </p>

          {/* Quick Contextual Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onBtsCtaClick('Plan a Brand Shoot')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 transition-all"
            >
              PLAN A BRAND SHOOT
            </button>
            <button
              onClick={() => onBtsCtaClick('Need Models / Casting Coordination')}
              className="px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/15 text-gray-200 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            >
              NEED MODELS?
            </button>
            <button
              onClick={() => onBtsCtaClick('Shoot + Reels Package')}
              className="px-5 py-2.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[#00F0FF] hover:bg-cyan-500/25 text-xs font-bold uppercase tracking-wider transition-all"
            >
              SHOOT + REELS PACKAGE
            </button>
          </div>
        </div>

        {/* Interactive Feature: Selected BTS Spotlight View */}
        <div className="mb-12 rounded-3xl bg-[#090E28]/90 border border-purple-500/30 p-6 md:p-8 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] bg-black relative">
            <img
              src={selectedBts.image}
              alt={selectedBts.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-extrabold uppercase tracking-widest text-[#00F0FF]">
              {selectedBts.category}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <span className="text-xs font-mono text-pink-400 uppercase tracking-wider">
              Selected Studio Breakdown
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white mt-1">
              {selectedBts.title}
            </h3>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {selectedBts.description}
            </p>

            <div className="mt-5 space-y-3 pt-5 border-t border-white/10 text-xs">
              <div>
                <span className="text-gray-400 block font-semibold mb-1">Rigging & Optics:</span>
                <span className="text-gray-200 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 block">
                  {selectedBts.setupDetails}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold mb-1">Equipment Used:</span>
                <span className="text-cyan-300 font-mono text-[11px]">
                  {selectedBts.gear}
                </span>
              </div>
            </div>

            <button
              onClick={() => onBtsCtaClick(`Shoot Setup: ${selectedBts.title}`)}
              className="mt-6 w-full py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Book Similar Shoot Configuration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BTS Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BTS_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedBts(item)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                selectedBts.id === item.id
                  ? 'bg-purple-950/30 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'bg-[#080D24]/70 border-white/10 hover:border-white/20 hover:bg-[#080D24]'
              }`}
            >
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
                  {item.category}
                </div>
                <h4 className="text-base font-bold text-white font-['Space_Grotesk',sans-serif]">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs text-gray-300 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-purple-300 font-semibold">
                <span>View Setup Details</span>
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
