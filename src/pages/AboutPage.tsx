import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AboutSection } from '../components/AboutSection';
import { TrustedBySection } from '../components/TrustedBySection';
import { WhyNexaLoops } from '../components/WhyNexaLoops';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Sparkles, ArrowRight, ShieldCheck, Video, MapPin, Award, Users, Camera } from 'lucide-react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 bg-[#050814] min-h-screen">
      {/* 1. Page Header */}
      <section className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>WHO WE ARE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Engineered for Impact. <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]">
              Obsessed with Retention.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed">
            We are a modern creative studio and technology agency bridging high-end cinema aesthetics with real business revenue. Founded in Aligarh and working with ambitious brands pan-India.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getWhatsAppUrl('Hi Nexa Loops team, I would like to schedule a discovery call.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Direct Founder Chat</span>
            </a>
          </div>
        </div>

        {/* Credibility Badges */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-2xl font-black text-white">50M+</div>
            <div className="text-xs text-gray-400 mt-1">Reels & Video Views Generated</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-2xl font-black text-[#00F0FF]">150+</div>
            <div className="text-xs text-gray-400 mt-1">Commercial Shoots Completed</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-2xl font-black text-purple-400">4K / 10-Bit</div>
            <div className="text-xs text-gray-400 mt-1">Cinema Raw Production Gear</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-2xl font-black text-emerald-400">98%</div>
            <div className="text-xs text-gray-400 mt-1">Client Retention & Satisfaction</div>
          </div>
        </div>
      </section>

      {/* 2. Trusted By Brand Collaborations Section */}
      <TrustedBySection />

      {/* 3. Studio Story & Equipment Gear List */}
      <AboutSection />

      {/* 3. The 5-Step Nexa Loops Methodology */}
      <WhyNexaLoops onDiscussProjectClick={() => navigate('/contact')} />

      {/* 4. Client Testimonials */}
      <TestimonialsSection />

      {/* 5. Studio Visit & Consultation CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B1032] to-[#070B1E] border border-cyan-500/20 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] font-semibold">
              SCHEDULE A STUDIO SESSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Visit our studio or invite our crew to your location.
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2">
              Based at Dauhrra Mafi, Aligarh, with mobile production units deploying for on-site shoots across Delhi NCR, UP, and India.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${COMPANY_CONTACT.rawPhone}`}
              className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Call +91 75999 93336</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
