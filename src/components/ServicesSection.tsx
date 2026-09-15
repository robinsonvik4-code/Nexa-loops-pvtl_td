import {useContent} from '../admin/content';
import React, { useState } from 'react';
import { SERVICES_LIST as DEFAULT_SERVICES_LIST } from '../data/mockData';
import { ServiceItem } from '../types';
import {
  Share2,
  Sparkles,
  Film,
  Camera,
  Video,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Sliders,
  Scissors,
  Palette,
  UserCheck,
  ClipboardCheck,
  Tv,
  ArrowRight,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

interface ServicesSectionProps {
  onServiceSelect: (serviceTitle: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Share2,
  Sparkles,
  Film,
  Camera,
  Video,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Sliders,
  Scissors,
  Palette,
  UserCheck,
  ClipboardCheck,
  Tv
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServiceSelect }) => {
  const SERVICES_LIST = useContent('services', DEFAULT_SERVICES_LIST);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: `All Services (${SERVICES_LIST.length})` },
    { id: 'content', label: 'Content & Video' },
    { id: 'shoots', label: 'Shoots & Production' },
    { id: 'tech', label: 'Web & Tech' },
    { id: 'growth', label: 'Growth & Ads' },
    { id: 'design', label: 'Design & Retouch' },
  ];

  const filteredServices = filter === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === filter);

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#060A1A]/80 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-3">
            <span>Specialized Capabilities</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            EVERYTHING YOUR BRAND NEEDS TO GROW
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            From studio cameras and macro lenses to viral vertical hooks and enterprise code, we produce the entire creative stack under one roof.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                    : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (All 15 Services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onServiceSelect(service.title)}
                className="group relative cursor-pointer rounded-2xl bg-[#090E26]/80 border border-white/10 hover:border-purple-500/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_35px_-10px_rgba(168,85,247,0.25)] flex flex-col justify-between backdrop-blur-md"
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/30 text-[10px] font-bold uppercase tracking-wider text-pink-300">
                    High Demand
                  </div>
                )}

                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00F0FF] group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-sm mb-5">
                    <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Explanation */}
                  <p className="mt-2.5 text-sm text-gray-300 leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Arrow / Explore Button */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 group-hover:text-pink-400 flex items-center gap-1.5 transition-colors">
                    Enquire Service
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-cyan-950/30 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <CheckCircle2 className="w-6 h-6 text-[#00F0FF] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">Need a custom multi-service bundled retainer?</div>
              <div className="text-xs text-gray-300">We combine monthly Reels, Product Shoots, and Ad Management into high-ROI packages.</div>
            </div>
          </div>
          <button
            onClick={() => onServiceSelect('Full Retainer (Shoots + Reels + Ads)')}
            className="shrink-0 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105"
          >
            Request Retainer Quote
          </button>
        </div>

      </div>
    </section>
  );
};
