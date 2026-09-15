import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Sparkles, Clock, Layers } from 'lucide-react';

interface QuickProjectSelectorProps {
  onQuoteRequested: (service: string, timeline: string) => void;
}

export const QuickProjectSelector: React.FC<QuickProjectSelectorProps> = ({ onQuoteRequested }) => {
  const [selectedService, setSelectedService] = useState<string>('Reels');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('AS SOON AS POSSIBLE');

  const services = [
    'Reels',
    'Website',
    'Product Shoot',
    'Social Media',
    'Advertising',
    'Branding',
    'Video Editing',
    'Other'
  ];

  const timelines = [
    'AS SOON AS POSSIBLE',
    'THIS WEEK',
    'THIS MONTH',
    'JUST EXPLORING'
  ];

  const handleGetQuote = () => {
    onQuoteRequested(selectedService, selectedTimeline);
  };

  return (
    <section id="quick-quote" className="relative py-20 md:py-28 bg-[#050814] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#090E2A] to-[#060A1D] border border-purple-500/30 p-8 md:p-12 shadow-2xl backdrop-blur-2xl text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Project Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight">
            WHAT DO YOU NEED?
          </h2>

          <p className="mt-2 text-sm text-gray-300 max-w-lg mx-auto">
            Select your core requirement and desired launch timeline so we can prepare a relevant project quote.
          </p>

          {/* Step 1: Services Selection */}
          <div className="mt-8 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Step 1: Choose Primary Project Type</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {services.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedService(item)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border text-center ${
                    selectedService === item
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-102'
                      : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Timeline Selection */}
          <div className="mt-8 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span>Step 2: When do you want to start?</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {timelines.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTimeline(time)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border text-center ${
                    selectedTimeline === time
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-white border-transparent shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-102'
                      : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: GET MY QUOTE CTA */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left text-xs text-gray-300">
              Selected: <strong className="text-white">{selectedService}</strong> • Timeline: <strong className="text-purple-300">{selectedTimeline}</strong>
            </div>

            <button
              id="get-my-quote-btn"
              onClick={handleGetQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#A855F7] via-[#D946EF] to-[#EC4899] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>GET MY QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
