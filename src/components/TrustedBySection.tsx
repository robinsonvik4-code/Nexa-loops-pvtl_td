import React from 'react';
import { Sparkles } from 'lucide-react';

const INDUSTRIES = [
  'Fashion & D2C',
  'Jewellery',
  'Beauty & Wellness',
  'Real Estate',
  'Local Businesses',
  'Technology',
  'Hospitality',
  'Professional Services'
];

export const TrustedBySection: React.FC = () => {
  return (
    <section id="industry-capabilities" className="relative py-10 sm:py-12 bg-[#040714] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-7 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[11px] font-mono tracking-[0.22em] text-gray-400 uppercase font-semibold">Creative categories we support</span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">INDUSTRY CAPABILITIES • NOT CLIENT LOGOS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {INDUSTRIES.map((industry) => (
            <div key={industry} className="min-h-20 flex items-center justify-center p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] text-center text-[11px] font-bold tracking-wide text-gray-300">
              {industry}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
