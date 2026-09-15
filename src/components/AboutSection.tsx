import React from 'react';
import { COMPANY_CONTACT } from '../data/mockData';
import { Sparkles, MapPin, Target, Eye, Code, Camera, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#050814] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Origin */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-4 w-fit">
              <Sparkles className="w-3 h-3" />
              <span>About Nexa Loops</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
              CREATIVITY MEETS TECHNOLOGY.
            </h2>

            <div className="mt-4 text-xs font-bold tracking-[0.25em] text-pink-400 uppercase">
              {COMPANY_CONTACT.tagline}
            </div>

            <p className="mt-6 text-base text-gray-300 leading-relaxed font-normal">
              Nexa Loops is a creative digital company founded to bridge the gap between high-end visual aesthetics and measurable business growth. Based in Dauhrra Mafi, Aligarh, Uttar Pradesh, we engineer digital presence for brands through cinematic video shoots, vertical content production, modern website development, and targeted digital advertising.
            </p>

            <p className="mt-4 text-base text-gray-300 leading-relaxed font-normal">
              Whether you are an emerging fashion label needing runway-grade lookbooks, an established manufacturer requiring macro product photography, or a modern business looking to overhaul your web experience, Nexa Loops delivers end-to-end creative technology with relentless execution.
            </p>

            {/* Core commitments */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-[#00F0FF] mb-2">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Full-Stack Production</h4>
                <p className="text-xs text-gray-400 mt-1">In-house cameras, lighting, and sound gear.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2">
                  <Code className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Engineering Rigor</h4>
                <p className="text-xs text-gray-400 mt-1">Clean web architecture designed to convert visitors.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Agency Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80"
                  alt="Creative Director Framing Shoot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 rounded-2xl bg-[#090E2A] border border-white/10 text-left">
                <div className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider font-bold">
                  Location
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  Aligarh, Uttar Pradesh
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Serving pan-India & international brands with remote & on-site production.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/30 border border-purple-500/30 text-left">
                <div className="text-[10px] font-mono text-pink-300 uppercase tracking-wider font-bold">
                  Our Discipline
                </div>
                <div className="text-base font-bold text-white mt-1">
                  Attention Engine
                </div>
                <p className="text-xs text-purple-200 mt-1">
                  Turning fleeting digital views into real enquiries and high-ticket sales.
                </p>
              </div>

              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
                  alt="Modern Creative Hardware and Technology"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
