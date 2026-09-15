import React from 'react';
import { WORK_PROCESS } from '../data/mockData';
import { Compass, Lightbulb, Video, Rocket, LineChart, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface WhyNexaLoopsProps {
  onDiscussProjectClick: () => void;
}

export const WhyNexaLoops: React.FC<WhyNexaLoopsProps> = ({ onDiscussProjectClick }) => {
  const pillars = [
    { title: 'Strategy', desc: 'Market positioning, audience psychology, and conversion architecture.' },
    { title: 'Creative Production', desc: 'Studio camera rigs, cinematic optics, and set styling.' },
    { title: 'Technology', desc: 'Custom modern websites, high-speed code, and interactive systems.' },
    { title: 'Marketing', desc: 'Funnel planning, retention mechanics, and lead generation.' },
    { title: 'Content', desc: 'Viral reels, educational carousels, and visual storytelling.' },
    { title: 'Advertising', desc: 'High-ROI Meta & Google ads configured for real profitability.' }
  ];

  const processIcons = [Compass, Lightbulb, Video, Rocket, LineChart];

  return (
    <section id="about-why" className="relative py-24 md:py-32 bg-[#060A1C] border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00F0FF] text-xs font-bold uppercase tracking-widest mb-3">
            <span>Philosophy & Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            CREATIVE THINKING.
            <br />
            <span className="bg-gradient-to-r from-[#A855F7] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
              BUSINESS-FOCUSED EXECUTION.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Most creative agencies stop at aesthetics. Most performance agencies lack visual taste. Nexa Loops unites both so every piece of creative drives genuine commercial enquiries.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#090E26]/90 border border-white/10 hover:border-purple-500/40 transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#00F0FF] mb-2">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold font-['Space_Grotesk',sans-serif] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The 5-Step Animated Workflow Timeline */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
            Our 5-Stage Delivery Process
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white mt-1">
            HOW WE BRING PROJECTS TO LIFE
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {WORK_PROCESS.map((step, index) => {
            const Icon = processIcons[index] || CheckCircle2;
            return (
              <div
                key={step.step}
                className="group relative rounded-2xl bg-[#080D24] border border-white/10 hover:border-purple-400/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-['Space_Grotesk',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#A855F7]">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-purple-300 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold font-['Space_Grotesk',sans-serif] tracking-wide text-white group-hover:text-[#00F0FF] transition-colors">
                    {step.name}
                  </h4>
                  <div className="text-xs font-semibold text-purple-200 mt-1">
                    {step.title}
                  </div>
                  <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion Prompt */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={onDiscussProjectClick}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#EC4899] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>DISCUSS MY PROJECT PROCESS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
