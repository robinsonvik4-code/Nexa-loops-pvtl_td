import React from 'react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onStartProjectClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartProjectClick }) => {
  return (
    <section id="final-cta" className="relative py-24 md:py-32 bg-[#050814] overflow-hidden border-t border-white/5">
      {/* Background radiant gradient flare */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[450px] bg-gradient-to-r from-purple-600/20 via-pink-600/25 to-cyan-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Glow pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-200">
            Elevate Your Brand Today
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-[1.08]">
          READY TO MAKE YOUR BRAND
          <br />
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
            IMPOSSIBLE TO IGNORE?
          </span>
        </h2>

        {/* Supporting text */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          From content and campaigns to shoots and websites, Nexa Loops brings everything together.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-start-project-btn"
            onClick={onStartProjectClick}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#A855F7] via-[#D946EF] to-[#EC4899] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="final-cta-whatsapp-btn"
            href={getWhatsAppUrl('Hi Nexa Loops, I visited your website and would like to discuss a project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-400 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WHATSAPP NEXA LOOPS</span>
          </a>
        </div>

        <div className="mt-8 text-xs font-mono text-gray-400">
          Phone: +91 75999 93336 • Aligarh, Uttar Pradesh, India
        </div>

      </div>
    </section>
  );
};
