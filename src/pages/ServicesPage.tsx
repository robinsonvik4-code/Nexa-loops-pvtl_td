import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServicesSection } from '../components/ServicesSection';
import { QuickProjectSelector } from '../components/QuickProjectSelector';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Video,
  Globe,
  Camera,
  TrendingUp,
  Palette,
  PhoneCall,
  Flame
} from 'lucide-react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { mapServiceToLeadOption } from '../data/leadFormOptions';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (serviceTitle: string) => {
    navigate('/contact', {
      state: {
        service: mapServiceToLeadOption(serviceTitle),
        message: `I am interested in your "${serviceTitle}" service. Please share commercial packages and availability.`
      }
    });
  };

  const handleQuickQuoteRequested = (service: string, timeline: string) => {
    navigate('/contact', {
      state: {
        service: mapServiceToLeadOption(service),
        timeline,
        message: `I'm looking for ${service} support. Target start date: ${timeline}. Please prepare a custom quote.`
      }
    });
  };

  const servicePillars = [
    {
      icon: Video,
      title: 'Commercial Video & Reels',
      description: 'Ultra-high retention 9:16 reels, TV commercials, and brand films shot on cinema-grade cinema glass.',
      tags: ['4K Cinema Raw', 'DaVinci Resolve', 'Viral Hooks']
    },
    {
      icon: Camera,
      title: 'Product & Brand Shoots',
      description: 'Studio tabletop 360 photography, editorial fashion shoots, and high-end lifestyle catalog visuals.',
      tags: ['Studio Lighting', 'Model Castings', 'Color Managed']
    },
    {
      icon: Globe,
      title: 'High-Converting Web Development',
      description: 'Modern, blazing fast web apps and e-commerce stores designed to turn visitors into buyers.',
      tags: ['Next.js / React', 'Mobile-First', 'SEO Optimized']
    },
    {
      icon: TrendingUp,
      title: 'Growth & Social Strategy',
      description: 'End-to-end social media handling, paid Meta & Google ad campaigns engineered for positive ROAS.',
      tags: ['Daily Management', 'Targeted Ad Copy', 'Analytics Reports']
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-[#050814] min-h-screen">
      {/* 1. Services Page Hero Header */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>FULL-SPECTRUM CREATIVE & TECH AGENCY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Services Built to <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]">
              Demand Market Attention
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed">
            From cinema-line camera shoots and vertical reels to custom web development and paid ad scaling, our 15 disciplines cover everything your brand needs to dominate online.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              <span>Request Custom Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppUrl('Hi Nexa Loops, I am reviewing your services page and want to discuss packages.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* 4 Core Pillars Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicePillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{pillar.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                  {pillar.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Interactive 15-Service Deep Dive */}
      <ServicesSection onServiceSelect={handleServiceSelect} />

      {/* 3. Interactive Quick Quote Calculator & Timeline Selector */}
      <section className="relative py-12">
        <QuickProjectSelector onQuoteRequested={handleQuickQuoteRequested} />
      </section>

      {/* 4. Production SLA & Quality Guarantees */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 text-left">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] font-semibold">
              OUR SERVICE PROMISES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Premium Production. Clear Communication.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#070B1E] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Clear Milestone Timelines</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Structured delivery schedules confirmed upfront before project kickoff. Clear review and approval milestones help keep the project organized.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070B1E] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h4 className="font-bold text-white text-sm">Commercial Licensing</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Commercial sound design, color mastering, and usage/ownership terms clearly defined in your approved project scope.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070B1E] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-pink-400" />
                <h4 className="font-bold text-white text-sm">Transparent Milestone Pricing</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Quoted deliverables, inclusions, exclusions, and approved external costs are documented before work begins.
              </p>
            </div>
          </div>

          {/* CTA Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-white text-sm">Need a combined retainer for Shoots + Reels + Ads?</h5>
              <p className="text-xs text-gray-400">We offer custom multi-month growth packages for brands.</p>
            </div>
            <button
              onClick={() => navigate('/contact', { state: { service: 'Social Media Management', message: 'I am interested in a comprehensive monthly retainer (Shoots + Reels + Ads + Web).' } })}
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all shrink-0"
            >
              Discuss Monthly Retainer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
